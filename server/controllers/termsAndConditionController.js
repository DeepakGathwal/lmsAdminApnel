const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");



exports.addTerms = catchAsyncError(async(req,res) => {
    const {page, description} = req.body
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  page", status: false });
    const alreadyExists =  `Select id from jtc_tnc WHERE page = ${page} && description = ${description}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "page Already Exists"})
    const addNewPoint =  `Insert into jtc_tnc SET page = ${page},description = ${description}`
    const executeAddPoint = await executeQuery(addNewPoint);
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : " page Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During page Added ", success: false}) 
})

exports.editTerms = catchAsyncError(async(req,res) => {
    const {page, description} = req.body
    const { permissions, user } = req
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "page Not Found for Edit", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit page", status: false });
    const alreadyExists =  `Select id from jtc_tnc WHERE page = ${page} && description = ${description}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 1) return res.status(206).json({message : "page Already Exists"})
    const editNewPoint =  `Update jtc_tnc SET page = ${page} ,description = ${description} WHERE id = ${id}`
    const executePoint = await executeQuery(editNewPoint);
    if(executePoint.affectedRows > 0) return res.status(200).json({message : "page Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During page Edit ", success: false})    
})


exports.termsAndCondition = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Points", status: false });
    const alreadyExists =  `Select * from jtc_tnc ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
})

exports.removeTerms = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Points", status: false });
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "page Not Found for Edit", success : false})
    const alreadyExists =  `Delete from jtc_tnc WHERE id = ${id}`
    const data =  await executeQuery(alreadyExists)
    if(data.affectedRows > 0) return res.status(200).json({message : "page Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete page", success: false})
})