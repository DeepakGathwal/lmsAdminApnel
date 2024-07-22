const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");


exports.form_abouts = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch form_abouts", status: false });
    const alreadyExists =  `Select * from jtc_form_list ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch form_abouts", success: false})
})


exports.addform_status = catchAsyncError(async(req,res) => {
    const {status} = await req.body
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  form status", status: false });
    const alreadyExists =  `Select id from jtc_form_status WHERE enquiry_status = ${status}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "form status Already Exists"})
    const addNewform_about =  `Insert into jtc_form_status SET enquiry_status = ${status}`
    const executeAddform_about = await executeQuery(addNewform_about);
    if(executeAddform_about.affectedRows > 0) return res.status(200).json({message : " form status Added Successfully", success: true})
    else return res.status(206).json({message : "Error! During form status Added ", success: false}) 
})

exports.editform_status = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit form status", status: false });
    const {status} =await req.body
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "form status Not Found for Edit", success : false})
    const alreadyExists =  `Select id from jtc_form_status WHERE enquiry_status = ${status}`
    const executeAlready =  await executeQuery(alreadyExists)
    if(executeAlready.length > 0) return res.status(206).json({message : "form status Already Exists"})
    const editNewform_about =  `Update jtc_form_status SET enquiry_status = ${status} WHERE id = ${id}`
    const executeform_about = await executeQuery(editNewform_about);
    if(executeform_about.affectedRows > 0) return res.status(200).json({message : "form status Edit Successfully", success: true})
    else return res.status(206).json({message : "Error! During form status Edit ", success: false})    
})

exports.form_status = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch form status", status: false });
    const alreadyExists =  `Select * from jtc_form_status ORDER By id DESC`
    const data =  await executeQuery(alreadyExists)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! During Fetch form status", success: false})
})

exports.removeStatus = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete form status", status: false });
    const {id} = req.params 
    if(!id)  return res.status(206).json({message : "form status Not Found for Edit", success : false})
    const alreadyExists =  `Delete from jtc_form_status WHERE id = ${id}`
    const data =  await executeQuery(alreadyExists)
    if(data.affectedRows > 0) return res.status(200).json({message : "form status Delete Successfully", success: true})
    else return res.status(206).json({message : "Error! During Delete form status", success: false})
})






exports.enquiryformData = catchAsyncError(async(req,res) => {
    const {startDate,endDate, month} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
   
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype, course.name as course, enquiry.company, enquiry.desigination, enquiry.feedback from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_courses as course On course.id = enquiry.course and course.deleted_by = '0'  WHERE  enquiry.form_id  = '1' ${filterByDate} ${filterByMonth} ORDER By enquiry.id DESC`
    const data =  await executeQuery(query)

    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})

exports.downloadCurriculumData = catchAsyncError(async(req,res) => {
    const {startDate,endDate, month} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
   
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype, course.name as course, enquiry.feedback from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_courses as course On course.id = enquiry.course and course.deleted_by = '0' WHERE  enquiry.form_id  = '5' ${filterByDate} ${filterByMonth} ORDER By enquiry.id DESC`
    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})

exports.projectData = catchAsyncError(async(req,res) => {
    const {startDate,endDate, month} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
   
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype, course.name as course, enquiry.feedback from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtcindia_projects.project_lists as course On course.id = enquiry.course and course.deleted_by = '0' WHERE  enquiry.form_id  = '6' ${filterByDate} ${filterByMonth} ORDER By enquiry.id DESC`
    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})

exports.hireUsformData = catchAsyncError(async(req,res) => {
    const {startDate,endDate, month} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
   
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype,course.name as course, enquiry.company, enquiry.desigination, enquiry.feedback from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_courses as course On course.id = enquiry.course and course.deleted_by = '0'  WHERE enquiry.form_id = '2' ${filterByDate} ${filterByMonth} ORDER By enquiry.id DESC`
     const data =  await executeQuery(query)

    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})

