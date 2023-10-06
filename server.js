const http = require("http");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  serveStaticFiles(req, res);
});

const serveStaticFiles = (req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.ejs" : req.url
  );
  const extname = path.extname(filePath);

  let contentType = "text/html";

  if (extname === ".css") {
    contentType = "text/css";
  } else if (extname === ".js") {
    contentType = "application/javascript";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      handle404(res, contentType);
    } else {
      handleEJS(res, contentType, data);
    }
  });
};

const handle404 = (res, contentType) => {
  res.writeHead(404, { "Content-type": contentType });
  return res.end("Error 404");
};

const handleEJS = (res, contentType, data) => {
  let dataEjs = data.toString();
  res.writeHead(200, { "Content-type": contentType });
  res.end(
    ejs.render(dataEjs, {
      title: "Node.js - SPA",
    })
  );
};

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
