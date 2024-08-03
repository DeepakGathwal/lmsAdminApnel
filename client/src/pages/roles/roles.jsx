import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { addRoleVaccency, allRoles, createRoles, deleteRoles, editRoles } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';

const Roles = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    role : "",id : ''
  });
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setShow(false)
  setEditShow("")
  };


  const allData = async () => {
    const {data} = await allRoles(path)
    data && setTotal(data.length)
    return data && setState(data)
  }

  useEffect(() => {
    allData(0)
  }, [])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteRoles(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


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
      value = await editRoles(path, editshow.id, editshow.role)
    } else {
      value = await createRoles(path, editshow.role)
    }

    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      allData()
    }else alert(value.message)
  }

  const vacenyFunction = async(id) =>{
   const data  = await addRoleVaccency(path, id)
   if(data.success == true){
    allData()
   }
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Roles Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        {/* <TeamModel show={show} setShow={setShow} location={location} /> */}
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Module</th>
                  <th>Vacancy</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.role.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.role}</td>
                     <td>
                      <input type="checkbox" name="" checked={el.vacancy} id="" onClick={(e) => vacenyFunction(el.id)} />
                     </td>
                    
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )): <h1>No Data</h1>}
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
  <Modal.Title> Roles</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Role </label>
      <input type="text" name="role" id="" value={editshow.role} className="form-control" onChange={handelChange} required />
      <input type="submit" value="Save Role" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default Roles