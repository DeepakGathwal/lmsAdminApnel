const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addCompany, companyList, deleteCompany, editCompany } = require('../controllers/companyController');
const upload = require('../middelwares/imageUpload');
const { escapeRequestBody } = require('../conn/db');

/**
 * @openapi
 * components:
 *  schemas:
 *    Company: 
 *      type: object
 *      required:
 *        - name
 *        - link
 *        - img
 *      properties:
 *        name:
 *         type : String
 *         default : company
 *        link:
 *         type : String
 *         default : www.comapny.com
 *        img:
 *         type : String
 *         default : company.gpj
 */


/**
 * @openapi
 * '/jtc/admin/company':
 *  post:
 *    tags: 
 *      - Company
 *    summary: 
 *      - Add a company   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Company data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Company"
 *    responses:
 *      200:  
 *       description: Company Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Company
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
 *      - Company
 *    summary: Update any specific company by id
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
 *      description: Company data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Company"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Company
 *    summary: Delete a company
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



router.route('/').post(verifyUser, verifyModulePermission,upload.single("img"),escapeRequestBody,addCompany)
router.route('/').get(verifyUser, verifyModulePermission, companyList)
router.route('/:id').patch(verifyUser, verifyModulePermission,upload.single("img"),escapeRequestBody,editCompany)
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteCompany)

module.exports = router;