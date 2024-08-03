import React, { useState,useEffect } from 'react'
import { allCourseForSearch } from '../CommonUrl/apis';

const FormFilterCourse = ({allData}) => {
  const [type, setType] = useState([])
  
  const allCouseTypeFunc = async() =>{
    const {data} = await allCourseForSearch('/bcourses');
     return data && setType(data)
  }


useEffect(() => {
  allCouseTypeFunc()
},[])
  return (
    <>
        <div className="form_filter">
            <div className="">
                <label htmlFor="CourseCategory">Select Course Category: </label>
                <select name="course" id="CourseCategory" onChange={(e) => allData(e.target.value)} >
                 <option value="">Please Select Course </option>
                {type && type.map((el) => (
                  <option value={el.id} >{el.name}</option>
                ))}
                </select>
            </div>
        </div>
    </>
  )
}

export default FormFilterCourse
