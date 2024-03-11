import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function listarEnquete (app: FastifyInstance){

    app.get('/listarEnquete', async (request,reply) => {
        const listaEnquete = await prisma.enquete
        .findMany({
            include:{
                opcoesEnquete : true
            }
        })
    
        return reply.send(listaEnquete)
    })
}