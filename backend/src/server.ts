// Primeiro, instale o pacote @fastify/cors
// npm install @fastify/cors

import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createUser } from "./routes/create-user";
import fastifyJwt from "@fastify/jwt";
import { login } from "./routes/login";
import { profile } from "./routes/profile";

const app = fastify();

app.register(fastifyCors, {
  origin: true, 
  
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Registre suas rotas existentes
app.register(createUser);
app.register(login);
app.register(profile);

app.register(fastifyJwt, {
  secret: "secret",
});

app.listen({
  port: 3333,
})
  .then(() => console.log("server listen on port http://localhost:3333"))
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });