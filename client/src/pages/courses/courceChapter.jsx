import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import {allCourceChapter, createCourceChapter, deleteCourceChapter, editCourceChapter, allCourceCategory } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Select from 'react-select';
import Pagination from '../../Components/pageComponents/pagination';

const CourseChapter = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    chapter_name : "",id : '', courceId : '', categories : "",
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
  setEditShow('')
  setdefaultCource([])
  setSelected([])
  };

let optionArray = []

  const courcesList = async() =>{
    const {data} = await allCourceCategory('/dcourses_chapter', 'All')
    if(data){
      data.map((el) => {
      optionArray.push({label : el.category_name, value : el.id })
      })
      setCource(optionArray)
    }
   
  }


  const allData = async (limit, cource) => {
   
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allCourceChapter(path,givenLimit,cource,  currentPage)
    courcesList()
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourceChapter(path, id)
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
    
      if(el.categories)  {
        const data = await el.categories.split(",")
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
    if(!selected && !defaultcourceList) return alert("Cource seletion Nedded")
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editCourceChapter(path,  editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)
      value = await createCourceChapter(path, editshow, courcesid)
    }
    e.preventDefault()
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setdefaultCource([])
      setSelected([])
      setSelected(null)
      setEditShow('')
      allData()
    }else alert(value.message)
  }

 
  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Course Chapter Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
        <select name="" id="" className='form-control'  onChange={(e) =>allData(0,e.target.value) } >
          <option  selected>Select Course Module</option>
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
                  <th>Course Module</th>
                  <th>Chapter Name</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.chapter_name.toLowerCase().includes(query.toLowerCase()) ||
                    obj.categories.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.categories}</td>
                     <td>{el.chapter_name}</td>
                    
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
  <Modal.Title>Add Course Chapter</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="date">Chapter</label>
      <input type="text" name="chapter_name" id="" value={editshow.chapter_name} className="form-control" onChange={handelChange} required />
      </div>
  
      <div className="form-group">
        <label htmlFor="courceId">Courses Module</label>
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

export default CourseChapter