import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allTutorialType, createTutorialType, deleteTutorialType, editTutorialType } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const TutorialType = () => {
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


  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allTutorialType(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTutorialType(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  
  const handleEdit = (el) => {
    if (el) {
      setEditShow(el)
      setShow(true)
    } else return alert("Module Not Selected")
  }

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    let value;
    if (editshow.id > 0) {
      value = await editTutorialType(path, editshow.id, editshow.category)
    } else {
      value = await createTutorialType(path, editshow.category)
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
        <h3 className='heading mb-4'>Tutorials Types</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Module</th>
                
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
  <Modal.Title> Add Tutorial Category</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Tutorial Category </label>
      <input type="text" name="category" id="" value={editshow.category} placeholder='Enter Tutorial Category' className="form-control" onChange={handelChange} required />
      <input type="submit" value="Save Category" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default TutorialType