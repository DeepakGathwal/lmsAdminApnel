// const ErrorHandler = require('../utils/Errorhandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 206;
    err.message = err.message || "Internal Server";
    res.status(err.statusCode).json({
        sucess:false,
        message:err.message,
        statusCode:err.statusCode
    })

}