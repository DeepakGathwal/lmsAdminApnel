import React, { useEffect, useState } from 'react';
import { allFormType,allCourseForSearch } from '../CommonUrl/apis';

const FormFilter = ({ setFormType, formType, setFilterCourse}) => {
  const [type, setType] = useState([])
  const [couses, setCourses] = useState([])


  const allFormTypeFunc = async () => { 
    const {data} = await allFormType('/form_enquiry')
    return setType(data)
  }

  const allCourses = async() => {
    const {data} = await allCourseForSearch("/bcourses")
   return setCourses(data)
  } 

  useEffect(() => {
    allFormTypeFunc()
  },[])


  return (
    <>
      <div className="form_filter">
        <div className="">
          <label htmlFor="formtype">Selects Form </label>
          <select name="formtype" id="formtype" onChange={(e) =>  setFormType(e.target.value)}>
          <option value='all'>Select Form Type</option>
           {type && type.map((el) => (
             
             <option value={el.form_about.split(" ")[0]}>{el.form_about}</option>
           ))}
          </select>
        </div>
        {formType == "Enroll" && allCourses() && (
          <div className="">
            <label htmlFor="CourseCategory">Selects Course name</label>
            <select name="CourseCategory" id="CourseCategory" onChange={(e) =>  setFilterCourse(e.target.value)}>
              <option value="">Please Select Course</option>
              {couses && couses.map((el) => (
              <option value={el.id}>{el.name}</option>

              ))
            }
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default FormFilter;
