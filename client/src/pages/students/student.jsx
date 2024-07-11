import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import { allStudentList, deleteBatches, getBatches } from '../../Components/CommonUrl/apis'
import { MdDelete, MdEditSquare } from "react-icons/md";
import Header from '../../Components/pageComponents/header'
import Pagination from '../../Components/pageComponents/pagination'


function Students() {
    const [show, setShow] = useState(false);
    const [editshow, seteditShow] = useState(false);
    const [state, setState] = useState([])
    const [editId, setEditId] = useState(0)
    const [query, setQuery] = useState("");
    const [currentPage, setcurrentPage] = useState(1)
    const location = useLocation()
    const path = location.pathname

    const allData = async (limit) => {
      const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allStudentList(path, givenLimit, currentPage)
      
    return data && setState(data)
    }

useEffect(() => {
    allData()
},[currentPage])

const ConfirmBox = async(id) => {
  const value = window.confirm("Are you Sure want to delete");
  if (value) {
    const deleteMember = await deleteBatches(path, id)
    if (deleteMember.success == true) {
      alert(deleteMember.message)
      allData()
    } else alert(deleteMember.message)

  } else return false
}

  const handleEdit = (id) =>{

     seteditShow(true)
     setEditId(id)
    
    };
  return (
    <div className="containers">
 
        <div className="page">
        <h3 className='heading mb-4'>Student Details</h3>
           <Header  setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
            
            <div className='middlebody m-3'>
              
                <div className="tableFixHead">
                <table className='table table-striped table-bordered table-responsive'>
                   <thead>
                   <tr>
                   <th>Student Id </th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Modile No</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>First Pay Amount</th>
                        <th>First Pay Date</th>
                        <th>Second Pay Amount</th>
                        <th>Second Pay Date</th>
                        <th>Class Type</th>
                        <th>Register Date</th>
                        <th>Date Of Birth</th>
                        <th>Date Of Joining</th>
                        <th>Exprience ? </th>
                        <th>Image </th>
                        <th>Student Signature</th>
                        <th>Total Fee</th>
                       
                     
                        <th>Action</th>
                    </tr>
                   </thead>
                    <tbody>

                    {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    // obj.cource.toLowerCase().includes(query.toLowerCase()) ||
                    // obj.week_days.toLowerCase().includes(query.toLowerCase())||
                    // obj.date.toLowerCase().includes(query.toLowerCase())||
                    // obj.time_to.toLowerCase().includes(query.toLowerCase())||
                    // obj.time_from.toLowerCase().includes(query.toLowerCase())||
                    obj.name.toLowerCase().includes(query.toLowerCase())
                  ) 
                    return obj;
                  
                }).map((el, index) =>(
                        <tr key={index}>
                             <td>{el.student_id}</td>
                             <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.modile_no}</td>
                            <td>{el.phone_no}</td>
                            <td>{el.address}</td>
                            <td>{el.first_pay_amount}</td>
                            <td>{el.first_pay_date}</td>
                            <td>{el.second_pay_amount}</td>
                            <td>{el.second_pay_date}</td>
                            <td>{el.class_type}</td>
                            <td>{el.date_created}</td>
                            <td>{el.dob}</td>
                            <td>{el.doj}</td>
                            <td>{el.employe}</td>
                            <td>
                            <img src={el.image  ??= '/assests/8380015.jpg'} alt="" srcSet="" />
                            </td>
                            <td>
                              <img src={el.student_signature} alt="" width={40} height={40} srcSet="" />
                            </td>
                            <td>{el.total_fee}</td> 
                          
                            <td style={{cursor:"pointer"}}><MdEditSquare onClick={(e) => handleEdit(el.id)}/> / <MdDelete onClick={(e) => ConfirmBox(el.id)}/>
                            </td>
                        
                        </tr>
                    )): <h1>No Data</h1>}
                    </tbody>
                </table>
                </div>
            </div>
           <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
       </div>
       </div>
  )
}

export default Students
