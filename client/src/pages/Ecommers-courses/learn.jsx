import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { allECourse, allCourceLearn, createCourceLearn, deleteCourceLearn, editCourceLearn } from '../../Components/CommonUrl/apis';
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';
import Select from 'react-select';

const Learn = () => {
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState({
    point: "", id: ''
  });
  const [defaultcourceList, setdefaultCource] = useState()
  const [state, setState] = useState([])
  const [cource, setCource] = useState()
  const [currentPage, setcurrentPage] = useState(1)
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname


  let optionArray = []

  const courcesList = async () => {
    const { data } = await allECourse("/e-courses", "All")
    if (data) {
      await data.map((el) => {
        optionArray.push({ label: el.name, value: el.id })
      })
      setCource(optionArray)
      allData()
    }
  }

  const handleClose = () => {
    setShow(false)
    setEditShow("")
    setdefaultCource([])
    setSelected([])
  };

  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await allCourceLearn(path, givenLimit, currentPage)
    return data && setState(data)
  }

  useEffect(() => {
    courcesList()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteCourceLearn(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value })
  }

  let defaultCorces = []

  const handleEdit = async (el) => {
    if (el) {

      if (el.courses) {
        const data = await el.courses.split(",")
        for (let index = 0; index < data.length; index++) {
          defaultCorces.push({ label: data[index], value: data[index] })
        }
        setdefaultCource(defaultCorces)
        setEditShow(el)
        setShow(true)
      }
    } else return alert("Module Not Selected")

  }

  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    if (selected.length == 0 && !defaultcourceList) return alert("Cource seletion Nedded")
    let value;
    if (editshow.id > 0) {
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      value = await editCourceLearn(path, editshow, removeSameData)
    } else {
      const courcesid = selected && await selected.map((el) => el.value)

      value = await createCourceLearn(path, editshow, courcesid)
    }
    e.preventDefault()

    if (value.success == true) {
      setShow(!show)
      setEditShow('')
      setdefaultCource([])
      setSelected([])
      return allData()
    } else alert(value.message)
  }

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Cource Learning Point</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />

        <div className='middlebody m-3'>

          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Point About</th>
                  <th>Point</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.data ? state.data.filter((obj) => {
                  if (query == "")
                    return obj;
                  else if (
                    obj.description.toLowerCase().includes(query.toLowerCase()) ||
                    obj.courses.toLowerCase().includes(query.toLowerCase()) ||
                    obj.point.toLowerCase().includes(query.toLowerCase())
                  )
                    return obj;

                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.courses ??= "--"}</td>
                    <td>{el.point}</td>
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)}
                      />
                    </td>

                  </tr>
                )) : <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />
      </div>
      <Modal show={show} onHide={() => handleClose(setShow, setEditShow)}>

        <Modal.Header closeButton>
          <Modal.Title>Add Course Learn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="batchesform fw-semibold">
            <form className='batchesform' action="" onSubmit={handelCreateAndUpdate}>
              <div className='form-group'>
                <label htmlFor="">Cources & Pages
                  {cource && <Select
                    isMulti
                    name="colors"
                    defaultValue={defaultcourceList}
                    options={cource}
                    onChange={setSelected}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />}
                </label>

              </div>
              <div className="form-group">
                <label htmlFor="">Point
                  <input type="text" name="point" id="" value={editshow.point} className="form-control" onChange={handelChange} required />
                </label>
              </div>
              <input type="submit" value="Add Points" className=' btn btn-primary mt-4 mb-2 btn-create' required />

            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Learn

