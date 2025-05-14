# 🔐 JWT Authentication API - Node.js + Prisma

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-5e47d2?style=for-the-badge)
![bcryptjs](https://img.shields.io/badge/bcryptjs-gray?style=for-the-badge)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)

## 📋 Descrição

API de autenticação com JWT utilizando Node.js, Prisma e SQLite. Possui funcionalidades completas de cadastro, login e verificação de perfil autenticado. A senha dos usuários é armazenada de forma segura utilizando `bcryptjs`.

Ideal para uso como base em sistemas que precisam de autenticação simples e segura.

---

## ✨ Funcionalidades

- 🔐 **Autenticação via JWT** com tempo de expiração
- 👤 **Criação de usuários**
- 🔑 **Login com validação de senha**
- 🧾 **Perfil protegido** (acessível apenas com token válido)
- 🔒 **Hash seguro de senhas** com `bcryptjs`
- ✅ **Validação de dados** com `Zod`

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** como servidor web
- **Prisma ORM** com **SQLite**
- **bcryptjs** para hashear senhas
- **Zod** para validação de inputs
- **JWT (@fastify/jwt)** para geração de tokens

---

## 📂 Estrutura do Projeto

```
jwt-auth/
├── prisma/
│   ├── migrations/         # Migrations do banco SQLite
│   ├── dev.db              # Banco de dados local
│   └── schema.prisma       # Definição do modelo User
├── src/
│   ├── lib/
│   │   └── prisma.ts       # Instância do cliente Prisma
│   ├── routes/
│   │   ├── create-user.ts  # Rota de criação de usuário
│   │   ├── login.ts        # Rota de login
│   │   └── profile.ts      # Rota de perfil protegido
│   ├── utils/
│   │   └── hash.ts         # Funções de hash e verificação de senha
│   └── server.ts           # Setup do servidor e rotas
├── .env                    # Variáveis de ambiente
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Rodar

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/jwt-auth.git
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados e o Prisma:**
```bash
npx prisma migrate dev --name init
```

4. **Inicie o servidor:**
```bash
npm run dev
```

---

## 🧪 Testando a API

### 📌 Cadastro
`POST /create-user`

```json
{
  "name": "Levi",
  "email": "levi@email.com",
  "password": "123456"
}
```

### 🔑 Login
`POST /login`

```json
{
  "email": "levi@email.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "token": "jwt_aqui"
}
```

### 👤 Perfil (protegido)
`GET /profile`  
**Headers:**  
`Authorization: Bearer jwt_aqui`

---

## 🛠 Dependências

```json
{
  "@fastify/jwt": "^9.1.0",
  "@prisma/client": "^6.7.0",
  "@types/node": "^22.15.17",
  "bcryptjs": "^3.0.2",
  "fastify": "^5.3.2",
  "prisma": "^6.7.0",
  "tsx": "^4.19.4",
  "typescript": "^5.8.3",
  "zod": "^3.24.4"
}
```

**Dev Dependencies:**
```json
{
  "@types/bcryptjs": "^3.0.0"
}
```

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).