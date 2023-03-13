const express = require("express");
const db_connection = require("./db_connection");
const { router } = require("./router");
const { config } = require("./config");
// const { socket } = require("./socket");

const app = express();

//* Setup middlewares*//
config(app);

//* routes *//
router(app);
const cors = require("cors");
app.use(cors());

//* Error handler *//
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    data: err.data,
    message: errorMessage,
    stack: err.stack,
  });
});

//* Run server *//
const server = app.listen(process.env.PORT || 5000, () => {
  //* MongoDB connection *//
  db_connection();
  console.log("Listening ");
});

//* socket.io *//
// socket(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// users with userId and socketId
let users = [];

// add online user
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// remove disconnected user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// get a user by his id
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // add online user
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // after adding send to front all online users
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    // remove a disconnected user
    removeUser(socket.id);
    // after removing send all online users to front
    io.emit("getUsers", users);
  });

  // send and receive message
  socket.on("sendMessage", ({ senderId, senderName, receiverId, text }) => {
    // find destined user
    const user = getUser(receiverId);
    // send msg to destined user in real time
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      senderName,
      text,
    });
    io.to(user?.socketId).emit("getNotification", {
      senderId,
      senderName,
      receiverId,
      text,
    });
  });
});
