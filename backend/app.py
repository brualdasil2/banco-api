from flask import Flask, make_response, request
from flask_restful import Resource, Api, reqparse
import json
import jwt
import datetime
import hashlib

app = Flask(__name__)
api = Api(app)

app.config["SECRET_KEY"] = "bruxolito"

def validate_token(token):
    try:
        payload = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return payload["login"]
    except:
        return False

def string_has(texto, string_func):
    for c in texto:
        if eval(f"c.{string_func}()"):
            return True
    return False

def validate_password(senha):
    if len(senha) < 8:
        return create_error_response("A senha deve ter pelo menos 8 caracteres", 404)
    elif not (string_has(senha, "islower") and string_has(senha, "isupper") and string_has(senha, "isnumeric")):
        return create_error_response("A senha deve conter caracteres minusculos, maiusculos, e numeros", 404)
    else:
        return False
    
    

def encrypt_string(text):
    return hashlib.sha256(text.encode()).hexdigest()

# Resposta padrão para não bugar o CORS na pré-requisição
def options_response():
    my_resp = make_response()
    my_resp.headers["Access-Control-Allow-Origin"] = "*"
    my_resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    my_resp.headers["Access-Control-Allow-Methods"] = "*"
    return my_resp

def create_response(res, code):
    my_resp = make_response(res)
    my_resp.headers["Access-Control-Allow-Origin"] = "*"
    my_resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    my_resp.headers["Access-Control-Allow-Methods"] = "*"
    my_resp.status_code = code
    return my_resp

def create_error_response(msg, code):
    my_resp = make_response({"message":msg})
    my_resp.headers["Access-Control-Allow-Origin"] = "*"
    my_resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    my_resp.headers["Access-Control-Allow-Methods"] = "*"
    my_resp.status_code = code
    return my_resp

