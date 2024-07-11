const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { aboutUs } = require("../utils/validation");

// add a new brochure -> course name must be different avery time
exports.addPdf = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Add File", status: false });
  if (!req.file) return res.status(206).json({ message: "File not found", status: false });
  const { course } = await req.body
  const { originalname, buffer } = req.file;
  const already = `Select id from jtc_brochures WHERE  course_id = '${course}'`
  const executeAlready = await executeQuery(already)
  if (executeAlready.length > 0) return res.status(206).json({ message: "File Already Exists", status: false });

  const base64Data = await buffer.toString('base64');

  const query = `Insert into jtc_brochures Set name = "${originalname}", brochure = '${base64Data}', course_id = '${course}'`
  const addFile = await executeQuery(query)
  if (addFile.affectedRows > 0) return res.status(200).json({ message: "PDF Added Successfuly", success: true })
  else return res.status(206).json({ message: "Error! During PDF Added", success: false });

})

// view a exists brochure -> course name must be different avery time
exports.viewPdf = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View File", status: false });

  const { name } = req.params
  if (!name) return res.status(206).json({ message: "Id Missing", success: false })

  const result = await executeQuery(`Select brochure from jtc_brochures WHERE name = '${name}'`)
  if (result.length > 0) {
    const pdfData = result[0].brochure;

    // Serve the PDF data as response
    res.setHeader('Content-Type', 'application/pdf');
    const decodedPdfData = Buffer.from(pdfData, 'base64');
    res.send(decodedPdfData);
  } else {
    res.status(404).send('PDF not found');
  }

})

//  download a exists brochure
exports.downloadPdf = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Download File", status: false });

  const { id } = req.params
  if (!id) return res.status(206).json({ message: "Id Missing", success: false })

  const result = await executeQuery(`Select brochure, name from jtc_brochures WHERE id = '${id}'`)
  if (result.length > 0) {
    const pdfData = result[0].brochure;
    const name = result[0].name;
    // Serve the PDF data as response
    const decodedPdfData = Buffer.from(pdfData, 'base64');
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('Content-Type', 'application/pdf');
    return res.send(decodedPdfData);
  } else {
    return res.status(404).send('PDF not found');
  }

})


//  all brochure list
exports.allPdf = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to Access File", status: false });

  const result = `Select brochure.name, brochure.id,  course.name as course  from jtc_brochures as brochure Inner Join  jtc_courses as course On course.id = brochure.course_id and course.deleted_by = '0'`
  const data = await executeQuery(result)
  if (data.length > 0) return pagination(req, res, data)
  else return res.status(206).json({ message: "Error! Fetching All Brochures", success: false });

})


//  delete a brochure by id
exports.deletePdf = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Blog Category", status: false });

  const { id } = req.params

  if (!id) return res.status(206).json({ message: "Id Missing", success: false })

  const result = `Delete from  jtc_brochures WHERE id = '${id}'`
  const data = await executeQuery(result)
  if (data.affectedRows > 0) return res.status(200).json({ message: "Brouchure Deleted Successfully", success: true })

  else return res.status(206).json({ message: "Error! Fetching All Brochures", success: false });

})
