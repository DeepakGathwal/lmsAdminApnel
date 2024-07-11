const { executeQuery } = require("../../conn/db");
const { pagination } = require("../../utils/pagination");
const catchAsyncError = require("../../middelwares/catchAsyncError");


exports.addLanguage = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Language",success: false });
    const {language} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_languages WHERE language = ${language}`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "Language Already Exists", success : false})
    const insterNewLanguage = `Insert into jtcindia_projects.project_languages Set language = ${language}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Language Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During add Project Language"})

})

exports.editLanguage = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create Edit exiting project language",success: false });

    const {language} = await req.body
    const {id} = req.params
    if(!id) return res.status(206).json({message : "Language Not found", success : false})
    const findExits =  `Select id from jtcindia_projects.project_languages WHERE language = ${language}`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "Language Already Exists", success : false})
    const insterNewLanguage = `Update jtcindia_projects.project_languages Set language = ${language} WHERE id = ${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Language Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During edit Project Language"})
})

exports.allLanguage = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });

    const insterNewLanguage = `Select * from jtcindia_projects.project_languages`
    const data =  await executeQuery(insterNewLanguage);
    if(data.length > 0)  return pagination(req, res, data)
        else return res.status(206).json({message : "Error! fetching list Project Language"})
})

exports.deleteLanguage = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    const {id} = req.params
    if(!id) return res.status(206).json({message : "Language Not found", success : false})
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
    const insterNewLanguage = `Delete from jtcindia_projects.project_languages WHERE id=${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.length > 0) return res.status(200).json({message : "Language Deleted Successfully", success : true})
    else return res.status(206).json({message : "Error! During Delete Project Language", success : false})
})

exports.addtech = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Project Language",success: false });

    const {languages, technology} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_technologies WHERE technology = ${technology} && deleted_by = '0'`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 0) return res.status(206).json({message : "Technology Already Exists", success : false})
    const insterNewLanguage = `Insert into jtcindia_projects.project_technologies Set technology = ${technology}, language_id = '${languages}',created_by = ${user}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Technology Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During add Project Technology"})

})



exports.edittech = catchAsyncError(async(req,res) =>{
       const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const {languages, technology} = await req.body
    const findExits =  `Select id from jtcindia_projects.project_technologies WHERE technology = ${technology} && deleted_by = '0'`
    const getExists =  await executeQuery(findExits)
    if(getExists.length > 1) return res.status(206).json({message : "Technology Already Exists", success : false})
        let addLanguages = [];
  let addindataBase = ''
    if(languages.length > 0){
      const idOFCources = `Select id from jtcindia_projects.project_languages WHERE language IN (${languages})`
       const data = await executeQuery(idOFCources)
      if(data.length > 0){
      data.map((el) => {
        addLanguages.push(el.id)
      })
      addindataBase = ` language_id =  '${addLanguages}',`
    }
    }
    const insterNewLanguage = `UPDATE jtcindia_projects.project_technologies SET technology = ${technology},  ${addindataBase} updated_by = ${user}, updated_at = current_timestamp() WHERE id = ${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows) return res.status(200).json({message : "Project Technology Updated Successfully", success : true})
    else return res.status(206).json({message : "Error! During edit Project Technology"})
})




exports.deletetech = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    const {id} = req.params
    if(!id) return res.status(206).json({message : "Technology Not found", success : false})
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
    const insterNewLanguage = `Update  jtcindia_projects.project_technologies SET deleted_by = ${user}, deleted_at = current_timestamp() WHERE id=${id}`
    const callQuery =  await executeQuery(insterNewLanguage);
    if(callQuery.affectedRows > 0) return res.status(200).json({message : 'Project technology Deleted Successfully', success : true})
    else return res.status(206).json({message : "Error! During Delete Project Technology"})
})



exports.alltech = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to get all project language list",success: false });
    const {language} = req.query
    let filterByCource = '';
   
    if(language > 0){
    
        filterByCource = `&& FIND_IN_SET( ${language},language_id)  > 0`
    }
        const allTechnology = `Select id, technology, language_id from jtcindia_projects.project_technologies WHERE deleted_by = '0' ${filterByCource} `
   
    const data = await executeQuery(allTechnology);
   
    if(data.length > 0) {
            for (let index = 0; index < data.length; index++) {
            const languageId = data[index].language_id
                   const langguageName = `Select language from jtcindia_projects.project_languages WHERE id IN (${languageId}) `
            const executeQueryApi = await executeQuery(langguageName);
        
            if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.language)
           data[index]["language"] = String(values);
            }
        }
    
    return pagination(req, res, data)
}
        else return res.status(206).json({message : "Error! fetching list Project Technology"})
})
