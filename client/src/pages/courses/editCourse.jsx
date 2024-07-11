import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import ModalBody from 'react-bootstrap/esm/ModalBody';
import { allCourseType, editCourse, singleCourse } from '../../Components/CommonUrl/apis';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';


function CoursesEdit({ editshow, setEditShow, path, allData, editId }) {
    const [selected, setSelected] = useState(null);
    const [defaultcourseList, setdefaultCourse] = useState()
    const [category, setCategory] = useState([])
    const [filed, setField] = useState({
        name: "",description:"", category: "", videoLink: "", meta_tags: "", meta_keywords: "", meta_description: "", icon : "", banner : "", jobs : "", duration : "",job_pay : ""
    })
    const [icon,setIcon] = useState([])
    const [banner,setBanner] = useState([])

    // edit course by id
    const editCourseFunc = async (e) => {
        if(!selected && !defaultcourseList) return alert("Course seletion Nedded")
        e.preventDefault()
        const editcoursesid = selected && await selected.map((el) => el.label)
        const removeSameData = [...new Set(editcoursesid)]
        const formData = new FormData()
        formData.append("name", filed.name)
        formData.append("description", filed.description)
        formData.append("type", removeSameData)
        formData.append("videoLink", filed.videoLink)
        formData.append("meta_tags", filed.meta_tags)
        formData.append("meta_keywords", filed.meta_keywords)
        formData.append("meta_description", filed.meta_description)
        formData.append("duration", filed.duration)
        formData.append("jobs", filed.jobs)
        formData.append("job_pay", filed.job_pay)
        formData.append("icon", icon[0])
        formData.append("banner", banner[0])
        const data = await editCourse(path, formData, editId)
        if (data.success == true) {
            allData()
            setEditShow(!editshow)
            return alert(data.message)
        }else
            return alert(data.message)
    }
    // handel inputs
    const handelChange = (e) => {
        setField({ ...filed, [e.target.name]: e.target.value })
    }
    // close model function
    const handleClose = () => {
        editId = 0;
           setEditShow(!editshow)
    }

    // all type couses type list
    let optionArray = []
    
    const allCategory = async() =>{
      const {data} = await allCourseType("/acourses_type", 'All');
      if(data){
        data.map((el) => {
        optionArray.push({label : el.category, value : el.id })
        })
     return setCategory(optionArray)
      }
    }

    let defaultCorces = []
    // get data of couse by id
    const singleData = async () => {
         const { data } = await singleCourse(path, editId)
        if (data) {
            setField(...data)
            if(data[0].category)  {
                const already = await data[0].category.split(",")
                for (let index = 0; index < already.length; index++) {
                  defaultCorces.push({label :already[index], value :already[index]})
                }
                setdefaultCourse(defaultCorces)
                allCategory()
              }
        } else return setEditShow(!editshow)
        
    }

    useEffect(() => {
        singleData()
    }, [editId])

    return (
        <>

            <Modal show={editshow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Courses</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <div className="coursesForm">
                        <form action="POST" onSubmit={editCourseFunc}>
                            <div className="form-group">
                                <label htmlFor="courseName">Course Name</label>
                                <input type="text" name="name" id="" className="form-control" value={filed.name} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Course Description</label>
                                <input type="text" name="description" id="" className="form-control" value={filed.description} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CourseCategory">Course Category</label>
                                    {defaultcourseList &&  <Select  
                                    isMulti
                                    name="category"
                                    defaultValue={defaultcourseList}
                                    options={category}
                                    onChange={setSelected}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    />}
                   </div>
                            <div className="form-group">
                    <label htmlFor="courseicon" name="icon">Icons
                    <UploadImageComponent  image={icon} setImage={setIcon} existsImage={filed.icon} requiredDimensions={{ width: 70, height: 70 }}/>
                    </label>
                            <div className="form-group">
                      <label htmlFor="coursebanner" name="banner">Banner
                      <UploadImageComponent   image={banner} setImage={setBanner} existsImage={filed.banner} requiredDimensions={{ width: 1920, height: 263 }}/>
                      </label>
                    </div>
                    </div>
                            <div className="form-group">
                                <label htmlFor="videolink" name="videolink">Video Link</label>
                                <input type="url" name="videoLink" id="" className="form-control" value={filed.videoLink} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="jobs" name="jobs">Jobs</label>
                                <input type="number" name="jobs" id="" className="form-control" value={filed.jobs} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration" name="duration">Duration</label>
                                <input type="number" name="duration" id="" className="form-control" value={filed.duration} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="job_pay" name="job_pay">Job Pay</label>
                                <input type="text" name="job_pay" id="" className="form-control" value={filed.job_pay} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1" name="meta_tags">Meta Title</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="meta_tags" value={filed.meta_tags} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1" name="metakeyword" >Meta Keyword</label>
                                <textarea className="form-control" name="meta_keywords" id="exampleFormControlTextarea1" value={filed.meta_keywords} onChange={handelChange} rows="3" />
                            </div> 
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1" name="meta_description">Meta Description</label>
                                <textarea name="meta_description" id="exampleFormControlTextarea1" className="form-control" value={filed.meta_description} onChange={handelChange} rows="3" />
                                </div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>

                </ModalBody>


            </Modal>
        </>
    )
}

export default CoursesEdit
