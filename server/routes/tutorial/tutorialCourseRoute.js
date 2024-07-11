const express= require('express');
const router = express.Router();
const upload = require('../../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addTutorialCource, tutorialCourceList, editTutorialCource, deleteTutorialCource } = require('../../controllers/tutorial/tutorialCoursesController');
const { escapeRequestBody } = require('../../conn/db');



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



router.route('/').post(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,addTutorialCource) // pending
router.route('/').get(verifyUser, verifyModulePermission, tutorialCourceList)  // check
router.route('/').patch(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,editTutorialCource) // check
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteTutorialCource) // check


module.exports = router;