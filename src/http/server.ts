import { PrismaClient } from "@prisma/client";
import { fastify } from "fastify";
import { request } from "http";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const app = fastify()


/*app.get('/unipar', () => {
    return 'Ola FASTIFY'
})*/

app.post('/criarEnquete', async (request, reply) => {

    const requestBody = z.object(
        {
            titulo: z.string(),
            descricao: z.string(),
            opcoesEnquete: z.array(z.string())
        }
    )
    const { titulo, descricao, opcoesEnquete} = requestBody.parse(request.body);

    const enqueteCriada = await prisma.enquete.create({
        data : {
            titulo,
            descricao,
            opcoesEnquete : {
                createMany:{
                    data : opcoesEnquete.map(opcao => {
                        return {
                            descricao : opcao
                           
                        }
                    })
                }
            }

        }
    })

  

    return reply.status(201).send(enqueteCriada);   
})

app.get('/listarEnquete', async (request,reply) => {
    const listaEnquete = await prisma.enquete
    .findMany({
        include:{
            opcoesEnquete : true
        }
    })

    return reply.send(listaEnquete)
})

app.listen({port: 3333}).then( () => {
    console.log('SERVIDOR RODANDO')
})