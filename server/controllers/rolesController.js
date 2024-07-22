const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { roleSchema, categorySchema } = require("../utils/validation");

exports.createRole = catchAsyncError(async(req,res) =>{
    const {role} = await req.body
    const { error } = roleSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const {permissions, user} = req 
    if(permissions[0].can_create == 0) return res.status(206).json({message : "Permission Denied to Create New Role", status : false});
    const alredyQuery = `Select id from jtc_roles where role = ${role}  && deleted_by = '0'`
    const alredyRole = await executeQuery(alredyQuery)
    if(alredyRole.length > 0) return res.status(206).json({message : "Role Already Exists", success : false});
    const addRolequery = `Insert into jtc_roles SET role = ${role}, created_by = ${user}`
    const addRole = await executeQuery(addRolequery);
    if(addRole.affectedRows > 0) {
        const alredyQuery = `Select id from jtc_modules WHERE deleted_by = '0'`
        const runQueryAllModule = await executeQuery(alredyQuery);
        if (runQueryAllModule.length > 0) {
            runQueryAllModule.map((el) => {
                const addNewPermissions = `Insert into jtc_permissions SET module_id = ${el.id}, can_view = '0', can_create = '0', can_delete = '0', can_edit = '0', role_id =  (SELECT id from jtc_roles WHERE role = ${role} && deleted_by = '0')`
                const executeAddPermissionQuery = executeQuery(addNewPermissions);
                if (executeAddPermissionQuery.affectedRows == 0) return res.status(200).json({ message: "New Module Permission Error", success: false })
            })
            return res.status(200).json({message : "Role Added Successfully", success : true})
        } else
        return res.status(200).json({message : "Role Added Successfully", success : true})
    }
    else return res.status(206).json({message : "Error! While Adding a new Role", success : false})
})

exports.allRoles = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if(permissions[0].can_view == 0) return res.status(206).json({message : "Permission Denied View Role List", success : false});
    const {id} = await req.query 
    
    let searchById = ''
    if(id) searchById = `&& id = ${id}`
    const alredyQuery = `Select id, role, vacancy from jtc_roles WHERE deleted_by = '0' ${searchById} ORDER By id DESC`
    const data = await executeQuery(alredyQuery) 
   
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting List Of Roles", success : false})
})

exports.editRole = catchAsyncError(async(req,res) =>{
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const {permissions, user} = await req 
    const { error } = roleSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
        if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Create New Role", status : false});
        const {role} =await req.body
    const alredyQuery = `Select id from jtc_roles where role = ${role} && deleted_by = '0'`
    const alredyRole = await executeQuery(alredyQuery)
    if(alredyRole.length > 0) return res.status(206).json({message : "Role Name Already Exists", success : false})
    const addRolequery = `Update jtc_roles SET role = ${role}, updated_by = ${user}, updated_at = current_timestamp() where id = '${id}' && deleted_by = '0'`
    const addRole = await executeQuery(addRolequery);
    if(addRole.affectedRows > 0) return res.status(200).json({message : "Role Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! While Edit a Role", success : false})
})

exports.deleteRole = catchAsyncError(async(req,res) =>{
    const {id} = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

   const {permissions, user} = req 
   if(permissions[0].can_delete == 0) return res.status(206).json({message : "Permission Denied to Create New Role", status : false});
    const deleteRolequery = `Update jtc_roles SET  deleted_by = ${user},deleted_at = current_timestamp() where id = '${id}' && deleted_by = '0'`
    const deleteRole = await executeQuery(deleteRolequery);
   if(deleteRole.affectedRows > 0){
        const deletePermissionOfModule = `Update jtc_permissions SET active = '0' WHERE role_id = '${id}'`
        const deleteModulePermission = await executeQuery(deletePermissionOfModule)
        if (deleteModulePermission.affectedRows > 0)
        return res.status(200).json({message : "Role Deleted Successfully", success : true})
         
        else return res.status(206).json({ message: "Permission Not deleted", success: true })
    }
    else return res.status(206).json({message : "Error! While Deleting a new Role", success : false})
})

exports.vaccencyStatus = catchAsyncError(async(req,res) => {
    const {id} = req.params
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })
    const {permissions, user} = req 
    if(permissions[0].can_edit == 0) return res.status(206).json({message : "Permission Denied to Vaccencie Status Changed", status : false});
  const vacency = `Update jtc_roles SET vacancy = (CASE WHEN vacancy = '1' THEN 0 ELSE 1 END) WHERE id = ${id} `
  const vacencyQuery = await executeQuery(vacency)
        if (vacencyQuery.affectedRows > 0)
        return res.status(200).json({message : "Vaccencie Status Changed", success : true})
         
        else return res.status(206).json({ message: "Permission Not deleted", success: true })
})