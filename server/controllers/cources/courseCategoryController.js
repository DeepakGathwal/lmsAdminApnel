const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { pagination } = require("../../utils/pagination");
const { categorySchema, subCategorySchema } = require("../../utils/validation");

exports.addChapter =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Category",status: false });
    const {cource} =  req.query
  if (!cource) return res.status(206).json({ message: "Cource Missing", success: false })

    const {category}  =  req.body 
    const { error } = categorySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
    const alreadyCategory =  `SELECT id from jtc_course_chapter WHERE chapter_name = ${category} && category_Id IN (${cource}) && deleted_by = '0'`
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 0) return res.status(206).json({message : "Category Already Exists", success : false})
    const addCategoryQuery =  `Insert into jtc_course_chapter SET chapter_name = ${category} , category_Id = '${cource}', created_by = ${user}`
const executeAddCategor = await executeQuery(addCategoryQuery)
if(executeAddCategor.affectedRows > 0) return res.status(200).json({message : "Category Added Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Added", success : false})
})


exports.editChapter =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
    const { id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const {category, cource}  =  req.body 
    const { error } = categorySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
    const alreadyCategory =  `SELECT id from jtc_course_chapter WHERE chapter_name = ${category} && deleted_by = '0'`
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Chapter Already Exists", success : false})
    let addCources = [];
  let addindataBase = ''
    if(cource.length > 0){
      const idOFCources = `Select id from jtc_course_category WHERE category_name IN (${cource}) && deleted_by = '0'`
       const data = await executeQuery(idOFCources)
      if(data.length > 0){
      data.map((el) => {
        addCources.push(el.id)
      })
      addindataBase = ` category_Id =  '${addCources}',`
    }
    }
   
    const editCategoryQuery =  `Update jtc_course_chapter SET chapter_name = ${category} , updated_by = ${user}, ${addindataBase} updated_at = current_timestamp()   WHERE id = ${id}`;
    const executeEditCategory = await executeQuery(editCategoryQuery)
    if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Category Edit Successfully", success : true})
    else return res.status(206).json({message : "Error! During Category Edit", success : false})
})

exports.deleteChapter =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category",status: false });
    const {id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})
  
    const alreadyCategory =  `Update jtc_course_chapter SET deleted_by = ${user}, deleted_at = current_timeStamp() WHERE deleted_by = '0' && id = ${id}`
    const data = await executeQuery(alreadyCategory);
    
    if(data.affectedRows > 0) return res.status(200).json({message : "Category Delete Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Delete", success : false})
})

exports.getChapter =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Cources Chapter",status: false });
    const {cource} = await  req.query 
    let filterByCource = '';
   
    if(cource > 0){
    
        filterByCource = `&& FIND_IN_SET( ${cource},chapter.category_Id)  > 0`
    }
    const alreadyCategory = `SELECT chapter.id,chapter.chapter_name, chapter.category_Id from jtc_course_chapter as chapter Inner Join jtc_course_category as category On category.id = chapter.category_Id and category.deleted_by = '0' WHERE chapter.deleted_by = '0'  ${filterByCource} ORDER By chapter.id DESC `
   
    const data = await executeQuery(alreadyCategory);
  
    if(data.length > 0){
      
        for (let index = 0; index < data.length; index++) {
            const courceId = data[index].category_Id
                   const selectCourceNameQuery = `Select category_name from jtc_course_category WHERE id IN (${courceId}) && deleted_by = '0' `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
        
            if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.category_name)
           data[index]["categories"] = String(values);
            }
        }
   
   
        return pagination(req, res, data)
    }
    else return res.status(206).json({message : "Error! During Category Fetching", success : false})
})

exports.getTopics =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Cource Topics",status: false });
    const {id} =  req.query
   
    let filterByCategory = '';
    if(id > 0){
     
        filterByCategory = ` && FIND_IN_SET( ${id},topic.chapter_Id)  > 0 `
    }

    const alreadyCategory =  `SELECT topic.chapter_Id, topic.id, topic.topic from jtc_course_topics  as topic inner join jtc_course_chapter as chapter On topic.chapter_Id = chapter.id and chapter.deleted_by = '0'  WHERE topic.deleted_by = '0' ${filterByCategory} ORDER By topic.id DESC`
    const data = await executeQuery(alreadyCategory);
 
    if(data.length > 0){
        for (let index = 0; index < data.length; index++) {
            const courceId = data[index].chapter_Id
            const selectCourceNameQuery = `Select chapter_name from jtc_course_chapter WHERE id IN (${courceId}) && deleted_by = '0' `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
                 if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.chapter_name)
           data[index]["chapters"] = String(values);
            }
        }
    
        return pagination(req, res, data)
    }
    else return res.status(206).json({message : "Error! During Sub Category Fetching", success : false})
})

exports.addTopics =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Sub Category",status: false });
    const {category}  =  req.query 
  
    if(!category) return res.status(206).json({message : "Category Not Found", success : false})
    const {subCategory}  =  req.body 
    const { error } = subCategorySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
    const alreadyCategory =  `SELECT id from jtc_course_topics WHERE topic = ${subCategory} && chapter_Id IN (${category}) && deleted_by = '0'`
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 0) return res.status(206).json({message : "Sub Category Already Exists", success : false})
    const addCategoryQuery =  `Insert into jtc_course_topics SET topic = ${subCategory}, chapter_Id = '${category}', created_by = ${user}`
    const excuteAddQuery = await executeQuery(addCategoryQuery)
    if(excuteAddQuery.affectedRows > 0) return res.status(200).json({message : "Sub Category Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During Sub Category Added", success : false})
})

