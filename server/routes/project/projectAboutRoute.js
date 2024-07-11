const express= require('express');
const router = express.Router();
const upload = require('../../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { escapeRequestBody } = require('../../conn/db');
const { addLanguage, allLanguage, editLanguage, deleteLanguage, addtech, alltech, edittech, deletetech } = require('../../controllers/project/projectAboutController');



/**
 * @openapi
 * components:
 *  schemas:
 *    tutorialCourse: 
 *      type: object
 *      required:
 *        - name
 *        - category
 *      properties:
 *        name:
 *         type : String
 *         default : Tutorial Course Name
 *        category:
 *         type : String
 *         default : Tutorial Course Type
 *        meta_tags:
 *         type : String
 *         default : Tutorial Course Meta Tags
 *        meta_keywords:
 *         type : String
 *         default : Tutorial Course Meta Keywords
 *        meta_description:
 *         type : String
 *         default : Tutorial Course Meta description
 */


/**
 * @openapi
 * '/jtc/admin/tutorialCource':
 *  post:
 *    tags: 
 *      - Tutorial Course
 *    summary: 
 *      - Add a Tutorial Course   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Tutorial Course data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCourse"
 *    responses:
 *      200:  
 *       description: Tutorial Course Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Tutorial Course
 *    summary: List of Tutorial Course
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
 *      - Tutorial Course
 *    summary: Update any specific Tutorial Course by id
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
 *    requestBody: 
 *      description: Tutorial Course data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCourse"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Tutorial Course
 *    summary: Delete a Tutorial Course
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



router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addLanguage) // pending
router.route('/').get(verifyUser, verifyModulePermission, allLanguage)  // check
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editLanguage) // check
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteLanguage) // check



router.route('/tech/').post(verifyUser, verifyModulePermission,escapeRequestBody,addtech) // pending
router.route('/tech/').get(verifyUser, verifyModulePermission, alltech)  // check
router.route('/tech/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,edittech) // check
router.route('/tech/:id').delete(verifyUser, verifyModulePermission,deletetech) // check





module.exports = router;