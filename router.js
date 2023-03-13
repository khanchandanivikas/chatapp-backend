// const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
// const userRoute = require("./routes/users");

module.exports.router = (app) => {
  // app.use("/api/auth", authRoute);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);
  // app.use("/api/users", userRoute);
  app.use((req, res, next) => {
    res.status(404);
    res.json({
      message: "Route not found",
    });
  });
};
