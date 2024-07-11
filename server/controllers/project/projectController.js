const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { pagination } = require("../../utils/pagination");
const { getSignedUrl } =  require("@aws-sdk/s3-request-presigner");



const s3Client = new S3Client({
    region : "ap-southeast-2",
    credentials:{
        accessKeyId : process.env.ID,
        secretAccessKey :process.env.KEY
    }
})

  exports.addProject = catchAsyncError(async(req,res) => {
    const { image, video } = req.files;
      const {user, permissions} = req
      if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project",success: false });
      const {name, project_language, project_technologie, project_module, project_description, meta_tags, meta_description, meta_keywords, meta_title, project_category} =  req.body
      const already =  `Select id from jtcindia_projects.project_lists WHERE name = "${name}" && project_language = "${project_language}" && deleted_by = '0'`
    
      const alreadyExists = await executeQuery(already)
      if(alreadyExists.length > 0) return res.status(206).json({message : "Project with same name already exists", success : false})
      const project = await name.replaceAll(' ','-').toLowerCase()
    const uploadFiles = async (files) => {
      const uploadPromises = await files.map(async (file) => {
        const uploadParams = new PutObjectCommand({
          Bucket: "jtcprojects",
          Key: `${project}/files/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype
        });
      
      return  await s3Client.send(uploadParams);
       });
    
      return await Promise.all(uploadPromises);
    };
    
    const uploadPromises = [];
    
    if (image) {
      uploadPromises.push(uploadFiles(image));
    }
    
    if (video) {
      uploadPromises.push(uploadFiles(video));
    }
    
    await Promise.allSettled(uploadPromises.flat())
    const addProjectQuery =  `Insert into jtcindia_projects.project_lists SET name = "${name}", project_language = "${project_language}", project_technologie = "${project_technologie}",project_category = "${project_category}" ,project_module = "${project_module}", project_description = "${project_description}", meta_tags = "${meta_tags}", meta_description = "${meta_description}", meta_keywords = "${meta_keywords}", meta_title = "${meta_title}", created_by = ${user}, project_link = "${project}"`
    const callQuery =  await executeQuery(addProjectQuery);
    if(callQuery.affectedRows > 0) return res.status(200).json({message : "Project Added Successfully", success : true}) 
    else return res.status(200).json({message : "Error! During Project Added", success : false}) 
  })

exports.projectCategory = catchAsyncError(async(req,res) =>{
  const {user, permissions} = req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Language",success: false });
  const already =  `Select project_category from jtcindia_projects.project_lists WHERE deleted_by = '0'`
  const value = await executeQuery(already)
  const data = await  [...new Set(value.map((el) => el.project_category))]
  return data && pagination(req, res, data)
})

exports.editProject = catchAsyncError(async(req,res) => {
    const {user, permissions} = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Project",success: false });
    const {name, project_language, project_technologie, project_module, project_description, project_video, project_images, meta_tags, meta_description, meta_keywords, meta_title} =  req.body
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const already =  `Select id from jtcindia_projects.project_lists WHERE name = ${name} && project_language = ${project_language} && deleted_by = '0'`
    const alreadyExists = await executeQuery(already)
    if(alreadyExists.length > 1) return res.status(206).json({message : "Project with same name already exists", success : false})
    let addTech = [];
    let addindataBase = ''
    if(project_technologie.length > 0){
      const idOFCources = `Select id from jtcindia_projects.project_technologies WHERE technology IN (${project_technologie})`
       const data = await executeQuery(idOFCources)
      if(data.length > 0){
      data.map((el) => {
        addTech.push(el.id)
      })
      addindataBase = ` project_technologie =  '${addTech}',`
    }
    }
    const link = await name.replaceAll(' ','-')
    const addProjectQuery =  `Update jtcindia_projects.project_lists SET name = ${name}, project_language = ${project_language}, ${addindataBase} project_module = ${project_module}, project_description = ${project_description}, project_video = ${project_video}, project_images = ${project_images}, meta_tags = ${meta_tags}, meta_description = ${meta_description}, meta_keywords = ${meta_keywords}, meta_title = ${meta_title}, updated_at = current_timestamp(), updated_by = ${user}, project_link = ${link} WHERE id = ${id}`
    const callQuery =  await executeQuery(addProjectQuery);
    if(callQuery.affectedRows > 0) return res.status(200).json({message : "Project Update Successfully", success : true}) 
    else return res.status(200).json({message : "Error! During Project Update", success : false}) 
})

exports.allProject = catchAsyncError(async(req,res) => {
    const {user, permissions} = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Language",success: false });
    const already =  `Select list.project_link,list.name, list.project_technologie, list.project_category, list.project_module, list.project_description, list.meta_tags, list.meta_description, list.meta_keywords, list.meta_title, list.id, language.language from jtcindia_projects.project_lists as list Left Join jtcindia_projects.project_languages as language On language.id = list.project_language  WHERE deleted_by = '0'`
    const data = await executeQuery(already)
    if(data.length > 0) {
          for (let index = 0; index < data.length; index++) {
            const link = data[index].project_link
              const command = new ListObjectsCommand({
                Bucket :"jtcprojects",
                Prefix: `${link}/files/` 
            })
            const url  = await s3Client.send(command)
            const allkey = url && url.Contents && url.Contents.map((el) => el.Key)
             data[index][`media`] =  allkey
            
            const languageId = data[index].project_technologie
           
            const langguageName = `Select technology from jtcindia_projects.project_technologies WHERE id IN (${languageId}) `
            const executeQueryApi = await executeQuery(langguageName);
            if(executeQueryApi.length > 0){
           data[index]["project_technologie"] = executeQueryApi;
            }
            
          }
     
return data && pagination(req, res, data)
}
    else return res.status(206).json({message : "Error! fetching list Project "})
   
})

exports.deleteProject = catchAsyncError(async(req,res) => {
    const {user, permissions} = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Project",success: false });
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})
//     const already =  `Select project_link from jtcindia_projects.project_lists WHERE id = ${id} && deleted_by = '0'`
    
//     const alreadyExists = await executeQuery(already)
//     if(alreadyExists.length == 0) return res.status(206).json({message : "Project not exists",success : false})
//     const link = await alreadyExists[0].project_link
//     const params = new DeleteObjectsCommand({
//       Bucket: "jtcprojects",
//       Key: `${link}/`
//     });
    
//     // Call S3 to delete the folder
//    const pass = await s3Client.send(params)

// if(pass){
    const addProjectQuery =  `Update jtcindia_projects.project_lists SET  deleted_at = current_timestamp(), deleted_by = ${user} WHERE id = ${id}`
    const callQuery =  await executeQuery(addProjectQuery);
    if(callQuery.affectedRows > 0) return res.status(200).json({message : "Project Deleted Successfully", success : true}) 
    else return res.status(200).json({message : "Error! During Project Delete", success : false}) 
  //  }
})



function getMediaType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
  } else if (['mp4', 'mov', 'avi', 'mkv','webm'].includes(extension)) {
      return 'video';
  } else {
      return 'unknown';
  }
}


exports.listOfProjects = catchAsyncError(async(req,res) => {
  const already =  `Select id,name, project_link from jtcindia_projects.project_lists   WHERE deleted_by = '0'`
    const data = await executeQuery(already)
    return data && pagination(req, res, data)
})

exports.addFiles = catchAsyncError(async(req,res) => {
  const {user, permissions} = req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project",success: false });
  
  const {project, name} = req.body
  const fileName =  req.file  
  const findFiles = `Select id from jtcindia_projects.project_files WHERE  project_id = (SELECT id from jtcindia_projects.project_lists WHERE project_link = '${project}') && filesName = '${name}' && deleted_by = '0'`
  
  const getQuery =  await executeQuery(findFiles)

  if(getQuery.length > 0) return res.status(206).json({message : "Files Already exists", success : false})


  const addFiles = `insert into jtcindia_projects.project_files SET project_id = (SELECT id from jtcindia_projects.project_lists WHERE project_link = '${project}'), filesName = '${name}', zipName= '${fileName.originalname}', created_by = ${user}`
  const allQuery =  await executeQuery(addFiles)
 const uploadParams = new PutObjectCommand({
  Bucket: "jtcprojects",
  Key: `${project}/project/${fileName.originalname}`,
  Body: fileName.buffer,
  ContentType: fileName.mimetype
});
 const data =  await s3Client.send(uploadParams);
 if(data){

  if(allQuery.affectedRows > 0) return res.status(200).json({message : "Files Added Successfully", success : true})
  else return res.status(200).json({message : "Files Added Successfully", success : true})
}

})


exports.projectFilesList = catchAsyncError(async(req,res) => {
  const findFiles = `Select files.*, project.name from jtcindia_projects.project_files as files Left join jtcindia_projects.project_lists  as project On project.id = files.project_id  WHERE  files.deleted_by = '0'`

  const data =  await executeQuery(findFiles)
if(data.length > 0) return data && pagination(req, res, data)
else return res.status(206).json({message : "Error! fetching list Project "})
})


exports.editFiles = catchAsyncError(async(req,res) => {
  const {user, permissions} = req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project",success: false });
 
  const {project, name} = req.body
  const findFiles = `Select id from jtcindia_projects.project_files WHERE  project_id = (SELECT id from jtcindia_projects.project_lists WHERE project_link = '${project}') && filesName = '${name}' && deleted_by = '0'`
  
  const getQuery =  await executeQuery(findFiles)

  if(getQuery.length > 0) return res.status(206).json({message : "Files Already exists", success : false})
  const fileName =  req.file  
 const uploadParams = new PutObjectCommand({
  Bucket: "jtcprojects",
  Key: `${project}/project/${fileName.originalname}`,
  Body: fileName.buffer,
  ContentType: fileName.mimetype
});
 const data =  await s3Client.send(uploadParams);
 if(data){
  const addFiles = `insert into jtcindia_projects.project_files SET project_id = (SELECT id from jtcindia_projects.project_lists WHERE project_link = '${project}'), filesName = '${name}', zipName= '${fileName.originalname}', created_by = ${user}`
  const allQuery =  await executeQuery(addFiles)

  if(allQuery.affectedRows > 0) return res.status(200).json({message : "Files Added Successfully", success : true})
  else return res.status(200).json({message : "Files Added Successfully", success : true})
}
})

exports.deleteFiles = catchAsyncError(async(req,res) =>{
  const {permissions, user} = req 
  const {id} = req.params
  if(!id) return res.status(206).json({message : "Technology Not found", success : false})
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
  const insterNewLanguage = `Update  jtcindia_projects.project_technologies SET deleted_by = ${user}, deleted_at = current_timestamp() WHERE id=${id}`
  const callQuery =  await executeQuery(insterNewLanguage);
  if(callQuery.affectedRows > 0) return res.status(200).json({message : 'Project technology Deleted Successfully', success : true})
  else return res.status(206).json({message : "Error! During Delete Project Technology"})
})

