import React, { useState } from 'react'
import "./forgetpassword.css";
import {useNavigate} from 'react-router-dom'
import { ForgetOtpAPi, ForgetpasswordAPi, changeForgetPassword } from '../../Components/CommonUrl/apis';


function Forgetpassword() {
    const navigate = useNavigate()
    const [otp , setotp] = useState(false);
    const [filed,setFields] = useState({
      email: "", otp : "", password : "", confirmPassword : ""
    })
    const [changePassword, setChangePassword] = useState(false)

    const handelChange = (e) =>{
      setFields({...filed, [e.target.name]: e.target.value})
    } 

    const handelSumbit = async(e) =>{
      e.preventDefault()
     const data = await ForgetpasswordAPi(filed.email)
     if(data.success == true){
    setotp(true)
    
    }
     else alert(data.message)
    }

    const handelOtp = async(e) =>{ 
      e.preventDefault()
     const data = await ForgetOtpAPi(filed.otp)
     if(data.success == true){
     setChangePassword(true)
    }
     else alert(data.message)
    }

    const changePasswordfunc = async(e) =>{ 
      e.preventDefault()
     const data = await changeForgetPassword(filed)
     if(data.success == true){
      window.localStorage.setItem("success", true)
      navigate('/')
    }
     else alert(data.message)
    }
  
    const loginForm = () =>{
      navigate('/login')
    }

  return (
    <>
    <div className="container-fluid">
        <div className="row justify-content-center align-item-center">
          <div className="col-md-6 col-12">
            <div className="login-form px-4 py-4 rounded-4">
              <div className="nav-logo d-flex">
                <p className="text-dark subhead fw-semibold">Welcome</p>
                <img src="/assests/logo.jpg" alt="" />
              </div>
            {!otp ? 
              <form className="mt-2" onSubmit={(e)  => handelSumbit(e)}>
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
              
                value={filed.email}
                onChange={(e) => handelChange(e)}
                

              ></input>
              
          
                  
              <div className="psw d-flex mt-3">
                <input className="btn fw-semibold " type="submit" value="Get OTP" />
                {/* <span><a href="#">Login</a></span> */}
              </div>
              
            </form>  :
         <>
          {!changePassword ? 
           <form className="mt-2" onSubmit={(e)  => handelOtp(e)}>
           <label htmlFor="email" className="form-label text-dark fw-semibold">
             Enter Otp
           </label>
           <input
             type="number"
             className="form-control"
             id="otp"
             name="otp"
             placeholder="123456"
               aria-describedby="OtpHelp"
           
             value={filed.otp}
             onChange={(e) => handelChange(e)}
             

           ></input>
           
               
           <div className="psw d-flex mt-3">
             <input className="btn fw-semibold " type="submit" value="Submit OTP"/>
             {/* <span><a href="#">Login</a></span> */}
           </div>
           
         </form> :
          <form className="mt-2" onSubmit={(e)  =>  changePasswordfunc(e)}>
          <label htmlFor="email" className="form-label text-dark fw-semibold">
            Enter Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password should be atleast 5 digit*"
              aria-describedby="password"
          
            value={filed.password}
            onChange={(e) => handelChange(e)}
            

          ></input>
          <label htmlFor="password" className='form-label text-dark fw-semibold mt-3'>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Password should be atleast 5 digit*"
              aria-describedby="confirmPassword"
          
            value={filed.confirmPassword}
            onChange={(e) => handelChange(e)}
            

          ></input>
          
              
          <div className="psw d-flex mt-3">
            <input className="btn fw-semibold " type="submit" value="Submit OTP"/>
            {/* <span className='frgt_pass' onClick={() => loginForm()}>Login</span> */}
          </div>
          
        </form>
          }  
            
           
         </>
          
          
          
          }
            <span className='frgt_pass frgt_pass_login' onClick={() => loginForm()}>Login</span>

            </div>
         
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgetpassword
