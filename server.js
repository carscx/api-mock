const jsonServer = require("json-server");
const authMiddleware = require("./authMiddleware");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(authMiddleware);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
