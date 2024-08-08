const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const {initializeRedisClient}  = require('../middelwares/redisFile');
const { testimonialsSchema } = require("../utils/validation");




exports.addLinks = catchAsyncError(async(req,res) => {
  
    const {name, nav_link, html, css,explore } = req.body 
    const { error } = testimonialsSchema.validate(req.body);
    if (error)
        return res
            .status(206)
            .json({ status: false, message: error.details[0].message })
      const { permissions, user } = req
   
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Nav Link", status: false });
    const alreadyExists =  `Select id from jtc_website_links WHERE name = ${name} && nav_link = ${nav_link}`
   
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "Page Already Exists"})
    const addNewPoint =  `Insert into jtc_website_links SET explore=${explore},page_css = ${css},page_html = ${html}, name = ${name}, nav_link = ${nav_link}, created_by = ${user}, created_at =  current_timestamp()`
   
    const executeAddPoint = await executeQuery(addNewPoint);
    if(executeAddPoint.affectedRows > 0) return res.status(200).json({message : "Website Link Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During Website Link Added ", success: false}) 
})

exports.editLinks = catchAsyncError(async(req,res) => {
    const {name, nav_link,html,css, explore} = req.body
    const { permissions, user } = req
    const { error } = testimonialsSchema.validate(req.body);
    if (error)
        return res
            .status(206)
            .json({ status: false, message: error.details[0].message })
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Edit", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Point", status: false });
    const alreadyExists =  `Select id from jtc_website_links WHERE name = ${name} && nav_link = ${nav_link}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 1) return res.status(206).json({message : "Point Already Exists"})
    const editNewPoint =  `Update jtc_website_links SET explore=${explore},name = ${name}, nav_link = ${nav_link},page_css = ${css},page_html = ${html}, updated_by = ${user}, updated_at =  current_timestamp() WHERE id = ${id}`
    const executePoint = await executeQuery(editNewPoint);
    if(executePoint.affectedRows > 0) return res.status(200).json({message : "Point Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During Point Edit ", success: false})    
})


exports.links = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = await req.query 
    let getById = ''
    if(id > 0){
        getById = `&& id = ${id}`
    }
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Points", status: false });
    const alreadyExists =  `Select * from jtc_website_links WHERE deleted_by = '0' ${getById} ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
})

exports.removeLinks = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Points", status: false });
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Point Not Found for Delete", success : false})
    const deletexists =  `Update jtc_website_links SET deleted_by = ${user} , deleted_at = current_timestamp() WHERE id = '${id}'`
    const data =  await executeQuery(deletexists)
    if(data.affectedRows > 0) return res.status(200).json({message : "Point Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete Point", success: false})
})


exports.chartApi = catchAsyncError(async(req,res) => {
    const client = await initializeRedisClient()
    const redisdata = await client.get("chart");
    if(!redisdata){
    const api = `
    SELECT 
        months.month,
        COALESCE(course_counts.courses, 0) AS ecommers_course, 
        COALESCE(user_counts.users, 0) AS users, 
        COALESCE(testimonial_counts.testimonials, 0) AS website_course, 
        COALESCE(video_counts.videos, 0) AS videos
    FROM 
        (
            SELECT '2024-01' AS month UNION ALL
            SELECT '2024-02' UNION ALL
            SELECT '2024-03' UNION ALL
            SELECT '2024-04' UNION ALL
            SELECT '2024-05' UNION ALL
            SELECT '2024-06' UNION ALL
            SELECT '2024-07' UNION ALL
            SELECT '2024-08' UNION ALL
            SELECT '2024-09' UNION ALL
            SELECT '2024-10' UNION ALL
            SELECT '2024-11' UNION ALL
            SELECT '2024-12'
        ) AS months
    LEFT JOIN 
        (
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(id) AS courses
            FROM jtc_ecommers_courses
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ) AS course_counts ON months.month = course_counts.month
    LEFT JOIN 
        (
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(id) AS users
            FROM jtc_ecommers_users
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ) AS user_counts ON months.month = user_counts.month
    LEFT JOIN 
        (
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(id) AS testimonials
            FROM jtc_courses
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ) AS testimonial_counts ON months.month = testimonial_counts.month
    LEFT JOIN 
        (
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(id) AS videos
            FROM jtc_ecommers_videos
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ) AS video_counts ON months.month = video_counts.month
    ORDER BY months.month`

    const data =  await executeQuery(api)
    if(data.length > 0){
        const value = await JSON.stringify(data)
        await client.set("chart", value,{
            EX: process.env.REDIS_EXP,   
            NX: true
          });
        return res.status(200).json({data})
        
        }
    else return res.status(206).json({message : "Error! During Fetch Points", success: false})
}else{ 
    const value = await JSON.parse(redisdata)
  
    return res.status(200).json({data : value})
}
})