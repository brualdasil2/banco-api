# Aplicação frontend do Banco

## Como executar o projeto:
Rodar o comando `yarn start` no terminal executa o projeto em `localhost:3000` no modo de desenvolvimento.

## Estrutura do projeto:

### **/login**
Página inicial onde o usuário faz o login e recebe um token de autorização, que fica salvo no `localStorage`. É a única rota pública do app, todas as outras redirecional para cá caso o usuário não esteja autenticado.

### **/**
Página home, com o menu principal e botão de logout.

### **/perfil**
Página para visualizar e editar dados do perfil. Permite alterar a idade e a senha.

### **/transacoes**
Página que mostra o saldo e o histórico de transações do usuário.

### **/transacoes/new**
Página para criar novas transferências.

### **/admin**
Página restrita aos admins. Mostra a lista de todos os usuários.

### **/admin/newUser**
Página restrita aos admins. Permite criar novos usuários.