const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const {getDataUri} = require('../utils/imageHandeler');
const { companySchema } = require("../utils/validation");



exports.addCompany = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Company", status: false });
    const {name, link} = req.body
    const { error } = companySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const already = `Select id from jtc_companies WHERE name = ${name} && link = ${link} && deleted_by = '0'`
    const executeAlready = await executeQuery(already)
    if(executeAlready.length > 0) return res.status(206).json({message : "Comapny Name Already Exists", success : false})
    if(!req.file) return res.status(206).json({message : "Icon Not Found", success : false})
      
        const image = req.file
        const fileImage = await getDataUri(image)
      
       const iconWIthBanner = `, icon = '${fileImage}'`
    
    const addCompanyQuery = `Insert into jtc_companies SET name = ${name}, link = ${link} ${iconWIthBanner}, created_by = '${user}'`
    const executeQueryAddCompany = await executeQuery(addCompanyQuery);
    if(executeQueryAddCompany.affectedRows > 0) return res.status(200).json({message : "Company Added Successfully", success : true})
    else return res.status(206).json({message : "Error! Adding Company", success : true})
})

exports.editCompany = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = req.params
    if(!id)  return res.status(200).json({message : "Comapny not found", success : false})

    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Company", status: false });
    const {name, link} = req.body 
    const { error } = companySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    let iconWIthBanner = '';
    if(req.file) {
    const filename = req.file 
    const fileImage = await getDataUri(filename)
     iconWIthBanner = `, icon = '${fileImage}'`
}
    const editCompanyQuery = `Update jtc_companies SET name = ${name},link = ${link} ${iconWIthBanner} WHERE id = ${id} && deleted_by = '0'`
    const executeQueryeditCompany = await executeQuery(editCompanyQuery);
    if(executeQueryeditCompany.affectedRows > 0) return res.status(200).json({message : "Company Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! Update Company", success : false})
})

exports.deleteCompany = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {id} = req.params 
    if(!id)  return res.status(200).json({message : "Comapny not found", success : false})

    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Edit Company", status: false });
   
    const deleteCourceQuery = `Update jtc_companies SET  deleted_by = ${user},deleted_at = current_timestamp() WHERE id = ${id} && deleted_by = '0'`
    const executeQuerydeleteCource = await executeQuery(deleteCourceQuery);
    if(executeQuerydeleteCource.affectedRows > 0) return res.status(200).json({message : "Company Delete Successfully", success : true})
    else return res.status(206).json({message : "Error! Delete Company", success : false})
})

exports.companyList = catchAsyncError(async(req,res) => {
    const { permissions, user } = req 
    const {id} = req.query 
 
    let sortById = ''
    if(id){
        sortById = `&& company.id = ${id}`
    }
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Company", status: false });
    const deleteCourceQuery = `SELECT company.*, team.name as creator from jtc_companies as company Inner JOIN jtc_team as team On team.id = company.created_by and team.deleted_by = '0' WHERE company.deleted_by = '0'  ${sortById} ORDER By company.id DESC`
    const data = await executeQuery(deleteCourceQuery);
    if(data.length > 0)return pagination(req, res, data)
    else return res.status(206).json({message : "Error! View Company", success : false})
})
