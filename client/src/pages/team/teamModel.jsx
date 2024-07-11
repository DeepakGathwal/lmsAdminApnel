import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addTeam, allRoles } from '../../Components/CommonUrl/apis';

function TeamModel({show,setShow,path,  allData}) {
    const [allRole, setRole] = useState([])
     const [field, setField] = useState({
      name : "", email : "", password : "", phone:"" , role : "", instagram : "", facebook : "", linkedin : ""   })
    const handleClose = () => {
      setShow(false) 
      setField("")
    };
   
   
    const roles = async() =>{
        const {data} = await allRoles("/roles")
        setRole(data)
    }
    useEffect(() =>{
        roles()
    },[])

    const handelChange = (e) =>{
      setField({...field, [e.target.name]: e.target.value})
    }

    const addTeamMember = async(e) =>{
      e.preventDefault()
      if(!field.role) return alert("Role Selection Needed")
      const data = await addTeam(field, path)
      if(data.success == true){
        setShow(!show)  
        allData()
        return alert(data.message)}
        else  return alert(data.message)
    }

  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Add A Team Member</Modal.Title>
        </Modal.Header>
      
       <Modal.Body>
       <form action="POST" onSubmit={addTeamMember}>
      
      <div className="form-group">

    <label htmlFor="name">Name   
          <input type="text" name="name" id="" className='form-control' value={field.name} onChange={handelChange} required/>
      </label>
      </div>
      <div className="form-group">

      <label htmlFor="email"> Email
          <input type="text" name="email" id="" className='form-control' value={field.email} onChange={handelChange}  required/>
      </label>
      </div>
      <div className="form-group">
      <label htmlFor="phone"> Phone
          <input type="number" name="phone" id="" className='form-control' value={field.phone} onChange={handelChange}  required/>
      </label>
      </div>
      <div className="form-group">
      <label htmlFor="role"> Role
         <select name="role" id="role" className='form-control' onChange={handelChange} required>
         <option disabled selected>Select Role</option>
         {allRole.map((el)=>(
          <option value={el.id}>{el.role}</option>
         ))}
         </select>
      </label>
      </div>
      <div className="form-group">
      <label htmlFor="password"> Password
          <input type="text" name="password" id="" className='form-control' value={field.password}  onChange={handelChange} required/>
      </label>
      </div>
      <div className="form-group">
      <label htmlFor="intagram"> Instagram 
          <input type="text" name="instagram" id="" className='form-control' value={field.instagram}  onChange={handelChange}/>
      </label>
      </div>
      <div className="form-group">

      <label htmlFor="facebook">Facebook
          <input type="text" name="facebook" id="" className='form-control' value={field.facebook}  onChange={handelChange}/>
      </label>
</div>
<div className="form-group">

      <label htmlFor="linkedin"> Linkedin
          <input type="text" name="linkedin" id="" className='form-control' value={field.linkedin} onChange={handelChange} />
      </label>
</div>    

      <input type="submit" value="Add Member" className=' btn btn-primary btn-create'/>
  </form>
       </Modal.Body>
      
       
      </Modal>
    </>
  );
}

export default TeamModel;