const express= require('express');
const router = express.Router();
const upload = require('../middelwares/imageUpload');
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addLinks, links, editLinks, removeLinks } = require('../controllers/webSiteLinksController');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    webPage: 
 *      type: object
 *      required:
 *        - name 
 *        - nav_link 
 *        - html 
 *        - css 
 *      properties:
 *        name:
 *         type : String
 *         default : <h1></h1>
 *        nav_link:
 *         type : String
 *         default : <h1></h1>
 *        html:
 *         type : String
 *         default : <h1></h1>
 *        css:
 *         type : String
 *         default : css
 *        background_color:
 *         type : String
 *         default : #000
 *        fontsize:
 *         type : String
 *         default : 16px
 *        fontwight:
 *         type : Integer
 *         default : 800
 *        fontfamily:
 *         type : String
 *         default : poppins
 */


/**
 * @openapi
 * '/jtc/admin/navLinks':
 *  post:
 *    tags: 
 *      - Web Page
 *    summary: 
 *      - Add a Web Page   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Add Web Page  
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/webPage"
 *    responses:
 *      200:  
 *       description: Web Page  Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Web Page
 *    summary: All Web Page  heading
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
 *      - Web Page
 *    summary: Update any specific Web Page  by id
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
 *      description: Web Page  data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/webPage"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Web Page
 *    summary: Delete a Course Chapter
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
 *  put:
 *    tags:
 *      - Web Page
 *    summary: Single Web Page
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




router.route('/').post(verifyUser, verifyModulePermission,upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'image', maxCount: 1 }]),escapeRequestBody,addLinks) // pending
router.route('/').get(verifyUser, verifyModulePermission, links)  // check
router.route('/:id').patch(verifyUser, verifyModulePermission,upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'image', maxCount: 1 },]),escapeRequestBody,editLinks) // check
router.route('/:id').delete(verifyUser, verifyModulePermission,removeLinks) // check


module.exports = router;