import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allTestamonials,  createTestamonials,  deleteTestamonials, editTestamonials} from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

const Testimonials = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    name : "", read_link : "", description: "",id : '', image : ""
  });
  const [img, setImg] = useState([])
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setShow(false)
    setEditShow("")
    setImg([])
    ;}


  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allTestamonials(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTestamonials(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
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
    const formData = new FormData()
    formData.append("name", editshow.name)
    formData.append("description", editshow.description)
    formData.append("img", img[0])
    formData.append("link", editshow.read_link)

    if (editshow.id > 0) {
      value = await editTestamonials(path, editshow.id, formData)
    } else {
      value = await createTestamonials(path, formData)
    }
    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setImg([])
      setEditShow('')
      return allData() 
    }else return alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Testimonals Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
     
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                
                  <th>Image</th>
                  <th>Link</th>
                  <th>Added By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.name.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.name}</td>
                     <td>{el.description}</td>
                     <td>
                     <img src={el.image ??= "/assests/userprofile.png"} alt="" width={45} height={45} />

                     </td>
                     <td>
                        <a href={el.read_link} target="_blank" rel="noopener noreferrer">{el.read_link}</a>
                     </td>
                     <td>{el.creator}</td>
                    
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
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
      <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Testimonal</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
        <div className="form-group">
          <label htmlFor=""> Name
          <input type="text" name="name" id="" value={editshow.name} className="form-control" onChange={handelChange} required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor=""> Description
          <textarea type="text" name="description" id="" value={editshow.description} className="form-control" onChange={handelChange} required />
          </label>
        </div>
        <div className="form-group">
         
          <label htmlFor="icon"> Upload Image
          <UploadImageComponent image={img} setImage={setImg} existsImage={editshow.image} requiredDimensions={{ width: 75, height: 75 }}/>
          <span>*please upload icons with at least<strong>width: 75 and height: 75</strong><br />*size will be less than <strong>1mb</strong></span>
        </label>
        </div>
        <div className="form-group">
          <label htmlFor="">Read More Link
          <input type="url" name="read_link" id="" value={editshow.read_link} className="form-control" onChange={handelChange} required />
          </label>
        </div>
      <input type="submit" value="Save Testimonal" className=' btn btn-primary btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default Testimonials