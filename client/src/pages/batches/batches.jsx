import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BatchesModal from './batchesModal'
import { deleteBatches, getBatches } from '../../Components/CommonUrl/apis'
import { MdDelete, MdEditSquare } from "react-icons/md";
import Header from '../../Components/pageComponents/header'
import Pagination from '../../Components/pageComponents/pagination'
import BatchesEdit from './batchEditModel';
import FormFilterdateandmonth from '../../Components/pageComponents/FormFilterdateandmonth';
import FormFilterCourse from '../../Components/pageComponents/FormFilterCourse';

function Batches() {
  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const [state, setState] = useState([])
  const [editId, setEditId] = useState(0)
  const [dateshow, setDateShow] = useState({
    startDate: "", endDate: "", month: ""
  });
  const [query, setQuery] = useState("");
  const [currentPage, setcurrentPage] = useState(1)
  const location = useLocation()
  const path = location.pathname

  // all batches list
  const allData = async (limit, course) => {
   
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await getBatches(path, givenLimit, currentPage, dateshow, course)
    return data && setState(data)
  }
  const filterData = async (limit, course) => {
   
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await getBatches(path, givenLimit, 1, dateshow, course)
  setcurrentPage(1)
    return data && setState(data)
  }

  // handel inputs
  const handelChange = (e) => {
    setDateShow({ ...dateshow, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    if(currentPage > 1)
    allData()
  else console.log("Not Callong");
  }, [currentPage])

  useEffect(() => {
   
    allData()
  }, [])

  // Delete a single batch
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteBatches(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        return allData()
      } else return alert(deleteMember.message)
    } else return false
  }

  // handel edit batch model
  const handleEdit = (id) => {
    seteditShow(true)
    return setEditId(id)
  };

 
  return (
    <div className="containers">

      <div className="page">
        <h3 className='heading mb-4'>Batches Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        {show && <BatchesModal show={show} setShow={setShow} path={path} allData={allData} />}
 
        <div className='middlebody m-3'>
          <form className="form_filter mb-3">
            <FormFilterCourse filterData={filterData} />
            <FormFilterdateandmonth handelChange={handelChange} allData={allData} />
          </form>
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Weekend</th>
                  <th>Time:Start</th>
                  <th>Time:End</th>
                  <th>Creator</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "") return obj;
                  else if (
                    obj.course.toLowerCase().includes(query.toLowerCase()) ||
                    obj.week_days.toLowerCase().includes(query.toLowerCase()) ||
                    obj.date.toLowerCase().includes(query.toLowerCase()) ||
                    obj.time_to.toLowerCase().includes(query.toLowerCase()) ||
                    obj.time_from.toLowerCase().includes(query.toLowerCase()) ||
                    obj.name.toLowerCase().includes(query.toLowerCase())
                  ) return obj;
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.course}</td>
                    <td>{el.date}</td>
                    <td>{el.week_days}</td>

                    <td>{el.time_from}</td>
                    <td>{el.time_to}</td>
                    <td>{el.name}</td>

                    <td style={{ cursor: "pointer" }}><MdEditSquare onClick={(e) => handleEdit(el.id)} /> / <MdDelete onClick={(e) => ConfirmBox(el.id)} />
                    </td>

                  </tr>
                )) : <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
            <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />
        </div>
      </div>
      {editId && <BatchesEdit editshow={editshow} seteditShow={seteditShow} path={path} editId={editId} allData={allData} />}
    </div>
  )
}

export default Batches
