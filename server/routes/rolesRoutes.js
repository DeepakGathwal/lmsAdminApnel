const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { createRole, allRoles, editRole, deleteRole, vaccencyStatus } = require('../controllers/rolesController');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    Roles: 
 *      type: object
 *      required:
 *        - role
 *      properties:
 *        role:
 *         type : String
 *         default : Aadmin
 */


/**
 * @openapi
 * '/jtc/admin/role':
 *  post:
 *    tags: 
 *      - Roles
 *    summary: 
 *      - Add a new Role
 *    requestBody: 
 *      description: Adding Role
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Roles"
 *    responses:
 *      200:  
 *       description: Role Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  get:
 *    tags:
 *      - Roles
 *    summary: List of all Roles if user have permission to view roles
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: All Roles
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  patch:
 *    tags:
 *      - Roles
 *    summary: Edit a role by Id
 *    parameters: 
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Role Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  put:
 *    tags:
 *      - Roles
 *    summary: Active Vacciency on a role
 *    parameters: 
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Role Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Roles
 *    summary: Delete a Role
 *    parameters: 
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Role Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */


router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,createRole) // Check
router.route('/').get(verifyUser, verifyModulePermission, allRoles) // Check
router.route('/:id').put(verifyUser, verifyModulePermission, vaccencyStatus) // Check
router.route('/').patch(verifyUser, verifyModulePermission,escapeRequestBody,editRole) //Check
router.route('/').delete(verifyUser, verifyModulePermission,deleteRole) // Check



module.exports = router;