# Banco do Balas

# Documentação da API de banco

## Validação por token
Nos métodos marcados com (token), é preciso passar um token válido por query string. Exemplo: `api.com/users?token=abcdefg`

## /login

POST:

    {
        "login": string,
        "senha": string
    }

    RESPOSTA:

    {
        "token":string
    }

## /users
POST (token) (restrito ao admin): Cria um usuário novo. Login deve ser único.

    {
        "nome": string,
        "idade": int,
        "login": string,
        "senha": string,
        "saldo": float,
        "admin": bool
    }

GET (token) (restrito ao admin): Retorna lista de todos os usuários.

## /users/\<login>
GET (token): Retorna o usuário. Restrito ao próprio usuário e ao admin.

PUT (token): Atualiza alguns dados do usuário. Restrito ao próprio usuário e ao admin.

    {
        "senha": string,
        "idade": string
    }

DELETE (token) (restrito ao admin): Deleta um usuário.

## /users/\<login>/transfer
POST (token) (restrito ao admin): Realiza uma transferência para outro usuário pelo login. Só transfere se houver saldo suficietnte.

    {
        "valor": float,
        "destino": string
    }
