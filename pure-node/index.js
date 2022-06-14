const http = require("http");
const fs = require("fs");
const { dirname, extname } = require("path");
const { fileURLToPath } = require("url");

///__dirname

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    // res.writeHead(400);
    return res.end(http.STATUS_CODES[400]);
  }

  console.log(req.url);
  if (req.url === "/raw-html") {
    // res.end('<h1>Welcome</h1>');
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.write("<h1>Welcome</h1>");
    res.write("<h2>Welcome</h2>");
    return res.end();
  }

  if (req.url === "/users") {
    fs.readFile("./users.json", (err, content) => {
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      return res.end(content);
    });
  }

  let parseUrl = req.url.replace(/^\/+|\/+$/g, "");
  console.log(parseUrl);

  if (req.url === "/") {
    parseUrl = "index.html";
  }
  const file = __dirname + "/public/" + parseUrl;

  fs.readFile(file, (err, content) => {
    switch (parseUrl) {
      case "index.html":
        res.writeHead(200, { "Content-type": "text/html" });
        break;
      case "index.js":
        res.writeHead(200, { "Content-type": "text/javascript" });
        break;
      case "style.css":
        res.writeHead(200, { "Content-type": "text/css" });
        break;
    }

    return res.end(content);
  });
});

server.listen(PORT, HOST, () => {
  console.log("Im listening on port " + PORT);
});