exports.editTopics =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Sub Category",status: false });
    const {id} =  req.params
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const {category} =  req.query
    const {subCategory}  =  req.body 
    const { error } = subCategorySchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message });
    const alreadyCategory =  `SELECT id from jtc_course_topics WHERE topic = ${subCategory}  && deleted_by = '0'`
    const executeAreadyCategory = await executeQuery(alreadyCategory);
    if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Sub Category Already Exists", success : false})
    let addCategory = [];
  let addindataBase = ''
    if(category.length > 0){
        const getLabel = category.toString();
    const value = getLabel.replace(/,/g, "','");
       
      const idOFCources = `Select id from jtc_course_chapter WHERE chapter_name IN ('${value}') && deleted_by = '0'`
      const data = await executeQuery(idOFCources)
      if(data.length > 0){
      data.map((el) => {
        addCategory.push(el.id)
      })
      addindataBase = ` chapter_Id = '${addCategory}',`}
    }
    const addCategoryQuery =  `Update jtc_course_topics SET topic = ${subCategory}, updated_by = ${user}, ${addindataBase}  updated_at = current_timestamp() WHERE id = '${id}'`;
    const excuteEditQuery = await executeQuery(addCategoryQuery)
    if(excuteEditQuery.affectedRows > 0) return res.status(200).json({message : "Edit SubCategory Successfully", success : true})
    else return res.status(206).json({message : "Error! During Sub Category Edit", success : false})
})


exports.deleteTopic =  catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Sub Category",status: false });
    const {id} =  req.params 
    if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

    const alreadyCategory =  `Update jtc_course_topics SET deleted_by = ${user}, deleted_at = current_timestamp()  WHERE id = '${id}' && deleted_by = '0'`
    const data = await executeQuery(alreadyCategory);
    if(data.affectedRows > 0) return res.status(200).json({message : "Sub Category Delete Successfully", success : true})
    else return res.status(206).json({message : "Error! During Sub Category Delete", success : false})
})

exports.addCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Category",status: false });
  const {category, cource}  =  req.body 
  const { error } = categorySchema.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message });
  const alreadyCategory =  `SELECT id from jtc_course_category WHERE category_name = ${category} && course_Id IN (${cource}) && deleted_by = '0'`
  const executeAreadyCategory = await executeQuery(alreadyCategory);
  if(executeAreadyCategory.length > 0) return res.status(206).json({message : "Category Already Exists", success : false})
  const addCategoryQuery =  `Insert into jtc_course_category SET category_name = ${category} , course_Id = '${cource}', created_by = ${user}`
const executeAddCategor = await executeQuery(addCategoryQuery)
if(executeAddCategor.affectedRows > 0) return res.status(200).json({message : "Category Added Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Added", success : false})
})


exports.editCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Category",status: false });
  const { id} =  req.params
  if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

  const {category, cource}  =  req.body 
  const { error } = categorySchema.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message });
  const alreadyCategory =  `SELECT id from jtc_course_category WHERE category_name = ${category} && deleted_by = '0'`
  const executeAreadyCategory = await executeQuery(alreadyCategory);
  if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Chapter Already Exists", success : false})
  let addCources = [];
let addindataBase = ''
  if(cource.length > 0){
    const idOFCources = `Select id from jtc_courses WHERE name IN (${cource}) && deleted_by = '0'`
     const data = await executeQuery(idOFCources)
    if(data.length > 0){
    data.map((el) => {
      addCources.push(el.id)
    })
    addindataBase = ` course_Id =  '${addCources}',`}
  }
 
  const editCategoryQuery =  `Update jtc_course_category SET category_name = ${category} , ${addindataBase} updated_by = ${user}, updated_at = current_timestamp()   WHERE id = ${id}`;
  const executeEditCategory = await executeQuery(editCategoryQuery)
  if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Category Edit Successfully", success : true})
  else return res.status(206).json({message : "Error! During Category Edit", success : false})
})

exports.deleteCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Category",status: false });
  const {id} =  req.params
  if(!id)  return res.status(200).json({message : "Id Not Found", success : false})

  const alreadyCategory =  `Update jtc_course_category SET deleted_by = ${user}, deleted_at = current_timeStamp() WHERE deleted_by = '0' && id = ${id}`
  const data = await executeQuery(alreadyCategory);
  
  if(data.affectedRows > 0) return res.status(200).json({message : "Category Delete Successfully", success : true})
else return res.status(206).json({message : "Error! During Category Delete", success : false})
})

exports.getCategory =  catchAsyncError(async(req,res) => {
  const { permissions, user } = req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Cources Chapter",status: false });
  const {cource} = await  req.query 
 
  let filterByCource = '';
  if(cource > 0){
  
      filterByCource = `&& FIND_IN_SET( ${cource},category.course_id)  > 0 `
  }
  
  const alreadyCategory = `SELECT category.id,category.category_name, category.course_Id from jtc_course_category as category Inner Join jtc_courses as course On course.id = category.course_Id and course.deleted_by = '0' WHERE category.deleted_by = '0' ${filterByCource} ORDER By category.id DESC `

  const data = await executeQuery(alreadyCategory)
  if(data.length > 0){
      for (let index = 0; index < data.length; index++) {
          const courceId = data[index].course_Id
                 const selectCourceNameQuery = `Select name from jtc_courses WHERE id IN (${courceId}) && deleted_by = '0' `
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