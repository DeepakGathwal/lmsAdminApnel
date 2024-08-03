const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");


exports.allPermissions = catchAsyncError(async(req,res) =>{
    const { permissions } = req 
    const {module,role } = await req.query 
    let sortByRole = ''
    if(role){
        sortByRole = `&& permission.role_id = (SELECT id from jtc_roles WHERE role = '${role}')`
    }
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied View Permissions List", success: false });
    const getPermission = `Select module.name as module,role.role as role,permission.id as permissionId,permission.can_view, permission.can_edit,permission.can_delete, permission.can_create from jtc_permissions as permission Left Join jtc_roles as role On role.id = permission.role_id AND role.deleted_by = '0' Left Join jtc_modules as module On module.id = permission.module_id AND module.deleted_by = '0' WHERE permission.active = '1' ${sortByRole} ORDER By permission.id DESC`
    const data =  await executeQuery(getPermission);
    if(data.length > 0) return  res.status(200).json({data, success : true});
    else return res.status(206).json({message : "Error! while getting Permissions", success : false});
})

exports.updatePermission = catchAsyncError(async(req,res) => {
    const { permissions } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Permission List", success: false });
    const {permission} =await req.body
 
    if(permission.length > 0){
      await permission.map(async(el) => {
            const updatePermissionQuery = `Update jtc_permissions SET can_view = '${el.can_view}', can_edit = '${el.can_edit}', can_delete = '${el.can_delete}', can_create = '${el.can_create}' WHERE id = '${el.permissionId}'`
            const executeUpdatePermissionquery = await executeQuery(updatePermissionQuery)
            if (executeUpdatePermissionquery.affectedRows == 0) return res.status(206).json({ message: "Permission Update Error", success: false })
        })
        return res.status(200).json({message : "Permission Updated Successfully", success : true})
    }else  return res.status(206).json({message : "Permission Updated Failed", success : false})

})

exports.pendingNotification = catchAsyncError(async(req,res) => {
    const slectNewNotification = `Select Count(enquiry) as total from jtc_enquiry_form WHERE enquiry = '0'`;
    const data = await executeQuery(slectNewNotification);
    if(data.length > 0) return  res.status(200).json({data, success : true});
    else return res.status(206).json({message : "Error! while getting Permissions", success : false});
})

exports.redingNotification = catchAsyncError(async(req,res) => {
    const slectNewNotification = `Update jtc_enquiry_form SET enquiry = '1'  WHERE enquiry = '0'`;
    const callQuery = await executeQuery(slectNewNotification);
    if(callQuery.affectedRows > 0) return  res.status(200).json({message : "Done", success : true});
    else return res.status(206).json({message : "Error! while getting Permissions", success : false});
})