import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { MdDelete, MdEditSquare } from "react-icons/md";
import {allTutorialCategory, createTutorialCategory, deleteTutorialCategory, editTutorialCategory, allTutorialCourceForSearch} from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const TutorialCategory = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    category_name : "",id : '', courceId : '', cources : "",
  });
  const [courceList, setCource] = useState()
  const [defaultcourceList, setdefaultCource] = useState()
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setShow(false)
    setSelected([])
    setdefaultCource([])
  setEditShow('')
  };

let optionArray = []

  const courcesList = async() =>{
    const {data} = await allTutorialCourceForSearch('/btutorialCource', 'All')
    if(data){
      data.map((el) => {
      optionArray.push({label : el.name, value : el.id })
      })
      setCource(optionArray)
    }
    allData(0, '')
  }

  const allData = async (limit, cource) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allTutorialCategory(path, cource,givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    courcesList()
 
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTutorialCategory(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)
      
    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  let defaultCorces = []
  const handleEdit = async(el) => {
    if (el) {
    
      if(el.cources){
        const data = await el.cources.split(",")
        for (let index = 0; index < data.length; index++) {
          defaultCorces.push({label :data[index], value :data[index]})
        }
        setdefaultCource(defaultCorces)
      }
      setEditShow(el)
      setShow(true)
 
    } else return alert("Module Not Selected")
  }

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    if(!selected && !defaultcourceList) return alert("Cource Selection needed")
  
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editTutorialCategory(path,  editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)
      value = await createTutorialCategory(path, editshow, courcesid)
    }
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setSelected([])
      setEditShow('')
      setdefaultCource([])
     return allData()
    }else return
      alert(value.message)
     
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Tutorial Chapter</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
          <select name="" id="" className='form-control'  onChange={(e) =>allData(0,e.target.value) } >
          <option selected>Select Course Name</option>
{courceList && courceList.map((el) => (
  <option value={el.value}>{el.label}</option>
))}
          </select>
        </div>
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Chapter</th>
                  <th>Cource Name</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                  
                    obj.cources.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.cources}</td>
                     <td>{el.category_name}</td>
                    
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )): <h1>No Data</h1> }
              </tbody>
            </table>
          </div>
        </div>
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
      <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Add Tutorial Topic</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="date">Chapter</label>
      <input type="text" name="category_name" id="" value={editshow.category_name} className="form-control" onChange={handelChange} required />
      </div>
  
      <div className="form-group">
        <label htmlFor="courceId">Course</label>
      {courceList &&  <Select  
          isMulti
          name="colors"
          defaultValue={defaultcourceList}
          options={courceList}
          onChange={setSelected}
          className="basic-multi-select"
          classNamePrefix="select"
          
        />}
      </div>
      <input type="submit" value="Save Category" className=' btn btn-primary btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default TutorialCategory
