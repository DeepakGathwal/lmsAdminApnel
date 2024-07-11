const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addTerms, termsAndCondition, editTerms, removeTerms } = require('../controllers/termsAndConditionController');
const { escapeRequestBody } = require('../conn/db');

/**
 * @openapi
 * components:
 *  schemas:
 *    termsAndCondition: 
 *      type: object
 *      required:
 *        - page 
 *        - description 
 *      properties:
 *        page:
 *         type : String
 *         default : Terms And Condition
 *        description:
 *         type : String
 *         default : Terms And Condition
 */


/**
 * @openapi
 * '/jtc/admin/tnc':
 *  post:
 *    tags: 
 *      - Terms And Condition
 *    summary: 
 *      - Add a Terms And Condition   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Terms And Condition data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/termsAndCondition"
 *    responses:
 *      200:  
 *       description: Terms And Condition Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Terms And Condition
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
 *      - Terms And Condition
 *    summary: Update any specific Terms And Condition by id
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
 *      description: Terms And Condition data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/termsAndCondition"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Terms And Condition
 *    summary: Delete a Terms And Condition
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





router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addTerms)
router.route('/').get(verifyUser, verifyModulePermission, termsAndCondition)
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editTerms)
router.route('/:id').delete(verifyUser, verifyModulePermission,removeTerms)

module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */