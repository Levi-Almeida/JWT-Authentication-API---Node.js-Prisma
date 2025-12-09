import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { verifyJWT } from "../middlewares/verifyJWT";

export function buscasRoutes(app: FastifyInstance) {

    app.get('/usuarios', async (req, res) => {
        const search = req.query.search || "";

        console.log()

        try {
            const usuarios = await prisma.user.findMany({
                where: {
                    OR: [
                        { name: { contains: search} },
                        { email: { contains: search} }
                    ]
                }
            });

            return res.send({
                search,
                resultados: usuarios
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Erro ao buscar usuários" });
        }
    });

}
