require('dotenv').config();
const app = require('./app/app')
const http = require('http');
require('./config/DbConect')
const port = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});