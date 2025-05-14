# 🔐 JWT Auth Fullstack - Node.js (Fastify + Prisma) + React

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge\&logo=sqlite\&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-5e47d2?style=for-the-badge)
![bcryptjs](https://img.shields.io/badge/bcryptjs-gray?style=for-the-badge)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge\&logo=fastify\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

---

## 📋 Descrição

Aplicação fullstack de autenticação JWT utilizando:

* **Back-end** em Node.js com Fastify, Prisma e SQLite
* **Front-end** em React com Vite

Funcionalidades de cadastro, login, perfil autenticado e navegação protegida com consumo da API no front-end.

---

## ✨ Funcionalidades

* 🔐 Autenticação segura com JWT
* 👤 Cadastro e login com hash de senha via bcrypt
* 🧾 Rota de perfil autenticada (requer token)
* ✅ Validação de dados com Zod no back-end
* ⚛️ Front-end com rotas protegidas e contexto de autenticação
* 💬 Exibição de nome, email e ID do usuário logado

---

## 🧱 Estrutura do Projeto

```
JWT-AUTH/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── src/
│   │   ├── lib/
│   │   ├── routes/
│   │   │   ├── create-user.ts
│   │   │   ├── login.ts
│   │   │   └── profile.ts
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

---

## 🚀 Como Rodar o Projeto

### 🧱 Back-end (Fastify + Prisma)

1. Acesse a pasta do back-end:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco e rode as migrations:

```bash
npx prisma migrate dev --name init
```

4. Inicie o servidor:

```bash
npm run dev
```

### 💻 Front-end (React)

1. Em outra aba do terminal, vá para o front-end:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o front-end:

```bash
npm run dev
```

---

## 🔐 Endpoints da API

| Método | Rota         | Descrição              | Autenticado?  |
| ------ | ------------ | ---------------------- | ------------- |
| POST   | /create-user | Cadastrar novo usuário | ❌             |
| POST   | /login       | Login e gerar token    | ❌             |
| GET    | /profile     | Obter dados do perfil  | ✅ (com token) |

### Exemplo de login

```json
{
  "email": "teste@gmail.com",
  "password": "12345678"
}
```

### Resposta:

```json
{
  "token": "seu_token_jwt"
}
```

---

## 📱 Front-end

A aplicação React permite:

* Registrar e logar usuários
* Exibir o nome, e-mail e ID na página de perfil autenticada
* Controlar rotas protegidas com `ProtectedRoute.jsx`
* Gerenciar autenticação com `AuthContext.jsx`

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
