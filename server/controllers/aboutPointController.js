const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { aboutUs } = require("../utils/validation");


// Create a new About Us Point
// point name or point descr
exports.addPoints = catchAsyncError(async(req,res) => {
    const { permissions, user } = await req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Point", status: false });
    const {point, description} = await req.body
    const { error } = aboutUs.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const alreadyExists =  `Select id from jtc_about_points WHERE point = ${point} && description = ${description}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "Point Already Exists"})
    const addNewPoint =  `Insert into jtc_about_points SET point = ${point}, description = ${description}`
    const executeAddPoint = await executeQuery(addNewPoint);
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : " Point Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During Point Added ", success: false}) 
})


// Edit a already exists about us point
exports.editPoints = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Edit", success : false})
    const {point, description} = await req.body
    const { error } = aboutUs.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Point", status: false });
    const alreadyExists =  `Select id from jtc_about_points WHERE description = ${description} && point = ${point}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "Point Already Exists"})
    const editNewPoint =  `Update jtc_about_points SET point = ${point}, description = ${description} WHERE id = ${id}`
    const executePoint = await executeQuery(editNewPoint);
    if(executePoint.affectedRows > 0) return res.status(200).json({message : "Point Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During Point Edit ", success: false})    
})


// List of all about us point
exports.points = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Points", status: false });
    const alreadyExists =  `Select * from jtc_about_points ORDER By id DESC `
    const data =  await executeQuery(alreadyExists)

    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
})

// delete a already exists about us point
exports.removepoints = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Points", status: false });
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Edit", success : false})

    const alreadyExists =  `Delete from jtc_about_points WHERE id = ${id}`
    const data =  await executeQuery(alreadyExists)
    if(data.affectedRows > 0) return res.status(200).json({message : "Point Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete Point", success: false})
})