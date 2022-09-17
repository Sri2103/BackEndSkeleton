const app = require("./app/app")
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const port = 5000

app.use([cors(),morgan('combined')])
const server = http.createServer(app)

server.listen(port, () => {console.log('Server server listening on port ' + port)})

