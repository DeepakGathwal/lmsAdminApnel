const Joi = require('joi');

exports.courceLearn = Joi.object({
    point: Joi.string().required(),
    about: Joi.any().required(),
})

exports.EcourseSchema = Joi.object({
    video_link  :  Joi.string().required(),
    certificates : Joi.string().required(),
    name : Joi.string().required(),
    category : Joi.string().required(), 
    description : Joi.string().required(),
    label : Joi.string().required(),
    price : Joi.string().required(),
    discount : Joi.string().required(),
    image : Joi.string().optional()
})


exports.chooseSectionSchema = Joi.object({
    component_name: Joi.string().required(),
    section: Joi.string().required(),
    heading: Joi.string().required(),
    details: Joi.string().required()
})


exports.EcourceChapter = Joi.object({
    chapter: Joi.string().required(),
    courses: Joi.any().required(),
})


exports.coursereLabel = Joi.object({
    label: Joi.string().required()
})

exports.courseSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    videoLink: Joi.string().required(),
    jobs: Joi.string().optional(), 
    duration: Joi.string().optional(),
    job_pay: Joi.string().optional(),
    meta_tags: Joi.string().optional(),
    meta_keywords: Joi.string().optional(),
    icon: Joi.string().min(0).max(250),
    banner: Joi.string().min(0).max(250),
    meta_description: Joi.string().optional()
})
exports.tutorialSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    meta_tags: Joi.string().optional(),
    meta_keywords: Joi.string().optional(),
    icon: Joi.string().min(0).max(250),
    meta_description: Joi.string().optional()
})

exports.courserequirement = Joi.object({
    requirement: Joi.string().required(),
    about: Joi.any().required(),
})

exports.topicSchema = Joi.object({
    category_id: Joi.string().required(),
    cource_id: Joi.string().required(),
    heading: Joi.string().required(),
    html: Joi.string().required(),
    css: Joi.string().required(),
    meta_tags: Joi.string().required(),
    meta_keywords: Joi.string().required(),
    meta_description: Joi.string().required(),
    meta_title: Joi.string().required()
})

exports.teamSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required().min(10),
    role: Joi.string().required(),
    name: Joi.string().required(),
    linkedin: Joi.string().min(0).max(100),
    instagram: Joi.string().min(0).max(100),
    facebook: Joi.string().min(0).max(100)
})

exports.editTeamSchema = Joi.object({
    email: Joi.string().required(),
    phone: Joi.string().required().min(10),
    role: Joi.string().required(),
    name: Joi.string().required(),
    linkedin: Joi.string().min(0).max(100),
    instagram: Joi.string().min(0).max(100),
    facebook: Joi.string().min(0).max(100)
})

exports.profileSchema = Joi.object({
    email: Joi.string().required(),
    phone: Joi.string().required().min(10),
    name: Joi.string().required(),
    address: Joi.string().required(),
    linkedin: Joi.string().optional(),
    instagram: Joi.string().optional(),
    facebook: Joi.string().optional()
})

exports.passwordSchema = Joi.object({
    confirmPassword: Joi.string().required().min(4),
    password: Joi.string().required().min(4)
})

exports.forgetPassword = Joi.object({
    email: Joi.string().email().required()
})

exports.otpSchem = Joi.object({
    otp: Joi.number().required()
})

exports.roleSchema = Joi.object({
    role: Joi.string().required()
})

exports.categorySchema = Joi.object({
    category: Joi.string().required(),
    cource: Joi.any()

})

exports.subCategorySchema = Joi.object({
    subCategory: Joi.string().required()
})

exports.moduleSchema = Joi.object({
    modules: Joi.string().required(),
    name: Joi.string().required()
})

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


exports.aboutUs = Joi.object({
    point: Joi.string().required(),
    description: Joi.string().required()
})

exports.blogSchema = Joi.object({
    name: Joi.string().required(),
    heading: Joi.string().required(),
    video_link: Joi.string().min(0).max(200),
    meta_tags: Joi.string().required(),
    meta_keywords: Joi.string().required(),
    meta_description: Joi.string().required(),
    meta_title: Joi.string().required(),
    category: Joi.string().required(),
    blog_html: Joi.string().required(),
    blog_css: Joi.string().required()
})


exports.choosePointSchema = Joi.object({
    point: Joi.string().required()
})


exports.companySchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().min(0).max(250),
    link: Joi.string().required(),
})


exports.faqsSchema = Joi.object({
    point: Joi.string().required(),
    description: Joi.string().required(), 
    about: Joi.string().min(0).max(5000),
})

