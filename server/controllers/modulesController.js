const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { moduleSchema } = require("../utils/validation");
const { getDataUri } = require("../utils/imageHandeler");

exports.createModule = catchAsyncError(async (req, res) => {
    const { modules, name } = await req.body 
    const { error } = moduleSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const { permissions, user } = req

    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New modules", status: false });
    let addIcon = '';
    if(req.file){
        const image = req.file
        const fileImage = image && await getDataUri(image)
        
        addIcon = `, icon = '${fileImage}'`
    }
    const alredyQuery = `Select id from jtc_modules where modules = ${modules} && deleted_by = '0' && name = ${name}`
    const alredyModule = await executeQuery(alredyQuery)
    if (alredyModule.length > 0) return res.status(206).json({ message: "modules Already Exists", success: false });
    const addModulequery = `Insert into jtc_modules SET modules = ${modules}, name = ${name} ${addIcon},  created_by = ${user}`
    const addModule = await executeQuery(addModulequery);
    if (addModule.affectedRows > 0) {
        const alredyQuery = `Select id from jtc_roles WHERE deleted_by = '0'`
        const runQueryAllRoles = await executeQuery(alredyQuery);
        if (runQueryAllRoles.length > 0) {
            runQueryAllRoles.map((el) => {
                const addNewPermissions = `Insert into jtc_permissions SET role_id = ${el.id}, can_view = '1', can_create = '1', can_delete = '1', can_edit = '1', module_id = (SELECT  id from jtc_modules WHERE modules = ${modules})`
                const executeAddPermissionQuery = executeQuery(addNewPermissions);
                if (executeAddPermissionQuery.affectedRows == 0) return res.status(200).json({ message: "New Module Permission Error", success: false })
            })
            return res.status(200).json({ message: "modules Added Successfully", success: true });
        } else
            return res.status(200).json({ message: "modules Added Successfully", success: true });
    } else
        return res.status(206).json({ message: "Error! While Adding a new modules", success: false })
})

exports.allModules = catchAsyncError(async (req, res) => {
    const { permissions } = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied View modules List", success: false });
    const alredyQuery = `Select modules, id, name, icon from jtc_modules WHERE deleted_by = '0' ORDER By id DESC`
    const data = await executeQuery(alredyQuery)
    if (data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({ message: "Error! While Getting List Of Roles", success: false })
})

exports.editModule = catchAsyncError(async (req, res) => {
    const { id } = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const { modules, name } = await req.body
    const { error } = moduleSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create New modules", status: false });
    const alredyQuery = `Select id from jtc_modules where modules = ${modules} && name = ${name} && deleted_by = '0'`
    const alredyModule = await executeQuery(alredyQuery)
    if (alredyModule.length > 1) return res.status(206).json({ message: "modules Name Already Exists", success: false })
    const addModulequery = `Update jtc_modules SET modules = ${modules},name = ${name}, updated_by = ${user}, updated_at = current_timestamp() where id = '${id}' && deleted_by = '0'`
    const addModule = await executeQuery(addModulequery);
    if (addModule.affectedRows > 0) return res.status(200).json({ message: "modules Edit Successfully", success: true })
    else return res.status(206).json({ message: "Error! While Edit a modules", success: false })
})

exports.deleteModule = catchAsyncError(async (req, res) => {
    const { id } = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Create New modules", status: false });
    const deleteModulequery = `Update jtc_modules SET deleted_by = ${user},deleted_at = current_timestamp() where id = '${id}' && deleted_by = '0'`
    const deModuleRole = await executeQuery(deleteModulequery);
    if (deModuleRole.affectedRows > 0) {
        const deletePermissionOfModule = `Update jtc_permissions SET active = '0' WHERE module_id = '${id}'`
        const deleteModulePermission = await executeQuery(deletePermissionOfModule)
        if (deleteModulePermission.affectedRows > 0)
            return res.status(200).json({ message: "modules Deleted Successfully", success: true })
        else return res.status(206).json({ message: "Permission Not deleted", success: true })
    }
    else return res.status(206).json({ message: "Error! While Deleting a new modules", success: false })
})

exports.changeIcon = catchAsyncError(async (req,res) => {
     const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create New modules", status: false });
  const {id} = req.params
  if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    let addIcon = '';
    if(req.file){
        const image = req.file
        const fileImage = image && await getDataUri(image)
        addIcon = `icon = '${fileImage}'`
    }else return res.status(206).json({ message: "Image Not Found", status: false });
    const addModulequery = `Update jtc_modules SET ${addIcon}, updated_by = ${user}, updated_at = current_timestamp() where id = '${id}' && deleted_by = '0'`
    const addModule = await executeQuery(addModulequery);
    if (addModule.affectedRows > 0) return res.status(200).json({ message: "modules Image Updated Successfully", success: true })
    else return res.status(206).json({ message: "Error! While Edit a modules", success: false })

})