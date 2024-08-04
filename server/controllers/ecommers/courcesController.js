const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { getDataUri } = require("../../utils/imageHandeler");

const { EcourseSchema, EcourceChapter } = require("../../utils/validation");





exports.addCource = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Course", status: false });
  const { name, category, description, label, price, discount, video_link, certificates } = await req.body
  const { error } = EcourseSchema.validate(req.body);
  if (error) return res.status(206).json({ status: false, message: error.details[0].message })
  const findquery = `Select id from  jtc_ecommers_courses WHERE name = ${name}`
  const runQuery = await executeQuery(findquery)
  if (runQuery.length > 0) return res.status(206).json({ message: "Cource Already Exists", status: false })
  const link = await name.replaceAll(" ", "_").toLowerCase()
  if (!req.file) return res.status(206).json({ message: "Atleast one image needed", success: false })
  const icon = await req.file
  const fileImage = icon && await getDataUri(icon)
  const query = `Insert into jtc_ecommers_courses SET name = ${name}, course_link = ${link}, description = ${description},category = (Select id  from jtc_ecommers_course_types WHERE category = ${category}), label = (Select id from jtc_ecommers_course_label WHERE label = ${label}),image =  '${fileImage}', created_by = ${user}, total_price =  ${price}, discount =  ${discount}, video_link = ${video_link},certificates =  ${certificates == "1" ? 1 : 0} `
  const executeAddPoint = await executeQuery(query)
  if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: " Cource Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During category Added ", success: false })

})

exports.editCource = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Course", status: false });
  const { name, category, description, label, price, discount, video_link, certificates } = await req.body

  const { error } = EcourseSchema.validate(req.body);
  if (error) return res.status(206).json({ status: false, message: error.details[0].message })
  const { id } = await req.params
  if (!id) return res.status(200).json({ message: "Comapny not found", success: false })
  const findQuery = `Select id from jtc_ecommers_courses WHERE name = ${name} `
  const runQuery = await executeQuery(findQuery)

  if (runQuery.length > 1) return res.status(206).json({ message: "Cource Already Exists", status: false })
  const link = await name.replaceAll(" ", "_").toLowerCase()

  let image = ''
  if (req.file) {
    const icon = await req.file
    const fileImage = icon && await getDataUri(icon)

    image = `,image =  '${fileImage}'`

  }

  const query = `update  jtc_ecommers_courses SET name = ${name},category = (Select id  from jtc_ecommers_course_types WHERE category = ${category}), label = (Select id from jtc_ecommers_course_label WHERE label = ${label}), course_link = ${link}, description = ${description},updated_by = ${user},updated_at =  current_timestamp(), total_price =  ${price}, discount = ${discount}, video_link = ${video_link}, certificates =  ${certificates == "1" ? 1 : 0} ${image} WHERE id = ${id} `
  const executeAddPoint = await executeQuery(query)
  if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: " Cource Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During category Added ", success: false })

})

exports.allCources = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Course", status: false });

  const query = `Select label.label,category.category,course.id, course.name, Date_Format(course.created_at, '%d-%m-%y %h:%i:%s %p') as created_at ,course.video_link, course.certificates, course.image, course.total_price, course.discount, course.description from jtc_ecommers_courses as course Left Join jtc_ecommers_course_types as category On category.id = course.category Left Join jtc_ecommers_course_label as label On label.id = course.label WHERE course.deleted_by = '0' Order by course.id desc`

  const data = await executeQuery(query)
  if (data.length > 0) return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
  else return res.status(206).json({ message: "Error ! While Fetching Data", status: false })
})

exports.deleteCource = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Course", status: false });
  const { id } = await req.params
  if (!id) return res.status(200).json({ message: "Comapny not found", success: false })
  const query = `update  jtc_ecommers_courses SET deleted_by = ${user}, deleted_at = current_timestamp() WHERE id = ${id}`
  const executeAddPoint = await executeQuery(query)
  if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: "Course Delete Successfully", success: true })
  else return res.status(206).json({ message: "Error! Delete Company", success: false })
})