exports.enrollFormData = catchAsyncError(async(req,res) => {
    const {startDate,endDate, month, course} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    let filterByCourse = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
    if(course) filterByCourse = ` &&  enquiry.course = '${course}'`
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype,course.name as course, enquiry.company, enquiry.desigination, enquiry.feedback, batches.date as batchDate, batches.time_from as batchtimestart, batches.time_to as batchtimeend,  batches.week_days as week_days from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_courses as course On course.id = enquiry.course and course.deleted_by = '0'  Left Join jtc_batches as batches On batches.id = enquiry.batch AND enquiry.batch  > 0 WHERE enquiry.form_id = '4' ${filterByCourse} ${filterByDate} ${filterByMonth} ORDER By enquiry.id DESC`
    const data =  await executeQuery(query)

    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})

exports.joinFormData = catchAsyncError(async(req,res) => {
    const {startDate,endDate} =  await req.query 
    let filterByDate = ``  
    if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select fromType.form_about as formtype,enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,role.role as desigination,  enquiry.feedback from jtc_enquiry_form as enquiry Inner Join  jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_roles as role On role.id = enquiry.course and role.deleted_by = '0' WHERE  enquiry.form_id  = '3' ${filterByDate}  ORDER By enquiry.id DESC`
   
    const data =  await executeQuery(query)
    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})


exports.allForms = catchAsyncError(async(req,res) => {
     const {month,startDate,endDate} =  await req.query 
    let filterByDate = ``  
    let filterByMonth = ``  
    if(month) filterByMonth = ` && Date_Format(enquiry.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`

if(startDate && endDate ) filterByDate = `&& Date_Format(enquiry.created_at, '%d-%m-%Y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    const query = `Select enquiry.name, enquiry.id, enquiry.phone_number, fromStatus.enquiry_status,enquiry.email,Date_Format(enquiry.created_at, '%d-%m-%Y') as enquiryDate, TIME_FORMAT(enquiry.created_at, "%H:%i:%s") as enquiryTime,fromType.form_about as formtype,course.name course, enquiry.company, enquiry.desigination, enquiry.feedback, batches.date as batchDate, batches.time_from as batchtimestart, batches.time_to as batchtimeend,  batches.week_days as week_days from jtc_enquiry_form as enquiry Inner Join jtc_form_list as fromType On enquiry.form_id = fromType.id Left Join jtc_form_status as fromStatus On enquiry.status = fromStatus.id Inner Join jtc_courses as course On course.id = enquiry.course and course.deleted_by = '0' Left Join jtc_batches as batches On batches.id = enquiry.batch AND enquiry.batch  > 0 WHERE enquiry.name is not null &&  enquiry.form_id  != '3'  ${filterByMonth}  ${filterByDate} ORDER By enquiry.id DESC`
  
    const data =  await executeQuery(query)
  
    if(data.length > 0) return pagination(req,res,data)
    else return res.status(206).json({message : "Error! During Fetching Data", success: false})
})









exports.addFeedBack = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {feedback} = await req.body
    const {id} = req.params
    if(!id)  return res.status(206).json({message : "Enquiry Not Found", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit form FeedBack", status: false });
    const query = `Update jtc_enquiry_form SET feedback = ${feedback} WHERE id = '${id}'`
    const feedBackEdit = await executeQuery(query)
    if(feedBackEdit.affectedRows > 0) return res.status(200).json({message : "FeedBack Added Successfully", success : true})
    else return res.status(206).json({message : "Error! During Adding FeedBack", success: false})
})



exports.changeStatus = catchAsyncError(async(req,res) => {
    const { permissions, user } = req
    const {status} = await req.body
    const {id} = req.params
    if(!id)  return res.status(206).json({message : "Enquiry Not Found", success : false})
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit form FeedBack", status: false });
    const query = `Update jtc_enquiry_form SET status = (SELECT id from  jtc_form_status WHERE enquiry_status = ${status}) WHERE id = '${id}'`
    const feedBackEdit = await executeQuery(query)

    if(feedBackEdit.affectedRows > 0) return res.status(200).json({message : "Staus Change Successfully", success : true})
    else return res.status(206).json({message : "Error! During Changing Status", success: false})
})