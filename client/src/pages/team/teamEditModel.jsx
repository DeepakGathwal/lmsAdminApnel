import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { allRoles, editTeamMemberApi, singleteamMembers } from '../../Components/CommonUrl/apis';

function TeamEdit({editshow, setEditShow, id, allData, path}) {
    const [allRole, setRole] = useState([])
    const [field, setField] = useState({
        name : "", email : "",  phoneNumber:"" , roleName : "", instagram : "", facebook : "", linkedin : ""   })
        const handleClose = () => {
          setEditShow(false)
          setField("")
        };
      
   
  const getSingleMember = async() =>{
    const data = await singleteamMembers(path,id.id )
    if(data.success ==  true){
        const value = data.data 
        setField(...value)
    }else alert(data.message)
  }

  const handelChange = (e) =>{
    setField({...field, [e.target.name]: e.target.value})
  }


  const roles = async() =>{
    const {data} = await allRoles("/roles")
    setRole(data)
}

  useEffect(() =>{
    roles()
    getSingleMember()
  },[id])


  const editTeamMember = async(e) =>{
  
    e.preventDefault()
    if(!field.roleName) return alert("Role Selection Needed")
    const data = await editTeamMemberApi(path, id.id,field)
    if(data.success == true){
      setEditShow(!editshow)
    allData()
    return alert(data.message)}
    else  return alert(data.message)
  }

  return (
    <>
     
      <Modal show={editshow} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Edit A Team Member</Modal.Title>
        </Modal.Header>
      
       <Modal.Body>
       <form action="POST" onSubmit={editTeamMember}>
          <div className="form-group">
      <label htmlFor="name">Name   
          <input type="text" name="name" id="" className='form-control' value={field.name}  onChange={handelChange} required/>
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="email"> Email
          <input type="text" name="email" id="" className='form-control' value={field.email}  onChange={handelChange}  required/>
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="phone"> Phone
          <input type="number" name="phoneNumber" id="" className='form-control' value={field.phoneNumber}   onChange={handelChange} required/>
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="role"> Role
         <select name="roleName" id="roleName"  className='form-control' onChange={handelChange} required>
         <option disabled selected>{field.roleName}</option>
         {allRole.map((el)=>(
          <option value={el.id}>{el.role}</option>
         ))}
         </select>
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="intagram"> Instagram 
          <input type="text" name="instagram" id="" className='form-control' value={field.instagram} onChange={handelChange}  />
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="facebook">Facebook
          <input type="text" name="facebook" id="" className='form-control' value={field.facebook}  onChange={handelChange} />
      </label>
          </div>
          <div className="form-group">
      <label htmlFor="linkedin"> Linkedin
          <input type="text" name="linkedin" id="" className='form-control' value={field.linkedin} onChange={handelChange}  />
      </label>
          </div>
      <input type="submit" value="Edit Member" className=' btn btn-primary btn-create'/>
  </form>

  
       </Modal.Body>
      
       
      </Modal>
    </>
  );
}

export default TeamEdit;