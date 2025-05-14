import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';

export function profile(app: FastifyInstance) {
    app.addHook("onRequest", async (req, res) => {
        try {
            await req.jwtVerify()
        } catch (error) {
            return res.status(401).send({ error })
        }
    })

  app.get('/profile', async (req, res) => {
    const userId =  req.user.id; 

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true
      },
    });

    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    return user;
  });
}