const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const cors = require('cors');

// CORS middleware function
const corsMiddleware = cors();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3001;
const hostname = "tamnama.nsjsoft.ir";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Apply CORS manually for each request
 res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    corsMiddleware(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("CORS error");
        return;
      }

      try {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        if (pathname === "/a") {
          app.render(req, res, "/a", query);
        } else if (pathname === "/b") {
          app.render(req, res, "/b", query);
        } else {
          handle(req, res, parsedUrl);
        }
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});