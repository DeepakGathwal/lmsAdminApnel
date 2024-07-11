import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeForgetPassword, getProfileData, updateUser, updateUserImage } from '../CommonUrl/apis';
import './UserProfile.css';

const UserProfile = () => {
  const [admin, setAdmin] = useState({
    name: "", phoneNumber: "", role: "", instagram: "", facebook: "", linkedin: "", address: "", joinDate: "", oldPassword: "", password: "", confirmPassword: ""
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handelChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const changeProfile = async (e) => {
    e.preventDefault();
    const data = await updateUser(admin);
    if (data.success === true) {
      allData();
      return alert(data.message);
    } else {
      return alert(data.message);
    }
  };

  const allData = async () => {
    const { data } = await getProfileData();
    setAdmin(...data);
  };

  const handelImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e);
    const data = await updateUserImage(formData);
    if (data.success === true) {
      allData();
      return alert(data.message);
    } else {
      return alert(data.message);
    }
  };

  const changePassword = async (e) => {
    if (admin.password !== admin.confirmPassword) alert("Password Not Matched");
    e.preventDefault();
    const data = await changeForgetPassword(admin);
    if (data.success === true) {
      allData();
      return alert(data.message);
    } else {
      return alert(data.message);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <div className="containers">
      <div className="page">
        <div className="col-12 col-lg-12 col-xl-8 mx-auto pd-20">
          <h4 className="heading">User Profile</h4>
          <div className={`text-center mt-5 ${isMobile ? '' : 'd-flex justify-content-between align-items-center'}`}>
            <div className="avatar avatar-xl">
              <label htmlFor="image"><img src={admin.image ?? "/assests/userprofile.png"} alt="..." className="avatar-img rounded-circle" />
              </label>
              <input type="file" name="image" id="image" onChange={(e) => handelImage(e.target.files[0])} />
            </div>
            <div className="user col-md-3 col-lg-6">
              <h4 className="mb-1">{admin.name}</h4>
              {admin.email} <br />
              {admin.role}
            </div>
            <div className="social">
              <p className="small fw-semibold">Facebook: {admin.facebook}</p>
              <p className="small fw-semibold">Instagram: {admin.instagram}</p>
              <p className="small fw-semibold">Linkedin: {admin.linkedin}</p>
            </div>
          </div>

          <hr className="my-4" />
          <div className="form-row">
            <form action="POST" onSubmit={changeProfile}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name='name' className="form-control" value={admin.name} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" name='email' id="inputEmail4" value={admin.email} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress5">Address</label>
                <input type="text" className="form-control" name='address' id="inputAddress5" value={admin.address} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" className="form-control" id="phone" name='phoneNumber' value={admin.phoneNumber} onChange={handelChange} />
              </div>
              <div className="form-group">
                <label htmlFor="joiningdate">Date of Joining</label>
                <input type="date" className="form-control" id="joiningdate" value={admin.joinDate} onChange={handelChange} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="facebook">Facebook</label>
                <input type="url" className="form-control" name="facebook" id="facebook" value={admin.facebook} onChange={handelChange} />
                <label htmlFor="Instagram">Instagram</label>
                <input type="url" className="form-control" name="instagram" id="instagram" value={admin.instagram} onChange={handelChange} />
                <label htmlFor="linkedin">Linkedin</label>
                <input type="url" className="form-control" name="linkedin" id="linkedin" value={admin.linkedin} onChange={handelChange} />
              </div>
              <input type="submit" value="Save Changes" className='btn-create' />
            </form>
          </div>
          <hr className="my-4" />
          <form action="POST" onSubmit={changePassword}>
            <div className="row mb-4 align-items-center">
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="inputPassword4">Old Password</label>
                  <input type="password" name='oldPassword' className="form-control" id="inputPassword5" onChange={handelChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword5">New Password</label>
                  <input type="password" name='password' className="form-control" id="inputPassword5" onChange={handelChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword6">Confirm Password</label>
                  <input type="password" name='confirmPassword' className="form-control" id="inputPassword6" onChange={handelChange} />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <p className="mb-2">Password requirements</p>
                <p className="small text-muted mb-2">To create a new password, you have to meet the requirement:</p>
                <ul className="small text-muted pl-4 mb-0">
                  <li>Minimum 5 character</li>
                </ul>
              </div>
              <input type="submit" value="Save Changes" className='btn-create' style={{ width: isMobile ? '50%' : '20%' }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
