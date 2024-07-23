const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { pagination } = require("../../utils/pagination");
const { categorySchema, topicSchema } = require("../../utils/validation");

exports.addTutorial = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Tutorial",success: false });
    const { error } = await topicSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
    const {html, css, category_id,cource_id,heading , meta_tags, meta_keywords, meta_description, meta_title} = req.body 
    
     if(!cource_id && !category_id) return res.status(206).json({message : "Category and Cource Both needed to add a tutorial", success : false})
    const already = `Select id from jtc_tutorials_topics WHERE cource_id = ${cource_id} && category_Id = ${category_id} && heading = ${heading} && deleted_by = '0'`
    const findAlready = await executeQuery(already)
    if(findAlready.length > 0) return res.status(206).json({message : "Heading Already Exists", success : false})
    
      const categorytName = `Select category_name from jtc_tutorial_chapter WHERE id = ${category_id} && deleted_by = '0'`

      const getCate = await executeQuery(categorytName)
      const category = getCate && getCate[0].category_name

      const  link = await `${category}-${heading}`.replaceAll("'", "").replaceAll(" ", "-").toLowerCase()
    const addTutorialQuery = `Insert into jtc_tutorials_topics SET created_at = current_timestamp(),created_by = ${user}, cource_id = ${cource_id}, category_Id = ${category_id},  heading = ${heading},  meta_tags = ${meta_tags}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description}, meta_title = ${meta_title}, tutorial_html = ${html}, tutorial_css = ${css}, link = '${link}'`
    const executeAddTutorialQuery = await executeQuery(addTutorialQuery);
    if(executeAddTutorialQuery.affectedRows > 0) return res.status(200).json({message : "Tutorial Added Successfully", success : true});
    return res.status(206).json({message : "Error! During Tutorial Added ", success : false})
})

exports.editTutorial = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create New Tutorial",success: false });
    const {html,css,category, cource, heading, meta_tags, meta_keywords, meta_description, meta_title} = req.body 
    const {id} = req.params
    if(!id) return res.status(206).json({message : "Data Not Found", success : false})

    const already = `Select id from jtc_tutorials_topics WHERE heading = ${heading} && cource_id = (Select id from jtc_tutorial_cources WHERE name = ${cource} LIMIT 1) && category_Id =  ${category} && deleted_by = '0'`
    const findAlready = await executeQuery(already)
    if(findAlready.length > 1) return res.status(206).json({message : "Heading Already Exists", success : false})
    const  link = await `${category}-${heading}`.replaceAll("'", "").replaceAll(" ", "-").toLowerCase()
    const addTutorialQuery = `Update jtc_tutorials_topics SET cource_id = (Select id from jtc_tutorial_cources WHERE name = ${cource} && deleted_by = '0') , category_Id = (Select id from jtc_tutorial_chapter WHERE category_name = ${category} && deleted_by = '0'),updated_at = current_timestamp() ,updated_by = ${user}, heading = ${heading},  meta_tags = ${meta_tags}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description}, meta_title = ${meta_title}, tutorial_html = ${html}, tutorial_css = ${css}, link = '${link}' WHERE id = ${id} && deleted_by = '0'`
    const executeAddTutorialQuery = await executeQuery(addTutorialQuery);
    if(executeAddTutorialQuery.affectedRows > 0) return res.status(200).json({message : "Tutorial Updated Successfully", success : true});
    return res.status(206).json({message : "Error! During Tutorial Edit", success : false})
})

exports.getHeadings = catchAsyncError(async(req,res) =>{
    const {permissions} = req 
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Create New Tutorial",success: false });
    const already = `Select courses.name as course,courseType.category as courceType,chapter.category_name as chapter, tutorial.id,tutorial.heading  from jtc_tutorials_topics as tutorial Inner JOIN jtc_tutorial_chapter as chapter On chapter.id = tutorial.category_id and chapter.deleted_by = '0' Inner JOIN jtc_tutorial_cources as courses On courses.id = tutorial.cource_id && courses.deleted_by = '0' Inner JOIN jtc_tutorial_type as courseType On courseType.id = courses.category WHERE tutorial.deleted_by = '0' ORDER By tutorial.id DESC`
    const data = await executeQuery(already)
    if(data.length > 0) return pagination(req, res, data)
    return res.status(206).json({message :"Error! Tutorial Fetched", success : false})
})


