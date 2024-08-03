import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allCompanies,  createCompanies,  deleteCompanies,  editCompanies } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/Pagination/Pajination';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';

const Comapny = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    name : "", link : "",id : '', icon : ''
  });
  const [img, setImg] = useState([])
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  const handleClose = () => {
    setShow(false) 
    setEditShow("")
    setImg([])
  };

// all commpanys data
  const allData = async () => {
  
    const {data} = await allCompanies(path)
    data && setTotal(data.length)
    return  data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

  /** delete a company by id */
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCompanies(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
      return allData()
      } else alert(deleteMember.message)

    } else return false
  }


  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  /** handel inputs */
  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  // open edit comapny model
  const handleEdit = (el) => {
    if (el) {
      setEditShow(el)
      return setShow(true)
    } else return alert("Module Not Selected")

  }

  /** edit and craete company  */
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    let value;
    const formData = new FormData()
    formData.append("name", editshow.name)
    formData.append("img", img[0])
    formData.append("link", editshow.link)

    if (editshow.id > 0) {
      value = await editCompanies(path, editshow.id, formData)
    } else {
      value = await createCompanies(path, formData)
    }

    if (value.success == true) {
      e.preventDefault()
      setImg([])
      setShow(!show)
      setEditShow('')
     return allData()
    }else alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Companies Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
     
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                
                  <th>Icon</th>
                  <th>Link</th>
                  <th>Added By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") 
                    return obj;
                  else if (
                    obj.name.toLowerCase().includes(query.toLowerCase()) ||
                    obj.creator.toLowerCase().includes(query.toLowerCase()) ||
                    obj.link.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.name}</td>
                     <td>
                     <img src={el.icon ??= '/assests/8380015.jpg'} alt="" width={45} height={45} />

                     </td>
                     <td>
                        <a href={el.link} target="_blank" rel="noopener noreferrer">{el.link}</a>
                     </td>
                     <td>{el.creator}</td>
                    
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
  <Modal.Title>Add Companies</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="batchesform fw-semibold">
    <form action="" onSubmit={handelCreateAndUpdate}>
  
        <div className="form-group">
        <label htmlFor="">Comapny Name
          <input type="text" name="name" id=""  className='form-control' value={editshow.name} onChange={handelChange} required />
          </label>
        </div>
    
        <div className="form-group">
        <label htmlFor="companyimg">Add Company Image
         {/* <img src="assests/Uploadimage.png" alt="" className='uploadimg'/>
          <input type="file" name="companyimg" id="companyimg" onChange={(e) => setImg(e.target.files[0])} /> */}
          <UploadImageComponent image={img} setImage={setImg} existsImage={editshow.icon} requiredDimensions={{ width: 312, height: 294 }}/>
          <span>*please upload icons with <strong>width: 312 and height: 294</strong><br />*size will be less than <strong>1mb</strong></span>
        </label>
      </div>
   
        <div className="form-group">
        <label htmlFor="">Comapny WebSite Link
        <input type="url" name="link" id="" className='form-control'  value={editshow.link} onChange={handelChange} required />
          </label>
        </div>
      <input type="submit" value="Save Company" className=' btn btn-primary btn-create' required />

    </form>
  </div>
</Modal.Body>
</Modal>
    </div>
  )
}

export default Comapny