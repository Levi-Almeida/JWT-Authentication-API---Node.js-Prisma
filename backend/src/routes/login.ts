import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";
import { verifyPassword } from "../utils/hash";

export function login(app: FastifyInstance){

    const loginSchema = z.object({
        email: z.string(),
        password: z.string()
    })

    app.post('/login', async (req, res) =>{

        const {email, password} = loginSchema.parse(req.body)

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user)
            return res.status(400).send({message: "Usuario não encontrado!"})

        const isPassword = await verifyPassword(password, user.password)

        if(!isPassword)
            return res.status(400).send({message: "Senha invalida"})

        const token = app.jwt.sign({id: user.id, email: user.email}, { expiresIn: '60s'}  )

        const userReply = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        return res.status(200).send({
            message: token,
            user: userReply
        })
    })

}