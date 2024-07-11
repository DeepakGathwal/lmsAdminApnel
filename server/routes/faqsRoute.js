const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { escapeRequestBody } = require('../conn/db');
const { addFaqs, faqs, editFaqs, removeFaqs, allFaqsPoints } = require('../controllers/faqsController');



/**
 * @openapi
 * components:
 *  schemas:
 *    FAQS: 
 *      type: object
 *      required:
 *        - point
 *        - description
 *        - about
 *      properties:
 *        point:
 *         type : String
 *         default : java
 *        description:
 *         type : String
 *         default : this is belong to java
 *        about:
 *         type : String
 *         default : point about
 */


/**
 * @openapi
 * '/jtc/admin/faqs':
 *  post:
 *    tags: 
 *      - FAQS
 *    summary: 
 *      - Add FAQS of any website page 
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
 *       description: FAQS Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - FAQS
 *    summary: List of FAQS of webPages and courses
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
 *      - FAQS
 *    summary: Update any specific FAQS by id
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
 *      - FAQS
 *    summary: Delete a FAQS
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

router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addFaqs)
router.route('/').get(verifyUser, verifyModulePermission, faqs)
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editFaqs)
router.route('/:id').delete(verifyUser, verifyModulePermission,removeFaqs)

/**
 * @openapi
 * '/jtc/admin/faqs/points': 
 *  get:
 *    tags:
 *      - FAQS
 *    summary: List of FAQS point for filter
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
*/

router.route('/points').get(verifyUser, verifyModulePermission, allFaqsPoints)



module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */