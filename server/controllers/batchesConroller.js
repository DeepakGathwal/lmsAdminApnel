const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { batchValidation } = require("../utils/validation");


// Add a batch api function
exports.addBatches = catchAsyncError(async (req, res) => {
  const { date, time_from, course_id, time_to, week_days } = await req.body
  const { error } = await batchValidation.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message });
  const { permissions, user } = req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create  Point", status: false });
  const alreadyExists = `Select id from jtc_batches WHERE course_id = ${course_id} && date = ${date} && time_from  = ${time_from} && time_to = ${time_to}  && week_days = ${week_days}`
  const executeAlready = await executeQuery(alreadyExists)
  if (executeAlready.length > 0) return res.status(206).json({ message: "Batch  Already Exists With Same Date , Time and same course" })
  const addNewBatch = `Insert into jtc_batches SET course_id = ${course_id}, date = ${date}, time_from = ${time_from}, time_to = ${time_to}, week_days = ${week_days}, created_by = ${user} `
  const executeAddBatch = await executeQuery(addNewBatch);
  if (executeAddBatch.affectedRows > 0) return res.status(200).json({ message: "Batch Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Point Added ", success: false })
})

// edit a batch api function
exports.editBatches = catchAsyncError(async (req, res) => {
  const { permissions, user } = req
  const { id } = await req.query 
  const { error } = await batchValidation.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message });
  if (!id) return res.status(206).json({ message: "Id Missing", success: false })
  if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Create  Point", status: false });
  const { date, time_from, course_id, time_to, week_days } = await req.body 

  const alreadyExists = `Select id from jtc_batches WHERE course_id = (Select id from jtc_courses WHERE name = ${course_id}) &&  date = ${date} && time_from  = ${time_from} && time_to = ${time_to}  && week_days = ${week_days}`
  const executeAlready = await executeQuery(alreadyExists)
  if (executeAlready.length > 1) return res.status(206).json({ message: "Batch  Already Exists With Same Date , Time and same course" })
  const addNewBatch = `update  jtc_batches SET course_id = (Select id from jtc_courses WHERE name = ${course_id}), date = ${date}, time_from = ${time_from}, time_to = ${time_to}, week_days = ${week_days}, updated_by = ${user}, updated_at = current_timestamp() WHERE id = ${id}`

  const executeAddBatch = await executeQuery(addNewBatch);
  if (executeAddBatch.affectedRows > 0) return res.status(200).json({ message: "Batch Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Point Added ", success: false })
})


// list of  all batch api function
exports.batches = catchAsyncError(async (req, res) => {
  const { permissions, user } = req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Fetch Points", status: false });
  const { id,startDate , endDate, month, course } = await await req.query  
  let findById = ''
  if (id) {
    findById = `&& batch.id = ${id}`
  }
  let filterByMonth = ''
  let filterByCourse = ''
  if(course > 0) filterByCourse = `&& batch.course_id = ${course}`
  if(month) filterByMonth = ` && Date_Format(batch.date, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
  let filterByDate = ``
  if(startDate  && endDate  ) filterByDate = ` && batch.date Between '${startDate} 00:00:00' AND '${endDate} 23:59:59'`
  const alreadyExists = `Select team.name,batch.id as id, Date_Format(batch.date, '%d-%m-%y %h:%i:%s %p') as date, batch.time_from,course.name  as course, batch.time_to,batch.week_days from jtc_batches as batch LEFT JOIN jtc_team as team On team.id = batch.created_by and team.deleted_by = '0' Inner Join jtc_courses as course On course.id = batch.course_id and course.deleted_by = '0'  WHERE batch.deleted_by = '0'  ${findById} ${filterByDate} ${filterByMonth} ${filterByCourse} ORDER By batch.id DESC`
  const data = await executeQuery(alreadyExists)
  if (data.length > 0) return res.status(200).json({data, success: true, message: "data fetch successfully",})
  else return res.status(206).json({ message: "Error! During Fetch Points", success: false })
})

// delete a batch
exports.removeBatches = catchAsyncError(async (req, res) => {
  const { permissions, user } = req
  const { id } = req.params
  if (!id) return res.status(206).json({ message: "Batch Not Found", success: false })
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Batch", status: false });
  const addNewBatch = `Update jtc_batches SET  deleted_at = current_timestamp(), deleted_by = ${user}  WHERE id = ${id}`
  const data = await executeQuery(addNewBatch)
  if (data.affectedRows > 0) return res.status(200).json({ message: "Batch Deleted Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Batch Deleted", success: false });
})
