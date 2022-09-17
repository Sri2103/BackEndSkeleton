const app = require("./app/app")
const http = require('http');
const port = 5000

const server = http.createServer(app)

server.listen(port, () => {console.log('Server server listening on port ' + port)})

