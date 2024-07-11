const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { faqsSchema } = require("../utils/validation");

exports.addFaqs = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  Point", status: false });
    const {point, description, about} = req.body
    const { error } = faqsSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
        
    const alreadyExists =  `Select id from jtc_faqs WHERE point = ${point} && description =  ${description}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "Point Already Exists"})
    const removeAbout = about.replaceAll("'","")
    const addNewPoint =  `Insert into jtc_faqs SET point = ${point}, description = ${description},faqs_about  =  '${removeAbout}'`
     const executeAddPoint = await executeQuery(addNewPoint);
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : " Point Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During Point Added ", success: false}) 
})

exports.editFaqs = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Edit", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Point", status: false });
    const {point, description, about} = req.body
     const { error } = faqsSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const alreadyExists =  `Select id from jtc_faqs WHERE point = ${point} && description =  ${description}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 1) return res.status(206).json({message : "Point Already Exists"})
    let setAbout = ''
    if(about){
        const removeAbout = about.replaceAll("'","")
        setAbout = `, faqs_about = '${removeAbout}'`
    }
    const editNewPoint =  `Update jtc_faqs SET point = ${point}, description = ${description} ${setAbout} WHERE id = ${id}`
    const executePoint = await executeQuery(editNewPoint);
    if(executePoint.affectedRows > 0) return res.status(200).json({message : "Point Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During Point Edit ", success: false})    
})


exports.faqs = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Points", status: false });
    const alreadyExists =  `Select * from jtc_faqs ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
})

exports.removeFaqs = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Points", status: false });
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Edit", success : false})

    const alreadyExists =  `Delete from jtc_faqs WHERE id = ${id}`
    const data =  await executeQuery(alreadyExists)
    if(data.affectedRows > 0) return res.status(200).json({message : "Point Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete Point", success: false})
})


exports.allFaqsPoints = catchAsyncError(async(req,res) => {
    
    const query = `Select name from jtc_courses  Where deleted_by = '0'  UNION ALL Select name from jtc_website_links  Where deleted_by = '0' `
    const data =  await executeQuery(query)
    if(data.length > 0) return res.status(200).json({data, success: true})
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
})