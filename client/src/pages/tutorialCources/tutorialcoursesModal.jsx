import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import ModalBody from 'react-bootstrap/esm/ModalBody';
import { allTutorialType, createTutorialCource } from '../../Components/CommonUrl/apis';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';


function CoursesModal({ show, setShow, path, allData }) {
  const [selected, setSelected] = useState(null);
  const [filed, setField] = useState({
    name: "", category: "",  meta_tags: "JTC - No. 1 Technical Training Center in noida", meta_keywords: "JTC, JTC India, JTC Noida, JAVA in Noida, Java Training in Noida, full stack developer course in Noida, java full stack developer noida, front end full stack developer in noida, Professional Courses in Noida, Job Oriented Courses in noida, it professional training in noida, Python course in noida", meta_description: "Our candidates get assured placements in top companies of the country as well as overseas. We have achieved high placement records year after year."
  })
  const [icon, setIcon] = useState([])
  const handelSumbit = async (e) => {
    e.preventDefault()
    if(!selected) return alert("Category Added required") 
    const courcesid = selected && await selected.map((el) => el.value)
    const formData = new FormData()
    formData.append("name", filed.name)
    formData.append("category", courcesid)
    formData.append("meta_tags", filed.meta_tags)
    formData.append("meta_keywords", filed.meta_keywords)
    formData.append("meta_description", filed.meta_description)
    formData.append("icon", icon[0])
    const data = await createTutorialCource(path, formData)
    if (data.success == true) {
      allData()
      setShow(!show)
      setField("")
      setIcon("")
      return alert(data.message)
    }else{
        return alert(data.message)
    }
  }

  const handelChange = (e) => {
    setField({ ...filed, [e.target.name]: e.target.value })
  }

  const handleClose = () => {
    setField("")
    setShow(false)
  };
  const [category, setCategory] = useState([])

  let optionArray = []
  const allCategory = async () => {
    const { data } = await allTutorialType("/atutorial_types", 'All');
    if(data){
      data.map((el) => {
      optionArray.push({label : el.category, value : el.id })
      })
    setCategory(optionArray)
    }else return alert('You Do not have Permission')
  }


  
  useEffect(() => {

    allCategory()
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tutorial</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <div className="coursesForm">
            <form action="POST" onSubmit={handelSumbit}>
              <div className="form-group">
                <label htmlFor="courseName">Course Name</label>
                <input type="text" name="name" id="" placeholder="Enter Course Name" className="form-control" value={filed.name} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="CourseCategory">Course Type</label>
                {category &&  <Select  
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
                <UploadImageComponent image={icon} setImage={setIcon} requiredDimensions={{ width: 70, height: 70 }}/>
                <span className='text-danger'>*please upload icons with <strong> width: 70 and height: 70 </strong></span>
                </label>
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
