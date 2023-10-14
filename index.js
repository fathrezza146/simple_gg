const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.json({ success: true });
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("name", (msg) => {
    console.log("message received is", msg);

    socket.emit("showName", msg);
  });

  socket.on("message", (msg) => {
    console.log("message received is", msg);

    socket.emit("showMsg", msg);
  });
});

server.listen("3200", (httpServer) => {
  console.log("listening to 3200");
});
