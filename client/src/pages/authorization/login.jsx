import React, { useState, useEffect } from "react";
import "./login.css";
import {useNavigate}  from 'react-router-dom'
import { login } from "../../Components/CommonUrl/apis";

const Login = () => {
  const navigate = useNavigate()
  const [ field, setFields ] = useState({
    email: '', password: ''
  })

  const handelChange = (e) =>{
    setFields({...field, [e.target.name]: e.target.value})
  }

  const localStorageItem = window.localStorage.getItem("success");

  useEffect(() =>{
    if(localStorageItem)  navigate('/') 
    },[])

  const handelSumbit = async(e) =>{
    e.preventDefault()
 
   const data = await login(field)
   if(data.success == true){
   window.localStorage.setItem("success", true)
    navigate('/')
  }
   else alert(data.message)
  }

const forgetForm = () =>{
  navigate('/forgetpassword')
}


  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{height:"80vh"}}>
          <div className="col-md-6 col-12">
            <div className="login-form px-4 py-4 rounded-4">
              <div className="nav-logo d-flex">
                <p className="text-dark subhead fw-semibold">Welcome</p>
                <img src="/assests/logo.jpg" alt="" />
              </div>
              <form className="mt-2" onSubmit={handelSumbit}>
                <label htmlFor="email" className="form-label text-dark fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="email@domain.com"
                  aria-describedby="emailHelp"
                  value={field.email}
                  onChange={(e) => handelChange(e)}

                ></input>

            
              <label htmlFor="password" className="form-label text-dark mt-3 fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="***"
                  name="password"
                  aria-describedby="passHelp"
                  value={field.password}
                  onChange={(e) => handelChange(e)}
                ></input> 
                <div className="psw d-flex mt-3">
                  <input className="btn fw-semibold " type="submit" value="Login"/>
                  <span className="frgt_pass" onClick={() => forgetForm()}>forget Password?</span>
                </div>
                
              </form> 
            </div>
            {/* {forget ? <h1>Hello</h1>:<h1>Rahul</h1>} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
