const jwtToken = require('jsonwebtoken');
const ErrorHandler = require('../utils/Errorhandler');
const catchAsyncError = require('./catchAsyncError');
const {  executeQuery } = require('../conn/db');


exports.token = catchAsyncError(async(userid,res) =>{
  const token =  jwtToken.sign({ id: userid }, process.env.jsonToken, {
        expiresIn: "7d",
      });
       const option = {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 3600000),
      httpOnly: true, sameSite: "none", secure: true
    }
    // const option =  {
    //   path: '/',
    //   expires:  new Date(Date.now() + 7 * 24 * 3600000),
    //   httpOnly: false,
    //   sameSite: 'lax',
   
    // }
      return res.status(200).cookie(String("JTC"), token,option).json({success:true, message:"Login Successfully"})
})



  exports.verifyUser = catchAsyncError(async (req, res, next) => {
    const cookie = req.cookies
 
    if (!cookie) {
        return next(new ErrorHandler("CookieNot Found", 206))
    }
    const token = cookie["JTC"];
 
    jwtToken.verify(String(token), process.env.jsonToken, (err, user) => {
 
        if (err) {
            return res.status(206).json({message : "Token Expire", success : false})
        } else {
            req.user = user.id
       
            next();
        }
    })

})



  exports.verifyModulePermission = catchAsyncError(async (req, res, next) => {
  
    const {module} = await req.query
    if (!module) return res.status(206).json({ message: "Module  Missing", success: false })

    const {user} = req 
    const getPermissionOfLoginUser = `Select * from jtc_permissions WHERE module_id = (SELECT id from jtc_modules WHERE modules = '${module}' && deleted_by = 0) && role_id = (SELECT role from jtc_team WHERE id = ${user} && deleted_by = 0)`
    const permissions = await executeQuery(getPermissionOfLoginUser)
    const data =  [...permissions]
    if(data.length > 0){
      req.permissions = data;
      next();
    }else return res.status(206).json({success : false, message : "Module Not Found"})
})





