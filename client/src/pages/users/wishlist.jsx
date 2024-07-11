import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  usersWhisList } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/pageComponents/pagination';
import Header from '../../Components/pageComponents/header';

const Wishlist = () => {
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  

  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await usersWhisList(path, givenLimit, currentPage)
     return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  return (
   
      <div className="page">
        <h3 className='heading mb-4'>Wishlist Details</h3>
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
                  <th>Date Added</th>
                
             
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
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
                    <td>{el.created_at}</td>

              
                  
               
                    

                  </tr>
                )): <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
        </div>
      
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
      </div>
    
  )
}




export default Wishlist