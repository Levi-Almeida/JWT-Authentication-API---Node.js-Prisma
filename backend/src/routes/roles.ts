import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyRole } from "../middlewares/verifyRole";

export async function roleRoutes(app: FastifyInstance) {

  app.get("/alunos", {
    preHandler: [verifyJWT, verifyRole("aluno")]
  }, async () => {
    return { message: "Bem-vindo, aluno!" };
  });

  app.get("/professores", {
    preHandler: [verifyJWT, verifyRole("professor")]
  }, async () => {
    return { message: "Bem-vindo, professor!" };
  });

}
