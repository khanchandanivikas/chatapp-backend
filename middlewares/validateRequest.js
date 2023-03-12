import { createError } from "../utils/error";
const { validationResult } = require("express-validator");

export const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, "Validation Error. Check the datas."));
    }
  };