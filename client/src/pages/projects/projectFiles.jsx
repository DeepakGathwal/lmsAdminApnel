import React,{useEffect, useState} from 'react'
import { MdDelete, MdEditSquare } from "react-icons/md";
import "./projects.css"
import { useLocation } from 'react-router-dom'
import { addProjectFile,allProjectFile,deleteProjectFile,projectsName } from '../../Components/CommonUrl/apis'


const ProjectFiles = () => {
  const [name, setName] = useState([])
  const [query, setQuery] = useState("");
  const [currentPage, setcurrentPage] = useState(1)
  const [state, setState] = useState([])
  const [zip, setZip] = useState([])
  const [selected, setSelected] = useState(null);
  const [courceList, setCource] = useState([])
 
  const location = useLocation()
  const path = location.pathname


  const projectList = async() =>{
    const {data} = await projectsName('/cprojects', 'All')
     return data && setCource(data)
  }

  const handelSubmit = async(e) => {
    e.preventDefault()
    if(selected.length == 0 ) return alert("Cource technology required") 
    if(zip.length == 0 ) return alert("Zip Files required") 
     const formData =  new FormData()
    formData.append('zip', zip)
    formData.append('name', name)
    formData.append('project', selected)
const data =  await addProjectFile(path,formData)
if(data.success == true){
  setZip([])
  setName([])
  setSelected([])
  allData()
  return alert(data.message)
}

}

const allData = async (limit) => {   
  const givenLimit =  limit == 0 ? state && state.data &&  parseInt(state.limit)  :  limit   
  const data = await allProjectFile(path,givenLimit, currentPage)
 projectList()
  return data && setState(data)
}


useEffect(() => {
  allData()
},[currentPage])

const ConfirmBox = async (id) => {
  const value = window.confirm("Are you Sure want to delete");
   if (value) {
    const deleteMember = await deleteProjectFile(path, id)
    if (deleteMember.success == true) {
      alert(deleteMember.message)
      allData()
    } else alert(deleteMember.message)

  } else return false
}

  return (
    <div className="containers">
    <div className="page">
      <h3 className='heading mb-4'>Project File Details</h3>
        
        <div className='middlebody m-3'>
        <form action=""  onSubmit={handelSubmit} className='d-flex justify-content-between align-items-baseline mb-3'>
        <div className="form-group d-flex align-items-baseline">
      <label htmlFor="selectcategory">Select Project</label>
    
      <select name="" id=""  onChange={(e) => setSelected(e.target.value)}>
        <option value="" selected>Select Project</option>
        {courceList && courceList.map((el) => (
          <option value={el.project_link}>{el.name}</option>
        ))}
      </select>
      
        
      </div>
      
  <div className="row_reg d-flex align-items-baseline">

    <div className="col_reg"><input type="text" placeholder="Enter File Name" name='name'  onChange={(e) => setName(e.target.value)}/></div>
  


<input type="file" name="" id="" accept=".zip,.rar,.7zip" onChange={(e) => setZip(e.target.files[0])}/>
  </div>
<input type="submit" value="Submit" className='btn-create'/>
        </form>
         <div className="tableFixHead">
           <table className='table table-bordered'>
             <thead>
               <tr>

                 <th>Id</th>
                 <th>Files Names</th>
                 <th>Zip Name</th>
                 <th>Project</th>
               
                 {/* <th>Action</th> */}
               </tr>
             </thead>
             <tbody>
               {state.data ? state.data.filter((obj) => {
                   if (query == "")
                   return obj;
               else if (
                   obj.heading.toLowerCase().includes(query.toLowerCase()) ||
                   obj.topic.toLowerCase().includes(query.toLowerCase()) 
                   )
                   return obj;     
               }).map((el, index) => (
                 <tr key={index}>
                   <td>{index + 1}</td>
                    <td>{el.filesName}</td>
                    <td>{el.zipName}</td>
                    <td>{el.name}</td>
                  
                   {/* <td style={{ cursor: "pointer" }}>
                     <MdEditSquare onClick={(e) => handleEdit(el)} />
                      <MdDelete onClick={(e) => ConfirmBox(el.id)}
                     />
                   </td> */}

                 </tr>
               )): <h1>No Data</h1> }
             </tbody>
           </table>
         </div>
       </div>

    </div>
    </div>
  )
}

export default ProjectFiles
