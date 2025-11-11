import { Readable } from "node:stream"

// Readable Stream
class OneToHundredStream extends Readable {
    index = 1
    
    _read(){
        const i = this.index++
        
        setTimeout(() => {
            if(i > 10){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
        }
        }, 500)
    }
}

// Cria uma requisição para o servidor criado
fetch("http://localhost:3334", {
    method: "POST", // Define o MÉTODO
    body: new OneToHundredStream(), // Define o BODY
    duplex: "half" // Define a requisição para somente LEITURA
}).then((response) => { 
    return response.text // Retorna o texto da RESPONSE
}).then((data) => {
    console.log(data); // Finalmente retorna os DADOS contidos na RESPONSE
})

