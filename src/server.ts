import fastify from "fastify";
import { createUser } from "./routes/create-user";
import fastifyJwt from "@fastify/jwt";
import { login } from "./routes/login";
import { profile } from "./routes/profile";

const app = fastify()

app.register(createUser)
app.register(login)
app.register(profile)

app.register(fastifyJwt, {
    secret: "secret",
})

app.listen({
    port: 3333
}).then(() => console.log("server listen on port http://localhost:3333"))