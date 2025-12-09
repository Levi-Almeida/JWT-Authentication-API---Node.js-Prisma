Aqui está **somente o texto em Markdown**, limpo e pronto para copiar e colar no seu `README.md`:

---

## 🔐 Segurança da Aplicação

A aplicação implementa mecanismos de proteção contra **SQL Injection (SQLi)**, **Cross-Site Scripting (XSS)** e **acessos não autorizados**, garantindo segurança em todas as interfaces.

---

### 🛡️ Prevenção contra SQL Injection (SQLi)

A aplicação utiliza o ORM **Prisma**, que gera consultas com **parâmetros preparados**, impedindo a injeção de SQL.
Nenhuma query é montada manualmente com concatenação de strings.

Exemplo seguro:

```js
await prisma.user.findMany({
  where: {
    name: { contains: search }
  }
});
```

> O Prisma protege automaticamente contra SQL Injection.

---

### 🧯 Prevenção contra Cross-Site Scripting (XSS)

O frontend utiliza **React**, que escapa automaticamente qualquer conteúdo renderizado, impedindo que scripts enviados pelo usuário sejam executados.

Exemplo seguro:

```jsx
<p>{user.name}</p>
```

> React impede XSS por padrão, desde que `dangerouslySetInnerHTML` não seja utilizado.

---

### 🔒 Prevenção contra acessos não autorizados

A aplicação implementa autenticação com **JWT** e controle de permissões baseado em **roles**.

#### Backend:

* Middleware valida o token antes de liberar rotas privadas.
* Rotas específicas verificam o `role` do usuário (ex.: aluno ou professor).

```js
app.get('/rota-protegida', { preHandler: [app.authenticate] }, async () => {
  return { message: "Acesso permitido" };
});
```

#### Frontend:

* **ProtectedRoute** bloqueia rotas caso o usuário não esteja autenticado.
* **RoleRoute** libera páginas conforme o papel do usuário.

```jsx
if (!user) return <Navigate to="/login" />;
```

---

### ✅ Resumo das Proteções

| Ameaça                     | Status         | Implementação                    |
| -------------------------- | -------------- | -------------------------------- |
| SQL Injection              | ✔ Prevenido    | Prisma ORM                       |
| XSS                        | ✔ Prevenido    | React escapa HTML                |
| Acessos não autorizados    | ✔ Prevenido    | JWT + middleware                 |
| Controle por função (role) | ✔ Implementado | RoleRoute + validação no backend |

---

Se quiser, posso gerar também a seção de instalação, API docs ou o README completo.
