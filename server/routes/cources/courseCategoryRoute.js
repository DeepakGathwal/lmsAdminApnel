const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../../middelwares/token');
const { addCategory, editCategory, getCategory, deleteCategory, addSubcategory, getSubcategory, editSubcategory, deleteSubcategory, addChapter, getChapter, editChapter, deleteChapter, addTopics, getTopics, editTopics, deleteTopic } = require('../../controllers/cources/courseCategoryController');
const { escapeRequestBody } = require('../../conn/db');

/**
 * @openapi
 * components:
 *  schemas:
 *    CourseChapter: 
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
 * '/jtc/admin/category':
 *  post:
 *    tags: 
 *      - Course Chapter
 *    summary: 
 *      - Add a Course Chapter   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : cource
 *        schema:
 *          type : Integer
 *    requestBody: 
 *      description: Course Chapter data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseChapter"
 *    responses:
 *      200:  
 *       description: Course Chapter Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Course Chapter
 *    summary: List of Course Chapter
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : cource
 *        schema:
 *          type : Integer
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  patch:
 *    tags:
 *      - Course Chapter
 *    summary: Update any specific Course Chapter by id
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
 *      description: Course Chapter data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseChapter"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Course Chapter
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
 */


router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addChapter)
router.route('/').get(verifyUser, verifyModulePermission, getChapter)
router.route('/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editChapter)
router.route('/:id').delete(verifyUser, verifyModulePermission,deleteChapter)



/**
 * @openapi
 * components:
 *  schemas:
 *    ChapterTopic: 
 *      type: object
 *      required:
 *        - subCategory
 *      properties:
 *        subCategory:
 *         type : String
 *         default : Topic
 */



/**
 * @openapi
 * '/jtc/admin/category/topics':
 *  post:
 *    tags: 
 *      - Chapter Topic
 *    summary: 
 *      - Add a Chapter Topic
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : category
 *        schema:
 *          type : Integer
 *    requestBody: 
 *      description: Chapter Topic data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/ChapterTopic"
 *    responses:
 *      200:  
 *       description: Chapter Topic Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Chapter Topic
 *    summary: List of Chapter Topic
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
 *        name : category
 *        schema:
 *          type : Integer
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  patch:
 *    tags:
 *      - Chapter Topic
 *    summary: Update any specific Chapter Topic by id
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
 *      description: Chapter Topic data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Chapter Topic"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Chapter Topic
 *    summary: Delete a Chapter Topic
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






router.route('/topics').post(verifyUser, verifyModulePermission,escapeRequestBody,addTopics)
router.route('/topics').get(verifyUser, verifyModulePermission, getTopics)
router.route('/topics/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody, editTopics)
router.route('/topics/:id').delete(verifyUser, verifyModulePermission, deleteTopic)



/**
 * @openapi
 * components:
 *  schemas:
 *    CourseCategory: 
 *      type: object
 *      required:
 *        - category 
 *        - cource 
 *      properties:
 *        category:
 *         type : String
 *         default : chapter
 *        cource:
 *         type : String
 *         default : cource
 */


/**
 * @openapi
 * '/jtc/admin/category/category':
 *  post:
 *    tags: 
 *      - Course Category
 *    summary: 
 *      - Add a Course Category   
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Course Category data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseCategory"
 *    responses:
 *      200:  
 *       description: Course Category Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 *  get:
 *    tags:
 *      - Course Category
 *    summary: List of Course Category
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
 *      - Course Category
 *    summary: Update any specific Course Category by id
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
 *      description: Course Category data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/CourseCategory"
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Course Category
 *    summary: Delete a Course Category
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