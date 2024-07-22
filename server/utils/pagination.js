const excelJS = require("exceljs");
const catchAsyncError = require("../middelwares/catchAsyncError");



/** pagination to all select api */
exports.pagination = catchAsyncError(async (req, res, data) => {

  const { limit, skipPage } = await req.query;
  if(limit == 'All') return res.status(200).json({
    data,
    total: data.length,
    limit:  data.length,
    success: true,
    message: "data fetch successfully",
  }); 
  const total = data.length > 0 ? data.length : 0;

  const giveLimit = limit > 0 ? limit : 10;
  const skipPageTo = skipPage > 1 ? skipPage * giveLimit - giveLimit : 0;
  const getData = data.splice(skipPageTo, giveLimit);

  return res.status(200).json({
    data: getData,
    total: total,
    limit: giveLimit,
    success: true,
    message: "data fetch successfully",
  });
});


exports.createExcelFile = catchAsyncError(async (req,res) => {
  const {permissions} = req 
  if(permissions[0].can_view == 0) return res.status(206).json({message : "Permission Denied to Download Data", success : false});

  const {module} = await req.query 
  const {excelData} = req.body 
 
  const workbook = new excelJS.Workbook(); 
  const mangeFileName = module.slice(1)
  const worksheet = workbook.addWorksheet(`${mangeFileName}`);
  const value = Object.keys(...excelData)
  let alldata = []
  value.map((el) => {
    alldata.push({ header: `${el.toUpperCase()}`, key: `${el}`, width: el.length*3 })
  })
  
  // Define columns in the worksheet 
  worksheet.columns = alldata
  
  // Add data to the worksheet 
  excelData.map(user => { worksheet.addRow(user) });
  // return
  // Set up the response headers 
  try{
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); res.setHeader("Content-Disposition", "attachment; filename=" + `${mangeFileName}.xlsx`);
  
  // // Write the workbook to the response object 
  return  workbook.xlsx.write(res)
}
  catch(err){
return
  }
})