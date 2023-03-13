// const express = require("express");
// const db_connection = require("./db_connection");
// const { router } = require("./router");
// const { config } = require("./config");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
// const { socket } = require("./socket");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// const app = express();

//* Setup middlewares*//
// config(app);

//* routes *//
// router(app);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//* Error handler *//
// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     data: err.data,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error has occured",
  });
});

//* Run server *//
// app.listen(process.env.PORT || 5000, () => {
//   * MongoDB connection *//
//   db_connection();
//   console.log("Listening ");
// });
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("escuchando...");
    });
  })
  .catch((error) => {
    console.log("error" + error);
  });

//* socket.io *//
// socket(server);
