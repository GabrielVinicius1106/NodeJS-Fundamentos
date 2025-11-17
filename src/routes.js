import { Database } from "./database.js"
import { randomUUID } from "node:crypto"

const db = new Database()

const routes = [
    {
        method: "GET",
        path: "/users",
        handler: (request, response) => {
            const users = db.select("users")

            return response.end(JSON.stringify(users))
        }
    },
    {
        method: "POST",
        path: "/users",
        handler: (request, response) => {
            const { name, email } = request.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            db.insert("users", user)

            return response.writeHead(201).end("OK!")
        }
    }
]

export { routes }