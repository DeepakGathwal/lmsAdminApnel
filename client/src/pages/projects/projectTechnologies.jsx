import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { deleteProjecttech, allProjectLangauage, allProjecttech, createProjecttech, editProjecttech } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const ProjectTechnologies = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    technology : '',id : '', language : ''
  });
  const [courceList, setCource] = useState([])
  const [defaultcourceList, setdefaultCource] = useState()
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
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

  const langugeList = async() =>{
    const {data} = await allProjectLangauage('/aproject-languages', 'All')
    if(data){
       
      data.map((el) => {
      optionArray.push({label : el.language, value : el.id })
      })
      setCource(optionArray)
     
    }else return alert('Permission Requried To view project languages')
  }

  const allData = async (limit, language) => {   
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allProjecttech(path, language,givenLimit, currentPage)
    langugeList()
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteProjecttech(path, id)
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
     if(el.language){
      const data = el.language && await el.language.split(",")
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
    if(!selected && !defaultcourceList) return alert("Project technology required") 
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editProjecttech(path,  editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)
   
      value = await createProjecttech(path, editshow.technology, courcesid)
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
        <h3 className='heading mb-4'>Project Technologies</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
          <select name="" id="" className='form-control' onChange={(e) =>allData(0,e.target.value) } >
        <option selected>Select Project language</option>
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
                  <th>Technologys</th>
                  <th>Language</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "")
                    return obj;
                 else if (
                    obj.technology.toLowerCase().includes(query.toLowerCase()) ||
                    obj.language.toLowerCase().includes(query.toLowerCase()) 
                  )
                    return obj;
                
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    
                     <td>{el.technology}</td>
                     <td>{el.language}</td>
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
  <Modal.Title>Add Project technology</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="technology">Technology Name</label>
      <input type="text" name="technology" id="" value={editshow.technology} className="form-control" onChange={handelChange} required />
      </div>
      <div className="form-group">
      <label htmlFor="selectcategory">Select language</label>
    

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

export default ProjectTechnologies
