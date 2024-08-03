import React, { useState, useEffect } from 'react'
import { allCourseForSearch, allbrochure, createbrochure, deletebrochure, downloadbrochure } from '../../Components/CommonUrl/apis';
import { useLocation } from 'react-router-dom'
import { MdDelete, MdRemoveRedEye, MdDownloading } from "react-icons/md";
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';
import Modal from 'react-bootstrap/Modal';

const Brochure = () => {
  const [show, setShow] = useState(false);
  const [course, setcourse] = useState([])
  const [select, setSelect] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [image, setImage] = useState([])
  const [state, setSate] = useState([])
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

  /**
   * list of all courses
   */
  const coursesList = async () => {
    const { data } = await allCourseForSearch('/bcourses')

    setcourse(data)
  }
  // close modole function
  const handleClose = () => {
    setShow(false)
    setcourse([])
    setImage([])
  };

  // create a new brochure
  const saveData = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('course', select)
    form.append('file', image)
    const data = await createbrochure(path, form)
    if (data.success == true) {
      allData()
      setShow(!show)
      return  alert(data.message)
    }else 
    return  alert(data.message)
  }

  // list of all brochure
  const allData = async () => {
    const {data} = await allbrochure(path)
    data && setTotal(data.length)
    coursesList()
    
  return data && setSate(data)
  }

  // create a new brochure
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deletebrochure(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
       return allData()
      } else return alert(deleteMember.message)

    } else return false
  }

  // download brochure
  const downloadBox = async (id, name) => {

   return await downloadbrochure(path, id, name)
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  useEffect(() => {
    allData()
  }, [])

  return (
    <>
      <div className="containers">
        <div className="page">
          <h3 className='heading mb-4'>All Brochures</h3>
                  <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className="middlebody m-3">
        <div className="tableFixHead">
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Id</th>
                <th>brochure Name</th>
                <th>Couse Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {currentPosts ? currentPosts.filter((obj) => {
                if (query == "") return obj;
                 else if (
                  obj.name.toLowerCase().includes(query.toLowerCase()) ||
                  obj.course.toLowerCase().includes(query.toLowerCase())
                ) return obj;
              }).map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>

                  <td>{el.course}</td>

                  <td style={{ cursor: "pointer" }}>
                    <a href={`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_DOMAIN}brochure/${el.name}?module=${path}`} target='_blank'>
                      <MdRemoveRedEye />
                    </a>
                    /<MdDelete onClick={(e) => ConfirmBox(el.id)}
                    />/
                    <MdDownloading onClick={(e, i) => downloadBox(el.id, el.name)} />
                  </td>

                </tr>
              )) : <h1>No Data</h1>}
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
  <Modal.Title> Brochures</Modal.Title>
</Modal.Header>
<Modal.Body>
<form action="" method="post" onSubmit={saveData} className='d-flex flex-column bd-highlight mb-3'>
  <label htmlFor="" className=''>Select course
    <select name="id" id="" className='form-control' onChange={(e) => setSelect(e.target.value)}>
      <option disabled selected>SELECT course</option>
      {course && course.map((el) => (
        <option value={el.id}>{el.name}</option>
      ))}
    </select>
  </label>
  <label htmlFor=""> Choose File
    <input type="file" name="" id="" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
  </label>
    <input className='btn-create' type="submit" value="Save" />
</form>
</Modal.Body>
</Modal>

</div>
    </>
  )
}

export default Brochure



