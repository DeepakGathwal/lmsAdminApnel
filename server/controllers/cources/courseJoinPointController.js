const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { getDataUri } = require("../../utils/imageHandeler");
const { pagination } = require("../../utils/pagination");
const { categorySchema, subCategorySchema } = require("../../utils/validation");

exports.addPoint =  catchAsyncError(async(req,res) => {

    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Point",status: false });
    const {course, description} =  req.body
  if (!course) return res.status(206).json({ message: "Course Missing", success: false })
    if(!req.file) return res.status(206).json({message : "Icon Needed", success : false})
    const icon = req.file
   const fileImage = icon && await getDataUri(icon)
            
    const alreadyPoint =  `SELECT id from jtc_course_join_point WHERE description = ${description}`
    const executeAreadyCategory = await executeQuery(alreadyPoint);
    if(executeAreadyCategory.length > 0) return res.status(206).json({message : "Point Already Exists", success : false})
    const addCategoryQuery =  `Insert into jtc_course_join_point SET icon = '${fileImage}',description = ${description} , course_id = ${course}`
const executeAddCategor = await executeQuery(addCategoryQuery)
if(executeAddCategor.affectedRows > 0) return res.status(200).json({message : "Point Added Successfully", success : true})
else return res.status(206).json({message : "Error! During Point Added", success : false})
})


exports.editPoint =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const {course, description}  =  req.body 
    const alreadyCategory =  `SELECT id from jtc_course_join_point WHERE description = ${description}`
   
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Chapter Already Exists", success : false})
   
    let addCources = [];
    let addindataBase = ''

    if(course.length > 0){
        const getLabel = course.toString();
        const value = getLabel.replace(/,/g, "','");
      const idOFCources = `Select id from jtc_courses WHERE name IN (${value}) && deleted_by = '0'`
       const data = await executeQuery(idOFCources)
    
      if(data.length > 0){
     await data.map((el) => {
        addCources.push(el.id)
      })
      addindataBase = `, course_id =  '${addCources}' `}
    }
   
    let setImage = ''
    if(req.file) {
    const icon = req.file
   const fileImage = icon && await getDataUri(icon)
   setImage = `icon = '${fileImage}',`
   }
    const editCategoryQuery =  `Update jtc_course_join_point SET ${setImage} description = ${description} ${addindataBase}   WHERE id = ${id}`;
    const executeEditCategory = await executeQuery(editCategoryQuery)
    if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Category Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! During Category Edit", success : false})
})

exports.deletePoint =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category",status: false });
    const {id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})
  
    const alreadyCategory =  `Delete from jtc_course_join_point WHERE id = ${id}`
    const data = await executeQuery(alreadyCategory);
    
    if(data.affectedRows > 0) return res.status(200).json({message : "Category Delete Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Delete", success : false})
})

exports.getPoint =  catchAsyncError(async(req,res) => {

    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Cources Chapter",status: false });
  
    const alreadyCategory = `SELECT * from jtc_course_join_point ORDER By id DESC `
   
    const data = await executeQuery(alreadyCategory);
   
    if(data.length > 0){
        for (let index = 0; index < data.length; index++) {
            const courceId = data[index].course_id
                   const selectCourceNameQuery = `Select name from jtc_courses WHERE id IN (${courceId}) && deleted_by = '0' `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
                 if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.name)
           data[index]["cources"] = String(values);
            }
        }
        return pagination(req, res, data)
    }
    else return res.status(206).json({message : "Error! During Category Fetching", success : false})
})

