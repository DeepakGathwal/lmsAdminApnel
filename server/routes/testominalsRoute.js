const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { createTestominal, getTestominalLsit, updateTestominal, deleteTestominal } = require('../controllers/testimonialController');
const upload = require('../middelwares/imageUpload');
const { escapeRequestBody } = require('../conn/db');

/**
 * @openapi
 * components:
 *  schemas:
 *    Testominal: 
 *      type: object
 *      required:
 *        - name 
 *        - description 
 *        - link 
 *        - img 
 *      properties:
 *        name:
 *         type : String
 *         default : Testominal
 *        link:
 *         type : String
 *         default : www.comapny.com
 *        img:
 *         type : String
 *         default : Testominal.gpj
 *        description:
 *         type : String
 *         default : Testominal.gpj
 */


/**
 * @openapi
 * '/jtc/admin/testominal':
 *  post:
 *    tags: 
 *      - Testominal
 *    summary: 
 *      - Add a Testominal   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Testominal data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Testominal"
 *    responses:
 *      200:  
 *       description: Testominal Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Testominal
 *    summary: List of Comapny
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
 *      - Testominal
 *    summary: Update any specific Testominal by id
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
 *      description: Testominal data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Testominal"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Testominal
 *    summary: Delete a Testominal
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




router.route('/').post(verifyUser, verifyModulePermission, upload.single('img'),escapeRequestBody,createTestominal) // Check
router.route('/').get(verifyUser, verifyModulePermission, getTestominalLsit) // Check
router.route('/:id').patch(verifyUser, verifyModulePermission, upload.single('img'),escapeRequestBody,updateTestominal) //Check
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteTestominal) // Check




module.exports = router;