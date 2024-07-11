import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allProjectTopic,  createProjectTopic,  deleteProjectTopic,  editProjectTopic, handleClose } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const ProjectTopics = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    topic : "",id : ''
  });
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

// list of all points
  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allProjectTopic(path, givenLimit, currentPage)
    return  data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  // delete a point by id
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteProjectTopic(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
       return allData()
      } else return alert(deleteMember.message)

    } else return false
  }

  // handel inputs
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  // open edit model
  const handleEdit = (el) => {
    if (!el)  return alert("Module Not Selected")
      setEditShow(el)
     return setShow(true)
  }
  
// careate and edit point
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    let value;
    if (editshow.id > 0) {
      // edit a point by 
      value = await editProjectTopic(path, editshow.id, editshow.topic)
    } else {
      // create a new point
      value = await createProjectTopic(path, editshow.topic)
    }

    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      return allData()
    }else return alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Why Choose Us Points</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
     
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Langauge</th>
         
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                
                    obj.topic.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.topic}</td>
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )) : <h1>No Data</h1> }
              </tbody>
            </table>
          </div>
        </div>
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
      <Modal show={show} onHide={() => handleClose(setShow, setEditShow)}>

<Modal.Header closeButton>
  <Modal.Title>Points</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
       <div className="form-group">
          <label htmlFor="">Enter topic
          <input type="text" name="topic" id="" value={editshow.topic} className="form-control" onChange={handelChange} required />
            </label>
       </div>
      <input type="submit" value="Add Points" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}


export default ProjectTopics
