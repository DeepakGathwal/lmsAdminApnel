import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MdDelete, MdEditSquare } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import Modal from 'react-bootstrap/Modal';
import { allModules, createModules, deleteModules, editModules, editModulesImage } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const Module = () => {
  const [show, setShow] = useState(false);
  const [Filtershow, FiltersetShow] = useState(false);
  const [editshow, setEditShow] = useState({
    modules: "",name : "", id: ''
  });

  const [state, setState] = useState([])
  const [ID, setId] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setShow(false)
    setEditShow("")
  };


  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
 
    const data = await allModules(path, givenLimit, currentPage)
    return data && setState(data)
  }
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
   
    if (value) {
      const deleteMember = await deleteModules(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

const chnageImage = async(e) => {
  const formData = new FormData();
  formData.append('img', e)
  const value = await editModulesImage(path, ID,formData)
 
  if (value.success == true) {
    
  allData()
  }else alert(value.message)

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
      value = await editModules(path, editshow.id, editshow)
    } else {
      value = await createModules(path, editshow)
    }
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      allData()
    }else alert(value.message)
  }
  const [selectionType, setSelectionType] = useState('date');

  const handleRadioChange = (event) => {
    setSelectionType(event.target.value);
  };


  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Module Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className='middlebody m-3'>

          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Module</th>
                  <th>Name</th>
                  <th>Icon <br/><span>Click to Change Module Icon</span>
                  </th>

                  <th>Action</th>
               
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.modules.toLowerCase().includes(query.toLowerCase())||
                    obj.name.toLowerCase().includes(query.toLowerCase())
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={el.modules} target="_blank">
                      {el.modules}
                      </a>
                    </td>
                    <td>{el.name}</td>
                    <td>
                      <label htmlFor="images" name='image' >
                      <img src={el.icon ??=  '/assests/logo.jpg'} width={30} height={30} alt="" onClick={() => setId(el.id)} />
                      <input id="images" name='image' type="file" onChange={(e) => chnageImage(e.target.files[0])} hidden required/>
                      <br />
                  
                      <span  style={{color : "red"}}>*Click to Change Module Icon</span>
                      </label>
                     
                    </td>

                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} title='Edit' />
                      &nbsp; <MdDelete onClick={(e) => ConfirmBox(el.id)} title='Delete'
                      /> 
                      {/* &nbsp;
                      <TbReportSearch title='Click to Generate Report' onClick={(e) => FiltersetShow(true)}/> */}
                    </td>
                   
                  </tr>
                )): <h1>No Data</h1> }
              </tbody>
            </table>
          </div>
        </div>

        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />
      </div>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title> Get Reports</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="batchesform fw-semibold">
            <form action="" onSubmit={handelCreateAndUpdate}>
              <label htmlFor="name" className='text-dark mt-2 fw-semibold'> Name </label>
              <input type="text" name="name" id="" value={editshow.name} className="form-control" onChange={handelChange} required />
               <label htmlFor="module" className='text-dark mt-2 fw-semibold'> Module </label>
              <input type="text" name="modules" id="" value={editshow.modules} className="form-control" onChange={handelChange} required />
              <span style={{ color: "red" }}>module name set all over admin panel and website*</span>
            

              <input type="submit" value="Save Module" className=' btn btn-primary mt-4 mb-2 btn-create' required />

            </form>
          </div>
        </Modal.Body>
      </Modal>
     {/*   <Modal show={Filtershow} onHide={(e) => FiltersetShow(false)}>
 <label htmlFor="Date" className='text-dark mt-3 fw-semibold'> By Date</label>
                <div className='dateTime'>
                  <div><span>From</span>
                <input type="Date" name="datefrom"  id="" className="form-control" onChange={handelChange}  required/>
                </div>
                <div>
                <span>To</span>
                <input type="Date" name="datato" id="" onChange={handelChange} className="form-control"  required/>
                </div>
                </div>
                <label htmlFor="month" className='text-dark mt-3 fw-semibold'> By Month</label>
                <div className='dateTime'>
                  <div><span>From</span>
                <input type="month" name="monthfrom"  id="" className="form-control"  placeholder='Start-month' required/>
                </div>
                <div>
                <span>To</span>
                <input type="month" name="monthto" id=""  className="form-control" placeholder='End-month' required/>
                </div>
                </div>
        <Modal.Header closeButton>
          <Modal.Title> Generate Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="batchesform fw-semibold">
            <form action="">
          
                <input
          type="radio"
          id="dateRadio"
          name="selectionType"
          value="date"
          checked={selectionType === 'date'}
          onChange={handleRadioChange}
        />
        <label htmlFor="dateRadio">Date Wise</label><br />

        <input
          type="radio"
          id="monthRadio"
          name="selectionType"
          value="month"
          checked={selectionType === 'month'}
          onChange={handleRadioChange}
        />
        <label htmlFor="monthRadio">Month Wise</label>

        {selectionType === 'date' && (
          <div className='dateTime'>
            <label htmlFor="fromDate">From:</label><br />
            <input type="date" id="fromDate" name="fromDate" /><br />
            <label htmlFor="toDate">To:</label><br />
            <input type="date" id="toDate" name="toDate" />
          </div>
        )}

        {selectionType === 'month' && (
          <div className='dateTime'>
            <label htmlFor="fromMonth">From:</label><br />
            <input type="month" id="fromMonth" name="fromMonth" /><br />
            <label htmlFor="toMonth">To:</label><br />
            <input type="month" id="toMonth" name="toMonth" /><br /><br />
          </div>
        )}
              <input type="submit" value="Save Module" className=' btn btn-primary mt-4 mb-2 btn-create' required />

            </form>
          </div>
        </Modal.Body>
      </Modal>  */}
    </div>
  )
}

export default Module