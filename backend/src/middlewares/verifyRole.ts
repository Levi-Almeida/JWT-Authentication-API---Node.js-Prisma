import { FastifyRequest, FastifyReply } from "fastify";

export function verifyRole(role: string) {
  return async function (req: FastifyRequest, reply: FastifyReply) {
    if (!req.user || req.user.role !== role) {
      return reply.status(403).send({ error: "Acesso negado" });
    }
  };
}
