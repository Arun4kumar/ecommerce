const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong..." } = err;

  console.log("error", err);
  res.status(status).json({
    message: message,
    error: err.stack,
  });

  next();
};

export default errorHandler;
