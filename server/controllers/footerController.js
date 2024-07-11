const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");


exports.footer = catchAsyncError(async(req,res) => {
   const {permissions, user} = req 
   if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Update Team Member", status : false});

   const { name  , about , contact, phone , email,facebook ,instagram , twitter ,
        linkedin, youtube , telegram } = req.body
        
   const updateQuery = await executeQuery(`Update jtc_footer SET linkedin = ${linkedin}, name = ${name}  , about = ${about} , contact = ${contact}, phone = ${phone} ,email = ${email},facebook = ${facebook} ,instagram = ${instagram} , twitter = ${twitter} ,  youtube  = ${youtube}, telegram = ${telegram} WHERE id = 1 `)
   if(updateQuery.affectedRows > 0) return res.status(200).json({message : "Footer Updated  Successfully", success : true})
   else return res.status(206).json({message : "Error! During Footer Added", success : false});

})
exports.footerData = catchAsyncError(async(req,res) => {
   const {permissions, user} = req 
   if(permissions[0].can_view == 0) return res.status(206).json({message : "Permission Denied to Update Team Member", status : false});

   const data = await executeQuery(`SELECT name,linkedin, about , contact, phone , email,facebook ,instagram , twitter ,
   youtube , telegram from jtc_footer where id = '1'`)
   if(data.length > 0) return res.status(200).json({data, success : true})
   else return res.status(206).json({message : "Error! During Footer Getting", success : false});

})