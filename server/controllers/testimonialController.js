const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const mysql = require('mysql')
const { pagination } = require("../utils/pagination");
const {getDataUri} = require('../utils/imageHandeler')

exports.createTestominal = catchAsyncError(async(req,res) =>{
    const {name, description, link } =  req.body
    const {permissions, user} = req 
    if(permissions[0].can_create == 0) return res.status(206).json({message : "Permission Denied to Create New Testominals ", status : false});
    const alreadyExists = `Select * from jtc_testimonials WHERE name = ${name}  && deleted_by = '0'`
    const executeAlreadyExecute = await executeQuery(alreadyExists)
    if(executeAlreadyExecute.length > 0) return res.status(200).json({message : "Testiomonils Already Exists", success : false})
    let image = ''
    if(req.file){
        const file = req.file
        const fileUri = await getDataUri(file)
        image =  `, image = '${fileUri}'`
    }
    const addTestominal = `Insert into jtc_testimonials SET name = ${name}, description = ${description}, read_link = ${link} ${image}, created_by = '${user}'`
    const insertData = await executeQuery(addTestominal)
    if(insertData.affectedRows > 0) return res.status(200).json({message : "Testominal  Added Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding Testominal ", success : false })
})

exports.getTestominalLsit = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    if(permissions[0].can_view == 0) return res.status(206).json({message : "Permission Denied to View Testominals", status : false});
    const {id} = await req.query
    let searchById = ''
        if(id)  searchById = `&& test.id = ${id}`
    const viewAll = `SELECT test.id,test.name,test.description,test.read_link,test.image, team.name as creator from jtc_testimonials as test LEFT JOIN jtc_team as team On team.id = test.created_by and team.deleted_by = '0' WHERE test.deleted_by = '0' ${searchById} ORDER By test.id DESC`
    const data = await executeQuery(viewAll)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While adding Testominal ", success : false })
})

exports.updateTestominal = catchAsyncError(async(req,res) =>{
    const {name, description, link } =  req.body
    const {permissions, user} = req 
    const {id} = req.params
    if(!id)  return res.status(200).json({message : "Testominal Not Found for Edit", success : false})

    if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Create New Testominals ", status : false});
    const alreadyExists = `Select * from jtc_testimonials WHERE name = ${name} && deleted_by = '0'`
    const executeAlreadyExecute = await executeQuery(alreadyExists)
    if(executeAlreadyExecute.length > 1) return res.status(200).json({message : "Testiomonils Already Exists", success : false})
    let image = ''
    if(req.file){
        const file = req.file
        const fileUri = await getDataUri(file)
        image =  `, image = '${fileUri}'`
    }
    const addTestominal = `Update  jtc_testimonials SET name = ${name}, description = ${description}, read_link = ${link}  ${image} WHERE id = ${id}`
   
    const insertData = await executeQuery(addTestominal)
    if(insertData.affectedRows > 0) return res.status(200).json({message : "Testominal  Added Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding Testominal ", success : false })
})



exports.deleteTestominal = catchAsyncError(async(req,res) =>{
    const {id} = req.params
    if(!id)  return res.status(200).json({message : "Testominal Not Found for Edit", success : false})
    const {permissions, user} = req 
    if(permissions[0].can_delete == 0) return res.status(206).json({message : "Permission Denied to Delete a Testominal ", status : false});
    const removeTestominal = `Update jtc_testimonials SET deleted_by = '${user}', deleted_at = current_timeStamp() WHERE id = ${id} && deleted_by = '0'`
    const deleteData = await executeQuery(removeTestominal)
    if(deleteData.affectedRows > 0) return res.status(200).json({message : "Testominal  Deleted Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding Testominal ", success : false })
})