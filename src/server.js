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

const server = createServer((request, response) => {
    
    const { method, url } = request

    if(method === "GET" && url === "/users"){
        // LISTAGEM DE USUÁRIOS 
        return response.setHeader('Content-type','application/json').end(JSON.stringify(users))
    }

    if(method == "POST" && url === "/users"){
        // CRIAÇÃO DE USUÁRIO

        users.push(new User(randomUUID(),"Teste da Silva", "abc@email.com"))

        if(users){
            console.clear()

            for(let user of users){
                console.log(user);
            }
        }

        return response.writeHead(201).end("OK!")
    }

    // RETORNA "NOT FOUND"
    return response.writeHead(404).end()
})

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})