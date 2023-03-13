const cors = require("cors");
app.use(cors());
module.exports.socket = (server) => {
  // socket
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
};
