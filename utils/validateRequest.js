const { validationResult } = require("express-validator");

export const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error. Check the datas.");
      error.code = 422;
      return next(error);
    }
  };