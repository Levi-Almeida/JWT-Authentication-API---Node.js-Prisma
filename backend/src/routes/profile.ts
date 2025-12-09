import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { verifyJWT } from "../middlewares/verifyJWT";

export function profileRoutes(app: FastifyInstance) {

  app.get("/profile", {
    preHandler: [verifyJWT],
  }, async (req, reply) => {

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    return user;
  });
}
