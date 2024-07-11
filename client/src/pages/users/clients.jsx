import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  usersMembers } from '../../Components/CommonUrl/apis';

import Pagination from '../../Components/pageComponents/pagination';
import Header from '../../Components/pageComponents/header';

const Users = () => {
   const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  

  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await usersMembers(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  
 


  return (
   
      <div className="page">
        <h3 className='heading mb-4'>User Details</h3>
        <Header  allData={allData} state={state} setQuery={setQuery}/>
      
        <div className='middlebody m-3'>
         
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>

                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Provider</th>
                  <th>Register Date</th>
                  <th>Last Login</th>
               
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.name.toLowerCase().includes(query.toLowerCase()) ||
                    obj.email.toLowerCase().includes(query.toLowerCase()) ||
                    obj.role.toLowerCase().includes(query.toLowerCase())
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={el.image ??= '/assests/8380015.jpg'} alt="" width={45} height={45} />
                    </td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>

                    <td>{el.provider}</td>
                    <td>{el.rgisterat}</td>
                    <td>{el.last_login}</td>
                   
                  

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




export default Users