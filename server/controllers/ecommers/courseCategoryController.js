const catchAsyncError = require("../../middelwares/catchAsyncError");
const { getDataUri } = require("../../utils/imageHandeler");
const { executeQuery } = require("../../conn/db");
const { coursereLabel } = require("../../utils/validation");
const { pagination } = require("../../utils/pagination");




// add a new couse type -> type must be different every time
exports.addCourseType = catchAsyncError(async(req,res) => {
    
    const {category, description} = await req.body
    const { permissions, user } = await req
    if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  category", status: false });
    const icon = req.file
    const fileImage = icon && await getDataUri(icon)
    const findquery =  `Select id from jtc_ecommers_course_types WHERE category = ${category} && description =${description}`
    const executeAlready =  await executeQuery(findquery)
    if(executeAlready.length > 0) return res.status(206).json({message : "category Already Exists"})
        const link =  await category.replaceAll(" ", "_").toLowerCase()
   
    const query = `Insert into jtc_ecommers_course_types SET   description = ${description}, icon = '${fileImage}', link = ${link}, category  = ${category} `

    const executeAddPoint = await executeQuery(query)
    if(executeAddPoint.affectedRows > 0)  return res.status(200).json({message : "Course Type Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Added ", success: false}) 
})

// edit a course type by id
exports.editCourseType = catchAsyncError(async(req,res) => {
    const {category, description} = await req.body
    const { permissions, user } = await req
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "category Not Found for Edit", success : false})
    if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit category", status: false });
    const findquery =  `Select id from jtc_ecommers_course_types WHERE category = ${category} && description = ${description}`
    const executeAlready =  await executeQuery(findquery)

  
    if(executeAlready.length > 1) return res.status(206).json({message : "category Already Exists"})
      
        const link =  await category.replaceAll(" ", "_").toLowerCase()
   
    let image = ''
    if(req.file){
   
        const icon = await req.file
       
        let fileImage = icon && await getDataUri(icon)
        image = ` , icon =  '${fileImage}'`
    }

    const query = `Update jtc_ecommers_course_types SET description = ${description}, link = ${link}, category  = ${category} ${image} WHERE id = ${id}`

    const executeAddPoint = await executeQuery(query)
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : "category Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Edit ", success: false})    
})

// list of all course types
exports.courseType = catchAsyncError(async(req,res) => {
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Category", status: false });
    const query = `Select * from jtc_ecommers_course_types Order by id desc`
    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Category", success: false})
})

// remove a course type
exports.removeCourseType = catchAsyncError(async(req,res) => {
    const { permissions, user } = await req
    if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category", status: false });
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "Category Not Found for Remove", success : false})

        const query = `Delete from jtc_ecommers_course_types Where id = ${id}`
        const data =  await executeQuery(query)
    if(data.affectedRows > 0) return res.status(200).json({message : "category Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete category", success: false})
})


// add a new couse label -> type must be different every time
exports.addCourseLabel = catchAsyncError(async(req,res) => {
    const {label} = await req.body
    const { error } = coursereLabel.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const { permissions, user } = req
    if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  Label", status: false });
    const query =  `Select id from jtc_ecommers_course_label where label=${label}`
    const executeAlready =  await executeQuery(query)
    if(executeAlready.length > 0) return res.status(206).json({message : "Course Label Already Exists", success : false})
        const insertData = `Insert into jtc_ecommers_course_label SET label=${label}`
    const executeAddPoint = await executeQuery(insertData)
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : "Course Label Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Added ", success: false}) 
})


// edit a new couse label -> type must be different every time
exports.editCourseLabel = catchAsyncError(async(req,res) => {
    const {label} = await req.body 
    const { error } = coursereLabel.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const {id} = req.params
    const { permissions, user } = req
    if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create  Label", status: false });

    const query =  `Select id from jtc_ecommers_course_label where label=${label}`
    const executeAlready =  await executeQuery(query)
    if(executeAlready.length > 0) return res.status(206).json({message : "Course Label Already Exists", success : false})
        const insertData = `Update  jtc_ecommers_course_label SET label=${label} WHERE id = ${id}`
    const executeAddPoint = await executeQuery(insertData)
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : "Course Label Updated Successfully", success: true})
    else return res.status(206).json({message : "Error! During category Added ", success: false}) 
})


// list of all course label
exports.courceLabel = catchAsyncError(async(req,res) => {
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Label", status: false });
    const query = `Select * from jtc_ecommers_course_label `
    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Category", success: false})
})

// delete a  course label
exports.deletecourceLabel = catchAsyncError(async(req,res) => {
    const { permissions, user } = await req
    const {id} = await req.params
    if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Label", status: false });
    const query = `Delete from jtc_ecommers_course_label WHERE id = ${id}`
    const data =  await executeQuery(query)
    if(data.affectedRows > 0) return res.status(200).json({message : "Course Label Deleted Successfully", success: false})
    else return res.status(206).json({message : "Error! During Fetch Category", success: false})
})
