const dotenv  = require('dotenv')
dotenv.config()
const http = require("http");
const port = process.env.PORT;
const router = require("./router");
const server = http.createServer(router);

server.listen(port,()=>
    console.log(`listening on https://localhost:${port}/`));