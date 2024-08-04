import React from 'react'
import { createExcel } from '../CommonUrl/apis';
import {  MdOutlineSearch } from "react-icons/md";
import { useLocation } from 'react-router-dom'


const Header = ({setShow, state, setQuery}) => {
  const location = useLocation()
    const handleShow = () => setShow(true);
    
  const createExcelFile = async() => {
     const path = location.pathname
     if(!state) return alert("No Data")
     const newData = state.map(el => {
      const { icon, banner, image, backgroundimage, ...rest } = el;
      return rest;
    });
  return await createExcel(path, newData);
 
  }


  return (
   <>
    
         <div className="d-md-block d-lg-flex justify-content-between">
          <div className="m-3">          <button className='btn-create' onClick={handleShow}>Add New</button></div>

              <div className="search-input m-3">
              <div className="search-box">
                <input type="search"  placeholder="Search..." onChange={event => setQuery(event.target.value)} />
                <MdOutlineSearch />
              </div>
            </div>
            <div className='m-3'>
              <button className='btn-create' onClick={createExcelFile}>Export </button>
            </div>
         </div>
   </>
  )
}

export default Header
