
const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { getDataUri } = require("../../utils/imageHandeler");
const { pagination } = require("../../utils/pagination");
const {  chooseSectionSchema, faqsSchema } = require("../../utils/validation");

/** create a new why choose us Section 
 * Section must be diffrent every time
*/
exports.addSections = catchAsyncError(async(req,res) => {
  const { permissions, user } = await req
  if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Section", status: false });
    const {section, heading, details, component_name} = await req.body 
   
    const { error } =  chooseSectionSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })

        const findSection =  `Select id from jtc_ecommers_sections  WHERE component_name = ${component_name} && heading = ${heading} && deleted_by = '0'`
        const executeAlready =  await executeQuery(findSection)
        if(executeAlready.length > 0) return res.status(206).json({message : "Section Already Exists"})
            let images = ``;
        let fileImage = [] 
        if (req.files) {
          const icon = req.files
          await Promise.all(icon.map(async (el) => {
              const data = await getDataUri(el);
              fileImage.push(data);
          }));
          images = `, images = '${fileImage}'`
      }

   
        const addSection =  `Insert into jtc_ecommers_sections SET details = ${details},component_name = ${component_name},heading = ${heading}, section = ${section}, created_by = ${user} ${images}`
     const executeAddSection = await executeQuery(addSection)
    if(executeAddSection.affectedRows > 0) return res.status(200).json({message : "Section Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During Section Added ", success: false}) 
})

/** edit a Section of already exists */
exports.editSections = catchAsyncError(async(req,res) => {
  const {id} = await req.params
  if(!id)  return res.status(200).json({message : "Section Not Found for Edit", success : false})

  const { permissions, user } = await req
  if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Section", status: false });
    const {section, heading, details, component_name} = await req.body
    const { error } =  chooseSectionSchema.validate(req.body);
    if (error)
      return res
        .status(206)
        .json({ status: false, message: error.details[0].message })
    const findSection =  `Select id from jtc_ecommers_sections  WHERE component_name = ${component_name} && heading = ${heading} && deleted_by = '0'`
    const executeAlready =  await executeQuery(findSection)
    if(executeAlready.length > 1) return res.status(206).json({message : "Section Already Exists"})
        let images = ``;
      let fileImage = [] 
      if (req.files) {
        const icon = await req.files
        icon.length > 0 &&    await Promise.all(icon.map(async (el) => {
            const data = await getDataUri(el);
            fileImage.push(data);
        }));
       
        if(icon.length > 0)   images = `, images = '${fileImage}'`
    }

    const updateSection =  `Update  jtc_ecommers_sections SET details = ${details},component_name = ${component_name},heading = ${heading}, section = ${section},updated_at = current_timestamp(), updated_by = ${user} ${images} WHERE id = ${id}`

     const executeAddSection = await executeQuery(updateSection)
    if(executeAddSection.affectedRows > 0) return res.status(200).json({message : "Section Updated Successfully", success: true})
    else return res.status(206).json({message : "Error! During Section Added ", success: false})})

/** all Sections list function */
exports.Sections = catchAsyncError(async(req,res) => {
  const { permissions, user } = await req
  if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Section", status: false });

    const query = `Select * from jtc_ecommers_sections WHERE deleted_by = '0' order by id desc`

    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch Sections", success: false})
})


/** delete a Section by id */
exports.removeSections = catchAsyncError(async(req,res) => {
     const {id} = await req.params 
     const { permissions, user } = await req
     if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Section", status: false });
   
    if(!id)  return res.status(200).json({message : "Section Not Found for Edit", success : false})
        const deleteQuery =  `Update  jtc_ecommers_sections SET deleted_at = current_timestamp(), deleted_by = ${user} WHERE id = ${id} && deleted_by = '0'`
    
    const data =  await executeQuery(deleteQuery)
    if(data.affectedRows > 0) return res.status(200).json({message : "Section Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete Section", success: false})
})


exports.addFaqs = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
    if (permissions.can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Faqs", status: false });
  const { point, description, about } = await req.body

  const { error } = faqsSchema.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message })
  const findSection =  `Select id from jtc_ecommers_faqs  WHERE point = ${point} && description = ${description} && deleted_by = '0'`

  const executeAlready = await executeQuery(findSection)
  if (executeAlready.length > 0) return res.status(206).json({ message: "Point Already Exists" })

  const addFaqs =  `Insert into jtc_ecommers_faqs SET description = ${description}, point = ${point}, faqs_about=${about}, created_by = ${user}`
  const executeAddPoint = await executeQuery(addFaqs)
  if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: "FAQS Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During FAQS Added ", success: false })
})


exports.editFaqs = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions.can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Blog", status: false });

  const { id } =await req.params
  if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
  const { point, description, about } = req.body
  const { error } = faqsSchema.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message })
      const findSection =  `Select id from jtc_ecommers_faqs  WHERE point = ${point} && description = ${description} && deleted_by = '0'`

      const executeAlready = await executeQuery(findSection)
  if (executeAlready.length > 1) return res.status(206).json({ message: "FAQS Already Exists" })
    let addCources = [];
  let addindataBase = ''
  if (about.length > 0) {
    const idOFCources = `Select id from jtc_ecommers_courses WHERE name IN (${about}) && deleted_by = '0'`
    const data = await executeQuery(idOFCources)
    if (data.length > 0) {
      data.map((el) => {
        addCources.push(el.id)
      })
      addindataBase = ` faqs_about =  '${addCources}',`
    }
  }

  const editCategoryQuery = `Update jtc_ecommers_faqs SET description = ${description}, point = ${point},  updated_by = ${user}, ${addindataBase} updated_at = current_timestamp()   WHERE id = ${id}`;
  const executeEditCategory = await executeQuery(editCategoryQuery)
  if (executeEditCategory.affectedRows > 0) return res.status(200).json({ message: "Learn point Edit Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Category Edit", success: false })

})


exports.faqs = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Blog", status: false });

    const findSection =  `Select point, description, faqs_about, id from jtc_ecommers_faqs  WHERE  deleted_by = '0'`
    const data =  await executeQuery(findSection)
    if (data.length > 0) {

      for (let index = 0; index < data.length; index++) {
        const courceId = data[index].faqs_about
        const selectCourceNameQuery = `Select name from jtc_ecommers_courses WHERE id IN (${courceId}) && deleted_by = '0' `
        const executeQueryApi = await executeQuery(selectCourceNameQuery);
  
        if (executeQueryApi.length > 0) {
          const values = await executeQueryApi.map((el) => el.name)
          data[index]["faqs_about"] = String(values);
        }
      }
  
  
      return pagination(req, res, data)
    } else return res.status(206).json({ message: "Error! During Fetch Points", success: false })
  
})


exports.removeFaqs = catchAsyncError(async (req, res) => {
  const { id } = await req.params
  const { permissions, user } = await req
  if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Faqs", status: false });

  if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
    const query =  `Update jtc_ecommers_faqs Set deleted_at = current_timestamp(), deleted_by = ${user} WHERE id = ${id} && deleted_by = '0'`
  const data = await executeQuery(query)
  if (data.affectedRows > 0) return res.status(200).json({ message: "Point Delete Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Delete Point", success: false })
})
