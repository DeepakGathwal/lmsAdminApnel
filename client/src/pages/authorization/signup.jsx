import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux'
import Nav from "react-bootstrap/Nav";
import "./login.scss";
import { useNavigate } from 'react-router-dom';
import { registerContact } from "../../action/adminAction";

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [conpass, setconpass] = useState("");
  const navigate = useNavigate();

  let getMessage;
  const registerUser = async (e) => {
  e.preventDefault()
  dispatch(registerContact(name ,email, phone, password, conpass)).then(() => {
    navigate('/')
  })
};

  return (
    <>
      <div className="container-fluid px-4 py-5">
        <div className="row">
          <div className="col-6">
            <div>
              <p className="text-center text-light subhead fw-semibold">
                Gohaordings OOH Advertising Made Easy And Affordable
              </p>
            </div>
            <div className="text-center">
              <img src="/images/Capture.JPG" alt="" />
            </div>
          </div>
          <div className="col-6 order-md-first">
            <div className="login-form px-4 py-4 rounded-4">
              <p className="text-light subhead fw-semibold">Welcome</p>
              <button className="btn btn-warning mb-4 me-3 px-3 fw-semibold">
                Login as
                <br />
                <span className="subhead">Customer</span>
              </button>
              <button className="btn border text-light mb-4 px-4 fw-semibold">
                Login as
                <br />
                <span className="subhead">Business</span>
              </button>
              <form action="" className="mt-2" onSubmit={registerUser}>
                <label htmlFor="email" className="form-label text-light">
                  Name
                </label>
                <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            aria-describedby="nameHelp"/>
            <div id="emailHelp" className="form-text mb-2">
                 {getMessage ?? "Please Fill Your Full Name."}
                </div>
                <label htmlFor="email" className="form-label text-light">
                  Email address
                </label>
                <input
                  className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              pattern="[a-zA-Z0-9._%+-]{4,19}@[a-zA-Z0-9.-]{4,19}[.]{1}[a-zA-Z]{2,4}$"
              placeholder="Eg. email@domain.com"
              required
            />
                <div id="emailHelp" className="form-text mb-2">
                  {getMessage ?? "We'll never share your email with anyone else."}
                </div>
                <label htmlFor="email" className="form-label text-light">
                 Phone Number
                </label>
                <input  className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            pattern= "[6-9]{1}[0-9]{5}[0-9]{4}"
            placeholder="Eg. +91-123456789"
            required
          />
          <div id="emailHelp" className="form-text mb-2">
                 {getMessage ??  "We'll never share your PhoneNo with anyone else."}
                </div>
                <label htmlFor="email" className="form-label text-light">
                  Password
                </label>
                <input   className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div id="emailHelp" className="form-text mb-2">
                 {getMessage ?? "Enter your Password hear"}
                </div>
                <label htmlFor="email" className="form-label text-light">
                  Confirm Password
                </label>
                <input   className="form-control"
          type="password"
          onChange={(e) => setconpass(e.target.value)}
          placeholder="Confirm Password"
          required
        />
                <div id="passHelp" className="form-text">
                 {getMessage ??  "Please Enter your Password Again"}
                </div>
                <div className="position-relative">
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remeber-me"
                  />
                  <label className="form-check-label text-light" htmlFor="remeber-me">
                    Remember me
                  </label>
                </div>
                <Nav.Link
                      className="text-light normal position-absolute top-0 end-0"
                      href="/forget-password?"
                    >Forget Password?</Nav.Link>
                </div>
                <button className="btn border text-light w-100 mt-3">
                  Login
                </button>
              </form>
              <p className="divider"><span className="text-light">OR</span></p>
              <p className="text-center pt-4 mt-3"><img src="/images/twitter.png" alt="" className="pe-3" /><img src="/images/twitter.png" alt="" /><img src="/images/twitter.png" alt="" className="ps-3" /></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;