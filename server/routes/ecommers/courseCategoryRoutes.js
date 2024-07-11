const express= require('express');
const router = express.Router();
const upload = require('../../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addCourseType, courseType, editCourseType, removeCourseType, addCourseLabel, courceLabel, editCourseLabel, deletecourceLabel } = require('../../controllers/ecommers/courseCategoryController');
const { escapeRequestBody } = require('../../conn/db');






/**
 * @openapi
 * components:
 *  schemas:
 *    tutorialCourseType: 
 *      type: object
 *      required:
 *        - CourseType 
 *      properties:
 *        CourseType:
 *         type : String
 *         default : chapter
 */


/**
 * @openapi
 * '/jtc/admin/courcefiled':
 *  post:
 *    tags: 
 *      - Course Type
 *    summary: 
 *      - Add a Course Type   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Course Type data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCourseType"
 *    responses:
 *      200:  
 *       description: Course Type Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Course Type
 *    summary: List of Course Type
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
 *      - Course Type
 *    summary: Update any specific Course Type by id
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
 *      description: Course Type data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCourseType"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Course Type
 *    summary: Delete a Course Type
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




router.route('/').post(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,addCourseType)
router.route('/').get(verifyUser, verifyModulePermission, courseType)
router.route('/:id').patch(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,editCourseType)
router.route('/:id').delete(verifyUser, verifyModulePermission,removeCourseType)
router.route('/label').post(verifyUser, verifyModulePermission,escapeRequestBody,addCourseLabel)
router.route('/label').get(verifyUser, verifyModulePermission, courceLabel)
router.route('/label/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editCourseLabel)
router.route('/label/:id').delete(verifyUser, verifyModulePermission,deletecourceLabel)

module.exports = router;