const ErrorHandler = require('../utils/Errorhandler')

const  fs = require("fs");
module.exports = (err, req, res, next) => {
  const d = new Date();
  const date = d.getTime();
  fs.appendFileSync("Error.txt", ` ${err} arrived on ${date}  \n`);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server";

  if (err.name == "CastError") {
    const message = `Resouces Not Found.Invalif ${err.path}`;
    err = new ErrorHandle(message, 404);
  }
  if (err.code === 11000) {
    const message = "Json token is invalid, try again";
    err = new ErrorHandle(message, 400);
  }
  if (err.code === "JsonWebTokenError") {
    const message = `Duplicte ${Object.keys(err.keyvalue)} Entered`;
    err = new ErrorHandle(message, 400);
  }
  if (err.code === "TokenExpiredError") {
    const message = "Json token is invalid, try again";
    err = new ErrorHandle(message, 400);
  }
  if (err.code === "jwt malformed") {
    const message = "User NOT Found ";
    err = new ErrorHandle(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
    // error:err.stack
  });
};
