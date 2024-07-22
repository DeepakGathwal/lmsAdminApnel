import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { allBlogNames, deleteBlog } from '../../Components/CommonUrl/apis'
import Header from '../../Components/pageComponents/header'
import { MdDeleteForever } from "react-icons/md";
import EditBlog from './editBlog';
import Pagination from '../../Components/pageComponents/pagination';
import AddBlog from './createBlog';

function Blog() {
  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const [state, setState] = useState([])

  const [editId, setEditId] = useState(0)
  const [query, setQuery] = useState("");
  const [currentPage, setcurrentPage] = useState(1)
  const location = useLocation()
  const path = location.pathname

  // list of all blogs name
  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await allBlogNames(path, givenLimit, currentPage)
    return data && setState(data)

  }

  useEffect(() => {
    allData()
  }, [currentPage])

  // delete a blog by id
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteBlog(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  // handel edit model 
  const handleEdit = (id) => {
    seteditShow(true)
    return setEditId(id)

  };


  return (
    <div className="containers">

      <div className="page">
        <h3 className='heading mb-4'>Blog Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />

        <AddBlog show={show} setShow={setShow} path={path} allData={allData} />

        <ul className='list-group'>
          {state.data ? state.data.filter((obj) => {
            if (query == "") return obj;
            else if (
              obj.name.toLowerCase().includes(query.toLowerCase())
            ) return obj;
          }).map((el) => (
            <li className='list-group-item m-2 d-flex justify-content-between align-items-center' >
              <h6 title='Click to edit' className='text-blue' onClick={(e) => handleEdit(el.id)}>{el.name} </h6>
              <span title='Delete the Blog' className='deleteblog' onClick={() => ConfirmBox(el.id)}><MdDeleteForever /></span>
            </li>
          )) : <h1>No Data</h1>}

        </ul>


        {editId > 0 && <EditBlog editshow={editshow} seteditShow={seteditShow} path={path} editId={editId} allData={allData} />}
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />
      </div>
    </div>
  )
}

export default Blog
