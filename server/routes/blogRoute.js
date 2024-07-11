const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const upload = require('../middelwares/imageUpload');
const { escapeRequestBody } = require('../conn/db');
const { addBlog, singleBlog, removeBlog, editBlog, allBlogCategory, removeBlogCategory, editBlogCategory, addBlogCategory, allBlogList } = require('../controllers/blogController');


// name, heading, video_link, meta_tags, meta_keywords, meta_description, meta_title,category, blog_html, blog_css,image, banner

/**
 * @openapi
 * components:
 *  schemas:
 *    Blog: 
 *      type: object
 *      required:
 *        - name
 *        - heading
 *        - video_link
 *        - category
 *        - blog_html
 *        - blog_css
 *        - image
 *        - banner
 *      properties:
 *        name:
 *         type : String
 *         default : blog
 *        heading:
 *         type : String
 *         default : Blog descrption
 *        video_link:
 *         type : Link
 *         default : https:videolink.com
 *        meta_tags:
 *         type : String
 *         default : Blog
 *        meta_keywords:
 *         type : String
 *         default : Blog
 *        meta_description:
 *         type : String
 *         default : Blog
 *        meta_title:
 *         type : String
 *         default : Blog
 *        category:
 *         type : Integer
 *         default : 1
 *        blog_html:
 *         type : HTML
 *         default : <h1>Blog</h1>
 *        blog_css:
 *         type : String
 *         default : CSS
 *        image:
 *         type : Image
 *         default : image
 *        banner:
 *         type : Image
 *         default : image
 */


/**
 * @openapi
 * '/jtc/admin/blog':
 *  post:
 *    tags: 
 *      - Blog
 *    summary: 
 *      - Create a Blog  
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Blog data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Blog"
 *    responses:
 *      200:  
 *       description: Blog Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied to Add 
 *  get:
 *    tags:
 *      - Blog
 *    summary: Get Single Blog
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *      - in : query
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
 *  patch:
 *    tags:
 *      - Blog
 *    summary: Update any specific Blog by id
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
 *      description: Blog Data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Blog"
 *    responses:
 *      200:  
 *        description: Blog Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 *  delete:
 *    tags:
 *      - Blog
 *    summary: Delete a Blog
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
 *        description: Blog Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 */

router.route('/').post(verifyUser, verifyModulePermission,upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),escapeRequestBody,addBlog) 
router.route('/').get(verifyUser, verifyModulePermission,singleBlog) 
router.route('/list').get(verifyUser, verifyModulePermission,allBlogList) 
router.route('/:id').delete(verifyUser, verifyModulePermission, removeBlog)
// router.route('/:id').put(verifyUser, verifyModulePermission, upload.single('img'), editIconOrBlog) 

/**
 * @openapi
 * '/jtc/admin/blog/list':
 *  get:
 *    tags:
 *      - Blog
 *    summary: Get all Blog
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
 *       description: Permission Denied to View  
 */


router.route('/:id').patch(verifyUser, verifyModulePermission,upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),escapeRequestBody, editBlog)

/**
 * @openapi
 * components:
 *  schemas:
 *    blogCategory: 
 *      type: object
 *      required:
 *        - category
 *      properties:
 *        category:
 *         type : String
 *         default : Blog Category
 */




/**
 * @openapi
 * '/jtc/admin/blog/category':
 *  post:
 *    tags: 
 *      - Blog
 *    summary: 
 *      - Create a Blog Catgory  
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
 *            $ref: "#/components/schemas/blogCategory"
 *    responses:
 *      200:  
 *       description: Blog Category Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied to Add 
 *  get:
 *    tags:
 *      - Blog
 *    summary: Get all Blog Category
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
 *       description: Permission Denied to View  
 *  patch:
 *    tags:
 *      - Blog
 *    summary: Update any specific Blog Category by id
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
 *      description: Blog Category Data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/blogCategory"
 *    responses:
 *      200:  
 *        description: Blog Category Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 *  delete:
 *    tags:
 *      - Blog
 *    summary: Delete a Blog Category
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
 *        description: Blog Category Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 */

router.route('/category').get(verifyUser, verifyModulePermission,allBlogCategory) 
router.route('/category/:id').delete(verifyUser, verifyModulePermission, removeBlogCategory)
router.route('/category/:id').patch(verifyUser, verifyModulePermission,escapeRequestBody,editBlogCategory) 
router.route('/category').post(verifyUser, verifyModulePermission,escapeRequestBody, addBlogCategory)

module.exports = router;