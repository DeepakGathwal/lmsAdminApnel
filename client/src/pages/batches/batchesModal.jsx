import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addBatches, allCourseForSearch, days } from '../../Components/CommonUrl/apis';

function BatchesModal({show, setShow, path, allData}) {

  // close model function
  const handleClose = () =>{
      setShow(false)
    setState('')
    };
  
  const [course,setCourse] = useState([])
  const [state, setState] = useState({
    date : " ", timeTo : "", timeFrom : "" , weeekStartDay : "",weekEndDay : "", course : ""
  })

  // all couse list
  const allCourcesData = async() =>{
    const {data} = await allCourseForSearch('/bcourses', 'All');
    setCourse(data)
  }
    
  // handel inputs
  const handelChange = (e) =>{
    setState({...state, [e.target.name]: e.target.value})
  }

    useEffect(() =>{
      allCourcesData()
    },[])

    // add a new batch
const handelSumbit = async(e) => {
  e.preventDefault()
const totalBatchTime = parseInt(state.timeTo) - parseInt(state.timeFrom)
if(totalBatchTime < 1) return alert('Batch Timing Must Be Greater then 1 hours')
  if(!state.weeekStartDay) return alert(`Week Start Day needed`)
  if(!state.weekEndDay) return alert(`Week End Day needed`)
  if(!state.course)  return alert(`Cource needed`)
  const data = await addBatches(state,path)
 if(data.success == true){
  setShow(!show)
  setState("")
  await allData()
  return alert(data.message)
 } else return alert(data.message)
}


  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Batches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="batchesform fw-semibold">
        <form action="" onSubmit={handelSumbit}>
            <label htmlFor="date" className='text-dark mt-2 fw-semibold'>Starting Date </label>
                <input type="date" min={new Date().toISOString().split('T')[0]} name="date" id="" value={state.date}  className="form-control" onChange={handelChange} required/>
                <label htmlFor="time" className='text-dark mt-3 fw-semibold'> Timing</label>
                <div className='dateTime'>
                  <div><span>From</span>
                <input type="time" name="timeFrom" value={state.timeFrom} id="" className="form-control" onChange={handelChange} placeholder='Start-time' required/>
                </div>
                <div>
                <span>To</span>
                <input type="time" name="timeTo" value={state.timeTo} id="" onChange={handelChange} className="form-control" placeholder='End-time' required/>
                </div>
                </div>
                <label htmlFor="weeekStartDay" className='text-dark mt-3 fw-semibold'>Weekdays</label>
            
                <div className="dateTime">
                <div>
                  <span>From</span>

                <select id="weeekStartDay" name="weeekStartDay" value={state.weeekStartDay} onChange={handelChange} size="1" className="form-control" required>
                <option  selected>Select Week Days</option>
                {days.map((el) => (
                    <option value={el}>{el}</option>
                    ))}
                </select>
                </div>
                <div >
                <span>To</span>
                  <select id="weekEndDay" name="weekEndDay" value={state.weekEndDay} onChange={handelChange} size="1" className="form-control" required>
                  <option  selected>Select Week Days </option>
                    
                  {days.map((el) => (
                      <option value={el}>{el}</option>

                  ))}
                  </select>
                </div>
                </div>
            <label htmlFor="course" className='text-dark mt-3 fw-semibold'>Courses</label>
          
            <select id="course" name="course" onChange={handelChange}   className="form-control" required>
              <option  selected>Select Course </option>
              {course.map((el) =>(
              
<option value={el.id}  >{el.name} </option>

              ))}

                </select>
            <input type="submit" value="Save Batch" className=' btn btn-primary mt-4 mb-2 btn-create' required/>
            
        </form>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BatchesModal;