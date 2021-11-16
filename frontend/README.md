# Aplicação frontend do Banco

## Como executar o projeto:
Rodar o comando `yarn start` no terminal executa o projeto em `localhost:3000` no modo de desenvolvimento.

## Estrutura do projeto:

### **/login**
Página inicial onde o usuário faz o login e recebe um token de autorização, que fica salvo no `localStorage`. É a única rota pública do app, todas as outras redirecional para cá caso o usuário não esteja autenticado.

![image](https://user-images.githubusercontent.com/73000207/142012341-ba7646cb-d29e-46dc-af3e-2856fc237a9e.png)


### **/**
Página home, com o menu principal e botão de logout.

![image](https://user-images.githubusercontent.com/73000207/142012413-54989d8e-3cea-44f4-8d65-ecf2847877b4.png)


### **/perfil**
Página para visualizar e editar dados do perfil. Permite alterar a idade e a senha.

![image](https://user-images.githubusercontent.com/73000207/142012477-1d5679c8-1122-4e45-879e-bc37838126ae.png)
![image](https://user-images.githubusercontent.com/73000207/142012510-1bd0ecd5-3a4c-4b6d-a4d8-de41908edba5.png)


### **/transacoes**
Página que mostra o saldo e o histórico de transações do usuário.

![image](https://user-images.githubusercontent.com/73000207/142012561-e144c4c9-9f6a-4c93-abbc-1054cc2b9611.png)


### **/transacoes/new**
Página para criar novas transferências.

![image](https://user-images.githubusercontent.com/73000207/142012702-ce24cc76-2ffe-4580-8f0d-98be127840d0.png)


### **/admin**
Página restrita aos admins. Mostra a lista de todos os usuários, e permite deletar qualquer um.

![image](https://user-images.githubusercontent.com/73000207/142012797-2e10b4b3-ad6b-41da-85ea-8c372e905d5f.png)
![image](https://user-images.githubusercontent.com/73000207/142012860-8162c33d-6470-42e0-bded-28ac88f29a46.png)


### **/admin/newUser**
Página restrita aos admins. Permite criar novos usuários.

![image](https://user-images.githubusercontent.com/73000207/142012897-72ce804c-da34-4832-acec-e5fd45ed91bf.png)
