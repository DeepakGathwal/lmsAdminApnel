import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  reviewDelete, usersReview } from '../../Components/CommonUrl/apis';
import { MdDelete } from "react-icons/md";
import Pagination from '../../Components/Pagination/Pajination';
import Header from '../../Components/pageComponents/header';

const Reviews = () => {
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  

  const allData = async () => {
       

    const {data} = await usersReview(path)
    data && setTotal(data.length)
     return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])


   // delete a point by id
   const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
     if (value) {
      const deleteMember = await reviewDelete(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
       return allData()
      } else return alert(deleteMember.message)

    } else return false
  }


  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  return (
   
      <div className="page">
        <h3 className='heading mb-4'>Cart Items</h3>
        <Header  allData={allData} state={state} setQuery={setQuery}/>
      
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>

                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Date Added</th>
                  <th>Action</th>
                
             
                </tr>
              </thead>
              <tbody>

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.name.toLowerCase().includes(query.toLowerCase()) ||
                    obj.email.toLowerCase().includes(query.toLowerCase()) ||
                    obj.course.toLowerCase().includes(query.toLowerCase()) 
                
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                   
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.course}</td>
                    <td>{el.review}</td>
                    <td>{el.rating}</td>
                    <td>{el.date}</td>
                    <td style={{ cursor: "pointer" }}>
                      <MdDelete onClick={(e) => ConfirmBox(el.id)}
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
    
  )
}

export default Reviews