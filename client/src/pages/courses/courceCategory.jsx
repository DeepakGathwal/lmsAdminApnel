import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import {allCourceCategory, createCourceCategory, deleteCourceCategory, editCourceCategory, allCourseForSearch } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Select from 'react-select';
import Pagination from '../../Components/Pagination/Pajination';

const CourceCategories = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    category_name : "",id : '', courceId : '', cources : "",
  });
  const [courceList, setCource] = useState()
  const [defaultcourceList, setdefaultCource] = useState()
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
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
    const {data} = await allCourseForSearch('/bcourses')
    if(data){
      data.map((el) => {
      optionArray.push({label : el.name, value : el.id })
      })
      setCource(optionArray)
    }
   
  }



  const allData = async ( cource) => {

       
    const {data} = await allCourceCategory(path, cource)
    courcesList()
    data && setTotal(data.length)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourceCategory(path, id)
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
    
      if(el.cources)  {
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
  
    if(!selected && !defaultcourceList) return alert("Cource seletion Nedded")
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editCourceCategory(path,  editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)
      value = await createCourceCategory(path, editshow, courcesid)
    }
    e.preventDefault()
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setSelected([])
      setSelected(null)
      setdefaultCource([])
      setEditShow('')
      allData()
    }else alert(value.message)
  }
 
  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Course Module Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
          <select name="" id="" className='form-control'  onChange={(e) =>allData(e.target.value) } >
          <option selected>Select Course Module</option>
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
                  <th>Course Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.category_name.toLowerCase().includes(query.toLowerCase()) ||
                    obj.cources.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.category_name}</td>
                     <td>{el.cources}</td>
                    
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
  <Modal.Title>Add Course Module</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="date">Course Module Name</label>
      <input type="text" name="category_name" id="" value={editshow.category_name} className="form-control" onChange={handelChange} required />
      </div>
  
      <div className="form-group">
        <label htmlFor="courceId">Select Course Name</label>
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

export default CourceCategories