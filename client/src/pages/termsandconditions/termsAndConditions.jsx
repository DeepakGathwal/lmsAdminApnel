import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allTermsConditions,  createTermsConditions,  deleteTermsConditions,  editTermsConditions, faqsPages, handleClose } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const TermsConditions = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    page : "", description : "",id : ''
  });
  const [cource, setCource] = useState([])
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname


  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allTermsConditions(path, givenLimit, currentPage)
    courcesList()
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteTermsConditions(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

    
  const courcesList = async() =>{
    const {data} = await faqsPages("/t_n_c")
    setCource(data)
  

  }

  
  const handleEdit = (el) => {
    if (el) {
      setEditShow(el)
      setShow(true)
    } else return alert("Module Not Selected")

  }

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    if(!editshow.page) return alert("Select the first")
    let value;
    if (editshow.id > 0) {
      value = await editTermsConditions(path, editshow.id, editshow)
    } else {
      value = await createTermsConditions(path, editshow)
    }

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
        <h3 className='heading mb-4'>Terms & Conditions</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
     
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Page</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.description.toLowerCase().includes(query.toLowerCase()) ||
                    obj.page.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.page}</td>
                    
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
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
      <Modal show={show} onHide={() => handleClose(setShow, setEditShow)}>

<Modal.Header closeButton>
  <Modal.Title>Terms & Conditions</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
  
       <div className="form-group">
          <label htmlFor="">Page
          <select name="page" id="" value={editshow.page} className='form-control' onChange={handelChange} >
          <option disabled selected>{editshow.faqs_about ? editshow.faqs_about  :  'SELECT Page'}</option>
{cource && cource.map((el) => (
  <option value={el.name}>{el.name}</option>
))}
          </select>
                 </label>
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



export default TermsConditions
