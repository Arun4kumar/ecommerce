const asyncErrorsHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default asyncErrorsHandler;
