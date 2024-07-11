const { executeQuery } = require("../../conn/db");
const { pagination } = require("../../utils/pagination");
const catchAsyncError = require("../../middelwares/catchAsyncError");


exports.addTopic = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Topic",success: false });
    const {topic} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_topics WHERE topic = ${topic}`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "topic Already Exists", success : false})
    const insterNewLanguage = `Insert into jtcindia_projects.project_topics Set topic = ${topic}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project topic Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During add Project topic"})

})

exports.editTopic = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create Edit exiting project topic",success: false });
    const {topic} = await req.body
    const {id} = req.params
    if(!id) return res.status(206).json({message : "topic Not found", success : false})
    const findExits =  `Select id from jtcindia_projects.project_topics WHERE topic = ${topic}`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "topic Already Exists", success : false})
    const insterNewLanguage = `Update jtcindia_projects.project_topics Set topic = ${topic} WHERE id = ${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project topic Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During edit Project topic"})
})

exports.allTopic = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to get all project topic list",success: false });

    const insterNewLanguage = `Select * from jtcindia_projects.project_topics`
    const data =  await executeQuery(insterNewLanguage);
    if(data.length > 0)  return pagination(req, res, data)
        else return res.status(206).json({message : "Error! fetching list Project topic"})
})

exports.deleteTopic = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    const {id} = req.params
    if(!id) return res.status(206).json({message : "topic Not found", success : false})
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to get all project topic list",success: false });
    const insterNewLanguage = `Delete from jtcindia_projects.project_topics WHERE id=${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.length > 0)  return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Delete Project topic"})
})

exports.addTopicPoint = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Language",success: false });
    const {  topic, project, heading, description} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_topic_point WHERE point_details = ${description} && point_heading = ${heading} && deleted_by = '0'`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "Technology Already Exists", success : false})
    const insterNewLanguage = `Insert into jtcindia_projects.project_topic_point Set project_id = '${project}',project_topic = (SELECT id from jtcindia_projects.project_topics WHERE topic = ${topic}),point_details = ${description}, point_heading = ${heading},created_by = ${user}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Technology Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During add Project Technology"})

})

exports.editTopicPoint = catchAsyncError(async(req,res) =>{
       const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})
    const {  topic, project, heading, description} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_topic_point WHERE point_details = ${description} && point_heading = ${heading} && deleted_by = '0'`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 1) return res.status(206).json({message : "Technology Already Exists", success : false})
        let addProjects = [];
  let addindataBase = ''
    if(project.length > 0){
      const idOFCources = `Select id from jtcindia_projects.project_lists WHERE name IN (${project})`
       const data = await executeQuery(idOFCources)
      if(data.length > 0){
      data.map((el) => {
        addProjects.push(el.id)
      })
      addindataBase = ` project_id =  '${addProjects}',`
    }
    }
    const insterNewLanguage = `UPDATE jtcindia_projects.project_topic_point SET  project_topic = (SELECT id from jtcindia_projects.project_topics WHERE topic = ${topic}),point_details = ${description}, point_heading = ${heading},  ${addindataBase} updated_by = ${user}, updated_at = current_timestamp() WHERE id = ${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Topic Point Updated Successfully", success : true})
    else return res.status(206).json({message : "Error! During edit Project Technology"})
})

exports.deleteTopicPoint = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    const {id} = req.params
    if(!id) return res.status(206).json({message : "Topic Point Not found", success : false})
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
    const insterNewLanguage = `Update  jtcindia_projects.project_topic_point SET deleted_by = ${user}, deleted_at = current_timestamp() WHERE id=${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows > 0) return res.status(200).json({message : 'Project Topic Point Deleted Successfully', success : true})
    else return res.status(206).json({message : "Error! During Delete Project Technology"})
})

exports.allTopicPoint = catchAsyncError(async(req,res) =>{
   
    const {permissions} = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
    const {project} = req.query
    let filterByCource = '';
   
    if(project > 0){
        filterByCource = `&& FIND_IN_SET(${project},point.project_id)  > 0`
    }
        const allTechnology = `Select point.id,topic.topic, point.project_id, point.point_heading as heading, point.point_details as description from jtcindia_projects.project_topic_point as point Left Join jtcindia_projects.project_topics as topic On point.project_topic = topic.id WHERE point.deleted_by = '0' ${filterByCource} `
    const data = await executeQuery(allTechnology);
    if(data.length > 0) {
            for (let index = 0; index < data.length; index++) {
            const projectId = data[index].project_id
                   const projectName = `Select name from jtcindia_projects.project_lists WHERE id IN (${projectId}) `
            const executeQueryApi = await executeQuery(projectName);
        
            if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.name)
           data[index]["project"] = String(values);
            }
        }
    
    return pagination(req, res, data)
}
        else return res.status(206).json({message : "Error! fetching list Project Technology"})
})
