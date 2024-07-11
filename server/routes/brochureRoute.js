const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addPoints, points, editPoints, removepoints } = require('../controllers/aboutPointController');
const { escapeRequestBody } = require('../conn/db');
const { addPdf, allPdf, viewPdf, downloadPdf, deletePdf } = require('../controllers/brochureController');
const multer = require('multer');
const upload = multer()


/**
 * @openapi
 * components:
 *  schemas:
 *    Brochure: 
 *      type: object
 *      required:
 *        - file
 *        - course
 *      properties:
 *        file:
 *         type : PDf
 *         default : course.pdf
 *        course:
 *         type : Integer
 *         default : 1
 */


/**
 * @openapi
 * '/jtc/admin/brochure':
 *  post:
 *    tags: 
 *      - Brochure
 *    summary: 
 *      - Create a Brochure  
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Brochure data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Brochure"
 *    responses:
 *      200:  
 *       description: Brochure Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied to Add 
 *  patch:
 *    tags:
 *      - Brochure
 *    summary: Update any specific Brochure by id
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : id
 *        schema:
 *          type : Integer
 *    requestBody: 
 *      description: Brochure Data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Brochure"
 *    responses:
 *      200:  
 *        description: Brochure Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 *  delete:
 *    tags:
 *      - Brochure
 *    summary: Delete a Brochure
 *    parameters: 
 *      - in : params
 *        name : id
 *        schema:
 *          type : Integer
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *  get:
 *    tags:
 *      - Brochure
 *    summary: View a Brochure
 *    parameters: 
 *      - in : params
 *        name : name
 *        schema:
 *          type : String
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    responses:
 *      200:  
 *        description: View a Brochure 
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 */


/**
 * @openapi
 * '/jtc/admin/brochure/download':
 *  get:
 *    tags:
 *      - Brochure
 *    summary: Download a Brochure
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : params
 *        name : id
 *        schema:
 *          type : Integer
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied to View  
 */



router.route('/').post(verifyUser, verifyModulePermission,upload.single('file'),addPdf)
router.route('/').patch(verifyUser, verifyModulePermission, allPdf)
router.route('/:name').get(verifyUser, verifyModulePermission,viewPdf)
router.route('/:id').delete(verifyUser,verifyModulePermission, deletePdf)
router.route('/download/:id').get(verifyUser,verifyModulePermission, downloadPdf)

module.exports = router;


/**
 * 
 *  Border -> 
 *  border-radis
 *  bordr : 
 * 
 * 
 */