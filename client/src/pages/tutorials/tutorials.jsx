import React, { useEffect, useState } from 'react'
import Header from '../../Components/pageComponents/header'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteTutorial, getHeadingsOfTutorial } from '../../Components/CommonUrl/apis';
import { TiDeleteOutline } from "react-icons/ti";
import Pagination from '../../Components/pageComponents/pagination';


function Tutorials() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setcurrentPage] = useState(1)
  const [state, setState] = useState([]);
  const location = useLocation();
  const path = location.pathname

  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit
    const data = await getHeadingsOfTutorial(path, givenLimit, currentPage)
  
   return  data && setState(data)
  }
  const handleEdit = (id) => {
    navigate(`/tutorialsEdit/${id}`)
  };
  useEffect(() => {
    allData()
  }, [currentPage])

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteTutorial(path, id)
      if (deleteMember.success == true) {
        alert(deleteMember.message)
        allData()
      } else alert(deleteMember.message)

    } else return false
  }


  if (show) {
    navigate('/tutorialsAdd')
  }

  return (
    <div className='containers'>
      <div className="page">
        <h4 className="heading">Tutorials details</h4>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className="d-flex tutorial_card m-1">

          {state.data ? state.data.filter((obj) => {
            if (query == "")
              return obj;
            else if (
              obj.chapter.toLowerCase().includes(query.toLowerCase()) ||
              obj.heading.toLowerCase().includes(query.toLowerCase()) 
             
            )
              return obj;

          }).map((el, index) => (

            <div className="m-1 card_Holder">
              <div className="card tutorial-card">
                <div className="card-body">
                  <span className='delIcon' onClick={(e) => ConfirmBox(el.id)}><TiDeleteOutline /></span>
                  <h3 onClick={(e) => handleEdit(el.id)} className="card-subtitle" style={{ cursor: "pointer" }}>Topic Name : {el.heading}
                  </h3>

                  <br />
                  <h4 className="card-subtitle">Tutorial Chapter :

                    {el.chapter}

                  </h4>
                  <br />
                  <h5 className="card-subtitle">Tutorial Name : {el.course}
                  </h5>
                  <br />
                  <h4 className="card-subtitle"> Tutorial Category : {el.courceType}</h4>

                  <br />
                </div>
              </div>
            </div>

          )) : <h1>No Data</h1>}
        </div>
        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />

        <div>
        </div>
      </div>
    </div>
  )
}

export default Tutorials
