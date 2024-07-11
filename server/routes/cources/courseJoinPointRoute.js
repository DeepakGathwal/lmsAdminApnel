const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { escapeRequestBody } = require('../../conn/db');
const { addPoint, getPoint, editPoint, deletePoint } = require('../../controllers/cources/courseJoinPointController');
const upload = require('../../middelwares/imageUpload');

// course, description


/**
 * @openapi
 * components:
 *  schemas:
 *    CourseJoin: 
 *      type: object
 *      required:
 *        - course
 *        - description
 *        - icon
 *      properties:
 *        course:
 *         type : String
 *         default : java
 *        description:
 *         type : String
 *         default : this is belong to java
 *        icon:
 *         type : String
 *         default : icon.jpg
 */


/**
 * @openapi
 * '/jtc/admin/coursePoint':
 *  post:
 *    tags: 
 *      - Course Join Point
 *    summary: 
 *      - Add Course Join point  course  
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseJoin"
 *    responses:
 *      200:  
 *       description: Course Join Point Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Course Join Point
 *    summary: List of Course Join Point of any course
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
 *      - Course Join Point
 *    summary: Update any specific Course Join Point by id
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
 *      description: Joi  Point data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseJoin"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Course Join Point
 *    summary: Delete a Course Join Point
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




router.route('/').post(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,addPoint)
router.route('/').get(verifyUser, verifyModulePermission, getPoint)
router.route('/:id').patch(verifyUser, verifyModulePermission,upload.single('icon'),escapeRequestBody,editPoint)
router.route('/:id').delete(verifyUser, verifyModulePermission,deletePoint)


module.exports = router;