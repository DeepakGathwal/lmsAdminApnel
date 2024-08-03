const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const {  form_abouts,  addform_status, form_status, editform_status, removeStatus, formData, addFeedBack, changeStatus, enquiryformData, joinFormData, enrollFormData, downloadCurriculumData, hireUsformData, allForms, projectData } = require('../controllers/formListController');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * '/jtc/admin/forms':
 *  get:
 *    tags:
 *      - Form About
 *    summary: List of Form About of webPages and courses
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

router.route('/').get(verifyUser, verifyModulePermission, form_abouts)


/**
 * @openapi
 * components:
 *  schemas:
 *    FormStatus: 
 *      type: object
 *      required:
 *        - status
 *      properties:
 *        status:
 *         type : String
 *         default : waiting
 */


/**
 * @openapi
 * '/jtc/admin/forms/status':
 *  post:
 *    tags: 
 *      - Form Status
 *    summary: 
 *      - Add Status of Form  
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Form  data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/FormStatus"
 *    responses:
 *      200:  
 *       description: Form Status Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Form Status
 *    summary: List of Form Status of webPages and courses
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
 *      - Form Status
 *    summary: Update any specific Form Status by id
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
 *            $ref: "#/components/schemas/FormStatus"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  put:
 *    tags:
 *      - Form Status
 *    summary: Change Status of from 
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
 *            $ref: "#/components/schemas/FormStatus"
 *    responses:
 *      200:  
 *        description: Status Chnange of Form Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Form Status
 *    summary: Delete a Form Status
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




router.route('/status').post(verifyUser, verifyModulePermission,escapeRequestBody,addform_status)
router.route('/status').get(verifyUser, verifyModulePermission, form_status)
router.route('/status/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editform_status)
router.route('/status/:id').delete(verifyUser, verifyModulePermission,removeStatus)
router.route('/status/:id').put(verifyUser, verifyModulePermission,escapeRequestBody,changeStatus)





/**
 * @openapi
 * '/jtc/admin/forms/enquiry':
 *  get:
 *    tags:
 *      - Form Enquiry
 *    summary: List of All Enquiries 
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : startDate
 *        schema:
 *          type : Date
 *      - in : query
 *        name : endDate
 *        schema:
 *          type : Date
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
*/

router.route('/Get').get(verifyUser, verifyModulePermission,enquiryformData)
router.route('/Batch').get(verifyUser, verifyModulePermission,enrollFormData)
router.route('/Download').get(verifyUser, verifyModulePermission,downloadCurriculumData)
router.route('/Project').get(verifyUser, verifyModulePermission,projectData)
router.route('/Hire').get(verifyUser, verifyModulePermission,hireUsformData)
router.route('/Join').get(verifyUser, verifyModulePermission,joinFormData)
router.route('/all').get(verifyUser, verifyModulePermission,allForms)


/**
 * @openapi
 * '/jtc/admin/forms/join':
 *  get:
 *    tags:
 *      - Form Join Us
 *    summary: List of All Vaccienci Application 
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : startDate
 *        schema:
 *          type : Date
 *      - in : query
 *        name : endDate
 *        schema:
 *          type : Date
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
*/






/**
 * @openapi
 * components:
 *  schemas:
 *    FormFeedBack: 
 *      type: object
 *      required:
 *        - feedback
 *      properties:
 *        feedback:
 *         type : String
 *         default : waiting
*/



/**
 * @openapi
 * '/jtc/admin/forms/feedback':
 *  put:
 *    tags:
 *      - Add Form FeedBack
 *    summary: List of All Vaccienci Application 
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


router.route('/feedback/:id').put(verifyUser, verifyModulePermission,escapeRequestBody,addFeedBack)

module.exports = router;