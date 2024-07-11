import React,{useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { MdDelete, MdEditSquare } from "react-icons/md";
import Header from '../../Components/pageComponents/header'
import CoursesModal from './tutorialcoursesModal';
import { allTutorialCource, deleteTutorialCource } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/pageComponents/pagination';
import CoursesEdit from './edittutorialCource';
import FormFilterdateandmonth from '../../Components/pageComponents/FormFilterdateandmonth';

function TutorialCource() {
  const [show, setShow] = useState(false);
    const [editshow, setEditShow] = useState(false);
    const [dateshow, setDateShow] = useState({
      startDate : "", endDate : "", month : ""
      });
    const [state, setState] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
    const [editId, setEditId] = useState(0)
    const [query, setQuery] = useState("");
    const location = useLocation()
    const path = location.pathname

   const allData = async(limit) => {
    const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
    const data = await allTutorialCource(path, givenLimit, currentPage, dateshow)
    return data && setState(data)
   }
   
   const handleEdit = (el) =>{
    setEditShow(true)
    setEditId(el)
   };

   const handelChange = (e) => {
    setDateShow({ ...dateshow, [e.target.name]: e.target.value })
  }


   const ConfirmBox = async(id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTutorialCource(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)
  
    } else return false
  }
  useEffect(() => {
    allData()
},[currentPage])

  return (
    <div className="containers">
 
        <div className="page">
        <h3 className='heading mb-4'>Tutorial Courses Details</h3>
           <Header  setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
            {show &&    <CoursesModal show={show} setShow={setShow} path={path} allData={allData}/>}
             {editId > 0 && editshow && <CoursesEdit editshow={editshow} setEditShow={setEditShow} path={path} allData={allData} editId={editId}/>}
        
            <div className='middlebody m-3'>
            <FormFilterdateandmonth    handelChange={handelChange} allData={allData}/>
                <div className="tableFixHead">
                <table className='table table-striped'>
                   <thead>
                   <tr>
                        <th>Id</th>
                        <th>Course Type</th>
                        <th>Courses</th>
                    
                        <th>Icon</th>
                    
                        <th>Date Created</th>
                        <th>Meta Description</th>
                        <th>Meta Keywords</th>
                        <th>Meta Tags</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                   </thead>
                    <tbody style={{height:" 10px !important", overflow: "scroll"}}>
        
                    {state.data ? state.data.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
                    obj.category.toLowerCase().includes(query.toLowerCase()) ||
                    obj.name.toLowerCase().includes(query.toLowerCase())
                  ) 
                    return obj;
                  
                }).map((el, index) =>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.category}</td>
                            <td>{el.name}</td>
                                 <td>
                      <img src={el.icon ??= '/assests/8380015.jpg'} alt="" width={45} height={45} />
                            
                            </td>
                            <td>{el.date}</td>
                            <td>{el.meta_description}</td>
                            <td>{el.meta_keywords}</td>
                            <td>{el.meta_tags}</td>
                            <td>{el.creator}</td>
                          
                            <td style={{cursor:"pointer"}}><MdEditSquare onClick={(e) => handleEdit(el.id)}/> / <MdDelete onClick={(e) => ConfirmBox(el.id)}/>
                            </td>
                        
                        </tr>
                    )) : <h1>No Data</h1> }
                    </tbody>
                </table>
                </div>
            </div>
           <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state}/>
       </div>
        </div>
  )
}


export default TutorialCource
