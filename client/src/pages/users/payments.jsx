import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  usersPayment } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/pageComponents/pagination';
import Header from '../../Components/pageComponents/header';

const Payments = () => {
  const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  

  const allData = async (limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await usersPayment(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [currentPage])

  return (
   
      <div className="page">
        <h3 className='heading mb-4'>Payment Details</h3>
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
                  <th>Amount</th>
                  <th>Order Id</th>
                  <th>Status</th>
                  <th>Payment Id</th>
                  <th>Payment Signature</th>
                  <th>Order_Date</th>
                  <th>Payment_Date</th>
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
                    <td>{el.currency + " "+ el.amount}</td>
                    <td>{el.order_id}</td>
                    <td>{el.verify}</td>
                    <td>{el.payment_id}</td>
                    <td>{el.payment_signature}</td>
                    <td>{el.order_at}</td>
                    <td>{el.done_time}</td>
               
                    

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




export default Payments