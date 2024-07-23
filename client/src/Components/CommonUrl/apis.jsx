import { instance } from "./URL";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

// close model global function
export const handleClose = (setShow, setEditShow) => {
  setShow(false)
  setEditShow("")
};



export const login = async (field) => {
  try {
    const { data } = await instance.post(`profile`, { email: field.email, password: field.password });
    return data
  } catch (err) {
    return err.message
  }
}

export const ForgetpasswordAPi = async (email) => {
  try {
    const { data } = await instance.put(`profile/forgetPassword`, { email });
    return data
  } catch (err) {
    return err.message
  }
}

export const ForgetOtpAPi = async (otp) => {
  try {
    const { data } = await instance.patch(`profile/forgetPassword`, { otp: otp });
    return data
  } catch (err) {
    return err.message
  }
}

export const changeForgetPassword = async (field) => {
  try {
    const { data } = await instance.post(`profile/password`, { confirmPassword: field.confirmPassword, password: field.password });
    return data
  } catch (err) {
    return err.message
  }
}

export const logoutApi = async () => {
  try {
    const { data } = await instance.get(`profile/logout`);
    return data
  } catch (err) {
    return err.message
  }
}

export const getProfileData = async () => {
  try {
    const { data } = await instance.get(`profile/self`);
    return data
  } catch (err) {
    return err.message
  }
}

export const getUerModules = async () => {
  try {
    const { data } = await instance.get(`profile`);
    return data
  } catch (err) {
    return err.message
  }
}

export const updateUser = async (admin) => {
  try {
    const { data } = await instance.put(`profile`, { email: admin.email, phone: admin.phoneNumber, name: admin.name, linkedin: admin.linkedin, instagram: admin.instagram, facebook: admin.facebook, address: admin.address });
    return data
  } catch (err) {
    return err.message
  }
}

export const updateUserImage = async (formData) => {
  try {
    const { data } = await instance.patch(`profile`, formData);
    return data
  } catch (err) {
    return err.message
  }
}


export const profilemodulesList = async () => {
  try {

    const { data } = await instance.get(`profile?module=module`);
    return data
  } catch (err) {
    return err.message
  }
}

