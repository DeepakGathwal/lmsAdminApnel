import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allBlogCategory, createBlogCategory, deleteBlogCategory, editBlogCategory } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';

const BlogCategory = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    name : "",id : ''
  });
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [state, setState] = useState([])
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  /** close category model */
  const handleClose = () => {
    setShow(false)
    setEditShow("")
  };

// list of all categories 
  const allData = async () => {
    const {data} = await allBlogCategory(path)
    data && setTotal(data.length)
    return  data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

  // delete a specific blog category
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteBlogCategory(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
       return  allData()
      } else return alert(deleteMember.message)

    } else return false
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  // open edit model
  const handleEdit = (el) => {
    if (!el)  return alert("Module Not Selected")
      setEditShow(el)
      setShow(true)
  }

  // create and edit blog category
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    let value;
       if (editshow.id > 0) {
        /** Edit blog category */
      value = await editBlogCategory(path, editshow)
    } else {
      /** Create Blog category */
      value = await createBlogCategory(path, editshow.name)
    }

    if (value.success == true) {
      e.preventDefault()
      setShow(!show)
      setEditShow('')
      return allData()
    }else return alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Blog Categories</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        {/* <TeamModel show={show} setShow={setShow} location={location} /> */}
        <div className='middlebody m-3'>
         
          <div className="table-responsive">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Module</th>
                
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "")  return obj;
                   else if (
                    obj.name.toLowerCase().includes(query.toLowerCase()) 
                  )  return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.name}</td>
                    
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )) : <h1>No Data</h1> }
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
  <Modal.Title> Blog Category</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
      <label htmlFor="date" className='text-dark mt-2 fw-semibold'> Blog Category </label>
      <input type="text" name="name" id="" value={editshow.name} className="form-control" onChange={handelChange} required />
      <input type="submit" value="Save Category" className=' btn btn-primary mt-4 mb-2 btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default BlogCategory