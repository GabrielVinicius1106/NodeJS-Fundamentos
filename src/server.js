// "createServer()" cria um servidor
import { randomUUID } from "node:crypto"
import { createServer } from "node:http"

const PORT = 3333

class User {
    constructor(id, name, email){
        this.id = id
        this.name = name
        this.email = email
    }
}

const users = []
    
const server = createServer(async (request, response) => {
    
    const { method, url } = request
    const buffers = []

    for await (const chunk of request){
        buffers.push(chunk)
    }

    // O corpo da requisição é um arquivo de texto
    // Convertemos para JSON utilizando:

    // JSON.parse(<string>)
    
    try{
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch(error){

        console.log("Corpo da requisição VAZIO!");

        request.body = null
    }
    
    if(method === "GET" && url === "/users"){
        // LISTAGEM DE USUÁRIOS

        return response.setHeader('Content-type','application/json').end(JSON.stringify(users))
    }

    if(method == "POST" && url === "/users"){
        // CRIAÇÃO DE USUÁRIO

        const { name, email } = request.body

        users.push({
            id: 1,
            name,
            email
        })

        return response.writeHead(201).end("OK!")
    }

    // RETORNA "NOT FOUND"
    return response.writeHead(404).end()
})

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})