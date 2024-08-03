import React, { useEffect, useState } from 'react'
import Header from '../../Components/pageComponents/header'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdDelete, MdEditSquare } from "react-icons/md";
import {  allWebSitePage, deleteWebSitePage } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/Pagination/Pajination';


function WebsitePage() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [state, setState] = useState([]);
  const location = useLocation();
  const path = location.pathname

  const allData = async () => {
    const {data} = await allWebSitePage(path)
    data && setTotal(data.length)
    return data  && setState(data)
  }

  
  const handleEdit = (id) => {
  return navigate(`/editpage/${id}`)
  };
  useEffect(() => {
    allData()
  }, [])

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteWebSitePage(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }


  if(show){
    navigate('/pageAdded')
  }
 

  return (
    <div className='containers'>
      <div className="page">
        <h4 className="heading">Navbars</h4>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className="d-flex justify-content-around">
      
           <div className="tableFixHead">
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>name</th>
                      <th>Link</th>
                      <th>Header</th>
                  
                      <th>Content</th>
                     
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
    
                    {currentPosts ? currentPosts.filter((obj) => {
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
                         <td>{el.nav_link}</td>
                     
                         <td>{el.explore ? "All Place"  : "Only Footer"}</td>

                          <td>

                          <div style={{cssText : el.page_css}} dangerouslySetInnerHTML={{ __html: el.page_html }} />

                          </td>


                        
                        <td style={{ cursor: "pointer" }}>
                          <MdEditSquare onClick={(e) => handleEdit(el.id)} />
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

        <div>
        </div>
      </div>
     </div>
  )
}

export default WebsitePage
