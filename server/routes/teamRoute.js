const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { createTeamMember, getTeamMemberLsit, updateTeamMember, updatePassword, deleteTeamMember } = require('../controllers/teamController');
const { escapeRequestBody } = require('../conn/db');


/**
 * @openapi
 * components:
 *  schemas:
 *    Team: 
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - phone
 *        - role
 *        - name
 *        - linkedin
 *        - instagram
 *        - facebook
 *        - image
 *      properties:
 *        email:
 *         type : String
 *         default : email@email.com
 *        password:
 *         type : String
 *         default : pass
 *        phone:
 *         type : Integer
 *         default : 123
 *        role:
 *         type : String
 *         default : Teacher
 *        name:
 *         type : String
 *         default : Name
 *        linkedin:
 *         type : String
 *         default : linkedin
 *        instagram:
 *         type : String
 *         default : instagram
 *        facebook:
 *         type : String
 *         default : facebook
 *        image:
 *         type : String
 *         default : .jpg
 */


/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateTeam: 
 *      type: object
 *      required:
 *        - email
 *        - phone
 *        - role
 *        - name
 *        - linkedin
 *        - instagram
 *        - facebook
 *        - image
 *      properties:
 *        email:
 *         type : String
 *         default : email@email.com
 *        phone:
 *         type : Integer
 *         default : 123
 *        role:
 *         type : String
 *         default : Teacher
 *        name:
 *         type : String
 *         default : Name
 *        linkedin:
 *         type : String
 *         default : linkedin
 *        instagram:
 *         type : String
 *         default : instagram
 *        facebook:
 *         type : String
 *         default : facebook
 */


/**
 * @openapi
 * components:
 *  schemas:
 *    teamPasswordUpdate: 
 *      type: object
 *      required:
 *        - password
 *      properties:
 *        password:
 *         type : String
 *         default : pass
 */


/**
 * @openapi
 * '/jtc/admin/team':
 *  post:
 *    tags: 
 *      - Team
 *    summary: 
 *      - Add a team Member
 *    parameters:
 *      - in : query
 *        name: module
 *        schema : 
 *          type: String
 *    requestBody: 
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Team"
 *    responses:
 *      200:  
 *       description: Team Member Added Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  get:
 *    tags:
 *      - Team
 *    summary: List of Team Members
 *    parameters:
 *      - in : query
 *        name: module
 *        schema : 
 *          type: String
 *    responses:
 *      200:  
 *        description: Team Members
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  patch:
 *    tags:
 *      - Team
 *    summary: Edit a Team Member Profile
 *    parameters: 
 *      - in : query
 *        name : module
 *        schema:
 *          type : String
 *    requestBody: 
 *      description: Update team member data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/UpdateTeam"
 *    responses:
 *      200:  
 *        description: Team Meamber Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  put:
 *    tags:
 *      - Team
 *    summary: Edit a Team Member Password which have alreay exists
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
 *            $ref: "#/components/schemas/teamPasswordUpdate"
 *    responses:
 *      200:  
 *        description: Team Meamber Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  delete:
 *    tags:
 *      - Team
 *    summary: Delete a Team Member
 *    parameters:
 *      - in : query
 *        name: module
 *        schema : 
 *          type: String
 *    responses:
 *      200:  
 *        description: Team Member Deleted Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */

router.route('/').post(verifyUser, verifyModulePermission,createTeamMember) // check
router.route('/').get(verifyUser, verifyModulePermission,getTeamMemberLsit) // check
router.route('/').patch(verifyUser, verifyModulePermission,escapeRequestBody,updateTeamMember) // check
router.route('/').put(verifyUser, verifyModulePermission,updatePassword) // check
router.route('/').delete(verifyUser, verifyModulePermission,deleteTeamMember) // check

module.exports = router;