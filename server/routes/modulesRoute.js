const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { createModule, allModules, editModule, deleteModule, changeIcon } = require('../controllers/modulesController');
const upload = require('../middelwares/imageUpload');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    Modules: 
 *      type: object
 *      required:
 *        - module
 *      properties:
 *        module:
 *         type : String
 *         default : /team
 */


/**
 * @openapi
 * '/jtc/admin/module':
 *  post:
 *    tags: 
 *      - Modules
 *    summary: 
 *      - If User Have Permissio to execute the Modules routes 
 *    requestBody: 
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Modules"
 *    responses:
 *      200:  
 *       description: Modules Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  get:
 *    tags:
 *      - Modules
 *    summary: List of all Modules if user have permission to view Modules
 *    responses:
 *      200:  
 *        description: User Logout Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  patch:
 *    tags:
 *      - Modules
 *    summary: Edit a Modules which have alreay exists
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
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Modules
 *    summary: Delete a Modules
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Modules Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */



/**
 * @openapi
 * '/jtc/admin/module/image':
 *  patch:
 *    tags:
 *      - Modules
 *    summary: Edit a Modules Image
 *    parameters: 
 *      - in : params
 *        name : id
 *        schema:
 *          type : Integer
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Modules Image Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call
 */


router.route('/').post(verifyUser, verifyModulePermission,upload.single('img'),escapeRequestBody,createModule) // Check
router.route('/').get(verifyUser, verifyModulePermission, allModules) // Check
router.route('/').patch(verifyUser, verifyModulePermission,escapeRequestBody,editModule) // Check
router.route('/').delete(verifyUser, verifyModulePermission,deleteModule) // Check
router.route('/image/:id').patch(verifyUser, verifyModulePermission,upload.single('img'),changeIcon) // Check




module.exports = router;