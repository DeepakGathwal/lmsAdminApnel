const catchAsyncError = require("../middelwares/catchAsyncError");
const bycrypt =  require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const { token } = require("../middelwares/token");
const { executeQuery } = require("../conn/db");
const { loginSchema, profileSchema, passwordSchema, forgetPassword, otpSchem } = require("../utils/validation");
const {getDataUri} = require('../utils/imageHandeler')




exports.login = catchAsyncError(async(req,res) =>{
    const {email, password} = await req.body
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const findAccount = `SELECT id, password from jtc_team WHERE email = "${email}" && deleted_by = '0'`;

    const getUser =  await executeQuery(findAccount);

    if(getUser.length > 0){

        const matchPassword = bycrypt.compareSync(password, String(getUser[0].password)); 
      
        if(matchPassword){
            res.clearCookie(`JTC`)
            req.cookies[`JTC`] = "";
            const userId = getUser[0].id 
          
            const updateLoginTime = `Update jtc_team SET lastLoginTime = current_timestamp() WHERE id = '${userId}' && deleted_by = '0'`
          
            const executeLoginTime  = await executeQuery(updateLoginTime);
            if(executeLoginTime.affectedRows > 0) return   token(userId,res)
            else return res.status(206).json({message : "Please check your password and email", success : false})

          
        }else return res.status(206).json({message : "Please check your password and email", success : false})
    }else return res.status(206).json({message : "Account Not Found", success : false})
})

exports.genrateProfileModule = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req   
    const getModules =  `Select modules,name, icon from jtc_modules WHERE id IN (SELECT module_id from jtc_permissions WHERE active = '1' && can_view = '1' && role_id = (SELECT role from jtc_team WHERE id = ${user}) && deleted_by = '0') order by modules asc`
    const value = await executeQuery(getModules)
  let subCategory = new Set();
  value.map((el) => {
    const count = el.name.split(" ")
    if(count.length > 1)
    subCategory.add(count[0])
})

let createSubModule = [];

subCategory.forEach(async(el) => {
  await  createSubModule.push({
      modules: `/${el}`, name: el, icon: null, sub :[]
    })

  })
  
  let createModule = [];

  createSubModule.map((ab) => {
  value.forEach((el, index) => {
       if(el.name.includes(ab.name)) return ab.sub.push(el)
     
    })
  })

  value.forEach((el) => {
    // Check if 'el.name' includes any substring in 'subCategory'
    if ([...subCategory].some(sub => el.name.includes(sub)) == false) {
    return  createModule.push(el);
    }
  })
  // const finalData =
  const finalData =  [...createModule, ...createSubModule]
  const data = finalData.sort((a, b) => {
    const nameA = a.modules.toUpperCase(); // convert names to uppercase for case-insensitive comparison
    const nameB = b.modules.toUpperCase();
  
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
    if(data.length > 0) return res.status(200).json({ success : true,data })
    return res.status(206).json({message : "Error! Getting Profile module", success : false})
})

exports.updateImage = catchAsyncError(async(req,res) =>{
    const {user} = req 
    if(!req.file) return res.status(206).json({message : "File Nedded", success : false})
    const imagefile = req.file
    const fileImage = await getDataUri(imagefile)
    const image = `${fileImage}`
   
    const updateImagequery = `Update jtc_team SET image = '${image}' WHERE id = ${user} && deleted_by = '0'`
    const executeupdateImagequery = await executeQuery(updateImagequery);
    if(executeupdateImagequery.affectedRows > 0 ) return res.status(200).json({message : "Update Image Successfully", success : true})
    else return res.status(206).json({message : "Update Image Fail", success : false})  
})

