import color from "colours";
const asyncErrorsHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.log("in side asyncHandler".red.inverse);
      next(error);
    }
  };
};

export default asyncErrorsHandler;
