import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { allRoles, editPermissions, permissions } from '../../Components/CommonUrl/apis';
import {  MdOutlineSearch } from "react-icons/md";

const Permission = () => {
  const location = useLocation()
  const path = location.pathname 
  const [state, setState] = useState([])
  const [allPermission, setPermission] = useState([])
  const [query, setQuery] = useState("");
  const [findrole, setRole] = useState([])
  const [saveButton, setSaveButton] = useState(false)

  const rolesList = async () => {
    const {data} = await allRoles("/roles")
    return data && setState(data)
  }

  useEffect(() => {
    rolesList()
  }, [])


   const getPermissions = async() =>{
    const {data} = await permissions(path, findrole)
    setPermission(data);
   }

   const saveChanges = async () => {
    const data = await editPermissions(path, allPermission)
    if(data.success == true) {
        getPermissions()
     
       return alert(data.message)
      }else{
          return alert(data.message)
    }
  };

const handelChange = async(event) =>{
    let data = [...allPermission];
    data.forEach((element) => {
      if (event.currentTarget.checked && element.permissionId == event.currentTarget.id) {
          element[event.currentTarget.value] = 1;
          setSaveButton(true)   
        return  setPermission(data);
      } else   if (element.permissionId == event.currentTarget.id){
          element[event.currentTarget.value] = 0;
          setSaveButton(true)
       return   setPermission(data);
        
      }
    });
   }

   useEffect(() =>{
    getPermissions()
   },[findrole])

      return (
        <div className="containers">
          <div className="page">
            <h3 className='heading mb-4'>Permissions</h3>
            <div className='m-3 d-md-block d-lg-flex justify-content-between'>
          <div className='btn-create'>
            <label htmlFor="Roles">Roles : 
              <select id="pagesLength" name="pagesLength" size="1" onChange={(e) => setRole(e.target.value)} >
                <option disabled selected  >Select Role</option>
                {state && state.map((el) => (
                  <option value={el.role}>{el.role}</option>
                ))}
               
              </select>
              </label>
         </div>
              <div className="search-input">
         <div className="search-box">
           <input placeholder="Search..." onChange={event => setQuery(event.target.value)} />
           <MdOutlineSearch />
       </div>
          </div>
         
          

        </div>
         
          
            <div className='middlebody m-3'>
             
              <div className="tableFixHead">
                <table className='table table-bordered'>
                  <thead>
                      <tr>
                      <th>Id</th>
                      <th>PermissionId</th>
                      <th>Module</th>  
                      <th>Role</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                      {allPermission && allPermission.filter((obj) => {
                  if (query == "") 
                    return obj;
                   else if (
            
                    obj.role.toLowerCase().includes(query.toLowerCase()) 
                  ) 
                    return obj;
                  
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                     <td>{el.permissionId}</td>
                     <td>{el.module}</td>
                     <td>{el.role}</td>
                     <td>
                     <input
                          type="checkbox"
                          id={el.permissionId}
                          value="can_create"
                          checked={el.can_create}
                          onChange={handelChange}
                        
                        />
                   
                       </td>
                     <td>
                         <input
                          type="checkbox"
                          id={el.permissionId}
                          value="can_edit"
                          checked={el.can_edit}
                          onChange={handelChange}
                        
                        />
                     
                     </td>
                     <td>
                         <input
                          type="checkbox"
                          id={el.permissionId}
                          value="can_delete"
                          checked={el.can_delete}
                          onChange={handelChange}
                        
                        />
                       
                     </td>
                     <td>
                     
                         <input
                          type="checkbox"
                          id={el.permissionId}
                          value="can_view"
                          checked={el.can_view}
                          onChange={handelChange}
                        />
                     </td>
                  </tr>
                ))}
                   
                    
                  </tbody>
                </table>
              {saveButton && <button type="submit" onClick={() => saveChanges()} className="btn btn-primary mt-3">Submit</button>}
              </div>
            </div>
          
          </div>
      
        </div>
    
    )
}

export default Permission
