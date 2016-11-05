/**
 * Created by diana on 16. 11. 6.
 */
const http = require('http');

const hostname = '127.0.0.1'; // server computer's IP
const port = 1337; // port number

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});