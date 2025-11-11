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

const server = createServer((request, response) => {

    return request
            .pipe(new InverseNumber())
            .pipe(response)

})

server.listen(PORT)