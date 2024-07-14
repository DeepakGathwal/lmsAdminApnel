const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");



  exports.usersPayments = catchAsyncError(async(req,res) =>{
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Payments", status: false });
    const query = `Select users.name,users.email, course.name as course, course.course_link as link,payment.id,payment.verify,payment.amount,payment.currency,payment.payment_id,payment.payment_signature,payment.order_id ,Date_Format(payment.done_time, '%d-%m-%y %h:%i:%s %p') as done_time,Date_Format(payment.order_at, '%d-%m-%y %h:%i:%s %p') as order_at from jtc_ecommers_course_payment as payment Left Join	jtc_ecommers_courses as course On payment.course = course.id And course.deleted_by = '0' Left Join jtc_ecommers_users as users On users.id = payment.user and users.deleted_by = '0' Order by payment.id desc`
  
    const data = await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting Payments ", success : false })
  })



  exports.usersCarts = catchAsyncError(async(req,res) =>{
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Payments", status: false });
    const query = `Select users.name,users.email, course.name as course, course.course_link as link,cart.id,Date_Format(cart.created_at, '%d-%m-%y %h:%i:%s %p') as date from jtc_ecommers_cart as cart Left Join	jtc_ecommers_courses as course On cart.course = course.id And course.deleted_by = '0' Left Join jtc_ecommers_users as users On users.id = cart.user and users.deleted_by = '0' Order by cart.id desc`
  
    const data = await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting Payments ", success : false })
  })



  exports.usersWishList = catchAsyncError(async(req,res) =>{
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Payments", status: false });
    const query = `Select users.name,users.email, course.name as course, course.course_link as link,wish.id,Date_Format(wish.created_at, '%d-%m-%y %h:%i:%s %p') as date from jtc_ecommers_wishlist as wish Left Join	jtc_ecommers_courses as course On wish.course = course.id And course.deleted_by = '0' Left Join jtc_ecommers_users as users On users.id = wish.user and users.deleted_by = '0' Order by wish.id desc`
  
    const data = await executeQuery(query)
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting Wishlist ", success : false })
  })
  

  exports.usersReview = catchAsyncError(async(req,res) =>{
    const { permissions, user } = await req
    if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Payments", status: false });
    const query = `Select users.name,users.email, review.rating,review,review,course.name as course, course.course_link as link,review.id,Date_Format(review.created_at, '%d-%m-%y %h:%i:%s %p') as date from jtc_ecommers_course_review as review Left Join	jtc_ecommers_courses as course On review.course = course.id And course.deleted_by = '0' Left Join jtc_ecommers_users as users On users.id = review.user and users.deleted_by = '0' WHERE review.deleted_by = '0' Order by review.id desc`
  
    const data = await executeQuery(query)
   
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting Reviews ", success : false })
  })

  exports.reviewDelete = catchAsyncError(async(req,res) =>{
    const { permissions, user } = await req
    const {id} = await req.params
    if (permissions.can_delete == 0) return res.status(206).json({ message: "Permission Denied to View Payments", status: false });
    const query = `Update jtc_ecommers_course_review SET deleted_by = ${user} , deleted_at = current_timestamp() WHERE id = ${id}`
  
    const data = await executeQuery(query)
    if(data.affectedRows > 0) return res.status(200).json({message : "Review Deleted Successfully", success : true})
    else return res.status(206).json({message : "Error! While Getting Payments ", success : false })
  })
  


  exports.allUsers = catchAsyncError(async(req,res) =>{
    const { permissions} = await req
      if (permissions.can_view == 0) return res.status(206).json({ message: "Permission Denied to View Team", status: false });
  
  
    const {id} = await req.query

    let seletById = ``
    if(id) seletById = ` && id = '${id}'`
  
    const query = `Select id,image, name, email,phone, provider, Date_Format(created_at, '%d-%m-%y %h:%i:%s %p') as created_at,Date_Format(last_login, '%d-%m-%y %h:%i:%s %p') as last_login from jtc_ecommers_users WHERE deleted_by = '0' ${seletById} ORDER by id desc `


    const data = await executeQuery(query)
    
    if(data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({message : "Error! While Getting team Member", success : false })
  })


