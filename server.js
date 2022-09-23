require('dotenv').config()
const app = require("./app/app")
const http = require('http');
const connectDB = require('./DB/db');
const port = 5000

connectDB()
const server = http.createServer(app)

server.listen(port, () => {console.log('Server server listening on port ' + port)})

process.on("unhandledRejection", err =>{
    console.log(`An error occured: ${err.message}`)
    server.close(() =>process.exit(1))
})