exports.addChapter = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create Course Chapter", status: false });
  const { courses, chapter } = await req.body
  const { error } = EcourceChapter.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message })

  const alreadyExists = `Select id from jtc_ecommers_course_chapter  WHERE chapter = ${chapter}`
  const executeAlready = await executeQuery(alreadyExists)
  if (executeAlready.length > 0) return res.status(206).json({ message: "Point Already Exists" })

  const addNewPoint = `Insert into jtc_ecommers_course_chapter  SET chapter = ${chapter},course_id  =  '${courses}', created_by = ${user}`
  const executeAddPoint = await executeQuery(addNewPoint)


  if (executeAddPoint.affectedRows > 0) return res.status(200).json({ message: " Point Added Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Point Added ", success: false })
})

exports.editChapter = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Course Chapter", status: false });
  const { id } = await req.params
  if (!id) return res.status(206).json({ message: "Point Not Found for Edit", success: false })
  const { courses, chapter } = await req.body

  const { error } = EcourceChapter.validate(req.body);
  if (error)
    return res
      .status(206)
      .json({ status: false, message: error.details[0].message })

  const alreadyCategory = `SELECT id from jtc_ecommers_course_chapter WHERE chapter = ${chapter} && deleted_by = '0'`
  const executeAreadyCategory = await executeQuery(alreadyCategory);

  if (executeAreadyCategory.length > 1) return res.status(206).json({ message: "Learn point Already Exists", success: false })
  let addCources = [];
  let addindataBase = ''
  if (courses.length > 0) {
    const idOFCources = `Select id from jtc_ecommers_courses WHERE name IN (${courses}) && deleted_by = '0'`
    const data = await executeQuery(idOFCources)
    if (data.length > 0) {
      data.map((el) => {
        addCources.push(el.id)
      })
      addindataBase = ` course_id =  '${addCources}',`
    }
  }

  const editCategoryQuery = `Update jtc_ecommers_course_chapter SET chapter = ${chapter}, updated_by = ${user}, ${addindataBase} updated_at = current_timestamp()   WHERE id = ${id}`;
  const executeEditCategory = await executeQuery(editCategoryQuery)
  if (executeEditCategory.affectedRows > 0) return res.status(200).json({ message: "Learn point Edit Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Category Edit", success: false })




})

exports.Chapters = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_View == 0) return res.status(206).json({ message: "Permission Denied to View Course Chapter", status: false });
  // Fetch all chapters ordered by ID in descending order
  const alreadyExists = `Select id, Date_Format(created_at, '%d-%m-%y %h:%i:%s %p') as created_at,chapter,course_id  from jtc_ecommers_course_chapter  WHERE deleted_by = '0' Order by id desc`

  const data = await executeQuery(alreadyExists)

  if (data.length > 0) {

    for (let index = 0; index < data.length; index++) {
      const courceId = data[index].course_id
      const selectCourceNameQuery = `Select name from jtc_ecommers_courses WHERE id IN (${courceId}) && deleted_by = '0' `
      const executeQueryApi = await executeQuery(selectCourceNameQuery);

      if (executeQueryApi.length > 0) {
        const values = await executeQueryApi.map((el) => el.name)
        data[index]["courses"] = String(values);
      }
    }


    return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
  } else return res.status(206).json({ message: "Error! During Fetch Points", success: false })

})

exports.removeChapter = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Course Chapter", status: false });
  const { id } = await req.params
  if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
  const alreadyExists = `Update  jtc_ecommers_course_chapter SET deleted_by = ${user} , deleted_at = current_timestamp()   WHERE id = ${id}`

  const data = await executeQuery(alreadyExists)
  if (data.affectedRows > 0) return res.status(200).json({ message: "Point Delete Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Delete Point", success: false })
})






