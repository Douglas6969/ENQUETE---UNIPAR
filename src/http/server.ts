import { PrismaClient } from "@prisma/client";
import { fastify } from "fastify";
import { request } from "http";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { criarEnquete } from "./routes/criar-enquete";
import { listarEnquete } from "./routes/listar-enquetes";

const app = fastify()


/*app.get('/unipar', () => {
    return 'Ola FASTIFY'
})*/

app.register(criarEnquete)

app.register(listarEnquete)

app.listen({port: 3333}).then( () => {
    console.log('SERVIDOR RODANDO')
})