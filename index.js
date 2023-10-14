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

  socket.on("roomOne", (msg) => {
    console.log("message received is", msg);

    socket.join("room");

    socket.to("room").emit("clientTwo", msg);
  });

  socket.on("roomTwo", (msg, callback) => {
    console.log("message received is", msg);

    socket.join("room");

    socket.to("room").emit("clientOne", msg);
  });
});

server.listen("3200", (httpServer) => {
  console.log("listening to 3200");
});
