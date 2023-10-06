const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath)

  console.log(filePath);
  console.log(extname);

  let contentType = 'text/html'

  if (extname === '.css') {
    contentType = 'text/css'
  } else if (extname === '.js') {
    contentType = 'application/javascript'
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err)
      res.writeHead(404, {'Content-type': contentType});
      res.end('404 Not Found')
    } else {
      res.writeHead(200, {'Content-type': contentType});
      res.end(data)
    }
  })
});


server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})