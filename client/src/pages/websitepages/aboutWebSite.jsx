import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allAboutPoints,   createAboutPoints,  deleteAboutPoints,  editAboutPoints, handleClose } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';

const WebsiteAboutPoint = () => {
  const [show, setShow] = useState(false);

  const [editshow, setEditShow] = useState({
    description : "", id : '', point :"Website"
  });

 
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

// List of all about us points
  const allData = async () => {
    const {data} = await allAboutPoints(path)
    data && setTotal(data.length)
    return data && setState(data)
  }


  useEffect(() => {
    allData()
  }, [])

  // delete single about us point
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteAboutPoints(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
      return  allData()
      } else return alert(deleteMember.message)

    } else return false
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

// handel input data function
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  // open model to edit a about us point
  const handleEdit = (el) => {
    if (el) {
      setEditShow(el)
      setShow(true)
    } else return alert("Module Not Selected")

  }


// add a new point or edit a already exits point 
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
   
    let value;
    if (editshow.id > 0) {
      // edit single data
      value = await editAboutPoints(path, editshow.id, editshow)
    } else {
      // create a single data
      value = await createAboutPoints(path, editshow)
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
        <h3 className='heading mb-4'>Course Video Point</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
     
        <div className='middlebody m-3'>
       <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Point</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "")  return obj;
                   else if ( 
                    obj.point.toLowerCase().includes(query.toLowerCase()) 
                  )  return obj;
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.point}</td>
                    
                     <td>{el.description}</td>
                    
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
      
        <Pagination
          setPostPerPage={setPostPerPage}
          postPerpage={postPerpage}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
      <Modal show={show} onHide={() => handleClose(setShow, setEditShow)}>

<Modal.Header closeButton>
  <Modal.Title>Course Video Points</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
  
       <div className="form-group">
       </div>
       <div className="form-group">
       <label htmlFor="">Description
        <textarea type="text" name="description" id="" value={editshow.description} className="form-control" onChange={handelChange} required />
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

export default WebsiteAboutPoint

