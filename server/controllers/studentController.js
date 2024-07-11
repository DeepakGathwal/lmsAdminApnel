const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");




exports.getStudentsDetails = catchAsyncError(async(req,res) => {
    const api = `Select second_pay_amount, total_fee,student_signature,image,Case WHEN employe = 1 Then "Exprienced" ELSE "Fresher" END as employe ,Date_Format(doj, '%d-%m-%y') as doj,Date_Format(dob, '%d-%m-%y') as dob, Date_Format(date_created, '%d-%m-%y') as date_created, Case WHEN class_type = 1 Then "Offline" ELSE "Online" END as class_type ,Date_Format(second_pay_date, '%d-%m-%y') as second_pay_date, Date_Format(first_pay_date, '%d-%m-%y') as first_pay_date, first_pay_amount, student_id,name, email, modile_no,phone_no, address from jtcindia_student.jtc_student_registration WHERE active = '1' ORDER By id DESC`
    const data =  await executeQuery(api)
    if(data.length > 0)return pagination(req, res, data)
    else return res.status(206).json({message : "Error! View Student", success : false})
})