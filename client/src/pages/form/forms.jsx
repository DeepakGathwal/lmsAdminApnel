import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import {  MdEditSquare } from "react-icons/md";
import { addFeedBack, allFormStatus,  chnageFormStatus,createExcel,enquiryFormBaseOnCourse,enquiryFormData,enquiryFormFilter,handleClose, pagesIndex } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/pageComponents/pagination';
import FormFilterdateandmonth from '../../Components/pageComponents/FormFilterdateandmonth';
import FormFilter from '../../Components/pageComponents/FormFilter';

import {  MdOutlineSearch } from "react-icons/md";


const Forms = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    id : ''
  });
  const [date, setDate] = useState({
    startDate : "", endDate : "" , month : ""
   });
  const [formType, setFormType] = useState('All');
  const [state, setState] = useState([])
  const [course, setFilterCourse] = useState([])
  const [feedback, setFeedback] = useState([])
  const [status, setStatus] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

   
  const allData = async (limit) => {
    
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await enquiryFormData(path, givenLimit, currentPage, formType)
    getAllStatus()
     return data && setState(data)
   
  }

    // handel input data function
    const handelChange = (e) => {
      setDate({ ...date, [e.target.name]: e.target.value })
    }

    
  const fiterApi = async () => {
   
    const data = await enquiryFormFilter(path, formType,date)
    getAllStatus()
 
  
    return data && setState(data)
   
  }
    
  const courseFilter = async () => {
   
    const data = await enquiryFormBaseOnCourse(path, formType,course)
  
    
    getAllStatus()
    return data && setState(data)
   
  }

  const getAllStatus = async() => {
    const {data} = await allFormStatus('/form_status', 'All')
    return data && setStatus(data)
  }


  useEffect(() => {
    allData()
  }, [currentPage])


  useEffect(() => {
    allData()
    setcurrentPage(1)
  }, [formType])

 
  const handleEdit = (el) => {
    if (el) {
      setFeedback(el.feedback)
      setEditShow(el)
     return setShow(true)
    } else return alert("Module Not Selected")

  }

const changeStatus = async(status, id) => {
      await chnageFormStatus(path,id, status)
    
}

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    const value = await addFeedBack(path, editshow.id, feedback)
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
     return allData()
    }else return alert(value.message)
  }


  useEffect(() => {
    courseFilter()
  },[course])

 
  
const createExcelFile = async() => {
  if(!state.data) return alert("No Data")
   const {data} = state.data && state
   const newData = data.map(el => {
    const { icon, banner, image, backgroundimage, ...rest } = el;
    return rest;
  });
 await createExcel(`/${formType}`, newData);

}

  return (
    <div className="containers">
      
      <div className="page">
        <h3 className='heading mb-4'>Forms Data</h3>
        <div className='upperbody m-3 d-md-block d-lg-flex'>
          <div className='btn-create'>
            <label htmlFor="pagesLength">Show Data:
              <select id="pagesLength" name="pagesLength" size="1" onChange={(e) => allData(e.target.value)}>
                <option disabled selected  style={{background:"black"}}>{state && state.limit}</option>
                {pagesIndex && pagesIndex.map((el) => (
                  <option value={el}>{el}</option>
                ))}
               
              </select>
              </label>
          </div>
          <label htmlFor="total" className='btn'>Total Data :
            <span> {state && state.total}</span></label>
      
            <div className='m-3'>
              <button className='btn-create' onClick={() =>createExcelFile()}>Export </button>
            </div>
       

        </div>
         <div className="d-md-block d-lg-flex justify-content-between">
              <div className="search-input m-3">
              <div className="search-box">
                <input type="search"  placeholder="Search..." onChange={event => setQuery(event.target.value)} />
                <MdOutlineSearch />
              </div>
            </div>
         </div>
     
        <div className='middlebody m-3'>
        <form className="form_filter mb-3">
                <FormFilter setFormType={setFormType}  formType={formType} setFilterCourse={setFilterCourse} />
                <FormFilterdateandmonth handelChange={handelChange} allData={fiterApi}/>
              </form>
     
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Ph. No.</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Enquiry Date</th>
                  <th>Form Type</th>
                  <th>Company</th>
                  <th>Desigination</th>
                  <th>Batch Date & Time</th>
                  <th>Batch Time Start</th>
                  <th>Batch Time End</th>
                  <th>Batch Week Days</th>
                  <th>Status</th>
                     <th>Feedback</th>
                  <th>Action</th>
              
                </tr>
              </thead>
              <tbody>
                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                 
                    obj.enquiry_status.toLowerCase().includes(query.toLowerCase()) ||
                    obj.course.toLowerCase().includes(query.toLowerCase()) ||
                    obj.phone_number.toString().includes(query.toLowerCase()) ||
                    obj.name.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.name}</td>
                     <td>{el.phone_number}</td>
                     <td>{el.email}</td>
                     <td>{el.course}</td>
                     <td>{el.enquiryDate + '\n' + el.enquiryTime }</td>
                     <td>{el.formtype}</td>
                     <td>{el.company ??= "--"}</td>
                     <td>{el.desigination ??= "--"}</td>
                     <td>{el.batchDate ??= "--"}</td>
                     <td>{el.batchtimestart ??= "--"}</td>
                     <td>{el.batchtimeend ??= "--"}</td>
                     <td>{el.week_days ??= "--"}</td>
                     <td>
                        <select name="enquiry_status" id="" onChange={(e,i) => changeStatus(e.target.value, el.id)} className='table_select'>
                            <option value={el.enquiry_status}>{el.enquiry_status}</option>
                            {status && status.map((ab) => (
                                <option value={ab.enquiry_status}>{ab.enquiry_status}</option>
                            ))}
                        </select>
                     </td>
                         <td>{el.feedback}</td>
                     
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
               
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
  <Modal.Title>Add FeedBack</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
 
       <div className="form-group">
        <textarea type="text" name="feedback" id="" value={feedback} className="form-control" onChange={(e) => setFeedback(e.target.value)} required />
       </div>
 
      <input type="submit" value="Save FeedBack" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default Forms