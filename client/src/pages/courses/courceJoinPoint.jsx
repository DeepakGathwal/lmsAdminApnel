import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allCourceJoinPoint, createCourceJoinPoint, deleteCourceJoinPoint, editCourceJoinPoint, allCourseForSearch } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';

const CourceJoinPoint = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
   id : "", description : '', icon:""
  });
  const [defaultcourceList, setdefaultCource] = useState(null)

  const [state, setState] = useState([])
  const [icon, setIcon] = useState([])
  const [courses, setCourses] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

  const handleClose = () => {
    setShow(false)
  setEditShow("")
  setdefaultCource([])
  setSelected([])
  setIcon([])
  };

  const allData = async () => {
       
    const {data} = await allCourceJoinPoint(path)
    allCourceList()
    data && setTotal(data.length)
   return  data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourceJoinPoint(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }
  let optionArray = []

  const allCourceList = async() => {
    const {data} = await allCourseForSearch('/bcourses')
    if(data){
        data.map((el) => {
        optionArray.push({label : el.name, value : el.id })
        })
       return  optionArray && setCourses(optionArray)
     
      }
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  let defaultCorces = []
  const handleEdit = async(el) => {
    if (el) {
      if(el.cources){
        const data = el.cources && await el.cources.split(",")
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
    if(!selected && !defaultcourceList) return alert("Cource Topic required") 
    let value;
    const formData = new FormData()
     if (editshow.id > 0) {
       const editcourcesid = selected && await selected.map((el) => el.label)
       const removeSameData = [...new Set(editcourcesid)]
      formData.append('course',removeSameData )
      formData.append('description',editshow.description )
      formData.append('icon',icon[0] )
      value = await editCourceJoinPoint(path, editshow.id, formData)
    } else {
        const courcesid = selected && await selected.map((el) => el.value)
      
          formData.append('course',courcesid )
        formData.append('description',editshow.description )
        formData.append('icon',icon[0] )
      value = await createCourceJoinPoint(path, formData)
    }

    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setdefaultCource([])
      setSelected([])
      setEditShow('')
      allData()
    }else alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Course Join point Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        {/* <TeamModel show={show} setShow={setShow} location={location} /> */}
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cources</th>
                  <th>Icon</th>
                  <th>Decription</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.cource.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.cources}</td>
                    <td>
                        <img src={el.icon ??= "/assests/userprofile.png"}  width={45} height={45} alt="" srcSet="" />
                    </td>
                     <td>{el.description}</td>
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
  <Modal.Title>Course Join Points</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
    <div className="form-group">
      <label htmlFor="selectcategory">Select Cource</label>
    

      {courses &&  <Select  
          isMulti
          name="cource"
          defaultValue={defaultcourceList}
          options={courses}
          onChange={setSelected}
          className="basic-multi-select"
          classNamePrefix="select"
          />}
        
      </div>
    <div>
    <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Icon </label>
    <UploadImageComponent image={icon} setImage={setIcon} existsImage={editshow.icon} requiredDimensions={{ width: 40, height: 40 }}/>
    <span>*Image should be at least <strong>width: 40 and height: 40</strong><br />*size will be less than <strong>1mb</strong></span>
    </div>

    <div>
    <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Description </label>
      <input type="text" name="description" id="" value={editshow.description} className="form-control" onChange={handelChange} required />

    </div>
          <input type="submit" value="Save Role" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default CourceJoinPoint
