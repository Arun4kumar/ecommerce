import "colours";
const errorHandler = (err, res) => {
  const { status = 500, message = "Something went wrong..." } = err;
  console.log("in side error".yellow.inverse, err);
  res.status(status).json({
    message: message,
    error: err.stack,
  });
};

export default errorHandler;
