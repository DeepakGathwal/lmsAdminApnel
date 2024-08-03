import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { MdDelete, MdEditSquare } from "react-icons/md";
import {allCourceSubCategory, createCourceSubCategory, deleteCourceSubCategory, editCourceSubCategory, allCourceChapter } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';

const CourceSubCategories = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    topic : '',id : '', chapters : ''
  });
  const [courceList, setCource] = useState([])
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
    setdefaultCource([])
    setSelected([])
  setEditShow('')
  };
  let optionArray = []

  const courcesList = async() =>{
    const {data} = await allCourceChapter('/dcourses_chapter')
  
    if(data){
      data.map((el) => {
      optionArray.push({label : el.chapter_name, value : el.id })
      })
      setCource(optionArray)
      allData()
    }
  }

  const allData = async (limit, category) => {   
       
    const {data} = await allCourceSubCategory(path, category)
    data && setTotal(data.length)
    return data && setState(data)
  }

  useEffect(() => {
    courcesList()
  }, [])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteCourceSubCategory(path, id)
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

  let defaultCorces = []
  
  const handleEdit = async(el) => {
    if (el) {
     if(el.chapters){
      const data = el.chapters && await el.chapters.split(",")
      for (let index = 0; index < data.length; index++) {
        defaultCorces.push({label :data[index], value :data[index]})
      }
     }
      setdefaultCource(defaultCorces)
      setEditShow(el)
      setShow(true)
    } else return alert("Module Not Selected")
  }

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    if(!selected && !defaultcourceList) return alert("Cource Topic required") 
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editCourceSubCategory(path,  editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)
   
      value = await createCourceSubCategory(path, editshow, courcesid)
    }
    e.preventDefault()
    if (value.success == true) {
      e.preventDefault()
      setSelected([])
      setdefaultCource([])
      setShow(!show)
      setEditShow('')
      allData()
    }else alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Cources Topics</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
          <select name="" id="" className='form-control' onChange={(e) =>allData(e.target.value) } >
        <option selected>Select Course Chapter</option>
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
                  <th>Chapters</th>
                  <th>Topics</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "")
                    return obj;
                 else if (
                    obj.topic.toLowerCase().includes(query.toLowerCase()) ||
                    obj.chapters.toLowerCase().includes(query.toLowerCase()) 
                  )
                    return obj;
                
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.chapters}</td>
                     <td>{el.topic}</td>
                    
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
  <Modal.Title>Add Course Topic</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="topic">Topic Name</label>
      <input type="text" name="topic" id="" value={editshow.topic} className="form-control" onChange={handelChange} required />
      </div>
      <div className="form-group">
      <label htmlFor="selectcategory">Select Chapters</label>
    

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
      <input type="submit" value="Save Sub Category" className=' btn btn-primary btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default CourceSubCategories