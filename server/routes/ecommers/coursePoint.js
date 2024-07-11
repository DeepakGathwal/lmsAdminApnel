const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addLearn, learn, editLearn, removeLearn, addPrerequisite, prerequisite, editPrerequisite, removePrerequisite, usersPayments, allUsers } = require('../../controllers/ecommers/coursePoint');
const { escapeRequestBody } = require('../../conn/db');



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


router.route('/learn/').post(verifyUser,verifyModulePermission,escapeRequestBody ,addLearn)
router.route('/learn/').get(verifyUser, verifyModulePermission ,learn)
router.route('/learn/:id').patch(verifyUser,verifyModulePermission,escapeRequestBody ,editLearn)
router.route('/learn/:id').delete(verifyUser,verifyModulePermission ,removeLearn)


router.route('/prerequisite/').post(verifyUser,verifyModulePermission ,escapeRequestBody ,addPrerequisite)
router.route('/prerequisite/').get(verifyUser, verifyModulePermission ,prerequisite)
router.route('/prerequisite/:id').patch(verifyUser,verifyModulePermission ,escapeRequestBody,editPrerequisite)
router.route('/prerequisite/:id').delete(verifyUser,verifyModulePermission ,removePrerequisite)
router.route('/').get(verifyUser,verifyModulePermission ,allUsers)
router.route('/').delete(verifyUser,verifyModulePermission ,usersPayments)

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


module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */