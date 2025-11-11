import { createServer } from "node:http"
import { Transform } from "node:stream"

const PORT = 3334

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = -1 * Number(chunk.toString())
        
        console.log(transformed);

        callback(null, Buffer.from(String(transformed)))
    }
}

// "request" e "response" são STREAMS em NodeJS

// request => Readable STREAM
// response => Writable STREAM

const server = createServer(async (request, response) => {

    // Manipulando STREAMS COMPLETAS
    const buffers = []

    // Requisições para SERVIDORES são recebidas inteiramente
    // antes de serem MANIPULADAS

    // O 'await' garante que o servidor aguarde por todos os dados da stream
    for await (const chunk of request){
        buffers.push(chunk)
    }

    // Recebe todo o conteúdo de 'buffers'
    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent);

    // Retorna os dados por completo da stream
    return response.end(fullStreamContent)

    // Envia os dados da STREAM para outra STREAM, e finalmente
    // para a RESPONSE

    // return request
    //         .pipe(new InverseNumber())
    //         .pipe(response)

})

server.listen(PORT)