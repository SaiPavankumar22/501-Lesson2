const fs=require("fs");
const http=require("http");
const url=require("url");

let home="";
let project="";
let registration="";

fs.readFile("h.html", (err, home) => {
  if (err) {
    throw err;
  }
  home = home;
});
fs.readFile("p.html", (err, project) => {
  if (err) {
    throw err;
  }
  project = project;
});
fs.readFile("r.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registration = registration;
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.writeHead(200, { "Content-Type": "text/html" });

  switch (pathname) {
    case "/project":
      res.write(project);
      res.end();
      break;
    case "/registration":
      res.write(registration);
      res.end();
      break;
    default:
      res.write(home);
      res.end();
      break;
  }
});

const portIndex = process.argv.indexOf("--port");
const port = portIndex !== -1 ? parseInt(process.argv[portIndex + 1]) : 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
