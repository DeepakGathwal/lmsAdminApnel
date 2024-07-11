import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allECourse, allCourselabel, createECourse,allECourseType, deleteECourse,  editECourse } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

const Cources = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState([])
  const [labelList, setLabelList] = useState([])
  const [courceCategoryList, setcourceCategoryList] = useState([])
  const [editshow, setEditShow] = useState({
    name : "",category : '', description : "", label : "", image : "", total_price : "", discount : '', video_link : "",certificates : ''
  });
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setEditShow(show)
    setShow(false)
  };

  const allLabelData = async() => {
    const {data} =  await allCourselabel( "/e-courseLearn","All")
    allCourcesCategory()
    return data && setLabelList(data)
  }

  const allCourcesCategory = async() => {
    const {data} =  await allECourseType( "/e-courseCategory","All")

    return data && setcourceCategoryList(data)
  }



  /** list of all couse types */
  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allECourse(path, givenLimit, currentPage)
   
    allLabelData()
   return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  /** delete a course type  */
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteECourse(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  /** handel all inputs */
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  /** open edit modle */
  const handleEdit = (el) => {
    if (!el) return alert("Module Not Selected") 
      setEditShow(el)
      setShow(true)
  }

    /** create and delete course type */
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    let value;
    const formData = new FormData()
    formData.append('name', editshow.name)
    formData.append('category', editshow.category)
    formData.append('description', editshow.description)
    formData.append('label', editshow.label)
    formData.append('price', editshow.total_price)
    formData.append('discount', editshow.discount)
    formData.append('video_link', editshow.video_link)
    formData.append('certificates', editshow.certificates)
    formData.append('image', image[0])
    if (editshow.id > 0) {
      /** edit course type */
      value = await editECourse(path, editshow.id, formData)
    } else {
        /** create course type */
      value = await createECourse(path, formData)
    }
    e.preventDefault()
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      allData()
    }else alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>All Courses</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                {/* cources.certificates  */}

                  <th>Id</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
               
                  <th>Label</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Video Link</th>
                
                  <th>Certificate</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
     
                 {state.data && state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.label.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.name}</td>
                     <td>{el.category}</td>
                     <td>{el.description}</td>
                    <td>{el.label}</td>
                     <td>
                      <img src={el.image} width={50} height={50} alt="" srcset="" />
                     </td>
                     <td>{el.total_price}</td>
                     <td>{el.discount + " %"}</td>
                     <td>{el.video_link}</td>
                  
                     <td>{el.certificates == 1 ? "Yes" : "No"}</td>
                    
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
      <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title> Add Course</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Name </label>
      <input type="text" name="name" id="" value={editshow.name} placeholder='Enter Course Name' className="form-control" onChange={handelChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold '> Course Category </label>
        <select name="category" id="" onChange={handelChange} className='form-control'>
        <option selected disabled>Select Course Category</option>
          {courceCategoryList && courceCategoryList.map((el) =>(
            <option value={el.id}>{el.category}</option>

          ))}
        </select>
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course description </label>
      <input type="text" name="description" id="" value={editshow.description} placeholder='Enter Course description' className="form-control" onChange={handelChange} required />
        </div>
       
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Price </label>
      <input type="text" name="total_price" id="" value={editshow.total_price} placeholder='Enter Course Price' className="form-control" onChange={handelChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Discount </label>
      <input type="text" name="discount" id="" value={editshow.discount} placeholder='Enter Course Discount' className="form-control" onChange={handelChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Video Link </label>
      <input type='url' name="video_link" id="" value={editshow.video_link} placeholder='Enter Video Link' className="form-control" onChange={handelChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Level </label>
      <select name="label" id="" className='form-control'  onChange={handelChange} >
        <option selected disabled>{editshow.label ? editshow.label :  "Select level"}</option>
          {labelList && labelList.map((ab) => (
            <option value={ab.id}>{ab.label}</option>
          ))}
        </select>
        </div>
        <div className="form-group">
        <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Certicate Availble ? </label>
      <select name="certificates" id=""  onChange={handelChange} className='form-control'>
        <option selected disabled>{editshow.certificates ? editshow.certificates == 1 ? "Yes" : "No" : "Select Certicate Status"}</option>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
         
        </select>
      {/* <input type="text" name="label" id="" value={editshow.label} placeholder='Enter Course label' className="form-control" onChange={handelChange} required /> */}
        </div>
       
        <div className="form-group">
            <label htmlFor="icon"> Upload Image
            <UploadImageComponent image={image} setImage={setImage} existsImage={editshow.image} requiredDimensions={{ width: 75, height: 75 }}/>
            <span>*please upload icons with at least<strong>width: 75 and height: 75</strong><br />*size will be less than <strong>1mb</strong></span>
          </label>
          </div>
      <input type="submit" value="Save label" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default Cources