const { executeQuery } = require("../../conn/db");
const catchAsyncError = require("../../middelwares/catchAsyncError");
const { pagination } = require("../../utils/pagination");
const { courseSchema, tutorialSchema } = require("../../utils/validation");
const {getDataUri} = require('../../utils/imageHandeler')



exports.addTutorialCource = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Course", status: false });
    const { name, category,   meta_tags, meta_keywords, meta_description } = req.body
    const { error } = tutorialSchema.validate(req.body);
    if (error)
        return res
            .status(206)
            .json({ status: false, message: error.details[0].message });

    const already = `Select id from jtc_tutorial_cources WHERE name = ${name} && category = ${category} && deleted_by = '0'`
    const executeAlready = await executeQuery(already)
    if (executeAlready.length > 0) return res.status(206).json({ message: "Course Name Already Exists", success: false })
    let iconWIthBanner = ''

        if(req.file){
            const file = req.file
            const fileImage = file && await getDataUri(file)
          
        
            iconWIthBanner = `, icon = '${fileImage}'`
        }
        const link = name.replaceAll(" ", "-").toLowerCase()
    const addCourceQuery = `Insert into jtc_tutorial_cources SET name = ${name}, category = ${category},created_by = ${user}, meta_tags = ${meta_tags ? meta_tags : category}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description }, link = ${link} ${iconWIthBanner}`
    const executeQueryAddCource = await executeQuery(addCourceQuery);
    if (executeQueryAddCource.affectedRows > 0) return res.status(200).json({ message: "Tutorial Added Successfully", success: true })
    else return res.status(206).json({ message: "Error! Adding Cources", success: true })
})

exports.editTutorialCource = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    const { id } = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })

    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit Course", status: false });
    const { name, category, meta_tags, meta_keywords, meta_description } = req.body
    const { error } = tutorialSchema.validate(req.body);
    if (error)
        return res
            .status(206)
            .json({ status: false, message: error.details[0].message });
          
            let iconImag = ''
            if(req.file){
                const file = req.file
                const fileImage = icon && await getDataUri(file)
                iconImag = `, icon = '${fileImage}'`
            }

            let addCategory = [];
        let addindataBase = ''

            if(category.length > 0){
                const getLabel = category.toString();
                const value = getLabel.replace(/,/g, "','");
              const idOFCategories = `Select id from jtc_tutorial_type WHERE category IN (${value})`
               const data = await executeQuery(idOFCategories)
               if(data.length > 0){
                await data.map((el) => {
                   addCategory.push(el.id)
                 })
                 addindataBase = ` category = '${addCategory}',`
                }
               }
   const link = await name.replaceAll(" ", "-").toLowerCase()
    const editCourceQuery = `Update jtc_tutorial_cources SET name = ${name},link = ${link}, ${addindataBase}updated_by = ${user}, updated_at = current_timestamp(), meta_tags = ${meta_tags}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description} ${iconImag} WHERE id = ${id} && deleted_by = '0'`
    const executeQueryeditCource = await executeQuery(editCourceQuery);
    if (executeQueryeditCource.affectedRows > 0) return res.status(200).json({ message: "Course Edit Successfully", success: true })
    else return res.status(206).json({ message: "Error! Update Cources", success: false })
})

exports.deleteTutorialCource = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    const { id } = req.params
    if (!id) return res.status(206).json({ message: "Course Not Found", success: false })
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Edit Course", status: false });
   
    const deleteCourceQuery = `Update jtc_tutorial_cources SET deleted_by = ${user},deleted_at = current_timestamp() WHERE id = ${id} && deleted_by = '0'`
    const executeQuerydeleteCource = await executeQuery(deleteCourceQuery);
    if (executeQuerydeleteCource.affectedRows > 0) return res.status(200).json({ message: "Course Delete Successfully", success: true })
    else return res.status(206).json({ message: "Error! Delete Cources", success: false })
})

exports.tutorialCourceList = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    const { id } = await req.query
    const {startDate, endDate, month}= await req.query
    let filterByDate = ``
    let filterByMonth = ``;
    if(month) filterByMonth = ` && Date_Format(course.created_at, '%y-%m') = Date_Format('${month}-1', '%y-%m')`
    if(startDate && endDate ) filterByDate = ` && Date_Format(course.created_at, '%d-%m-%y') Between Date_Format('${startDate}', '%d-%m-%y') AND Date_Format('${endDate}', '%d-%m-%y')`

    let sortById = ''
    if (id > 0) {
        sortById = `&& course.id = ${id}`
    };
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Course", status: false });

    const allCourceQuery = `SELECT course.category,Date_Format(course.created_at, '%d-%m-%y') as date,team.name as creator,course.name,course.icon,course.meta_keywords,course.meta_tags,course.meta_description, course.id from jtc_tutorial_cources as course  Inner Join jtc_tutorial_type as type On type.id = course.category LEFT JOIN jtc_team as team On team.id = course.created_by WHERE course.deleted_by = '0' ${sortById} ${filterByDate} ${filterByMonth} ORDER By course.id DESC`
    const data = await executeQuery(allCourceQuery);

   
    if(data.length > 0){
        for (let index = 0; index < data.length; index++) {
            const categories = data[index].category
                   const selectCourceNameQuery = `Select category from jtc_tutorial_type WHERE id IN (${categories}) `
            const executeQueryApi = await executeQuery(selectCourceNameQuery);
                 if(executeQueryApi.length > 0){
          const values = await executeQueryApi.map((el) => el.category)
           data[index]["category"] = String(values);
            }
        }
 
        return pagination(req, res, data)
    }

    if (data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({ message: "Error! View Cources", success: false })
})
