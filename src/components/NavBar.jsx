import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div> <div className="logo">
    <img src="https://i.ibb.co/XSVCNTP/logo.jpg" alt="logo" border="0"/>
  

  </div><br/>
   
      <nav className="navbar">
     
      
     
           
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
   
    </div>
  )
}

export default NavBar