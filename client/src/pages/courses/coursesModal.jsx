import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/esm/ModalBody';
import { allCourseType, createCourse } from '../../Components/CommonUrl/apis';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';


function CoursesModal({ show, setShow, path, allData }) {
  const [selected, setSelected] = useState(null);
  const [filed, setField] = useState({
    name: "", description: "", category: "", videoLink: "", meta_tags: "JTC - No. 1 Technical Training Center in noida", meta_keywords: "JTC, JTC India, JTC Noida, JAVA in Noida, Java Training in Noida, full stack developer course in Noida, java full stack developer noida, front end full stack developer in noida, Professional Courses in Noida, Job Oriented Courses in noida, it professional training in noida, Python course in noida", meta_description: "Our candidates get assured placements in top companies of the country as well as overseas. We have achieved high placement records year after year.", jobs : "", duration : "",job_pay : ""
  })
  const [icon, setIcon] = useState([])
  const [banner, setBanner] = useState([])
  const [category, setCategory] = useState([])


  // add a course 
  const createCourseFunc = async (e) => {
    e.preventDefault()
    if (!selected) return alert("Course Type Added required")
    const coursesid = selected && await selected.map((el) => el.value)
    const formData = new FormData()
    formData.append("name", filed.name)
    formData.append("description", filed.description)
    formData.append("type", coursesid)
    formData.append("videoLink", filed.videoLink)
    formData.append("meta_tags", filed.meta_tags)
    formData.append("meta_keywords", filed.meta_keywords)
    formData.append("meta_description", filed.meta_description)
    formData.append("icon", icon[0])
    formData.append("banner", banner[0])
    const data = await createCourse(path, formData)
    if (data.success == true) {
      allData()
      setShow(!show)
      return alert(data.message)
    } else {
      return alert(data.message)
    }
  }
  // handel input
  const handelChange = (e) => {
    setField({ ...filed, [e.target.name]: e.target.value })
  }
  // close model
  const handleClose = () => {
    setField("")
    setShow(false)
  };

  let optionArray = []
  // all Course Type
  const allCategory = async () => {
    const { data } = await allCourseType("/acourses_type", 'All');
    if (data) {
      data.map((el) => {
        optionArray.push({ label: el.category, value: el.id })
      })
      setCategory(optionArray)
    } else return alert('You Do not have Permission')
  }
  useEffect(() => {

    allCategory()
  }, [])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Courses</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <div className="coursesForm">
            <form action="POST" onSubmit={createCourseFunc}>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input type="text" name="name" id="" placeholder="Enter Course Name" className="form-control" value={filed.name} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Course Overview</label>
                <input type="text" name="description" id="" placeholder="Enter Course Overview" className="form-control" value={filed.description} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="CourseCategory">Course Category</label>
                {category && <Select
                  isMulti
                  name="category"

                  options={category}
                  onChange={setSelected}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />}
              </div>
              <div className="form-group">
                <label htmlFor="courseicon" name="icon">Upload Icon
                  <UploadImageComponent image={icon} setImage={setIcon} requiredDimensions={{ width: 70, height: 70 }} />
                  <span>*Image should be at least <strong>width: 70 and height: 70</strong><br />*size will be less than <strong>1mb</strong></span>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="coursebanner" name="banner">Upload Banner
                  <UploadImageComponent image={banner} setImage={setBanner} requiredDimensions={{ width: 1500, height: 263 }} />
                  <span>*Image should be at least <strong>width: 1500 and height: 263</strong><br />*size will be less than <strong>1mb</strong></span>
                </label>
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
                <textarea name="meta_description" id="exampleFormControlTextarea1" className="form-control" value={filed.meta_description} onChange={handelChange} rows="3" /></div>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CoursesModal
