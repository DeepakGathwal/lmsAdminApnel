import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TeamModel from './teamModel';
import { deleteTeamMember, teamMembers } from '../../Components/CommonUrl/apis';
import TeamEdit from './teamEditModel';
import { MdDelete, MdEditSquare } from "react-icons/md";
import Pagination from '../../Components/Pagination/Pajination';
import Header from '../../Components/pageComponents/header';

const Team = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [Id, setId] = useState(0);
  const [state, setState] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const location = useLocation()
  const path = location.pathname
  

  const allData = async () => {
       
    const {data} = await teamMembers(path)
    data && setTotal(data.length)
    return data && setState(data)
  }

  useEffect(() => {
    allData()
  }, [])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTeamMember(path, id.id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }

 
  const handleEdit = (id) => {
    setId(id)
    setEditShow(true)
  }

  const indexOfLastPage = page * postPerpage;
  const indexOfFirstPage = indexOfLastPage - postPerpage;
  const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);


  return (
    <>
      <div className="page">
        <h3 className='heading mb-4'>Team Details</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery}/>
        <TeamModel show={show} setShow={setShow} path={path}  allData={allData}/>
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
                  <th>Role</th>
                  <th>FaceBook</th>
                  <th>Linkedin</th>
                  <th>Instagram</th>
                  <th>Last:Login</th>
                  <th>Last:Logout</th>
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
                    obj.roleName.toLowerCase().includes(query.toLowerCase())
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
                    <td>{el.phoneNumber}</td>

                    <td>{el.roleName}</td>
                    <td>{el.facebook ??=
                      "--"}</td>
                    <td>{el.linkedin ??=
                      "--"}</td>
                    <td>{el.instagram ??=
                      "--"}</td>
                    <td>{el.lastLoginTime ??=
                      "--"}</td>
                    <td>{el.lastLogoutTime ??=
                      "--"}</td>
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit({ id: el.id })} />
                      / <MdDelete onClick={(e) => ConfirmBox({ id: el.id })}
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
        {Id && <TeamEdit editshow={editshow} setEditShow={setEditShow} id={Id} allData={allData} path={path}/>}
        </>
  )
}








export default Team