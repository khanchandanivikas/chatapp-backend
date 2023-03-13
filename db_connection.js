require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGO_DB_URI;
// Conexión a la base de datos (MongoDB Atlas) y arrancar el servidor (Express)
const db_connection = () => {
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });
  mongoose.set("strictQuery", false);
  mongoose
    .connect(URI)
    .then(() => {
      console.log("BD connected");
    })
    .catch((error) => console.log("connection error", error));
};
module.exports = db_connection;