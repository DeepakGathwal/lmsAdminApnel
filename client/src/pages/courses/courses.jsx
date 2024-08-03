import React,{useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { MdDelete, MdEditSquare } from "react-icons/md";
import Header from '../../Components/pageComponents/header'
import CoursesModal from './coursesModal';
import { allCourse, deleteCourse } from '../../Components/CommonUrl/apis';
import Pagination from '../../Components/Pagination/Pajination';
import CoursesEdit from './editCourse';
import FormFilterdateandmonth from '../../Components/pageComponents/FormFilterdateandmonth';

function Courses() {
  const [show, setShow] = useState(false);
    const [editshow, setEditShow] = useState(false);
    const [state, setState] = useState([])
    const [dateshow, setDateShow] = useState({
    startDate : "", endDate : "", month : ""
    });
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
    const [editId, setEditId] = useState(0)
    const [query, setQuery] = useState("");
    const location = useLocation()
    const path = location.pathname

// all course list

   const allData = async() => {
       
    const {data} = await allCourse(path, dateshow)
    data && setTotal(data.length)
    return data ? setState(data) : setState([])
   }
   
// handel inputs
   const handelChange = (e) => {
    setDateShow({ ...dateshow, [e.target.name]: e.target.value })
  }

  // handel model
   const handleEdit = (el) =>{
    setEditShow(true)
    setEditId(el)
   
   };


   // delete course by id
   const ConfirmBox = async(id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourse(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)
  
    } else return false
  }
  useEffect(() => {
    allData()
},[])

const indexOfLastPage = page * postPerpage;
const indexOfFirstPage = indexOfLastPage - postPerpage;
const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  return (
    <div className="containers">

        <div className="page">
        <h3 className='heading mb-4'>Courses Name Details</h3>
           <Header  setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
             {show &&   <CoursesModal show={show} setShow={setShow} path={path} allData={allData}/>}
             {editId > 0 && <CoursesEdit editshow={editshow} setEditShow={setEditShow} path={path} allData={allData} editId={editId}/>}
        
            <div className='middlebody m-3'>
              <form className="form_filter jst-end mb-3">
                <FormFilterdateandmonth    handelChange={handelChange} allData={allData}/>
              </form>
                <div className="tableFixHead">
                <table className='table table-striped table-bordered'>
                   <thead>
                   <tr>
                        <th>Id</th>
                        <th>Course Category</th>
                        <th>Courses Name</th>
                        <th>Description</th>
                        <th>Video_link</th>  
                        <th>Icon</th>
                        <th>Banner</th>
                        <th>Jobs</th>
                        <th>Duration</th>
                        <th>Job_Pay</th>
                        <th>Date Created</th>
                        <th>Meta Description</th>
                        <th>Meta Keywords</th>
                        <th>Meta Tags</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                   </thead>
                    <tbody style={{height:" 10px !important", overflow: "scroll"}}>
        
                    {currentPosts ? currentPosts.filter((obj) => {
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
                            <td>{el.description}</td>
                            <td className='v_link'>{el.videoLink}</td>
                            
                            <td>
                      <img src={el.icon ??= '/assests/8380015.jpg'} alt="" width={100} height={100} />
                            
                            </td>
                            <td>
                      <img src={el.banner ??= '/assests/8380015.jpg'} alt="" width={100} height={100} />

                            </td>
                   
                            <td>{el.jobs}</td>
                            <td>{el.duration}</td>
                            <td>{el.job_pay}</td>
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

export default Courses
