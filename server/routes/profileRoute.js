const express= require('express');
const router = express.Router();
const { verifyUser, verifyModulePermission } = require('../middelwares/token');
const { login, genrateProfileModule, updateImage, updateProfile, updatePassword, forgetPassword, verifyOtp, logOut, getProfile } = require('../controllers/profileController');
const upload = require('../middelwares/imageUpload');
const { footer, footerData } = require('../controllers/footerController');
const { createExcelFile } = require('../utils/pagination');
const { escapeRequestBody } = require('../conn/db');



/**
 * @openapi
 * components:
 *  schemas:
 *    Login: 
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *         type : String
 *         default : email@hello.com
 *        password:
 *         type : String
 *         default : '***'
 */



/**
 * @openapi
 * components:
 *  schemas:
 *    Profile: 
 *      type: object
 *      required:
 *        - email
 *        - phone
 *        - name
 *        - address
 *      properties:
 *        email:
 *         type : String
 *         default : email@hello.com
 *        phone:
 *         type : Integer
 *         default : 91+
 *        name:
 *         type : String
 *         default : my
 *        linkedin:
 *         type : String
 *         default : www.linkedin.com
 *        instagram:
 *         type : String
 *         default : www.instagram.com
 *        facebook:
 *         type : String
 *         default : www.facebook.com
 *        address:
 *         type : String
 *         default : noida
 */


/**
 * @openapi
 * '/jtc/admin/profile':
 *  post:
 *    tags: 
 *      - Profile
 *    summary: 
 *      - Team Member Login  
 *    requestBody: 
 *      description: User Login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Login"
 *    responses:
 *      200:  
 *       description: Login Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 *  get:
 *    tags:
 *      - Profile
 *    summary: Get all Modules which have team member have permission
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 *  patch:
 *    tags:
 *      - Profile
 *    summary: Update Self Image
 *    responses:
 *      200:  
 *        description: Modules Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 *  put:
 *    tags:
 *      - Profile
 *    summary: Update Profile
 *    requestBody: 
 *      description: User data
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Profile"
 *    responses:
 *      200:  
 *        description: Profile Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      404: 
 *       description: Error from function call  
 */





router.route('/').post(login) //check
router.route('/').get(verifyUser, genrateProfileModule) // check
router.route('/').patch(verifyUser,upload.single("image"),updateImage)  //check
router.route('/').put(verifyUser,updateProfile)  // check





/**
 * @openapi
 * components:
 *  schemas:
 *    Password: 
 *      type: object
 *      required:
 *        - confirmPassword
 *        - password
 *      properties:
 *        confirmPassword:
 *         type : String
 *         default : '***'
 *        password:
 *         type : String
 *         default : '***'
 */





/**
 * @openapi
 * '/jtc/admin/profile/password':
 *  post:
 *    tags: 
 *      - Update Password
 *    summary: 
 *      - Update Self Password  
 *    requestBody: 
 *      description: User Login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Password"
 *    responses:
 *      200:  
 *       description: Password Updated Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 */






router.route('/password').post(verifyUser,updatePassword)  //check


/**
 * @openapi
 * components:
 *  schemas:
 *    forgetPassword: 
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *         type : String
 *         default : email@my.com
 */


/**
 * @openapi
 * components:
 *  schemas:
 *    verifyOtp: 
 *      type: object
 *      required:
 *        - otp
 *      properties:
 *        otp:
 *         type : Integer
 *         default : 123456
 */


/**
 * @openapi
 * '/jtc/admin/profile/forgetPassword':
 *  put:
 *    tags: 
 *      - Otp
 *    summary: 
 *      - Genrate Otp After Email Verify 
 *    requestBody: 
 *      description: Otp
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/forgetPassword"
 *    responses:
 *      200:  
 *       description: Otp Sended Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 *  patch:
 *    tags: 
 *      - Otp
 *    summary: 
 *      - Match Otp After Email Verify 
 *    requestBody: 
 *      description: Otp
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/verifyOtp"
 *    responses:
 *      200:  
 *       description: Otp Match Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 */

router.route('/forgetPassword').put(forgetPassword) // check
router.route('/forgetPassword').patch(verifyUser, verifyOtp)


/**
 * @openapi
 * '/jtc/admin/profile/self':
 *  get:
 *    tags: 
 *      - Profile
 *    summary: 
 *      - Profile Data 
 *    responses:
 *      200:  
 *       description: User Data Fetched Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 */




router.route('/self').get(verifyUser,getProfile) //check


/**
 * @openapi
 * '/jtc/admin/profile/logout':
 *  get:
 *    tags: 
 *      - Profile
 *    summary: 
 *      - Self Logout
 *    responses:
 *      200:  
 *       description: User Logout Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: User Not Found 
 */





router.route('/logout').get(verifyUser,logOut) //check



/**
 * @openapi
 * components:
 *  schemas:
 *    Footer: 
 *      type: object
 *      properties:
 *        email:
 *         type : String
 *         default : email@hello.com
 *        phone:
 *         type : Integer
 *         default : 91+
 *        name:
 *         type : String
 *         default : my
 *        linkedin:
 *         type : String
 *         default : www.linkedin.com
 *        instagram:
 *         type : String
 *         default : www.instagram.com
 *        facebook:
 *         type : String
 *         default : www.facebook.com
 *        twitter:
 *         type : String
 *         default : www.twitter.com
 *        youtube:
 *         type : String
 *         default : www.youtube.com
 *        telegram:
 *         type : String
 *         default : www.telegram.com
 *        contact:
 *         type : String
 *         default : noida
 *        about:
 *         type : String
 *         default : noida
 */

/**
 * @openapi
 * '/jtc/admin/profile/footer':
 *  post:
 *    tags: 
 *      - Footer
 *    summary: 
 *      - Update Footer Details  
 *    requestBody: 
 *      description: Footer Update
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: "#/components/schemas/Footer"
 *    responses:
 *      200:  
 *       description: Footer update Successfully
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description:  Permission Denied
 *  get:
 *    tags:
 *      - Footer
 *    summary: Get footer details
 *    responses:
 *      200:  
 *        description: Data
 *      400: 
 *       description: Error From Datebase  
 *      206: 
 *       description: Permission Denied 
 */






router.route('/footer').post(verifyUser, verifyModulePermission,escapeRequestBody, footer)
router.route('/footer').get(verifyUser, verifyModulePermission, footerData)




module.exports = router;