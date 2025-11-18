// "createServer()" cria um servidor
import { createServer } from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const PORT = 3333
    
const server = createServer(async (request, response) => {
    
    const { method, url } = request
    
    await json(request, response)

    // Retorna o primeiro objeto "route"
    const route = routes.find((route) => {
        return route.method == method && route.path.test(url)
    })

    console.log(route);

    if(route){
        return route.handler(request, response)
    }

    // RETORNA "NOT FOUND"
    return response.writeHead(404).end()
})

server.listen(PORT, () => {
    return `Server running on PORT: ${PORT}`
})