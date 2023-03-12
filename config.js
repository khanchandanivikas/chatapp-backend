const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports.config = (app) => {
  //will help us to retrieve body parameters when handling a request.
  //   app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("common"));
  app.use(cors());
};
