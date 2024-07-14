const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { pagination } = require("../../utils/pagination");
const { courserequirement, courceLearn } = require("../../utils/validation");


exports.addLearn = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Learn Point", status: false });
  
    const { point, about } =await req.body
    const { error } = courceLearn.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
  
        const findquery =  `select id from jtc_ecommers_course_learn WHERE point = ${point}`
  
        const executeAlready = await executeQuery(findquery)
        if (executeAlready.length > 0) return res.status(206).json({ message: "Course Learn Already Exists" })
    
          const insertQuery =  `insert into jtc_ecommers_course_learn SET point = ${point}, course_id ='${about}', created_by = ${user}`
      
        const executeAddPoint = await executeQuery(insertQuery)
        if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: " Learn Added Successfully", success: true })
        else return res.status(206).json({ message: "Error! During Point Added ", success: false })
  
  })
  
  exports.editLearn = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Learn Point", status: false });
  
    const { id } = await req.params
    if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
    const { point, about } = req.body
  
    const { error } = courceLearn.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
   
        const alreadyCategory =  `SELECT id from jtc_ecommers_course_learn WHERE point = ${point} && deleted_by = '0'`
        const executeAreadyCategory = await executeQuery(alreadyCategory);
      
        if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Learn point Already Exists", success : false})
        let addCources = [];
      let addindataBase = ''
        if(about.length > 0){
          const idOFCources = `Select id from jtc_ecommers_courses WHERE name IN (${about}) && deleted_by = '0'`
           const data = await executeQuery(idOFCources)
          if(data.length > 0){
          data.map((el) => {
            addCources.push(el.id)
          })
          addindataBase = ` course_id =  '${addCources}',`
        }
        }
       
        const editCategoryQuery =  `Update jtc_ecommers_course_learn SET point = ${point}, updated_by = ${user}, ${addindataBase} updated_at = current_timestamp()   WHERE id = ${id}`;
        const executeEditCategory = await executeQuery(editCategoryQuery)
        if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Learn point Edit Successfully", success : true})
        else return res.status(206).json({message : "Error! During Category Edit", success : false})

  })
  
  exports.learn = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Learn Points", status: false });
  
      const query =  `Select id,course_id,point from jtc_ecommers_course_learn WHERE deleted_by = '0' `

      const data = await executeQuery(query)
    
      if(data.length > 0){
        
        for (let index = 0; index < data.length; index++) {
            const courceId = data[index].course_id
                   const selectCourceNameQuery = `Select name from jtc_ecommers_courses WHERE id IN (${courceId}) && deleted_by = '0' `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
        
            if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.name)
           data[index]["courses"] = String(values);
            }
        }
   
   
        return pagination(req, res, data)
    }
      else return res.status(206).json({ message: "Error! During Fetch Points", success: false })
  
  })
  
  exports.removeLearn = catchAsyncError(async (req, res) => {
    const { id } = await req.params
    const { permissions, user } = await req
    if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Blog", status: false });
  
    if (!id) return res.status(200).json({ message: "Learn Point Not Found for Edit", success: false })
      const query =  `Update jtc_ecommers_course_learn SET  deleted_by = ${user}, deleted_at = current_timestamp() WHERE id = ${id}`
    const data = await executeQuery(query)
  
    if (data != null) return res.status(200).json({ message: "Learn Point Delete Successfully", success: true })
    else return res.status(206).json({ message: "Error! During Delete Point", success: false })
  })
  
  exports.addPrerequisite = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
    if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Requriments", status: false });
    const { requirement, about } = await req.body
    const { error } = courserequirement.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })

        const findquery =  `select id from jtc_ecommers_course_requirements WHERE requirement = ${requirement}`
  
    const executeAlready = await executeQuery(findquery)
    if (executeAlready.length > 0) return res.status(206).json({ message: "Course Prerequisite Already Exists" })

      const insertQuery =  `insert into jtc_ecommers_course_requirements SET requirement = ${requirement}, course_id ='${about}', created_by = ${user}`
  
    const executeAddPoint = await executeQuery(insertQuery)
    if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: " Prerequisite Added Successfully", success: true })
    else return res.status(206).json({ message: "Error! During Point Added ", success: false })
  })
  
  exports.editPrerequisite = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Requirements", status: false });
  
    const { id } = await req.params
    if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
    const { requirement, about } = await req.body
  
  
    const { error } = courserequirement.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
        const alreadyCategory =  `SELECT id from jtc_ecommers_course_requirements WHERE requirement = ${requirement} && deleted_by = '0'`
        const executeAreadyCategory = await executeQuery(alreadyCategory);
        if(executeAreadyCategory.length > 1) return res.status(206).json({message : "Chapter Already Exists", success : false})
        let addCources = [];
      let addindataBase = ''
        if(about.length > 0){
          const idOFCources = `Select id from jtc_ecommers_courses WHERE name IN (${about}) && deleted_by = '0'`
           const data = await executeQuery(idOFCources)
          if(data.length > 0){
          data.map((el) => {
            addCources.push(el.id)
          })
          addindataBase = ` course_id =  '${addCources}',`
        }
        }
       
        const editCategoryQuery =  `Update jtc_ecommers_course_requirements SET requirement = ${requirement} , updated_by = ${user}, ${addindataBase} updated_at = current_timestamp()   WHERE id = ${id}`;
        const executeEditCategory = await executeQuery(editCategoryQuery)
        if(executeEditCategory.affectedRows > 0) return res.status(200).json({message : "Category Edit Successfully", success : true})
        else return res.status(206).json({message : "Error! During Category Edit", success : false})
    
  })
  
  exports.prerequisite = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Requirements", status: false });
    const query =  `Select id,course_id,requirement from jtc_ecommers_course_requirements WHERE deleted_by = '0' `

    const data = await executeQuery(query)
  
    if(data.length > 0){
      
      for (let index = 0; index < data.length; index++) {
          const courceId = data[index].course_id
                 const selectCourceNameQuery = `Select name from jtc_ecommers_courses WHERE id IN (${courceId}) && deleted_by = '0' `
          const executeQueryApi = await executeQuery(selectCourceNameQuery);
      
          if(executeQueryApi.length > 0){
        const values = await executeQueryApi.map((el) => el.name)
         data[index]["courses"] = String(values);
          }
      }
 
 
      return pagination(req, res, data)
  }
    else return res.status(206).json({ message: "Error! During Fetch Points", success: false })
  })
  
  exports.removePrerequisite = catchAsyncError(async (req, res) => {
    const { permissions, user } = await req
      if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Requirements", status: false });
  
    const { id } = await req.params
    if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
      const query =  `Update jtc_ecommers_course_requirements SET  deleted_by = ${user}, deleted_at = current_timestamp() WHERE id = ${id}`
    const data = await executeQuery(query)
  
    if (data != null) return res.status(200).json({ message: "Point Delete Successfully", success: true })
    else return res.status(206).json({ message: "Error! During Delete Point", success: false })
  })


