const express= require('express');
const router = express.Router();
const upload = require('../../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { escapeRequestBody } = require('../../conn/db');
const { addSections, Sections, editSections, removeSections, addFaqs, faqs, editFaqs, removeFaqs, addPdf, viewPdf, deletePdf, downloadPdf } = require('../../controllers/ecommers/sections');



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


router.route('/').post(verifyUser,verifyModulePermission,upload.array('images', 3),escapeRequestBody ,addSections)
router.route('/').get(verifyUser, verifyModulePermission ,Sections)
router.route('/:id').patch(verifyUser,verifyModulePermission,upload.array('images', 3),escapeRequestBody ,editSections)
router.route('/:id').delete(verifyUser,verifyModulePermission ,removeSections)
router.route('/faqs/').post(verifyUser,verifyModulePermission,escapeRequestBody ,addFaqs)
router.route('/faqs/').get(verifyUser, verifyModulePermission ,faqs)
router.route('/faqs/:id').patch(verifyUser,verifyModulePermission,escapeRequestBody ,editFaqs)
router.route('/faqs/:id').delete(verifyUser,verifyModulePermission ,removeFaqs)
router.route('/resourse/').post(verifyUser, verifyModulePermission,upload.single('file'),addPdf)
router.route('/resourse/:name').get(verifyUser, verifyModulePermission,viewPdf)
router.route('/resourse/:id').delete(verifyUser, verifyModulePermission,deletePdf)
router.route('/resourse/download/:id').get(verifyUser, verifyModulePermission,downloadPdf)


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