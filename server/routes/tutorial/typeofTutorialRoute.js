const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addCategory, Category, editCategory, removeCategory } = require('../../controllers/tutorial/typeofTutorialController');
const { escapeRequestBody } = require('../../conn/db');




/**
 * @openapi
 * components:
 *  schemas:
 *    tutorialCategory: 
 *      type: object
 *      required:
 *        - category 
 *      properties:
 *        category:
 *         type : String
 *         default : chapter
 */


/**
 * @openapi
 * '/jtc/admin/tutorialfiled':
 *  post:
 *    tags: 
 *      - Tutorial Type Type
 *    summary: 
 *      - Add a Tutorial Type Type   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Tutorial Type Type data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCategory"
 *    responses:
 *      200:  
 *       description: Tutorial Type Type Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Tutorial Type Type
 *    summary: List of Tutorial Type Type
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  patch:
 *    tags:
 *      - Tutorial Type Type
 *    summary: Update any specific Tutorial Type Type by id
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : params
 *        name : id
 *        schema:
 *          type : Integer
 *    requestBody: 
 *      description: Tutorial Type Type data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCategory"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Tutorial Type Type
 *    summary: Delete a Tutorial Type Type
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
 *        description: Modules Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */



router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addCategory)
router.route('/').get(verifyUser, verifyModulePermission, Category)
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editCategory)
router.route('/:id').delete(verifyUser, verifyModulePermission,removeCategory)

module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */