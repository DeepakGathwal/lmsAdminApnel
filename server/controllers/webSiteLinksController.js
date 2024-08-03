const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");



exports.addLinks = catchAsyncError(async(req,res) => {
  
    const {name, nav_link, html, css,explore } = req.body 
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