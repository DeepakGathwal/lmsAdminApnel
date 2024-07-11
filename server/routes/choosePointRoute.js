const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addPoints, points, editPoints, removepoints } = require('../controllers/choosingPoint');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    WhyChoosePoint: 
 *      type: object
 *      required:
 *        - point
 *      properties:
 *        point:
 *         type : String
 *         default : java
 */


/**
 * @openapi
 * '/jtc/admin/point':
 *  post:
 *    tags: 
 *      - Choose Point
 *    summary: 
 *      - Add choose point of any website page 
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
 *            $ref: "#/components/schemas/WhyChoosePoint"
 *    responses:
 *      200:  
 *       description: choose Point Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Choose Point
 *    summary: List of choose point of webPages and courses
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
 *      - Choose Point
 *    summary: Update any specific choose point by id
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
 *            $ref: "#/components/schemas/WhyChoosePoint"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Choose Point
 *    summary: Delete a choose Point
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
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editPoints)
router.route('/:id').delete(verifyUser, verifyModulePermission,removepoints)

module.exports = router;
