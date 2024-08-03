import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BatchesModal from './batchesModal'
import { deleteBatches, getBatches } from '../../Components/CommonUrl/apis'
import { MdDelete, MdEditSquare } from "react-icons/md";
import Header from '../../Components/pageComponents/header'
import Pagination from '../../Components/Pagination/Pajination';
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
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const location = useLocation()
  const path = location.pathname

  // all batches list
  const allData = async (course) => {
    const {data} = await getBatches(path, dateshow, course)
    data && setTotal(data.length)
    return data ? setState(data) : setState([])
  }


  // handel inputs
  const handelChange = (e) => {
    setDateShow({ ...dateshow, [e.target.name]: e.target.value })
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

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
        <Header setShow={setShow}  state={state} setQuery={setQuery} />
        {show && <BatchesModal show={show} setShow={setShow} path={path} allData={allData} />}
 
        <div className='middlebody m-3'>
          <form className="form_filter mb-3">
            <FormFilterCourse allData={allData} />
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

                {currentPosts ? currentPosts.filter((obj) => {
                  if (query == "") return obj;
                  else if (
                    obj.course.toLowerCase().includes(query.toLowerCase()) ||
                    obj.week_days.toLowerCase().includes(query.toLowerCase()) ||
                    obj.date.toLowerCase().includes(query.toLowerCase()) ||
                 
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
          <Pagination
          setPostPerPage={setPostPerPage}
          postPerpage={postPerpage}
          page={page}
          setPage={setPage}
          total={total}
        />
        </div>
      </div>
      {editId && <BatchesEdit editshow={editshow} seteditShow={seteditShow} path={path} editId={editId} allData={allData} />}
    </div>
  )
}

export default Batches
