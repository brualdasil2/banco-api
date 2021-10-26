from flask import Flask, make_response, request
from flask_restful import Resource, Api, reqparse
import json
import jwt
import datetime

app = Flask(__name__)
api = Api(app)

app.config["SECRET_KEY"] = "bruxolito"

def validate_token(token):
    try:
        payload = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return payload["login"]
    except:
        return False


# Resposta padrão para não bugar o CORS na pré-requisição
def options_response():
    my_resp = make_response()
    my_resp.headers['Access-Control-Allow-Origin'] = "*"
    return my_resp

def create_response(res, code):
    my_resp = make_response(res)
    my_resp.headers['Access-Control-Allow-Origin'] = "*"
    my_resp.status_code = code
    return my_resp

def create_error_response(msg, code):
    my_resp = make_response({"message":msg})
    my_resp.headers['Access-Control-Allow-Origin'] = "*"
    my_resp.status_code = code
    return my_resp

class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("login", required=True, type=str)
        parser.add_argument("senha", required=True, type=str)
        # args é o dict que armazena o objeto enviado
        args = parser.parse_args()

        f = open("data.json", "r")
        users = json.load(f)["users"]

        if args["login"] not in users:
            return create_error_response(f"Usuario com login {args['login']} nao existe!", 404)
        elif args["senha"] == users[args["login"]]["senha"]:
            token = jwt.encode({"login": args["login"], "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=2)}, app.config["SECRET_KEY"])
            return create_response({"token":token}, 200)
        else:
            return create_error_response("Senha invalida!", 404)

class User(Resource):
    def options(self):
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
                return create_response(user, 200)
    
    def put(self, login):
        parser = reqparse.RequestParser()
        parser.add_argument("nome", required=False, type=str)
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
                    if args["nome"]:
                        new_user["nome"] = args["nome"]
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
                return create_response(data["users"], 200)
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("nome", required=True, type=str)
        parser.add_argument("idade", required=True, type=int)
        parser.add_argument("login", required=True, type=str)
        parser.add_argument("senha", required=True, type=str)
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
                f = open("data.json", "w")
                data["users"][args["login"]] = {
                    "nome":args["nome"],
                    "idade":args["idade"],
                    "senha":args["senha"],
                    "admin":args["admin"]
                }
                json.dump(data, f, indent=4)
                return create_response({
                    "nome":args["nome"],
                    "idade":args["idade"],
                    "senha":args["senha"],
                    "admin":args["admin"]
                }, 201)


        


api.add_resource(Users, "/users")
api.add_resource(User, "/users/<login>")
api.add_resource(Login, "/login")

if __name__ == "__main__":
    app.run(debug=True)