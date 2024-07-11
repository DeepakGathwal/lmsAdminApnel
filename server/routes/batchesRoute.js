const express= require('express');
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { addBatches, batches, editBatches, removeBatches } = require('../controllers/batchesConroller');
const router = express.Router();
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    Batch: 
 *      type: object
 *      required:
 *        - date
 *        - time_from
 *        - time_to
 *        - cource_id
 *        - week_days
 *      properties:
 *        data:
 *         type : Date
 *         default : 2024-10-02
 *        time_from:
 *         type : Time
 *         default : 10:12
 *        time_to:
 *         type : Time
 *         default : 12:12
 *        cource_id:
 *         type : String
 *         default : 1
 *        week_days:
 *         type : String
 *         default : Monday to Monday
 */


/**
 * @openapi
 * '/jtc/admin/batches':
 *  post:
 *    tags: 
 *      - Batches
 *    summary: 
 *      - Create a Batch  
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
 *            $ref: "#/components/schemas/Batch"
 *    responses:
 *      200:  
 *       description: Batch Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied to Add 
 *  get:
 *    tags:
 *      - Batches
 *    summary: Get all Batches
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
 *      - Batches
 *    summary: Update any specific Batch by id
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
 *      description: Batch Data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Batch"
 *    responses:
 *      200:  
 *        description: Batch Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 *  delete:
 *    tags:
 *      - Batches
 *    summary: Delete a Batch
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
 *        description: Batch Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Permission Denied to Delete Permission  
 */



router.route('/').post(verifyUser, verifyModulePermission,escapeRequestBody,addBatches) 
router.route('/').get(verifyUser, verifyModulePermission,batches) 
router.route('/').patch(verifyUser, verifyModulePermission,escapeRequestBody,editBatches) 
router.route('/:id').delete(verifyUser, verifyModulePermission,removeBatches) 


module.exports = router;