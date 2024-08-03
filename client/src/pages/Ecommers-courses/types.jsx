import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MdDelete, MdEditSquare, MdRemoveRedEye, MdDownloading } from "react-icons/md";

import Modal from 'react-bootstrap/Modal';
import { allECourseType, createECourseType, deleteECourseType, editECourseType} from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

const TypesOfECourses = () => {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState([])
  const [editshow, setEditShow] = useState({
    category: "", id: '', description : "", icon : ''
  });
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setEditShow(show)
    setShow(false)
  };

  /** list of all couse types */
  const allData = async () => {
    
    const {data} = await allECourseType(path)
    data && setTotal(data.length)
    return data && setState(data)
  }

 
  useEffect(() => {
    allData()
  }, [])

  /** delete a course type  */
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteECourseType(path, id)
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

    const formData = new FormData()
    formData.append('category', editshow.category)
    formData.append('description', editshow.description)
    formData.append('icon', icon[0])
    let value;
    if (editshow.id > 0) {
      /** edit course type */
      value = await editECourseType(path, editshow.id, formData)
    } else {
      /** create course type */
      value = await createECourseType(path, formData)
    }
    e.preventDefault()
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      allData()
    } else alert(value.message)
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Courses Category</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className='middlebody m-3'>

          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Icon</th>
                 
                  <th>Created At</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts && currentPosts.filter((obj) => {
                  if (query == "")
                    return obj;
                  else if (
                    obj.category.toLowerCase().includes(query.toLowerCase())
                  )
                    return obj;

                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.category}</td>
                    <td>{el.description}</td>
                    <td><img src={el.icon} alt="" srcset="" width={50} height={50} /></td>
                 
                    <td>{el.created_at}</td>

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

        <Pagination
          setPostPerPage={setPostPerPage}
          postPerpage={postPerpage}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title> Add Course Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="batchesform fw-semibold">
            <form action="" onSubmit={handelCreateAndUpdate}>
             <div>
             <label htmlFor="date" className='text-dark mt-2 fw-semibold'>  Category </label>
              <input type="text" name="category" id="" value={editshow.category} placeholder='Enter Course Category' className="form-control" onChange={handelChange} required />
               </div>
             <div>
             <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Description </label>
              <input type="text" name="description" id="" value={editshow.description} placeholder='Enter Course Description' className="form-control" onChange={handelChange} required />
             </div>
             <div>
             <label htmlFor="icon"> Upload Image
            <UploadImageComponent image={icon} setImage={setIcon} existsImage={editshow.icon} requiredDimensions={{ width: 75, height: 75 }}/>
            <span>*please upload icons with at least<strong>width: 75 and height: 75</strong><br />*size will be less than <strong>1mb</strong></span>
          </label>
          </div>
              <input type="submit" value="Save Category" className=' btn btn-primary mt-4 mb-2 btn-create' required />
          
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TypesOfECourses