exports.updateProfile = catchAsyncError(async(req,res) =>{
    const {email, phone, name, linkedin, instagram, facebook, address } = await req.body
    const { user} = req 
    const { error } = profileSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const addTeamMember = `Update jtc_team SET name = "${name}", address = "${address}" ,email = "${email}", phoneNumber = "${phone}",  linkedin = "${linkedin}", instagram = "${instagram}", facebook = "${facebook}" WHERE id = '${user}' && deleted_by = '0'`
    const insertData = await executeQuery(addTeamMember)
    if(insertData.affectedRows > 0) return res.status(200).json({message : "Team Member Added Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})

exports.updatePassword = catchAsyncError(async(req,res) =>{
    const {confirmPassword, password } = await req.body   
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    if(confirmPassword != password) return res.status(206).json({message : "Password Not Matched"})
    const { user} = req 
    const encryptPass = await bycrypt.hashSync(password, 8)
    const updateTeamMemberPassword = `Update jtc_team SET password = "${encryptPass}" WHERE id = ${user} && deleted_by = 0`
    const updatePass = await executeQuery(updateTeamMemberPassword)
    if(updatePass.affectedRows > 0) return res.status(200).json({message : "Password edit Successfully", success : true })
    else return res.status(206).json({message : "Error! While edit Password", success : false })
})


exports.forgetPassword = catchAsyncError(async(req,res) =>{
    const {email} = await req.body 
    const { error } = forgetPassword.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const findAccount = `SELECT id from jtc_team WHERE email = "${email}" && deleted_by = '0'`;
    const getUser =  await executeQuery(findAccount);
    if(getUser.length > 0){
        const userId = getUser[0].id
        const otp = Math.floor(100000 + Math.random() * 900000);
    /** save otp */
    const saveOtp = `UPDATE jtc_team SET forgetPasswordOtp = "${otp}" WHERE id = ${userId} `;
    const insertOtp = await executeQuery(saveOtp);
    
      if (insertOtp.affectedRows > 0) {
        /** Create token */
        const token =  jwtToken.sign({ id: userId }, process.env.jsonToken, {
            expiresIn: "1h",
          });
    
          const option = {
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 3600000),
          httpOnly: true, sameSite: "none", secure: true
        }
          return res.status(200).cookie(String("JTC"), token,option).json({success:true,message : `Your Otp Valid for 10 minute`, otp})
        }else return res.status(206).json({message : "Email Address Wrong" , success : false})  
    }  else return res.status(206).json({message : "Email Address Wrong" , success : false})  
})

exports.verifyOtp = catchAsyncError(async(req,res) =>{
    const {user} = req 
    const {otp} = await req.body
    const { error } = otpSchem.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const findAccount = `SELECT id from jtc_team WHERE id = '${user}' && deleted_by = '0' && forgetPasswordOtp = "${otp}"`;
    const getUser =  await executeQuery(findAccount);

    if(getUser.length > 0){
        res.clearCookie(`JTC`)
        req.cookies[`JTC`] = "";
        const userId = getUser[0].id
            token(userId,res)
    }else return res.status(206).json({message : "Otp Invalid", success : false})
})

exports.logOut = catchAsyncError(async(req,res) =>{
    const {user} = req;
  
    if (!user) {

        return res.status(206).json({message : "No user found Plese Login Again", success : false})
    }
    res.clearCookie(`JTC`)
    req.cookies[`JTC`] = "";
    const updateLoginTime = `Update jtc_team SET lastLogoutTime = current_timestamp() WHERE id = '${user}' && deleted_by = '0'`
    const executeLoginTime  = await executeQuery(updateLoginTime);
    if(executeLoginTime.affectedRows > 0) return res.status(200).json({ success : true, message: "User Logout SuccessFully" })
    else return res.status(206).json({message : "Error! During Logout", success : false})
})

exports.getProfile = catchAsyncError(async(req,res) =>{
    const {user} = req;
    const profile = `Select team.address, team.name,Date_Format(team.date_created, "%d-%m-%Y") as joinDate , team.email, team.image, team.phoneNumber,  team.linkedin, team.instagram,role.role as role, team.facebook from jtc_team as team Left Join jtc_roles as role On role.id = team.role AND role.deleted_by = '0'  WHERE team.id = ${user} && team.deleted_by = '0'`
    const data = await executeQuery(profile)
    if(data.length > 0) return res.status(200).json({ success : true, data })
    else return res.status(206).json({message : "Error! During Fething User Details", success : false})
})
