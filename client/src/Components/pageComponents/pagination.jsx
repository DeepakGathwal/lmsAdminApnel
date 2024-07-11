import React, {useEffect, useState} from 'react'

const Pagination = ({setcurrentPage, currentPage, state}) => {
  const pages = state && state.data && (state.total / state.limit)
    const totalPages = Math.ceil(pages) <= 1 ? 1 : Math.ceil(pages) 
    const data = Array.from({ length: totalPages}, (_, index) => index + 1)
    
  return (
    <div className="lowerbody m-3">
    <div aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
       {currentPage > 1 &&  <li className="page-item"><a onClick={(e) => setcurrentPage(currentPage -  1)} className="page-link" href="#">Previous</a></li> }
        {data && data.map((ab) => (
          <li className="page-item" ><a style={{ background : ab == currentPage ?  "dodgerblue"  : "#ddd", color : ab == currentPage ? "black" : "white"}} onClick={(e) => setcurrentPage(ab)} className="page-link" href="#">{ab}</a></li>
        ))}
        {currentPage < totalPages && <li  className="page-item"><a onClick={(e) => setcurrentPage(currentPage + 1)} className="page-link" href="#">Next</a></li>}
      </ul>
    </div>
  </div>
  )
}

export default Pagination
