const express= require('express');
const router = express.Router();
const { getStudentsDetails } = require('../controllers/studentController');
const { verifyModulePermission, verifyUser } = require('../middelwares/token');


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
 *      - If User Have Permissio to execute the roles routes 
 *    requestBody: 
 *      description: User data
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
 *    responses:
 *      200:  
 *        description: User Logout Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  patch:
 *    tags:
 *      - Roles
 *    summary: Edit a role which have alreay exists
 *    parameters: 
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
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
 *    responses:
 *      200:  
 *        description: Role Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */


router.route('/').get(verifyUser, verifyModulePermission ,getStudentsDetails) // Check



module.exports = router;