export const allmodules = async () => {
  try {
    const { data } = await instance.get(`module?module=module`);
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 *  add new Batch 
 *  permission needed to add a batch
 */
export const addBatches = async (state, path) => {
  try {
    const { data } = await instance.post(`batches?module=${path}`, { date: state.date, time_from: state.timeFrom, course_id: state.course, time_to: state.timeTo, week_days: `${state.weeekStartDay} to ${state.weekEndDay}` })
    return data
  } catch (err) {
    return err.message
  }
}
/**
 *  delete a batch 
 * permission neeed to delete a batch
 */
export const deleteBatches = async (path, id) => {
  try {
    const { data } = await instance.delete(`batches/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** Edit a already exists batch 
 * permisssion requrie to edit a batch
 */
export const editBatches = async (state, path, id) => {
  try {
    let week = ``
    if (state.weekEndDay && state.weeekStartDay) {
      week = `${state.weeekStartDay} to ${state.weekEndDay}`
    } else if (state.weekEndDay && !state.weeekStartDay) {
      const changeDay = state.week_days.split("to ")[1]
      const afterReplace = state.week_days.replace(changeDay, state.weekEndDay)
      week = afterReplace
    } else if (!state.weekEndDay && state.weeekStartDay) {
      const changeDay = state.week_days.split(" to")[0]
      const afterReplace = state.week_days.replace(changeDay, state.weeekStartDay)
      week = afterReplace
    }

    else {
      week = state.week_days
    }

    const { data } = await instance.patch(`batches?module=${path}&id=${id}`, { date: state.date, time_from: state.time_from, course_id: state.course, time_to: state.time_to, week_days: week })
    return data
  } catch (err) {
    return err.message
  }
}

export const addTeam = async (field, path) => {
  try {
    const { data } = await instance.post(`team?module=${path}`, { email: field.email, password: field.password, phone: field.phone, role: field.role, name: field.name, instagram: field.instagram, facebook: field.facebook, linkedin: field.linkedin })
    return data
  } catch (err) {
    return err.message
  }
}

export const teamMembers = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`team?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const singleteamMembers = async (path, id) => {
  try {
    const { data } = await instance.get(`team?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editTeamMemberApi = async (path, id, field) => {
  try {
    const { data } = await instance.patch(`team?module=${path}&id=${id}`, { email: field.email, phone: field.phoneNumber, role: field.roleName, name: field.name, instagram: field.instagram, facebook: field.facebook, linkedin: field.linkedin })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 *  get list of all batches
 */
export const getBatches = async (path, givenLimit, currentPage, dateshow, course) => {
  try {
    const { data } = await instance.get(`batches?module=${path}&limit=${givenLimit}&skipPage=${currentPage}&startDate=${dateshow.startDate}&endDate=${dateshow.endDate}&month=${dateshow.month}&course=${course}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const listOfBatches = async (path, givenLimit) => {
  try {
    const { data } = await instance.get(`batches?module=${path}&limit=${givenLimit}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * single batch details by id
 * permission requied to view single data
 */
export const getSingleBatche = async (path, editId) => {
  try {
    const { data } = await instance.get(`batches?module=${path}&id=${editId}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteTeamMember = async (path, id) => {
  try {
    const { data } = await instance.delete(`team?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const allModules = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`module?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editModules = async (path, id, editshow) => {
  try {
    const { data } = await instance.patch(`module?module=${path}&id=${id}`, { modules: editshow.modules, name: editshow.name })
    return data
  } catch (err) {
    return err.message
  }
}

export const editModulesImage = async (path, id, formData) => {
  try {

    const { data } = await instance.patch(`module/image/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

export const createModules = async (path, editshow) => {
  try {

    const { data } = await instance.post(`module?module=${path}`, { modules: editshow.modules, name: editshow.name })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteModules = async (path, id) => {
  try {
    const { data } = await instance.delete(`module?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editRoles = async (path, id, role) => {
  try {
    const { data } = await instance.patch(`role?module=${path}&id=${id}`, { role })
    return data
  } catch (err) {
    return err.message
  }
}

export const createRoles = async (path, role) => {
  try {

    const { data } = await instance.post(`role?module=${path}`, { role })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteRoles = async (path, id) => {
  try {
    const { data } = await instance.delete(`role?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allRoles = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`role?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * edit a course type by id 
 * permission requried to edit a course type
 */
export const editCourseType = async (path, id, category) => {
  try {
    const { data } = await instance.patch(`coursefiled/${id}?module=${path}`, { category })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const createCourseType = async (path, category) => {
  try {

    const { data } = await instance.post(`coursefiled?module=${path}`, { category })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * delete a course type by id
 * permission need o delete a course type
 */
export const deleteCourseType = async (path, id) => {
  try {

    const { data } = await instance.delete(`coursefiled/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * list of all course types
 * permision required to see all couse type
 */
export const allCourseType = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`coursefiled?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}







export const editTutorialType = async (path, id, category) => {
  try {
    const { data } = await instance.patch(`tutorialfiled/${id}?module=${path}`, { category })
    return data
  } catch (err) {
    return err.message
  }
}

export const createTutorialType = async (path, category) => {
  try {

    const { data } = await instance.post(`tutorialfiled?module=${path}`, { category })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteTutorialType = async (path, id) => {
  try {

    const { data } = await instance.delete(`tutorialfiled/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTutorialType = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`tutorialfiled?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editCourceChapter = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.patch(`category/${editshow.id}?module=${path}`, { category: editshow.chapter_name, cource: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourceChapter = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.post(`category?module=${path}&cource=${courcesid}`, { category: editshow.chapter_name })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteCourceChapter = async (path, id) => {
  try {

    const { data } = await instance.delete(`category/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourceChapter = async (path, limit, cource, currentPage) => {

  try {
    const { data } = await instance.get(`category?module=${path}&limit=${limit}&skipPage=${currentPage}&cource=${cource}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editCourceSubCategory = async (path, editshow, removeSameData) => {
  try {
    const { data } = await instance.patch(`category/topics/${editshow.id}?module=${path}&category=${removeSameData}`, { subCategory: editshow.topic })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourceSubCategory = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.post(`category/topics?module=${path}&category=${courcesid}`, { subCategory: editshow.topic })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteCourceSubCategory = async (path, id) => {
  try {

    const { data } = await instance.delete(`category/topics/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourceSubCategory = async (path, category, limit, currentPage) => {
  try {
    const { data } = await instance.get(`category/topics?module=${path}&limit=${limit}&skipPage=${currentPage}&id=${category}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * edit course by id
 * permission needed to edit course
 */
/**
 * edit course by id
 * permission needed to edit course
 */
export const editCourse = async (path, formData, id) => {
  try {
    const { data } = await instance.patch(`course?module=${path}&id=${id}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}


/**
 * create a course 
 * permission requried to create couse
 */
export const createCourse = async (path, formData) => {
  try {
    const { data } = await instance.post(`course?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * delete a course by id
 * permission requried to delete couse
 */

export const deleteCourse = async (path, id) => {
  try {
    const { data } = await instance.delete(`course/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}
/**
 * list of all course 
 * permission requried to get all couses
 */
export const allCourse = async (path, limit, currentPage, editshow) => {
  try {
    const { data } = await instance.get(`course?module=${path}&limit=${limit}&skipPage=${currentPage}&startDate=${editshow.startDate}&endDate=${editshow.endDate}&month=${editshow.month}&course=${editshow.cource}`)
    return data
  } catch (err) {
    return err.message
  }
}
/** List of all couses for search
 * 
 * permission need to view couses data  
 */

/** List of all couses for search
 * 
 * permission need to view couses data  
 */
export const allCourseForSearch = async (path, limit) => {
  try {
    const { data } = await instance.get(`course?module=${path}&limit=${limit}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const singleCourse = async (path, id) => {
  try {
    const { data } = await instance.get(`course?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

export const pagesIndex = [
  10, 20, 50, 'All'
]

export const permissions = async (path, findByRole) => {
  try {
    const { data } = await instance.get(`permission?module=${path}&role=${findByRole}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editPermissions = async (path, permission) => {
  try {
    const { data } = await instance.post(`permission?module=${path}`, { permission })
    return data
  } catch (err) {
    return err.message
  }
}



/** 
 * edit a company by id
 *  permission required to edit a company
 */

export const editCompanies = async (path, id, formData) => {
  try {
    const { data } = await instance.patch(`company/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}


/** 
 * add a company 
 *  permission required to add a company
 */
export const createCompanies = async (path, formData) => {
  try {
    const { data } = await instance.post(`company?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}


/** 
 * delete a company by id
 *  permission required to delete a company
 */
export const deleteCompanies = async (path, id) => {
  try {
    const { data } = await instance.delete(`company/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** list of all companies
 * permission required to get companies
 */
export const allCompanies = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`company?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editTestamonials = async (path, id, formData) => {
  try {

    const { data } = await instance.patch(`testominal/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

export const createTestamonials = async (path, formData) => {
  try {

    const { data } = await instance.post(`testominal?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteTestamonials = async (path, id) => {
  try {
    const { data } = await instance.delete(`testominal/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTestamonials = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`testominal?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * edit a already  about us point
 *  permission need to edit a about us point
*/
export const editAboutPoints = async (path, id, editshow) => {
  try {
    const { data } = await instance.patch(`about/${id}?module=${path}`, { point: editshow.point, description: editshow.description })
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * Create a new about us point
 *  permission need to create a new about us point
*/
export const createAboutPoints = async (path, editshow) => {
  try {

    const { data } = await instance.post(`about?module=${path}`, { point: editshow.point, description: editshow.description })
    return data
  } catch (err) {
    return err.message
  }
}


/** 
 * delete a about us point
 *  permission need to delete a about us point
*/
export const deleteAboutPoints = async (path, id) => {
  try {
    const { data } = await instance.delete(`about/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** List of all About Point APi 
 *  permission need to view all about us point
*/
export const allAboutPoints = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`about?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * edit a already exists choose us point
 * permission required to edit choose us point
 */
export const editPoints = async (path, id, editshow) => {
  try {
    const { data } = await instance.patch(`point/${id}?module=${path}`, { point: editshow.point })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a new choose us point
 * permission required a to add a new point
 */
export const createPoints = async (path, editshow) => {
  try {
    const { data } = await instance.post(`point?module=${path}`, { point: editshow.point })
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * delete already exists  point
 *  permisison requied to delete a point
 */
export const deletePoints = async (path, id) => {
  try {
    const { data } = await instance.delete(`point/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

// all why choose us point 
//  permission required
export const allPoints = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`point?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allStudentList = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`student?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * edit blog category 
 * permission requried to edit blog category
 */
export const editBlogCategory = async (path, editshow) => {
  try {
    const { data } = await instance.patch(`blog/category/${editshow.id}?module=${path}`, { category: editshow.name })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a new blog category
 * permission requried to add a new category 
 */
export const createBlogCategory = async (path, editshow) => {
  try {

    const { data } = await instance.post(`blog/category?module=${path}`, { category: editshow })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * delete a already exists blog category
 * permission needed to delete a blog category
 */
export const deleteBlogCategory = async (path, id) => {
  try {
    const { data } = await instance.delete(`blog/category/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** All Blogs Categories
 * permission needed to view all blog category
 */
export const allBlogCategory = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`blog/category?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** edit blog by id 
 * permission required to edit a blog
 */
export const editBlog = async (path, id, formData) => {
  try {

    const { data } = await instance.patch(`blog/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/** Create a new Blog 
 *  Permission requried to add a new blog
  */
export const createBlog = async (path, formData) => {
  try {
    const { data } = await instance.post(`blog?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * delete a single blog by id
 * permission requied to delete a blog 
 */
export const deleteBlog = async (path, id) => {
  try {
    const { data } = await instance.delete(`blog/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


/** single blog detail */
export const singleBlog = async (path, id) => {

  try {
    const { data } = await instance.get(`blog?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * List of all blogs 
 * permission required to see blog list
 */
export const allBlogNames = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`blog/list?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}




export const footerAdded = async (path, field) => {
  try {
    const { data } = await instance.post(`profile/footer?module=${path}`, { name: field.name, about: field.about, contact: field.contact, phone: field.phone, email: field.email, facebook: field.facebook, instagram: field.instagram, twitter: field.twitter, youtube: field.youtube, telegram: field.telegram, linkedin: field.linkedin })
    return data
  } catch (err) {
    return err.message
  }
}

export const footerData = async (path) => {
  try {
    const { data } = await instance.get(`profile/footer?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const addTutorialApi = async (path, htmlData, cssContent, field) => {
  try {

    const { data } = await instance.post(`tutorial?module=${path}`, { cource_id: field.cource, category_id: field.category, heading: field.heading, meta_tags: field.meta_tags, meta_keywords: field.meta_keywords, meta_description: field.meta_description, meta_title: field.meta_title, html: htmlData, css: cssContent })
    return data
  } catch (err) {
    return err.message
  }
}

export const getHeadingsOfTutorial = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`tutorial?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const getSingleTutorial = async (path, id) => {
  try {
    const { data } = await instance.put(`tutorial/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}
// cources : "",  category : "", meta_title: "", meta_description: "", meta_keywords: "", meta_tags: "", heading: "", tutorial_html : "", tutorial_css : ""


export const editTutorial = async (path, id, htmlData, cssContent, field) => {
  try {
    const { data } = await instance.patch(`tutorial/${id}?module=${path}`, { category: field.category, cource: field.cources, heading: field.heading, meta_tags: field.meta_tags, meta_keywords: field.meta_keywords, meta_description: field.meta_description, meta_title: field.meta_title, html: htmlData, css: cssContent })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteTutorial = async (path, id) => {
  try {
    const { data } = await instance.delete(`tutorial/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}



export const editTutorialCategory = async (path, editshow, removeSameData) => {
  try {
    const { data } = await instance.patch(`tutorial/category/${editshow.id}?module=${path}&cource=${removeSameData}`, { category: editshow.category_name })
    return data
  } catch (err) {
    return err.message
  }
}

export const createTutorialCategory = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.post(`tutorial/category?module=${path}&cource=${courcesid}`, { category: editshow.category_name })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteTutorialCategory = async (path, id) => {
  try {

    const { data } = await instance.delete(`tutorial/category/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTutorialCategory = async (path, cource, limit, currentPage) => {
  try {
    const { data } = await instance.get(`tutorial/category?module=${path}&limit=${limit}&skipPage=${currentPage}&cource=${cource}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editFaqs = async (path, editshow, removeSameData) => {
  try {

    const { data } = await instance.patch(`faqs/${editshow.id}?module=${path}`, { point: editshow.point, description: editshow.description, about: removeSameData })
    return data
  } catch (err) {
    return err.message
  }
}

export const createFaqs = async (path, editshow, courcesid) => {
  try {

    const { data } = await instance.post(`faqs?module=${path}`, { point: editshow.point, description: editshow.description, about: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteFaqs = async (path, id) => {
  try {
    const { data } = await instance.delete(`faqs/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allFaqs = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`faqs?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editTermsConditions = async (path, id, editshow) => {
  try {
    const { data } = await instance.patch(`tnc/${id}?module=${path}`, { page: editshow.page, description: editshow.description })
    return data
  } catch (err) {
    return err.message
  }
}

export const createTermsConditions = async (path, editshow) => {
  try {
    const { data } = await instance.post(`tnc?module=${path}`, { page: editshow.page, description: editshow.description })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteTermsConditions = async (path, id) => {
  try {
    const { data } = await instance.delete(`tnc/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTermsConditions = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`tnc?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editWebSitePage = async (path, id, formData, html, css) => {
  try {
    const { data } = await instance.patch(`navLinks/${id}?module=${path}`, {name:formData.name, nav_link:formData.nav_link,html:html,css:css, explore:formData.explore})
    return data
  } catch (err) {
    return err.message
  }
}

export const createWebSitePage = async (path, formData, html,css) => {
  try {
    const { data } = await instance.post(`navLinks?module=${path}`, {name:formData.name, nav_link:formData.link,html:html,css:css, explore:formData.explore})
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteWebSitePage = async (path, id) => {
  try {
    const { data } = await instance.delete(`navLinks/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allWebSitePage = async (path, limit, currentPage, id) => {
  try {
    const { data } = await instance.get(`navLinks?module=${path}&limit=${limit}&skipPage=${currentPage}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}



export const editTutorialCource = async (path, formData, id) => {
  try {
    const { data } = await instance.patch(`tutorialCource?module=${path}&id=${id}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

export const createTutorialCource = async (path, formData) => {
  try {
    const { data } = await instance.post(`tutorialCource?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}



export const deleteTutorialCource = async (path, id) => {
  try {

    const { data } = await instance.delete(`tutorialCource/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTutorialCource = async (path, limit, currentPage, editshow) => {
  try {
    const { data } = await instance.get(`tutorialCource?module=${path}&limit=${limit}&skipPage=${currentPage}&startDate=${editshow.startDate}&endDate=${editshow.endDate}&month=${editshow.month}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allTutorialCourceForSearch = async (path, limit, currentPage, editshow) => {
  try {
    const { data } = await instance.get(`tutorialCource?module=${path}&limit=${limit}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const singleTutorialCource = async (path, id) => {
  try {
    const { data } = await instance.get(`tutorialCource?module=${path}&id=${id}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const createExcel = async (path, allData) => {

  try {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    // Create a worksheet
    const ws = await XLSX.utils.json_to_sheet(allData);
    // Adjust column sizes based on content length
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxLen = 0;
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellAddress = { c: C, r: R };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        if (!ws[cellRef]) continue;

        const text = XLSX.utils.format_cell(ws[cellRef]);
        const textLen = text.length;
        if (textLen > maxLen) {
          maxLen = textLen;
        }
      }
      const colWidth = maxLen > 0 ? maxLen + 6 : 10; // Add some padding or set a default width
      ws['!cols'] = ws['!cols'] || [];
      ws['!cols'][C] = { wch: colWidth };
    }

    // Create workbook
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    // Write workbook to array buffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Create Blob and save the file
    const data = await new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, path.slice(1) + fileExtension);

  } catch (err) {
    return err.message
  }
}

export const editFormType = async (path, id, editshow) => {
  try {
    const { data } = await instance.patch(`forms/${id}?module=${path}`, { form_about: editshow.form_about })
    return data
  } catch (err) {
    return err.message
  }
}

export const createFormType = async (path, editshow) => {
  try {
    const { data } = await instance.post(`forms?module=${path}`, { form_about: editshow.form_about })
    return data
  } catch (err) {
    return err.message
  }
}



export const deleteFormType = async (path, id) => {
  try {

    const { data } = await instance.delete(`forms/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allFormType = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`forms?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editFormStatus = async (path, id, status) => {
  try {
    const { data } = await instance.patch(`forms/status/${id}?module=${path}`, { status })
    return data
  } catch (err) {
    return err.message
  }
}

export const createFormStatus = async (path, editshow) => {
  try {
    const { data } = await instance.post(`forms/status?module=${path}`, { status: editshow.enquiry_status })
    return data
  } catch (err) {
    return err.message
  }
}



export const deleteFormStatus = async (path, id) => {
  try {

    const { data } = await instance.delete(`forms/status/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allFormStatus = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`forms/status?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}
// path, givenLimit, currentPage, editshow
export const enquiryFormData = async (path, limit, currentPage, route) => {
  try {

    const { data } = await instance.get(`forms/${route}?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}
export const enquiryFormFilter = async (path, link, dateType) => {
  try {
    const { data } = await instance.get(`forms/${link}?module=${path}&startDate=${dateType.startDate}&endDate=${dateType.endDate}&month=${dateType.month}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const enquiryFormBaseOnCourse = async (path, link, course) => {
  try {
    const { data } = await instance.get(`forms/${link}?module=${path}&course=${course}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const joinFormData = async (path, limit, currentPage, editshow) => {
  try {
    const { data } = await instance.get(`forms/join?module=${path}&limit=${limit}&skipPage=${currentPage}&startDate=${editshow.startDate}&endDate=${editshow.endDate}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const chnageFormStatus = async (path, id, status) => {
  try {
    const { data } = await instance.put(`forms/status/${id}?module=${path}`, { status })
    return data
  } catch (err) {
    return err.message
  }
}

export const addFeedBack = async (path, id, feedback) => {
  try {
    const { data } = await instance.put(`forms/feedback/${id}?module=${path}`, { feedback: feedback })
    return data
  } catch (err) {
    return err.message
  }
}

export const faqsPages = async (path) => {
  try {
    const { data } = await instance.get(`faqs/points?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}




export const allCourceJoinPoint = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`coursePoint?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editCourceJoinPoint = async (path, id, formData) => {
  try {
    const { data } = await instance.patch(`coursePoint/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourceJoinPoint = async (path, formData) => {
  try {
    const { data } = await instance.post(`coursePoint?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}



export const deleteCourceJoinPoint = async (path, id) => {
  try {

    const { data } = await instance.delete(`coursePoint/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}




export const editCourceCategory = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.patch(`category/category/${editshow.id}?module=${path}`, { category: editshow.category_name, cource: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourceCategory = async (path, editshow, courcesid) => {
  try {
    const { data } = await instance.post(`category/category?module=${path}`, { category: editshow.category_name, cource: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteCourceCategory = async (path, id) => {
  try {

    const { data } = await instance.delete(`category/category/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourceCategory = async (path, limit, cource, currentPage) => {
  try {

    const { data } = await instance.get(`category/category?module=${path}&limit=${limit}&skipPage=${currentPage}&cource=${cource}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const changeVacancyStatus = async (path, cource, limit, currentPage) => {
  try {

    const { data } = await instance.get(`category/category?module=${path}&limit=${limit}&skipPage=${currentPage}&cource=${cource}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const addRoleVaccency = async (path, id) => {
  try {

    const { data } = await instance.put(`role/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a new brochure
 * permission required to add a new brochure
 */
export const createbrochure = async (path, form) => {
  try {
    const { data } = await instance.post(`brochure?module=${path}`, form)
    return data
  } catch (err) {
    return err.message
  }
}

/** List of all brochure
 *  permission required to view brochure
 */
export const allbrochure = async (path) => {
  try {
    const { data } = await instance.patch(`brochure?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** Delete a brochure by id
 * permission required to delete a brochure
 */
export const deletebrochure = async (path, id) => {
  try {
    const { data } = await instance.delete(`brochure/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** Download a brochure
 * permission required to download a brochure
 */
export const downloadbrochure = async (path, id, name) => {
  try {

    const response = await instance.get(`brochure/download/${id}?module=${path}`, {
      responseType: 'blob',
    })
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    return link.click();
  } catch (err) {
    return err.message
  }
}


export const pendingNotifications = async (path) => {
  try {
    const { data } = await instance.put(`permission?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const readNotifications = async (path) => {
  try {
    const { data } = await instance.patch(`permission?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjectLangauage = async (path, givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`projectAbout?module=${path}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const createProjectLangauage = async (path, language) => {
  try {
    const { data } = await instance.post(`projectAbout?module=${path}`, { language })
    return data
  } catch (err) {
    return err.message
  }
}


export const editProjectLangauage = async (path, id, language) => {
  try {
    const { data } = await instance.patch(`projectAbout/${id}?module=${path}`, { language })
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteProjectLangauage = async (path, id) => {
  try {
    const { data } = await instance.delete(`projectAbout/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjecttech = async (path, language, givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`projectAbout/tech?module=${path}&langauge=${language}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const createProjecttech = async (path, technology, language) => {
  try {
    const { data } = await instance.post(`projectAbout/tech?module=${path}`, { languages: language, technology: technology })
    return data
  } catch (err) {
    return err.message
  }
}


export const editProjecttech = async (path, editShow, language) => {
  try {
    const { data } = await instance.patch(`projectAbout/tech/${editShow.id}?module=${path}`, { languages: language, technology: editShow.technology })
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteProjecttech = async (path, id) => {
  try {
    const { data } = await instance.delete(`projectAbout/tech/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjectTopic = async (path, givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`projectPoint?module=${path}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const createProjectTopic = async (path, topic) => {
  try {
    const { data } = await instance.post(`projectPoint?module=${path}`, { topic })
    return data
  } catch (err) {
    return err.message
  }
}


export const editProjectTopic = async (path, id, topic) => {
  try {
    const { data } = await instance.patch(`projectPoint/${id}?module=${path}`, { topic })
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteProjectTopic = async (path, id) => {
  try {
    const { data } = await instance.delete(`projectPoint/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjectTopicPoint = async (path, project,givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`projectPoint/point?module=${path}&limit=${givenLimit}&skipPage=${currentPage}&project=${project}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const createProjectTopicPoint = async (path, editshow,projectid) => {
  try {
    const { data } = await instance.post(`projectPoint/point?module=${path}`, { topic : editshow.topic, project : projectid, heading : editshow.heading, description : editshow.description})
    return data
  } catch (err) {
    return err.message
  }
}


export const editProjectTopicPoint = async (path, editshow,projectid) => {
  try {
    const { data } = await instance.patch(`projectPoint/point/${editshow.id}?module=${path}`, {  topic : editshow.topic, project : projectid, heading : editshow.heading, description : editshow.description })
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteProjectTopicPoint = async (path, id) => {
  try {
    const { data } = await instance.delete(`projectPoint/point/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const addProject = async (path,formValue) => {
  try {
    const { data } = await instance.post(`project?module=${path}`,formValue)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjects = async (path) => {
  try {
    const { data } = await instance.get(`project?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const projectsName = async (path) => {
  try {
    const { data } = await instance.get(`project/list?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}



export const addProjectFile = async (path,formValue) => {
  try {
    const { data } = await instance.post(`project/files/?module=${path}`,formValue)
    return data
  } catch (err) {
    return err.message
  }
}


export const allProjectFile = async (path,givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`project/files/?module=${path}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteProjectFile = async (path,id) => {
  try {
    const { data } = await instance.delete(`project/files/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const projectCategories = async (path) => {
  try {
    const { data } = await instance.get(`project/category?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const projectdelete = async (path, id) => {
  try {
    const { data } = await instance.delete(`project/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}




///Ecomers


export const usersMembers = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`users?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const usersPayment = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.delete(`users?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteECourse = async (path, id) => {
  try {

    const { data } = await instance.delete(`ecommersCourse/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allECourse = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourse?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editECourse = async (path, id, formData) => {
  try {
    const { data } = await instance.patch(`ecommersCourse/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const createECourse = async (path, formData) => {
  try {

    const { data } = await instance.post(`ecommersCourse?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const usersCart = async (path) => {
  try {

    const { data } = await instance.put(`users?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const usersWishList = async (path) => {
  try {

    const { data } = await instance.patch(`users?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const usersReview = async (path) => {
  try {

    const { data } = await instance.get(`users/review/?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const reviewDelete = async (path, id) => {
  try {

    const { data } = await instance.delete(`users/review/${id}/?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editSections = async (path, id, formData) => {
  try {
    const { data } = await instance.patch(`ecommersSection/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a new choose us point
 */
export const createSections = async (path, formData) => {
  try {
    const { data } = await instance.post(`ecommersSection?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/** 
 * delete already exists  point
 *  permisison requied to delete a point
 */
export const deleteSections = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersSection/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

// all why choose us point 
export const allSections = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersSection?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const editCourceLearn = async (path, editshow, removeSameData) => {
  try {

    const { data } = await instance.patch(`ecommersCoursePoint/learn/${editshow.id}?module=${path}`, { point: editshow.point, about: removeSameData })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourceLearn = async (path, editshow, courcesid) => {
  try {

    const { data } = await instance.post(`ecommersCoursePoint/learn?module=${path}`, { point: editshow.point,  about: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}


export const editCourseChapter = async (path, editshow, removeSameData) => {
  try {

    const { data } = await instance.patch(`ecommersCourse/chapter/${editshow.id}?module=${path}`, { chapter: editshow.chapter,  courses: removeSameData })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourseChapter = async (path, editshow, courcesid) => {
  try {

    const { data } = await instance.post(`ecommersCourse/chapter?module=${path}`, { chapter: editshow.chapter,  courses: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteCourseChapter = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersCourse/chapter/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourseChapter = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourse/chapter?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteCourceLearn = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersCoursePoint/learn/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourceLearn = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCoursePoint/learn?module=${path}&limit=${limit}&skipPage=${currentPage}`)
     return data
  } catch (err) {
    return err.message
  }
}

/**
 * edit a course type by id 
 * permission requried to edit a course type
 */
export const editECourseType = async (path, id, formData) => {
  try {
    const { data } = await instance.patch(`ecommersCourseCategory/${id}?module=${path}`, formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const createECourseType = async (path, formData) => {
  try {

    const { data } = await instance.post(`ecommersCourseCategory?module=${path}`,formData)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * delete a course type by id
 * permission need o delete a course type
 */
export const deleteECourseType = async (path, id) => {
  try {

    const { data } = await instance.delete(`ecommersCourseCategory/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * list of all course types
 * permision required to see all couse type
 */
export const allECourseType = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourseCategory?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editCourcePrerequisite = async (path, editshow, removeSameData) => {
  try {

    const { data } = await instance.patch(`ecommersCoursePoint/prerequisite/${editshow.id}?module=${path}`, { requirement: editshow.requirement, about: removeSameData })
    return data
  } catch (err) {
    return err.message
  }
}

export const createCourcePrerequisite = async (path, editshow, courcesid) => {
  try {

    const { data } = await instance.post(`ecommersCoursePoint/prerequisite?module=${path}`, { requirement: editshow.requirement,  about: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteCourcePrerequisite = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersCoursePoint/prerequisite/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const addVideos = async (path, posts, chapterid) => {
 
  try {
    const { data } = await instance.post(`ecommersCourse/topic?module=${path}`, {chapter_id : chapterid, topic : posts.topic, videoLink : posts.videoLink, timing : posts.timing})
   
    return data
  } catch (err) {
    return err.message
  }
}

export const editVideos = async (path, posts, chapterid) => {
  try {
    const { data } = await instance.patch(`ecommersCourse/topic/${posts.id}?module=${path}`, {chapter_id : chapterid, topic : posts.topic, videoLink : posts.videoLink, timing : posts.timing})
    return data
  } catch (err) {
    return err.message
  }
}


export const allVideos = async (path, givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourse/topic?module=${path}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const deleteVideos = async (path, givenLimit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourse/topic?module=${path}&limit=${givenLimit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourcePrerequisite = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCoursePoint/prerequisite?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}



/**
 * delete a course type by id
 * permission need o delete a course type
 */
export const deleteCourselabel = async (path, id) => {
  try {

    const { data } = await instance.delete(`ecommersCourseCategory/label/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allCourselabel = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersCourseCategory/label?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}


export const editCourselabel = async (path, id, label) => {
  try {
    const { data } = await instance.patch(`ecommersCourseCategory/label/${id}?module=${path}`, { label })
    return data
  } catch (err) {
    return err.message
  }
}

/**
 * create a course type 
 * permission required to add a course type
 */
export const createCourselabel = async (path, label) => {
  try {

    const { data } = await instance.post(`ecommersCourseCategory/label?module=${path}`, {label})
    return data
  } catch (err) {
    return err.message
  }
}



export const editEFaqs = async (path, editshow, removeSameData) => {
  try {

    const { data } = await instance.patch(`ecommersSection/faqs/${editshow.id}?module=${path}`, { point: editshow.point, description: editshow.description, about: removeSameData })
    return data
  } catch (err) {
    return err.message
  }
}

export const createEFaqs = async (path, editshow, courcesid) => {
  try {

    const { data } = await instance.post(`ecommersSection/faqs?module=${path}`, { point: editshow.point, description: editshow.description, about: courcesid })
    return data
  } catch (err) {
    return err.message
  }
}

export const deleteEFaqs = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersSection/faqs/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const allEFaqs = async (path, limit, currentPage) => {
  try {
    const { data } = await instance.get(`ecommersSection/faqs?module=${path}&limit=${limit}&skipPage=${currentPage}`)
    return data
  } catch (err) {
    return err.message
  }
}

export const createEbrochure = async (path, form) => {
  try {
    const { data } = await instance.post(`ecommersSection/resourse?module=${path}`, form)
    return data
  } catch (err) {
    return err.message
  }
}

/** List of all brochure
 */
export const allEbrochure = async (path) => {
  try {
    const { data } = await instance.patch(`ecommersSection/resourse?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** Delete a brochure by id
 */
export const deleteEbrochure = async (path, id) => {
  try {
    const { data } = await instance.delete(`ecommersSection/resourse/${id}?module=${path}`)
    return data
  } catch (err) {
    return err.message
  }
}

/** Download a brochure
 */
export const downloadEbrochure = async (path, id, name) => {
  try {
    const response = await instance.get(`ecommersSection/resourse/download/${name}?module=${path}`, {
      responseType: 'blob',
    })
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    return link.click();
  } catch (err) {
    return err.message
  }
}

