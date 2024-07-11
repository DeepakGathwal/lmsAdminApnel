const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addTutorial, getTutorial, editTutorial, deleteTutorial, getHeadings , addCategory, getCategory, editCategory, deleteCategory} = require('../../controllers/tutorial/tutorialController');
const { escapeRequestBody } = require('../../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    tutorial: 
 *      type: object
 *      required:
 *        - html 
 *        - css 
 *        - category_id 
 *        - cource_id 
 *        - heading 
 *      properties:
 *        html:
 *         type : String
 *         default : <h1></h1>
 *        css:
 *         type : String
 *         default : css
 *        category_id:
 *         type : Integer
 *         default : 1
 *        cource_id:
 *         type : Integer
 *         default : 1
 *        heading:
 *         type : String
 *         default : tutorial
 *        meta_tags:
 *         type : String
 *         default : tutorial
 *        meta_keywords:
 *         type : String
 *         default : tutorial
 *        meta_description:
 *         type : String
 *         default : tutorial
 *        meta_title:
 *         type : String
 *         default : tutorial
 */


/**
 * @openapi
 * '/jtc/admin/tutorial':
 *  post:
 *    tags: 
 *      - Tutorial
 *    summary: 
 *      - Add a Tutorial   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Add Tutorial
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorial"
 *    responses:
 *      200:  
 *       description: Tutorial Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Tutorial
 *    summary: All Tutorial heading
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
 *      - Tutorial
 *    summary: Update any specific Tutorial by id
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
 *      description: Tutorial data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorial"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Tutorial
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
 *      - Tutorial
 *    summary: Single Tutorial
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



router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addTutorial)
router.route('/').get(verifyUser, verifyModulePermission, getHeadings)
router.route('/:id').put(verifyUser, verifyModulePermission, getTutorial)
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editTutorial)
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteTutorial)



/**
 * @openapi
 * components:
 *  schemas:
 *    tutorialCategory: 
 *      type: object
 *      required:
 *        - category 
 *      properties:
 *        category:
 *         type : String
 *         default : chapter
 */


/**
 * @openapi
 * '/jtc/admin/tutorial/category':
 *  post:
 *    tags: 
 *      - Tutorial Chapter
 *    summary: 
 *      - Add a Tutorial Chapter   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Tutorial Chapter data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCategory"
 *    responses:
 *      200:  
 *       description: Tutorial Chapter Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Tutorial Chapter
 *    summary: List of Tutorial Chapter
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
 *      - Tutorial Chapter
 *    summary: Update any specific Tutorial Chapter by id
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
 *      description: Tutorial Chapter data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/tutorialCategory"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Tutorial Chapter
 *    summary: Delete a Tutorial Chapter
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



router.route('/category').post(verifyUser, verifyModulePermission,escapeRequestBody,addCategory)
router.route('/category').get(verifyUser, verifyModulePermission, getCategory)
router.route('/category/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody, editCategory)
router.route('/category/:id').delete(verifyUser, verifyModulePermission, deleteCategory)




module.exports = router;