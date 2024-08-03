import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { allBlogNames, deleteBlog } from '../../Components/CommonUrl/apis'
import Header from '../../Components/pageComponents/header'
import { MdDeleteForever } from "react-icons/md";
import EditBlog from './editBlog';
import Pagination from '../../Components/Pagination/Pajination';
import AddBlog from './createBlog';

function Blog() {
  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [editId, setEditId] = useState(0)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname

  // list of all blogs name
  const allData = async () => {
    const {data} = await allBlogNames(path)
   data && setTotal(data.length)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

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


  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <div className="containers">

      <div className="page">
        <h3 className='heading mb-4'>Blog Details</h3>
        <Header setShow={setShow}  state={state} setQuery={setQuery} />

        <AddBlog show={show} setShow={setShow} path={path} allData={allData} />

        <ul className='list-group'>
          {currentPosts ? currentPosts.filter((obj) => {
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
        <Pagination
          setPostPerPage={setPostPerPage}
          postPerpage={postPerpage}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
    </div>
  )
}

export default Blog
