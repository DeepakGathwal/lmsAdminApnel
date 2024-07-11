import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { allCourseForSearch, days, editBatches, getSingleBatche } from '../../Components/CommonUrl/apis';

function BatchesEdit({editshow, seteditShow, path, editId, allData}) {
  
  const [course,setCourse] = useState([])
  const [state, setState] = useState({
    date : '', time_to : '', time_from : '' , week_days : '',weekEndDay : '', course : '', weeekStartDay :''
  })
  // close model function
  const handleClose = async() => {
   return seteditShow(false)
    
  };

  // lis of all course
    const allCourcesData = async() =>{
      const {data} = await allCourseForSearch('/bcourses', 'All');
     return setCourse(data)
    }

// get data by id
const dataById = async() =>{
  const data = await getSingleBatche(path, editId)
  if(data.success ==  true){
    const value = data.data 
    setState(...value)
 return   allCourcesData()

}else return alert(data.message)
}
// handel inputs
  const handelChange = (e) =>{
    setState({...state, [e.target.name]: e.target.value})
  }

    useEffect(() =>{
      dataById()
    },[editId])


// edit batch function
const handleEdit = async(e) =>{
  e.preventDefault()
  const totalBatchTime = parseInt(state.time_to) - parseInt(state.time_from)
if(totalBatchTime < 2) return alert('Batch Timing Must Be Greater then 1:30 hours')
  const editData = await editBatches(state,path, editId)
 if(editData.success == true){
   await allData()
   return seteditShow(!editshow)
}else return alert(editData.message)
}


  return (
    <>
     
      <Modal show={editshow} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Edit Batches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="batchesform fw-semibold">
        <form action="" onSubmit={handleEdit}>
            <label htmlFor="date" className='text-dark mt-2 fw-semibold'>Starting Date  </label>
                <input type="date" min={new Date().toISOString().split('T')[0]} name="date" id="" value={state.date}  className="form-control" onChange={handelChange} required/>
                <label htmlFor="time" className='text-dark mt-3 fw-semibold'> Timing</label>
                <div className='dateTime'>
                  <div><span>From</span>
                <input type="time" name="time_from" value={state.time_from} id="" onChange={handelChange} className="form-control" placeholder='End-time' required/>
                </div>
                <div>
                <span>To</span>
                <input type="time" name="time_to" value={state.time_to} id="" className="form-control" onChange={handelChange} placeholder='Start-time' required/>
                </div>
                </div>
                <label htmlFor="weeekStartDay" className='text-dark mt-3 fw-semibold'>Weekdays</label>
            
                <div className="dateTime">
                <div>
                  <span>From</span>

                <select id="weeekStartDay" name="weeekStartDay"    onChange={handelChange} size="1" className="form-control" required>
                <option disabled value={state.week_days.split(" to")[0]} selected>{state.week_days.split(" to")[0]}</option>
                {days.map((el) => (
                    <option value={el}>{el}</option>
                    ))}
                </select>
                </div>
                <div >
                <span>To</span>
                  <select id="weekEndDay" name="weekEndDay" onChange={handelChange} size="1" className="form-control" required>
                  <option disabled value={state.week_days.split("to ")[1]} selected>{state.week_days.split("to ")[1]} </option>
                    
                  {days.map((el) => (
                      <option value={el}>{el}</option>

                  ))}
                  </select>
                </div>
                </div>
            <label htmlFor="course" className='text-dark mt-3 fw-semibold'>Courses</label>
          
            <select id="course" name="course" onChange={handelChange}   className="form-control" required>
              <option disabled selected>{state.course} </option>
              {course.map((el) =>(
              
<option value={el.name}  >{el.name} </option>

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

export default BatchesEdit;