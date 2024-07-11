import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allProjectTopicPoint, projectsName, deleteProjectTopicPoint, editProjectTopicPoint, createProjectTopicPoint, allProjectTopic } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const ProjectTopicPoint = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    topic : '',id : '', project : '', heading : "", description : ""
  });
  const [courceList, setCource] = useState([])
  const [topicsList, setTopics] = useState([])
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

  const projectList = async() =>{
    const {data} = await projectsName('/cprojects', 'All')
    if(data){
       
      data.map((el) => {
      optionArray.push({label : el.name, value : el.id })
      })
      topics()
     return  setCource(optionArray)
     
    }else return alert('Permission Requried To view project')
  }

  const topics = async() =>{
    const {data} = await allProjectTopic('/dproject-topics', 'All')
    if(data)
    return data && setTopics(data)
    else return alert('Permission Requried To view project Topics')
  }

  const allData = async (limit, project) => {   
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allProjectTopicPoint(path, project,givenLimit, currentPage)
    projectList()
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await deleteProjectTopicPoint(path, id)
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
     if(el.project){
      const data = el.project && await el.project.split(",")
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
    if(!selected && !defaultcourceList) return alert("Project Point required") 
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editProjectTopicPoint(path,  editshow, removeSameData)
    } else {
      const projectid = selected && await selected.map((el) => el.value)
   
      value = await createProjectTopicPoint(path, editshow, projectid)
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
        <h3 className='heading mb-4'>Project Topic Point Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <div className='form-group m-3'>
          <select name="" id="" className='form-control' onChange={(e) =>allData(0,e.target.value) } >
        <option selected>Select Project</option>
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
                  <th>Topic</th>
                  <th>Project</th>
                  <th>Heading</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data ? state.data.filter((obj) => {
                    if (query == "")
                    return obj;
                else if (
                    obj.heading.toLowerCase().includes(query.toLowerCase()) ||
                    obj.topic.toLowerCase().includes(query.toLowerCase()) 
                    )
                    return obj;     
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.topic}</td>
                     <td>{el.project}</td>
                     <td>{el.heading}</td>
                     <td>{el.description}</td>
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
  <Modal.Title>Add Project Topic Point</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <div className="form-group">
      <label htmlFor="technology">Point Heading</label>
      <input type="text" name="heading" id="" value={editshow.heading} className="form-control" onChange={handelChange} required />
      </div>
      <div className="form-group">
      <label htmlFor="technology">Point Description</label>
      <input type="text" name="description" id="" value={editshow.description} className="form-control" onChange={handelChange} required />
      </div>


      <div className="form-group">
      <label htmlFor="selectcategory">Select Topic</label>

        <select name="topic" id="" onChange={handelChange} className='form-control'>
            <option value="" selected>{editshow.topic ? editshow.topic : 'Select Topic'}</option>
            {topicsList && topicsList.map((el) => (
                <option value={el.topic}>{el.topic}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
      <label htmlFor="selectcategory">Select Project</label>
    

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

export default ProjectTopicPoint
