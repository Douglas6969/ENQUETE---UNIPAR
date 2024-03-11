import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function criarEnquete(app: FastifyInstance){
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
}