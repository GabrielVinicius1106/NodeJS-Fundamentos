// NODE STREAMS

// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream"

// Readable Stream
class OneToHundredStream extends Readable {
    index = 1
    
    // SOBRESCREVE O MÉTODO _read() PARA CONSUMIR NÚMEROS DE 1 - 100
    _read(){
        const i = this.index++

        // ORIGINAL
        // if(i > 100){
        //     this.push(null)
        // } else {
        //     const buf = Buffer.from(String(i))

        //     this.push(buf)
        // }

        // ADICIONA INTERVALO
        setTimeout(() => {
            if(i > 100){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
        }
        }, 1000)
    }
}

// Transform Stream
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = -1 * Number(chunk.toString())
    
        callback(null, Buffer.from(String(transformed)))
    }
}

// Writable Stream
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()));
        callback()
    }
}

const newStream = new OneToHundredStream()

newStream
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())