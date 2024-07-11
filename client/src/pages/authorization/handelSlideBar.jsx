import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const HandelSlideBar = ({children}) => {
    const location = useLocation()
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() =>{
if(location.pathname === "/login")
    setShowNavbar(false)
else if(location.pathname === "/forgetpassword")
  setShowNavbar(false)

else   setShowNavbar(true)
    },[location])
    
  return (
    <div>
      {showNavbar && children}
    </div>
  )
}

export default HandelSlideBar
