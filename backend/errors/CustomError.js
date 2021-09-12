import colure from "colours";
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    console.log("custom error".yellow);
  }
}

export default CustomError;
