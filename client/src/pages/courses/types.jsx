import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allCourseType, createCourseType, deleteCourseType, editCourseType } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const TypesOfCourses = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    category : "",id : ''
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

  /** list of all couse types */
  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allCourseType(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  /** delete a course type  */
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourseType(path, id)
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
    if (editshow.id > 0) {
      /** edit course type */
      value = await editCourseType(path, editshow.id, editshow.category)
    } else {
        /** create course type */
      value = await createCourseType(path, editshow.category)
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
        <h3 className='heading mb-4'>Courses Types</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Course Type</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data && state.data.filter((obj) => {
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
  <Modal.Title> Add Course Category</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Course Category </label>
      <input type="text" name="category" id="" value={editshow.category} placeholder='Enter Course Category' className="form-control" onChange={handelChange} required />
      <input type="submit" value="Save Category" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default TypesOfCourses