exports.getTutorial = catchAsyncError(async (req,res) =>{
  const {permissions} = req 
  const {id} = req.params 
  if(!id) return res.status(206).json({message : "Data Not Found", success : false})
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Create New Tutorial",success: false });
  const already = `Select cources.name as cources,typeCources.category as courceType, categories.category_name as category,team.name as creator,tutorial.heading ,tutorial.tutorial_html,tutorial.tutorial_css , tutorial.meta_tags, tutorial.meta_keywords, tutorial.meta_description, tutorial.meta_title from jtc_tutorials_topics as tutorial 
   LEFT JOIN jtc_team as team On team.id = tutorial.created_by
  Inner JOIN jtc_tutorial_chapter as categories  On categories.id = tutorial.category_id and categories.deleted_by = '0'
   Inner JOIN jtc_tutorial_cources as cources On cources.id = tutorial.cource_id and cources.deleted_by = '0'
   Inner JOIN jtc_tutorial_type as typeCources On typeCources.id = cources.category
  WHERE tutorial.deleted_by = '0' && tutorial.id = '${id}'`
  const data = await executeQuery(already)

  if(data.length > 0) return res.status(200).json({data , success : true})
  return res.status(206).json({message :"Error! Tutorial Fetched", success : false})
})

exports.deleteTutorial = catchAsyncError(async(req,res) =>{
    const {permissions, user} = req 
    const {id} =  req.params 
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Create New Tutorial",success: false });
    const already = `Update jtc_tutorials_topics SET deleted_by = ${user}, deleted_at = current_timestamp() WHERE id = ${id} && deleted_by = '0'`
    const data = await executeQuery(already)
    if(data.affectedRows > 0) return res.status(200).json({message : "Tutorial Deleted Successfully", success : true})
    return res.status(206).json({message :"Error! Tutorial Fetched", success : false})
})


exports.addCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Category",status: false });
  const {cource} = await req.query

  if(!cource) return res.status(206).json({message : "Cource Not Found",success : false})
  const {category}  = await req.body 
  const { error } = categorySchema.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message });
  const alreadyCategory =  `SELECT id from jtc_tutorial_chapter WHERE category_name = ${category} && cource_id IN ('${cource}') && deleted_by = '0'`
  const executeAreadyCategory = await executeQuery(alreadyCategory);
  if(executeAreadyCategory.length > 0) return res.status(206).json({message : "Category Already Exists", success : false})
  const addCategoryQuery =  `Insert into jtc_tutorial_chapter SET category_name = ${category}, cource_id = '${cource}', created_by = ${user}`
const executeAddCategor = await executeQuery(addCategoryQuery)
if(executeAddCategor.affectedRows > 0) return res.status(200).json({message : "Category Added Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Added", success : false})
})


exports.editCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
    const {cource} = await req.query
  
    const { id} =  req.params
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    const {category}  =  req.body 
    const { error } = categorySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
  
    const alreadyCategory =  `SELECT id from jtc_tutorial_chapter WHERE category_name = ${category} && deleted_by = '0'`
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Chapter Already Exists", success : false})
    let addCources = [];
    let addindataBase = ''
    if(cource.length > 0){
        const getLabel = cource.toString();
    const value = getLabel.replace(/,/g, "','");
       
      const idOFCources = `Select id from jtc_tutorial_cources WHERE name IN ('${value}') && deleted_by = '0'`
      const data = await executeQuery(idOFCources)
     
      if(data.length > 0){
      data.map((el) => {
        addCources.push(el.id)
      })
    
      addindataBase = ` cource_id = '${addCources}',`
    }
    }
    
    const editCategoryQuery =  `Update jtc_tutorial_chapter SET category_name = ${category} , ${addindataBase} updated_by = ${user}, updated_at = current_timestamp()   WHERE id = ${id}`;
    const executeEditCategory = await executeQuery(editCategoryQuery)
    if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Category Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! During Category Edit", success : false})
})



exports.deleteCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category",status: false });
  const {id} =  req.params
  if(!id)  return res.status(200).json({message : "Id Not Found", success : false})
  const alreadyCategory =  `Update jtc_tutorial_chapter SET deleted_by = ${user}, deleted_at = current_timeStamp() WHERE deleted_by = '0' && id = ${id}`
  const data = await executeQuery(alreadyCategory);
  
  if(data.affectedRows > 0) return res.status(200).json({message : "Category Delete Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Delete", success : false})
})



exports.getCategory =  catchAsyncError(async(req,res) => {
 
  const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Cources Chapter",status: false });
    const {cource} =  await req.query
  
    let filterByCource = '';
    if(cource > 0){
        filterByCource = `&& FIND_IN_SET( ${cource},cource_id)  > 0 `
    }
    const alreadyCategory = `SELECT id,category_name, cource_Id from jtc_tutorial_chapter WHERE deleted_by = '0'  ${filterByCource} ORDER By id DESC`
    const data = await executeQuery(alreadyCategory);

    if(data.length > 0){
        for (let index = 0; index < data.length; index++) {
            const courceId = data[index].cource_Id
                   const selectCourceNameQuery = `Select name from jtc_tutorial_cources WHERE id IN (${courceId}) && deleted_by = '0' `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
                 if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.name)
           data[index]["cources"] = String(values);
            }
        }
        return pagination(req, res, data)
    }
    else return res.status(206).json({message : "Error! During Category Fetching", success : false})
})