class Login(Resource):
    def options(self):
        return options_response()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("login", required=True, type=str)
        parser.add_argument("senha", required=True, type=str)
        # args é o dict que armazena o objeto enviado
        args = parser.parse_args()

        f = open("data.json", "r")
        users = json.load(f)["users"]

        password = encrypt_string(args["senha"])

        if args["login"] not in users:
            return create_error_response(f"Usuario com login {args['login']} nao existe!", 404)
        elif password == users[args["login"]]["senha"]:
            token = jwt.encode({"login": args["login"], "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config["SECRET_KEY"])
            return create_response({"token":token}, 200)
        else:
            return create_error_response("Senha invalida!", 404)

class Transfer(Resource):
    def options(self, login):
        return options_response()
    
    def post(self, login):
        parser = reqparse.RequestParser()
        parser.add_argument("valor", required=True, type=float)
        parser.add_argument("destino", required=True, type=str)
        args = parser.parse_args()

        token = request.args.get("token")
        auth = validate_token(token)
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            if login != auth:
                return create_error_response("Somente o próprio usuário pode realizar transferencias", 404)
            elif args["destino"] == login:
                return create_error_response("Você não pode transferir para si mesmo", 404)
            else:
                f = open("data.json", "r")
                data = json.load(f)
                if args["destino"] not in data["users"]:
                    return create_error_response(f"Usuario com login {args['destino']} não existe", 404)
                else:
                    valor = round(args["valor"], 2)
                    if data["users"][login]["saldo"] < valor:
                        return create_error_response("Saldo insuficiente", 404)
                    else:
                        f = open("data.json", "w")
                        now = str(datetime.datetime.utcnow())
                        data["users"][login]["saldo"] = round(data["users"][login]["saldo"] - valor, 2)
                        data["users"][login]["historico"].append({
                            "valor": valor,
                            "destino": args["destino"],
                            "data": now
                        })
                        data["users"][args["destino"]]["saldo"] = round(data["users"][args["destino"]]["saldo"] + valor, 2)
                        data["users"][args["destino"]]["historico"].append({
                            "valor": valor,
                            "origem": login,
                            "data": now
                        })
                        json.dump(data, f, indent=4)
                        return create_response({
                            "valor": valor,
                            "destino": args["destino"],
                            "data": now
                        }, 200)



class User(Resource):
    def options(self, login):
        return options_response()

    # Parâmetros são os valores passados no endpoint <id>
    def get(self, login):
        token = request.args.get("token")
        auth = validate_token(token)
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            f = open("data.json", "r")
            data = json.load(f)
            if (not data["users"][auth]["admin"]) and login != auth:
                return create_error_response("Somente o admin pode ver outros usuários", 404)
            elif login not in data["users"]:
                return create_error_response(f"Usuario com login {login} nao existe!", 404)
            else:
                user = data["users"][login]
                user.pop("senha")
                return create_response(user, 200)
    
    def put(self, login):
        parser = reqparse.RequestParser()
        parser.add_argument("senha", required=False, type=str)
        parser.add_argument("idade", required=False, type=int)
        args = parser.parse_args()

        token = request.args.get("token")
        auth = validate_token(token)
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            if login != auth:
                return create_error_response("Somente o próprio usuário pode editar seus dados", 404)
            else:
                f = open("data.json", "r")
                data = json.load(f)
                if login not in data["users"]:
                    return create_error_response(f"Usuario com login {login} nao existe!", 404)
                else:
                    new_user = data["users"][login]
                    if args["senha"]:
                        password_error = validate_password(args["senha"])
                        if password_error:
                            return password_error
                        else:
                            password = encrypt_string(args["senha"])
                            new_user["senha"] = password
                    if args["idade"]:
                        new_user["idade"] = args["idade"]
                    data["users"][login] = new_user
                    f = open("data.json", "w")
                    json.dump(data, f, indent=4)
                    return create_response(new_user, 200)
                    
    def delete(self, login):
        token = request.args.get("token")
        auth = validate_token(token)
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            f = open("data.json", "r")
            data = json.load(f)
            if not data["users"][auth]["admin"]:
                return create_error_response("Somente o admin pode deletar usuários", 404)
            elif auth == login:
                return create_error_response("Você não pode se deletar", 404)
            else:
                deleted = data["users"].pop(login)
                f = open("data.json", "w")
                json.dump(data, f, indent=4)
                return create_response(deleted, 200)

class Users(Resource):
    def options(self):
        return options_response()

    def get(self):
        token = request.args.get("token")
        auth = validate_token(token)
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            f = open("data.json", "r")
            data = json.load(f)
            if not data["users"][auth]["admin"]:
                return create_error_response("Somente o admin pode ver os usuários", 404)
            else:
                users = data["users"]
                list_users = {"users":[]}
                for login in users:
                    list_users["users"].append({
                        "login":login,
                        "admin":users[login]["admin"],
                        "idade":users[login]["idade"],
                        "nome":users[login]["nome"],
                        "saldo":users[login]["saldo"],
                        "historico":users[login]["historico"]
                    })
                return create_response(list_users, 200)
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("nome", required=True, type=str)
        parser.add_argument("idade", required=True, type=int)
        parser.add_argument("login", required=True, type=str)
        parser.add_argument("senha", required=True, type=str)
        parser.add_argument("saldo", required=True, type=float)
        parser.add_argument("admin", required=True, type=bool)
        args = parser.parse_args()

        token = request.args.get("token")

        auth = validate_token(token)
        
        if not auth:
            return create_error_response("Token inválido", 404)
        else:
            f = open("data.json", "r")
            data = json.load(f)
            if not data["users"][auth]["admin"]:
                return create_error_response("Somente o admin pode criar usuários", 404)
            elif args["login"] in data["users"]:
                return create_error_response(f"Usuario com login {args['login']} ja existe", 409)
            else:
                password_error = validate_password(args["senha"])
                if password_error:
                    return password_error
                else:
                    f = open("data.json", "w")
                    password = encrypt_string(args["senha"])
                    saldo = round(args["saldo"],2)
                    new_user = {
                        "nome":args["nome"],
                        "idade":args["idade"],
                        "senha":password,
                        "admin":args["admin"],
                        "saldo":saldo,
                        "historico":[]
                    }
                    data["users"][args["login"]] = new_user
                    json.dump(data, f, indent=4)
                    return create_response(new_user, 201)


        

api.add_resource(Transfer, "/users/<login>/transfer")
api.add_resource(Users, "/users") 
api.add_resource(User, "/users/<login>")
api.add_resource(Login, "/login")

if __name__ == "__main__":
    app.run(debug=True)