// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end(`${filePath} not found`);
      return;
    }
    if (stats.isFile()) {
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(3000);