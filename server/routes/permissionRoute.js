const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { allPermissions, updatePermission, pendingNotification, redingNotification } = require('../controllers/permissionController');


/**
 * @openapi
 * components:
 *  schemas:
 *    Permission: 
 *      type: object
 *      required:
 *        - permissions
 *      properties:
 *        permissions:
 *         type : Object
 *         default : Object Type
 */


/**
 * @openapi
 * '/jtc/admin/permission':
 *  post:
 *    tags: 
 *      - Permission
 *    summary: 
 *      - If User Have Permissio to execute the roles routes 
 *    parameters:
 *      - in : query
 *        name: role
 *        schema : 
 *          type: Integer
 *      - in : query
 *        name: module
 *        schema : 
 *          type: Integer
 *    requestBody: 
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Permission"
 *    responses:
 *      200:  
 *       description: Permission Update Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  patch:
 *    tags:
 *      - Read Notification
 *    summary: Remove Read Notifications from queue
 *    parameters:
 *      - in : query
 *        name: module
 *        schema : 
 *          type: String
 *    responses:
 *      200:  
 *        description: Notification
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  put:
 *    tags:
 *      - Pending Notification
 *    summary: List of all Pending Notifications
 *    parameters:
 *      - in : query
 *        name: module
 *        schema : 
 *          type: String
 *    responses:
 *      200:  
 *        description: Pending Notifications
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  get:
 *    tags:
 *      - Permission
 *    summary: List of all Roles if user have permission to view roles
 *    parameters:
 *      - in : query
 *        name: role
 *        schema : 
 *          type: Integer
 *      - in : query
 *        name: module
 *        schema : 
 *          type: Integer
 *    responses:
 *      200:  
 *        description: Permissions
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */



router.route('/').post(verifyUser, verifyModulePermission,updatePermission) // Check By Front End
router.route('/').get(verifyUser, verifyModulePermission, allPermissions) // Check
router.route('/').put(verifyUser, verifyModulePermission, pendingNotification) // Check
router.route('/').patch(verifyUser, verifyModulePermission, redingNotification) // Check






module.exports = router;