exports.addTopic = catchAsyncError(async (req, res) => {
  
  const { permissions, user } = await req
  if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Add Video ", status: false });

  const { topic, timing, videoLink, chapter_id } = await req.body

  const query = `Select id from jtc_ecommers_videos where topic = ${topic}`


  const runfind = await executeQuery(query)
  if (runfind.length > 0) return res.status(206).json({ message: "Video already exists" })


  const addQuery = `Insert into jtc_ecommers_videos SET topic = ${topic}, timing = ${timing}, videoLink = ${videoLink}, chapter_id = '${chapter_id}', created_by = ${user}`

  const runqueryPromise = await executeQuery(addQuery)
 
  if (runqueryPromise.affectedRows > 0)
    return res.status(200).json({ message: 'Video Upload Successfully', success: true });
  else return res.status(206).json({ message: 'Something Wrong', success: true });

})

exports.editTopic = catchAsyncError(async (req, res) => {

  const { id } = await req.params
  if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })
  const { permissions, user } = await req
  if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Video ", status: false });

  const { topic, timing, videoLink, chapter_id } = await req.body

  const query = `Select id from jtc_ecommers_videos where topic = ${topic}`


  const runfind = await executeQuery(query)
  if (runfind.length > 1) return res.status(206).json({ message: "Video already exists" })


    let addCources = [];
    let addindataBase = ''
    if (chapter_id.length > 0) {
      const idOFCources = `Select id from jtc_ecommers_course_chapter WHERE chapter IN (${chapter_id}) && deleted_by = '0'`
      const data = await executeQuery(idOFCources)
      if (data.length > 0) {
        data.map((el) => {
          addCources.push(el.id)
        })
        addindataBase = `, chapter_id =  '${addCources}'`
      }
    }
  const addQuery = `Update jtc_ecommers_videos SET topic = ${topic} , timing = ${timing}, videoLink = ${videoLink} ${addindataBase}, updated_at = current_timestamp(), updated_by = ${user} WHERE id = ${id}`
  const runqueryPromise = await executeQuery(addQuery)
  if (runqueryPromise.affectedRows > 0)
    return res.status(200).json({ message: 'Video Upload Successfully', success: true });
  else return res.status(206).json({ message: 'Something Wrong', success: true });
})


exports.topics = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Course Chapter", status: false });
  const query = `Select resours.name as brochurer, videos.id,videos.topic, videos.timing , Date_Format(videos.created_at, '%d-%m-%y %h:%i:%s %p') as created_at,videos.videoLink, videos.chapter_id from jtc_ecommers_videos as videos Left join jtc_ecommers_resourses as resours On resours.video  = videos.id where videos.deleted_by = '0' order by videos.id desc`
  const data = await executeQuery(query)
  
  if (data.length > 0) {

    for (let index = 0; index < data.length; index++) {
      const courceId = data[index].chapter_id
      const selectCourceNameQuery = `Select chapter from jtc_ecommers_course_chapter WHERE id IN (${courceId}) && deleted_by = '0' `
      const executeQueryApi = await executeQuery(selectCourceNameQuery);
   
      if (executeQueryApi.length > 0) {
        const values = await executeQueryApi.map((el) => el.chapter)
        data[index]["chapter"] = String(values);
      }
    }


    return res.status(200).json({data, success: true,
    message: "data fetch successfully",})
  } else return res.status(206).json({ message: "Error! During Fetch Points", success: false })

})

exports.removeTopics = catchAsyncError(async (req, res) => {
  const { permissions, user } = await req
  if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Course Chapter", status: false });
  const { id } = await req.params
  if (!id) return res.status(200).json({ message: "Point Not Found for Edit", success: false })

  const addQuery = `Update  jtc_ecommers_videos SET  deleted_at = current_timestamp(), deleted_by = ${user} WHERE id = ${id}`

  const data = await executeQuery(addQuery)
  if (data.affectedRows > 0) return res.status(200).json({ message: "Point Delete Successfully", success: true })
  else return res.status(206).json({ message: "Error! During Delete Point", success: false })
})