import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/buildRoutePath.js"

const db = new Database()

const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (request, response) => {
            const users = db.select("users")

            return response.end(JSON.stringify(users))
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/users"),
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
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:ID"),
        handler: (request, response) => {
            return response.end()
        }
    }
]

export { routes }