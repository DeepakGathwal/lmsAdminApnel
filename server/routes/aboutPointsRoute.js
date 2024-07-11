const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addPoints, points, editPoints, removepoints } = require('../controllers/aboutPointController');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    About: 
 *      type: object
 *      required:
 *        - point
 *        - description
 *      properties:
 *        point:
 *         type : String
 *         default : java
 *        description:
 *         type : String
 *         default : this is belong to java
 */


/**
 * @openapi
 * '/jtc/admin/about':
 *  post:
 *    tags: 
 *      - About Point
 *    summary: 
 *      - Add about point of any website page or viodeo point about a specific course  
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
 *            $ref: "#/components/schemas/About"
 *    responses:
 *      200:  
 *       description: About Point Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - About Point
 *    summary: List of about point of webPages and courses
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
 *      - About Point
 *    summary: Update any specific about point by id
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
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/About"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - About Point
 *    summary: Delete a About Point
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



router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addPoints)
router.route('/').get(verifyUser, verifyModulePermission, points)
router.route('/:id').patch(verifyUser, verifyModulePermission, escapeRequestBody,editPoints)
router.route('/:id').delete(verifyUser, verifyModulePermission,removepoints)

module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */