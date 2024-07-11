import React from 'react'
import { createExcel, pagesIndex } from '../CommonUrl/apis';
import {  MdOutlineSearch } from "react-icons/md";
import { useLocation } from 'react-router-dom'


const Header = ({setShow, allData, state, setQuery}) => {
  const location = useLocation()
    const handleShow = () => setShow(true);
    
  const createExcelFile = async() => {
     const path = location.pathname
     if(!state.data) return alert("No Data")
     const {data} = state.data && state
     const newData = data.map(el => {
      const { icon, banner, image, backgroundimage, ...rest } = el;
      return rest;
    });
  return await createExcel(path, newData);
 
  }


  return (
   <>
    <div className='upperbody m-3 d-md-block d-lg-flex'>
          <div className='btn-create'>
            <label htmlFor="pagesLength">Show Data:
              <select id="pagesLength" name="pagesLength" size="1" onChange={(e) => allData(e.target.value)}>
                <option disabled selected  style={{background:"black"}}>{state && state.limit}</option>
                {pagesIndex && pagesIndex.map((el) => (
                  <option value={el}>{el}</option>
                ))}
               
              </select>
              </label>
          </div>
          <label htmlFor="total" className='btn-create'>Total Data :
            <span> {state && state.total}</span></label>
          <button className='btn-create' onClick={handleShow}>Add New</button>
       

        </div>
         <div className="d-md-block d-lg-flex justify-content-between">
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
