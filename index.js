const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const app = express();
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
