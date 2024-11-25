import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// socket io
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("userMessage", (message) => {
    console.log("new message :- ", message);

    io.emit("serverUserMessage",message)

  });
});
