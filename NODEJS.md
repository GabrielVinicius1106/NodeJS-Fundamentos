### NODEJS

- Ambiente de execução JS do lado do **servidor**

- Criação de **APIs**, **Frameworks**, **Aplicações CLI**

- Arquitetura **Nonblocking I/O** (event loop controla as chamadas de funções)(código concorrente e assíncrono)

- Ótimo para aplicações de **streaming**

### Comandos

- npm init -y : Inicia um arquivo ***package.json***

**Cria um atalho de execução**
**Para executar basta utilizar o npm**

- "scripts" : {
    "dev": "node --watch server.js"
}



### Criando um Servidor

- Iniciando um servidor com **NodeJS PURO**

- **REQUESt** Informações de Requisição

- **RESPONSE** Informações de Resposta

import http from 'node:http' ***=> Utilizado para criação de aplicações HTTP*** 

const PORT = 3333 ***Define a PORTA onde o servidor estará rodando***

***.createServer() cria um servidor HTTP na PORTA especificada***
const server = http.createServer((request, response) => { 
    return response.end(`Server running on port: ${PORT}`)
})

***server.listen(PORT) deixa o servidor OUVINDO requisições de outras aplicações HTTP***
server.listen(PORT)


### Rotas HTTP

- Caminhos dentro da aplicação que possibilitam o acesso a recursos como:
    > Criação de Dados
    > Edição de Dados
    > Leitura de Dados
    > Exclusão de Dados
    > ...

- **Como funciona uma requisição HTTP?**

    - Método HTTP (GET, POST, PUT, DELETE, PATCH)
    - URL

    ***Métodos HTTP: ***
        GET => Busca de recursos no Backend
        POST => Criação de recursos no Backend
        PUT => Atualização GRANDE de um recurso no Backend
        PATCH => Atualizar recurso ESPECÍFICO no Backend
        DELETE => Deletar recursos no Backend

### HTTP Status Code

- Códigos enviados para o ***frontend*** para comunicar status da requisição, se ela deu certo, se ela deu erro,
  tipo de erro, etc.

- Importância semântica

### NodeJS Streams

- Processar dados em pedaços sequenciais

- **EX:**

    > Leitura de um arquivo de texto.csv (1GB) p/ armazenar no BD

    > 10mb/s

    > POST /upload texto.csv

    - Para o processamento total deste arquivo, levaria:

        > 1GB/10mb => 1024mb/10mb => 100s

    - Com **STREAMS**, podemos processar fragmentos do arquivo enquanto realizamos a leitura do restante

- ***Readable Streams / Writable Streams***

- No **NodeJS** toda porta de ***ENTRADA*** e ***SAÍDA*** é uma ***Stream***

- **Requests** e **Responses** são **Streams**, pois são modelos de ***entrada*** e ***saída***

