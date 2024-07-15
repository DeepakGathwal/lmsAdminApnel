const dotenv = require('dotenv');
dotenv.config({path:'.env'});
const cluster = require('node:cluster');
const path = require('path')
const fs = require('fs')
const operatingSystem = require('os')
const cpus = operatingSystem.cpus().length
const express = require('express')
const cookieParser = require('cookie-parser')
const body = require('body-parser')
const cors = require('cors')
const ErrorHandler = require('./middelwares/error')
const { createDocs } = require('./utils/swagger');
const app = express();
app.use(cors({exposedHeaders: 'Set-Cookie',Headers: true,credentials:true, origin:'http://localhost:3000', methods: "GET,POST,PUT,DELETE,PATCH", optionsSuccessStatus: 200}))
app.use(cookieParser())
app.use(body.json({ limit: '50mb' }));
app.use(body.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



// const buidPath = path.join(__dirname,"../client/build")
// app.use(express.static(buidPath))
// app.use(cors({  exposedHeaders: 'Set-Cookie',Headers: true,credentials:true, origin:"*",  methods: "GET,POST,PUT,DELETE", optionsSuccessStatus: 200,allowedHeaders: [
//     'Access-Control-Allow-Origin',
//     'Content-Type',
//     'Authorization'
//   ]}))
// if(cluster.isPrimary){
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork();
//   }
// }else{
 



 const teamHandel = require('./routes/teamRoute');
 const projectLanguage = require('./routes/project/projectAboutRoute');
 const projectPoint = require('./routes/project/projectPointRoute');
 const project = require('./routes/project/projectRouter');
 const roleHandel = require('./routes/rolesRoutes');
 const moduleHandel = require('./routes/modulesRoute');
 const permissionHandel = require('./routes/permissionRoute');
 const profileHandel = require('./routes/profileRoute');
 const courseHandel = require('./routes/cources/coursesRoute');
 const categoryHandel = require('./routes/cources/courseCategoryRoute');
 const tutorialHandel = require('./routes/tutorial/tutorialRoute');
 const blogHandel = require('./routes/blogRoute');

 // call batch route
 const batchesHandel = require('./routes/batchesRoute');
 const formsHandel = require('./routes/formListRoute');
 
 // call course type route
 const courseTypeHandel = require('./routes/cources/typeofCoursesRoute');
 const tutorialTypeHandel = require('./routes/tutorial/typeofTutorialRoute');
 const companyHandel = require('./routes/companyRoute');

 // call about us route
 const aboutPointHandel = require('./routes/aboutPointsRoute');
 const studentHandel = require('./routes/studentRoute');
 const testominalHandel = require('./routes/testominalsRoute');
 const faqsHandel = require('./routes/faqsRoute');
 const tncHandel = require('./routes/tncRoute');
 const tutorialCourseHandel = require('./routes/tutorial/tutorialCourseRoute');
 const navBarLinksHandel = require('./routes/webSiteLinksRoute');

 // why choose us point routes
 const choosingPointHandel = require('./routes/choosePointRoute');
 const coursesPointHandel = require('./routes/cources/courseJoinPointRoute');

 // call brochure route
 const brochurerHandel = require('./routes/brochureRoute');
 const ECourseRoute = require('./routes/ecommers/courcesRoutes');
 const ECourseCatgoryRoute = require('./routes/ecommers/courseCategoryRoutes');
 const ECommesSection = require('./routes/ecommers/sections');
 const ECoursePointRoute = require('./routes/ecommers/coursePoint');
 const UsersRoute = require('./routes/usersRoute');
const error = require('./middelwares/error');

 //  call brochure api
 app.use('/jtc/admin/users', UsersRoute);
 app.use('/jtc/admin/ecommersCoursePoint', ECoursePointRoute);

 //  call brochure api
 app.use('/jtc/admin/ecommersCourseCategory', ECourseCatgoryRoute);
 app.use('/jtc/admin/ecommersSection', ECommesSection);

 //  call brochure api
 app.use('/jtc/admin/ecommersCourse', ECourseRoute);
 app.use('/jtc/admin/projectAbout', projectLanguage);
 app.use('/jtc/admin/project', project);
 app.use('/jtc/admin/projectPoint', projectPoint);
 app.use('/jtc/admin/brochure', brochurerHandel);
 app.use('/jtc/admin/coursePoint', coursesPointHandel);

//  call why choose us point api
 app.use('/jtc/admin/point', choosingPointHandel);
 app.use('/jtc/admin/navLinks', navBarLinksHandel);
 app.use('/jtc/admin/tutorialCource', tutorialCourseHandel);
 app.use('/jtc/admin/tnc', tncHandel);
 app.use('/jtc/admin/faqs', faqsHandel);
 app.use('/jtc/admin/testominal', testominalHandel);
 app.use('/jtc/admin/student', studentHandel);

 // call about us api
 app.use('/jtc/admin/about', aboutPointHandel);
 app.use('/jtc/admin/company', companyHandel);
 app.use('/jtc/admin/forms', formsHandel);

 // call course type api
 app.use('/jtc/admin/coursefiled', courseTypeHandel);
 app.use('/jtc/admin/tutorialfiled', tutorialTypeHandel);

 // call batch Api
 app.use('/jtc/admin/batches', batchesHandel);

 // call blog api
 app.use('/jtc/admin/blog', blogHandel);
 app.use('/jtc/admin/category', categoryHandel);
 app.use('/jtc/admin/tutorial', tutorialHandel);

 // call courses api
 app.use('/jtc/admin/course', courseHandel);
 app.use('/jtc/admin/profile', profileHandel);
 app.use('/jtc/admin/permission', permissionHandel);
 app.use('/jtc/admin/module', moduleHandel);
 app.use('/jtc/admin/team', teamHandel);
 app.use('/jtc/admin/role', roleHandel);

app.use(error)

process.on("uncaughtException",(err) =>{
  console.log(`Error ${err}`);
 
      process.exit(1)
})
// Server listing store on a variable
const stop = app.listen(process.env.PORT,() => {
  console.log(`Server id working on ${process.env.PORT}`);
})
// Unhandled Promise Rejection
process.on("unhandledRejection",err => {
  console.log(`Error ${err}`);
  console.log(`Shutting down server ${process.env.PORT} due to error`);
  stop.close(() =>{
      process.exit(1)
  })
})
// }