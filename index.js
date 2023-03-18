const express = require("express");
const { Server } = require("socket.io"); //ES6

// App setup
const app = express();
const http = require("http");
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("listening on *:3000");
});

app.get("/", (req, res) => {
  //   res.send("<h1>Hello world</h1>");
  res.sendFile(__dirname + "/public/index.html");
});

//app.use(express.static('public')); see app.use vs app.get

//socket set up & pass server
const io = new Server(server);
io.on("connection", (socket) => {
  // io.on('connection', function(socket){
  console.log("a user connected");
});

//Each socket also fires a special disconnect event:
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//print out the chat message event to server
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); //emit sends to all
  });
});

// //broadcast flag....don't use
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });
