const http = require("http");
const fs = require("fs");
const path = require("node:path");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log("Just for test");

  res.setHeader("Content-Type", "text/html");
  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);

  let basePath = "";

  switch (req.url) {
    case "/":
    case "/home": // множественные пути для одной страницы
    case "/index.html":
      basePath = createPath("index");
      res.statusCode = 200;
      break;
    case "/about-us": // редирект
      res.statusCode = 301;
      res.setHeader("Location", "/contacts");
      res.end();
      break;
    case "/contacts":
      basePath = createPath("contacts");
      res.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }
  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});
server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`Listening localhost:${PORT}`);
});
