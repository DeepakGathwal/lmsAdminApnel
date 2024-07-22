const { executeQuery } = require("../conn/db");
const catchAsyncError = require("../middelwares/catchAsyncError");
const { pagination } = require("../utils/pagination");
const { getDataUri } = require('../utils/imageHandeler');
const { blogSchema } = require("../utils/validation");


// Create a new blog function 
exports.addBlog = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Blog", status: false });
    const { name, heading, video_link, meta_tags, meta_keywords, meta_description, meta_title, category, blog_html, blog_css } =await req.body
    const { error } = blogSchema.validate(req.body);
    if (error)
        return res
            .status(206)
            .json({ status: false, message: error.details[0].message })
    const alreadyExists = `Select id from jtc_blogs WHERE name = ${name} && deleted_by = '0'`
    const executeAlreadyExists = await executeQuery(alreadyExists)
    if (executeAlreadyExists.length > 0) return res.status(200).json({ message: "Blog Already Exists", success: false })
    let iconWIthBanner = '';
    if (!req.files) return res.status(206).json({ message: "Banner Image Not Found", success: false })

    const { image, banner } = req.files
    const fileImage = image && await getDataUri(image[0])
    const fileBanner = banner && await getDataUri(banner[0])

    iconWIthBanner = `, icon = '${fileImage}', banner = '${fileBanner}'`
    const link = await name.replaceAll(" ", "-").toLowerCase()
    const addNewBlog = `Insert into jtc_blogs SET created_by = ${user}, name = ${name}, heading = ${heading}, blog_html = ${blog_html},blog_css = ${blog_css}, blog_category = ${category}, video_link = ${video_link},meta_tags = ${meta_tags},meta_title = ${meta_title}, meta_keywords = ${meta_keywords}, meta_description = ${meta_description} ${iconWIthBanner}, link =${link} `
    const executeAddNewBlog = await executeQuery(addNewBlog)
    if (executeAddNewBlog.affectedRows > 0) return res.status(200).json({ message: "Blog Added Successfuly", success: true })
    else return res.status(206).json({ message: "Error! During Blog Added", success: false });
})


// edit a already exists  blog 
exports.editBlog = catchAsyncError(async (req, res) => {
    const { name, heading, video_link, meta_tags, meta_title, meta_keywords, meta_description, category, blog_html, blog_css } = await req.body

    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit New Blog", status: false });
    const { id } = req.params
    if (!id) return res.status(206).json({ message: "Blog Not Found", success: false })
    const alreadyExists = `Select id from jtc_blogs WHERE name = ${name} && heading = ${heading} && deleted_by = '0'`
    const executeAlreadyExists = await executeQuery(alreadyExists)

    if (executeAlreadyExists.length > 1) return res.status(200).json({ message: "Blog Already Exists", success: false })
    let icon = '';
    let Banner = '';
    if (req.files) {

        const { image, banner } = req.files
        const fileImage = image && await getDataUri(image[0])
        const fileBanner = banner && await getDataUri(banner[0])
        if (fileImage) {
            icon = `, icon = '${fileImage}'`
        }
        if (fileBanner) {
            Banner = ` , banner = '${fileBanner}'`
        }


    }
    const link = await name.replaceAll(" ", "-").toLowerCase()
    const addNewBlog = `Update  jtc_blogs SET name = ${name}, updated_at = current_timestamp(), updated_by =${user},heading = ${heading}, blog_category = (SELECT id from jtc_blog_category WHERE name = ${category}), video_link = ${video_link},meta_tags = ${meta_tags},meta_title = ${meta_title}, meta_keywords = ${meta_keywords},blog_html = ${blog_html},blog_css = ${blog_css}, meta_description = ${meta_description}, link  = ${link} ${icon} ${Banner} WHERE id = ${id}`
    const executeAddNewBlog = await executeQuery(addNewBlog)
    if (executeAddNewBlog.affectedRows > 0) return res.status(200).json({ message: "Blog Edit Successfuly", success: true })
    else return res.status(206).json({ message: "Error! During Blog Edit", success: false });
})

