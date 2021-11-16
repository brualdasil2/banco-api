# Documentação da API de banco

## Validação por token
Nos métodos marcados com (token), é preciso passar um token válido por query string. Exemplo: `api.com/users?token=abcdefg`

## /login
POST:

    {
        "login": "brualdasil2",
        "senha": "Senha123"
    }

    RESPOSTA:

    {
        "token": "token_jwt"
    }

## /users
POST (token) (restrito ao admin): Cria um usuário novo. Login deve ser único.

    {
        "nome": "Bruno",
        "idade": 20,
        "login": "brualdasil2",
        "senha": "Senha123",
        "saldo": 100.00,
        "admin": true
    }

GET (token) (restrito ao admin): Retorna lista de todos os usuários.

    RESPOSTA:
    {   
        users: {
            [
                {
                    "nome": "Bruno",
                    "idade": 20,
                    "login": brualdasil2,
                    "saldo": 80.45,
                    "admin": true
                    "historico": [
                        {
                            "valor": 50.02,
                            "destino": "rsilveira",
                            "data": "2021-11-05 18:04:46.246591"
                        },
                        {
                            "valor": 10.0,
                            "origem": "rsilveira",
                            "data": "2021-11-11 21:47:40.636899"
                        }
                    ]
                },
                {
                    "nome": "Ricardo",
                    "idade": 56,
                    "login": rsilveira,
                    "saldo": 42.20,
                    "admin": false
                    "historico": [
                        {
                            "valor": 50.02,
                            "origem": "brualdasil2",
                            "data": "2021-11-05 18:04:46.246591"
                        },
                        {
                            "valor": 10.0,
                            "destino": "brualdasil2",
                            "data": "2021-11-11 21:47:40.636899"
                        }
                    ]
                }
            ]
        }
    }

## /users/\<login>
GET (token): Retorna o usuário. Restrito ao próprio usuário e ao admin.

    RESPOSTA:
    {
        "nome": "Bruno",
        "idade": 20,
        "saldo": 80.45,
        "admin": true
        "historico": [
            {
                "valor": 50.02,
                "destino": "rsilveira",
                "data": "2021-11-05 18:04:46.246591"
            },
            {
                "valor": 10.0,
                "origem": "rsilveira",
                "data": "2021-11-11 21:47:40.636899"
            }
        ]
    }

PUT (token): Atualiza alguns dados do usuário. Restrito ao próprio usuário e ao admin. É possível mudar só um dos dados, não é necessário enviar os dois campos.

    {
        "senha": "Senha456",
        "idade": 21
    }

DELETE (token) (restrito ao admin): Deleta um usuário.

## /users/\<login>/transfer
POST (token): Realiza uma transferência para outro usuário pelo login. Só transfere se houver saldo suficietnte.

    {
        "valor": 20.00,
        "destino": rsilveira
    }
