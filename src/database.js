// Módulo para manipulação de arquivos em NodeJS
import fs from "node:fs/promises"

// String do Dirétorio relativo a "database.js"
const relativePath = new URL("../db.json", import.meta.url)

// Cria a classe Database
export class Database {
    #database = {} // Cria um ATRIBUTO global para armazenar os dados IN MEMORY

    constructor(){
        
        try {

            fs.readFile(relativePath, 'utf8').then((data) => {
                this.#database = JSON.parse(data)
            }).catch(() => {
                this.#persist()
            })
        
        } catch {

            this.#persist()
        
        }             
    }

    #persist(){
        fs.writeFile(relativePath, JSON.stringify(this.#database))
    }

    // Método para LISTAR USUÁRIOS
    select(table){

        // Se existir um ATRIBUTO <table> em "database", retorna o próprio ATRIBUTO
        const data = this.#database[table] ?? []

        return data
    }
    
    // Método para INSERIR USUÁRIOS
    insert(table, data){

        // Se o ATRIBUTO <table> existir em "database", só adiciona um novo objeto <data> ao array
        if(this.#database[table]){
            this.#database[table].push(data)
        } else {
 
            // Se não cria o ATRIBUTO <table> como um array de <data> 
            this.#database[table] = [data]
        }

        this.#persist()
    }
}