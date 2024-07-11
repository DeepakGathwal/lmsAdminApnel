const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { pagination } = require("../../utils/pagination");


// add a new couse type -> type must be different every time
exports.addCourseType = catchAsyncError(async(req,res) => {
    const {category} = req.body
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  category", status: false });
    const alreadyExists =  `Select id from jtc_courses_type WHERE category = ${category}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "category Already Exists"})
    const addNewPoint =  `Insert into jtc_courses_type SET category = ${category}`
    const executeAddPoint = await executeQuery(addNewPoint);
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : " category Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Added ", success: false}) 
})

// edit a course type by id
exports.editCourseType = catchAsyncError(async(req,res) => {
    const {category} = req.body
    const { permissions, user } = req
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "category Not Found for Edit", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit category", status: false });
    const alreadyExists =  `Select id from jtc_courses_type WHERE category = ${category}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "category Already Exists"})
    const editNewPoint =  `Update jtc_courses_type SET category = ${category} WHERE id = ${id}`
    const executePoint = await executeQuery(editNewPoint);
    if(executePoint.affectedRows > 0) return res.status(200).json({message : "category Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Edit ", success: false})    
})

// list of all course types
exports.courseType = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Category", status: false });
    const alreadyExists =  `Select * from jtc_courses_type ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Category", success: false})
})


// remove a course type
exports.removeCourseType = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category", status: false });
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "category Not Found for Edit", success : false})

    const alreadyExists =  `Delete from jtc_courses_type WHERE id = ${id}`
    const data =  await executeQuery(alreadyExists)
    if(data.affectedRows > 0) return res.status(200).json({message : "category Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete category", success: false})
})