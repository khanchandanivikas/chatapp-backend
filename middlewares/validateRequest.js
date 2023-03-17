const { createError } = require("../utils/error");
const { validationResult } = require("express-validator");

module.exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, "Validation Error. Check the datas."));
    }
  };