//  all blogs function
exports.allBlogList = catchAsyncError(async (req, res) => {
    const { permissions } = req
    const { startDate, endDate, category } = await req.query
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Blogs", status: false });
    let filterByDate = ``
    if (startDate && endDate) filterByDate = ` && Date_Format(created_at, '%d-%m-%y') Between Date_Format('${startDate}', '%d-%m-%Y') AND Date_Format('${endDate}', '%d-%m-%Y')`
    let categoryFilter = ''
    if (category) categoryFilter = ` && blog_category = (Select id from jtc_blog_category WHERE name = '${category}' Limit 1)`
    const addNewBlog = `SELECT id, name  from jtc_blogs WHERE deleted_by = '0' ${filterByDate} ${categoryFilter} ORDER By id DESC`
    const data = await executeQuery(addNewBlog)
    if (data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({ message: "Error! Fetching Blog List", success: false });
})


// get single blog data by id
exports.singleBlog = catchAsyncError(async (req, res) => {
    const { permissions } = req
    const { id } = await req.query
    if (!id) return res.status(206).json({ message: "Id Missing", success: false })
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Blogs", status: false });
    const addNewBlog = `SELECT blog.id,blog.name, blog.meta_title,blog.blog_html,blog.blog_css,blog.heading , category.name as category, blog.video_link,blog.meta_tags, blog.meta_keywords, blog.meta_description,blog.banner, blog.icon from jtc_blogs as blog Inner Join jtc_blog_category as category On blog.blog_category = category.id WHERE blog.deleted_by = '0' && blog.id = ${id}  ORDER By blog.id DESC`
    const data = await executeQuery(addNewBlog)
    if (data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({ message: "Error! Fetching Blog List", success: false });
})


// delete a blog function
exports.removeBlog = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    const { id } = req.params
    if (!id) return res.status(206).json({ message: "Blog Not Found", success: false })
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Blog", status: false });

    const addNewBlog = `Update jtc_blogs SET  deleted_at = current_timestamp(), deleted_by = ${user}  WHERE id = ${id}`
    const data = await executeQuery(addNewBlog)
    if (data.affectedRows > 0) return res.status(200).json({ message: "Blog Deleted Successfully", success: true })
    else return res.status(206).json({ message: "Error! During Blog Deleted", success: false });
})


// add a new blog category
exports.addBlogCategory = catchAsyncError(async (req, res) => {
    const { permissions } = req
    if (permissions[0].can_create == 0) return res.status(206).json({ message: "Permission Denied to Create New Blog Category", status: false });
    const { category } = await req.body
    const alreadyExists = `Select id from jtc_blog_category WHERE name = ${category}`
    const executeAlreadyExists = await executeQuery(alreadyExists)
    if (executeAlreadyExists.length > 0) return res.status(200).json({ message: "Category Already Exists", success: false })
    const addNewCategory = `Insert into jtc_blog_category SET name = ${category}`
    const executeAddNewCategory = await executeQuery(addNewCategory)
    if (executeAddNewCategory.affectedRows > 0) return res.status(200).json({ message: "Blog Category Added Successfuly", success: true })
    else return res.status(206).json({ message: "Error! During Blog Category Added", success: false });
})

// edit a blog category
exports.editBlogCategory = catchAsyncError(async (req, res) => {
    const { category } = await req.body
    const { permissions, user } = req
    if (permissions[0].can_edit == 0) return res.status(206).json({ message: "Permission Denied to Edit New Blog Category", status: false });
    const { id } = req.params
    if (!id) return res.status(206).json({ message: "Category Not Found", success: false })
    const alreadyExists = `Select id from jtc_blog_category WHERE name = ${category}`
    const executeAlreadyExists = await executeQuery(alreadyExists)
    if (executeAlreadyExists.length > 0) return res.status(200).json({ message: "Blog Category Already Exists", success: false })
    const editCategory = `Update  jtc_blog_category SET name = ${category} WHERE id = ${id}`
    const executeAddNewCategory = await executeQuery(editCategory)
    if (executeAddNewCategory.affectedRows > 0) return res.status(200).json({ message: "Blog Category Edit Successfuly", success: true })
    else return res.status(206).json({ message: "Error! During Blog Category Edit", success: false });
})

// list of all blog function
exports.allBlogCategory = catchAsyncError(async (req, res) => {
    const { permissions } = req
    if (permissions[0].can_view == 0) return res.status(206).json({ message: "Permission Denied to View Blogs Category", status: false });
    const allCategory = `SELECT * from jtc_blog_category ORDER By id DESC`
    const data = await executeQuery(allCategory)
    if (data.length > 0) return pagination(req, res, data)
    else return res.status(206).json({ message: "Error! Fetching Blog Category List", success: false });
})

// delete a blog category function
exports.removeBlogCategory = catchAsyncError(async (req, res) => {
    const { permissions, user } = req
    const { id } = req.params
    if (!id) return res.status(206).json({ message: "Category Not Found", success: false })
    if (permissions[0].can_delete == 0) return res.status(206).json({ message: "Permission Denied to Delete Blog Category", status: false });
    const removeCategory = `Delete from jtc_blog_category WHERE id = ${id}`
    const data = await executeQuery(removeCategory)
    if (data.affectedRows > 0) return res.status(200).json({ message: "Blog Deleted Successfully", success: true })
    else return res.status(206).json({ message: "Error! During Blog Category Deleted", success: false });
})