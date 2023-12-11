import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/terreno', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {bairro, lote, quadra } = request.body
    database.create({
        bairro: bairro,
        lote: lote,
        quadra: quadra
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/terreno', (request) => {
    const search = request.query.search

    console.log(search)
    
    const Terrenos = database.list(search)
   
    return Terrenos
})

server.put('/terreno/:id', (request, reply) => {

    const TerrenoId = request.params.id
    const {bairro, lote, quadra} = request.body
    const terreno = database.update(TerrenoId, {
        bairro,
        lote,
        quadra,
    })
    return reply.status(204).send()
})

server.delete('/terreno/:id', (request, reply) => {
    const TerrenoId = request.params.id

    database.delete(TerrenoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})