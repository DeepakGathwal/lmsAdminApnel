const express= require('express');
const router = express.Router();
const upload = require('../../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addCourse, editCourse, deleteCourse, courseList, changeCourseBanner } = require('../../controllers/courseController');
const { escapeRequestBody } = require('../../conn/db');



/**
 * @openapi
 * components:
 *  schemas:
 *    Course: 
 *      type: object
 *      required:
 *        - name
 *        - category
 *        - videoLink
 *        - description
 *      properties:
 *        name:
 *         type : String
 *         default : course Name
 *        category:
 *         type : String
 *         default : course Type
 *        videoLink:
 *         type : String
 *         default : course Video
 *        description:
 *         type : String
 *         default : course Description
 *        meta_tags:
 *         type : String
 *         default : course Meta Tags
 *        meta_keywords:
 *         type : String
 *         default : course Meta Keywords
 *        meta_description:
 *         type : String
 *         default : course Meta description
 */


/**
 * @openapi
 * '/jtc/admin/cource':
 *  post:
 *    tags: 
 *      - Course
 *    summary: 
 *      - Add a Course   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Course data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Course"
 *    responses:
 *      200:  
 *       description: Course Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Course
 *    summary: List of Course
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
 *      - Course
 *    summary: Update any specific Course by id
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
 *      description: Course data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Course"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Course
 *    summary: Delete a Course
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





router.route('/').post(verifyUser, verifyModulePermission,upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),escapeRequestBody,addCourse) // pending
router.route('/').get(verifyUser, verifyModulePermission, courseList)  // check
router.route('/').patch(verifyUser, verifyModulePermission,upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),escapeRequestBody,editCourse) // check
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteCourse) // check


module.exports = router;