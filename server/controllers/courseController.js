const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");

const {  courseSchema } = require("../utils/validation");
const {getDataUri} = require('../utils/imageHandeler')


exports.addCourse = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Course", status: false });
    const {name, type, videoLink, description, meta_tags, meta_keywords, meta_description} = await req.body 
    const { error } = courseSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
   
    const already = `Select id from jtc_courses WHERE name = ${name} && category = ${type} && deleted_by = '0'`
    const executeAlready = await executeQuery(already)
    if(executeAlready.length > 0) return res.status(206).json({message : "Course Name Already Exists", success : false})
    let iconWIthBanner = ''
if(req.files){
    
    const {icon, banner} = req.files
  
    const fileImage = icon && await getDataUri(icon[0])
    const fileBanner =banner && await getDataUri(banner[0])
    iconWIthBanner = `, icon = '${fileImage}', banner = '${fileBanner}'`
}
    const  link = await name.replaceAll(" ", "-").toLowerCase()
    const addCourseQuery = `Insert into jtc_courses SET name = ${name}, category = ${type},description = ${description}, video_link = ${videoLink},created_by = ${user}, meta_tags = ${meta_tags}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description} ${iconWIthBanner}, link = ${link}`
    const executeQueryAddCourse = await executeQuery(addCourseQuery);
    if(executeQueryAddCourse.affectedRows > 0) return res.status(200).json({message : "Course Added Successfully", success : true})
    else return res.status(206).json({message : "Error! Adding Courses", success : true})
})

exports.editCourse = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Course", status: false });
    const {name, type,description, videoLink,meta_tags, meta_keywords, meta_description} = await req.body 
    const { error } = courseSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
        let BannerImg = ''
        let iconImag = ''
        if(req.files){
            const { icon , banner} =  req.files
            if(icon){
                const fileImage = await getDataUri(icon[0])
                iconImag = `, icon = '${fileImage}'`}
                if(banner){
                    
               const fileBanner = banner && await getDataUri(banner[0])
            BannerImg = `, banner = '${fileBanner}'`}
        }
        let addindataBase = ''
      
        let addCategory = [];
        if(type.length > 0){
            const getLabel = type.toString();
            const value = getLabel.replace(/,/g, "','");
          const idOFCategories = `Select id from jtc_courses_type WHERE category IN (${value})`
           const data = await executeQuery(idOFCategories)
          if(data.length > 0){
         await data.map((el) => {
            addCategory.push(el.id)
          })
          addindataBase = ` category = '${addCategory}',`
        
        }
    }  
    const  link = await name.replaceAll(" ", "-").toLowerCase()
    const editCourseQuery = `Update jtc_courses SET name = ${name}, link = ${link}, ${addindataBase}  description = ${description} ,video_link = ${videoLink},updated_by = ${user}, updated_at = current_timestamp(), meta_tags = ${meta_tags}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description} ${iconImag} ${BannerImg} WHERE id = ${id} && deleted_by = '0'`
    const executeQueryeditCourse = await executeQuery(editCourseQuery);
    if(executeQueryeditCourse.affectedRows > 0) return res.status(200).json({message : "course Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! Update courses", success : false})
})

exports.deleteCourse = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = req.params
    if(!id) return res.status(206).json({message : "course Not Found", success : false})
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Edit course", status: false });
   
    const deletecourseQuery = `Update jtc_courses SET deleted_by = ${user},deleted_at = current_timestamp() WHERE id = ${id} && deleted_by = '0'`
    const executeQuerydeletecourse = await executeQuery(deletecourseQuery);
    if(executeQuerydeletecourse.affectedRows > 0) return res.status(200).json({message : "course Delete Successfully", success : true})
    else return res.status(206).json({message : "Error! Delete courses", success : false})
})

exports.courseList = catchAsyncError(async(req,res) => {
    const { permissions, user } = req 
    const {id,startDate,endDate, month} = await req.query 
      let sortById = ''
    if(id > 0){
        sortById = `&& course.id = ${id}`
    };
  
    let filterByMonth = ``;
    if(month) filterByMonth = ` && Date_Format(course.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View course", status: false });
    let filterByDate = ``  
    if(startDate && endDate ) filterByDate = ` && course.created_at Between '${startDate} 00:00:00' AND '${endDate} 23:59:59'`
    const allcourseQuery = `SELECT course.description,Date_Format(course.created_at, '%d-%m-%y %h:%i:%s %p') as date,team.name as creator,course.name,course.icon, course.banner,course.video_link as videoLink,course.meta_keywords,course.meta_tags,course.meta_description,course.category, course.id from jtc_courses as course Inner Join jtc_courses_type as type On type.id = course.category LEFT JOIN jtc_team as team On team.id = course.created_by and team.deleted_by = '0' WHERE course.deleted_by = '0' ${sortById} ${filterByDate} ${filterByMonth} ORDER By course.id DESC`
    const data = await executeQuery(allcourseQuery);
    if(data.length > 0){
        for (let index = 0; index < data.length; index++) {
            const categories = data[index].category
                   const selectcourseNameQuery = `Select category from jtc_courses_type WHERE id IN (${categories}) `
            const executeQueryApi = await executeQuery(selectcourseNameQuery);
                 if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.category)
           data[index]["category"] = String(values);
            }
        }
 
        return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
    }
   
    if(data.length > 0)return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
    else return res.status(206).json({message : "Error! View courses", success : false})
})
