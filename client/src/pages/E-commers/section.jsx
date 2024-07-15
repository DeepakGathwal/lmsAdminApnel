import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allSections, createSections, deleteSections, editSections, handleClose } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

const Section = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    section: "", images: "", details: '', heading: "", id: '', component_name : ""
  });
  const [images, setImages] = useState([])
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

  // list of all points
  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await allSections(path, givenLimit, currentPage)

    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  // delete a point by id
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteSections(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
      return allData()
      } else return alert(deleteMember.message)

    } else return false
  }

  // handel inputs
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  // open edit model
  const handleEdit = (el) => {
    if (!el) return alert("Module Not Selected")
    setEditShow(el)
    return setShow(true)
  }

  // careate and edit point
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    images && images.map((el) => {
      formData.append('images', el)

    })
    formData.append('component_name', editshow.component_name)
    formData.append('section', editshow.section)
    formData.append('heading', editshow.heading)
    formData.append('details', editshow.details)
    let value;
    if (editshow.id > 0) {
      // edit a point by 
      value = await editSections(path, editshow.id, formData)
    } else {
      // create a new point
      value = await createSections(path, formData)
    }

    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setImages([])
      setEditShow('')
      return allData()
    } else return alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Banner Caraousel</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />

        <div className='middlebody m-3'>

          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Component Name</th>
                  <th>section</th>
                  <th>heading</th>
                  <th>details</th>
                  <th>Images</th>
                  <th>Created At</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "")
                    return obj;
                  else if (

                    obj.section.toLowerCase().includes(query.toLowerCase())
                  )
                    return obj;

                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.component_name}</td>
                    <td>{el.section}</td>
                    <td>{el.heading}</td>
                    <td>{el.details}</td>
                    <td>{el.images && el.images.split("==,").map((el) => (
                      <img src={el} alt="" srcset="" width={40} height={40} style={{ margin: '5px' }} />
                    ))}</td>
                    <td>{el.created_at}</td>
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )) : <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />
      </div>
      <Modal show={show} onHide={() => handleClose(setShow, setEditShow)}>

        <Modal.Header closeButton>
          <Modal.Title>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="batchesform fw-semibold">
            <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
              <div className="form-group">
                <label htmlFor="">Enter Component Name
                  <input type="text" name="component_name" id="" value={editshow.component_name} className="form-control" onChange={handelChange} required />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Section
                  <input type="text" name="section" id="" value={editshow.section} className="form-control" onChange={handelChange} required />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Heading
                  <input type="text" name="heading" id="" value={editshow.heading} className="form-control" onChange={handelChange} required />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Details
                  <input type="text" name="details" id="" value={editshow.details} className="form-control" onChange={handelChange} required />
                </label>
              </div>

              <div className="form-group">

                <label htmlFor="icon"> Upload Image
                  <UploadImageComponent image={images} setImage={setImages} existsImage={editshow.images} requiredDimensions={{ width: 75, height: 75 }} />
                  <span>*please upload icons with at least<strong>width: 75 and height: 75</strong><br />*size will be less than <strong>1mb</strong></span>
                </label>
              </div>

              <input type="submit" value="Add Points" className=' btn btn-primary mt-4 mb-2 btn-create' required />

            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Section
