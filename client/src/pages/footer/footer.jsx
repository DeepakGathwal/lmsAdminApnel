import React, { useEffect, useState } from 'react';
import { footerAdded, footerData } from '../../Components/CommonUrl/apis';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const [field, setField] = useState({
    name: "", about: "", contact: '', phone: '', email: '', facebook: '', instagram: '', twitter: '',
    youtube: '', telegram: '', linkedin: ''
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const path = location.pathname;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const addFooter = async (e) => {
    e.preventDefault();
    const data = await footerAdded(path, field);
    if (data.success === true) {
      allData();
      return alert(data.message);
    } else {
      return alert(data.message);
    }
  };

  const allData = async () => {
    const { data } = await footerData(path);
    return data && setField(...data);
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <div className='containers'>
      <div className="page">
        <h4 className="heading">Footer Details</h4>
        <div className="col-md-8 mx-auto pd-20">
          <form action="POST" className='mx-auto' onSubmit={addFooter}>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name='name' className="form-control" value={field.name} onChange={handleChange} />
              </div>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="about">About</label>
                <input type="text" className="form-control" id="about" name='about' value={field.about} onChange={handleChange} />
              </div>
            </div>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="contact_info">Contact-info</label>
                <input type="text" className="form-control" id="contact_info" name='contact' value={field.contact} onChange={handleChange} />
              </div>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" className="form-control" id="phone" name='phone' value={field.phone} onChange={handleChange} />
              </div>
            </div>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="email">Email Id</label>
                <input type="email" className="form-control" id="email" name='email' value={field.email} onChange={handleChange} />
              </div>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="facebook">Facebook</label>
                <input type="url" className="form-control" name="facebook" id="facebook" value={field.facebook} onChange={handleChange} />
              </div>
            </div>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="Instagram">Instagram</label>
                <input type="url" className="form-control" name="instagram" id="instagram" value={field.instagram} onChange={handleChange} />
              </div>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="linkedin">Linkedin</label>
                <input type="url" className="form-control" name="linkedin" id="linkedin" value={field.linkedin} onChange={handleChange} />
              </div>
            </div>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="twitter">Twitter</label>
                <input type="url" className="form-control" name="twitter" id="twitter" value={field.twitter} onChange={handleChange} />
              </div>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="youtube">Youtube</label>
                <input type="url" className="form-control" name="youtube" id="youtube" value={field.youtube} onChange={handleChange} />
              </div>
            </div>
            <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-start`}>
              <div className="form-group col-md-5 col-lg-5 col-12">
                <label htmlFor="telegram">Telegram</label>
                <input type="url" className="form-control" name="telegram" id="telegram" value={field.telegram} onChange={handleChange} />
              </div>
            </div>
            <input type="submit" value="Save Changes" className='btn-create' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
