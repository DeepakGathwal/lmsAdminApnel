const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const bycrypt =  require('bcryptjs');
const { teamSchema, editTeamSchema } = require("../utils/validation");
const { pagination } = require("../utils/pagination");

exports.createTeamMember = catchAsyncError(async(req,res) =>{
  const {email, password, phone, role, name, linkedin, instagram, facebook } = await  req.body

    const { error } = teamSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const {permissions, user} = req 

    if(permissions[0].can_create == 0) return res.status(206).json({message : "Permission Denied to Create New Team Member", status : false});
    const encryptPass = bycrypt.hashSync(password, 8)
    const findAlready = `Select id from jtc_team WHERE email = "${email}"`
    const executeAlreadyAPi = await executeQuery(findAlready);
    if(executeAlreadyAPi.length > 0) return res.status(206).json({message : "Email id Already Exists", success : false})
    const addTeamMember = `Insert into jtc_team SET name = "${name}", email = "${email}", phoneNumber = '${phone}', role = "${role}", password = '${encryptPass}', linkedin = "${linkedin}", instagram = "${instagram}", facebook = "${facebook}"`
    const insertData = await executeQuery(addTeamMember)
    if(insertData.affectedRows > 0) return res.status(200).json({message : "Team Member Added Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})

exports.getTeamMemberLsit = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    const {id} = await req.query

    let searchByRole = ''
      if(id)  searchByRole = `&& team.id = ${id}`
      
    if(permissions[0].can_view == 0) return res.status(206).json({message : "Permission Denied to View Team Members", status : false});
    const viewAllMember = `SELECT team.*, role.role as roleName from jtc_team as team Left Join jtc_roles as role On role.id = team.role and role.deleted_by = '0' WHERE team.deleted_by = '0' ${searchByRole} && team.id != ${user} ORDER By team.id DESC`
    const data = await executeQuery(viewAllMember)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})

exports.updateTeamMember = catchAsyncError(async(req,res) =>{
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const {email, phone, role, name, linkedin, instagram, facebook } =  req.body
    const { error } = editTeamSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const {permissions, user} = req 
    if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Update Team Member", status : false});
    const addTeamMember = `Update jtc_team SET name = ${name}, email = ${email}, phoneNumber = ${phone}, role =  ${role}, linkedin = ${linkedin}, instagram = ${instagram}, facebook = ${facebook} WHERE id = ${id} && deleted_by = '0'`
    const insertData = await executeQuery(addTeamMember)
    if(insertData.affectedRows > 0) return res.status(200).json({message : "Team Member Edit Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})

exports.updatePassword = catchAsyncError(async(req,res) =>{
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const {password} =  req.body
    const {permissions, user} = req 
    if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Update Password of Team Member", status : false});
    const encryptPass = await bycrypt.hashSync(password, 8)
    const updateTeamMemberPassword = `Update jtc_team SET password = "${encryptPass}" WHERE id = ${id} && deleted_by = '0'`
    const updatePass = await executeQuery(updateTeamMemberPassword)
    if(updatePass.affectedRows > 0) return res.status(200).json({message : "Team Member Password edit Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})

exports.deleteTeamMember = catchAsyncError(async(req,res) =>{
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const {permissions, user} = req 
    if(permissions[0].can_delete == 0) return res.status(206).json({message : "Permission Denied to Delete a Team Member", status : false});
    const removeTeamMember = `Update jtc_team SET deleted_by = '${user}', date_deleted = current_timeStamp() WHERE id = ${id} && deleted_by = '0'`
    const deleteData = await executeQuery(removeTeamMember)
    if(deleteData.affectedRows > 0) return res.status(200).json({message : "Team Member Deleted Successfully", success : true })
    else return res.status(206).json({message : "Error! While adding team Member", success : false })
})