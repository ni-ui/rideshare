import React from 'react';
import {  Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/appSlice';
import logo from '../../assets/logo.png'
import '../../styles/navbar.css'

const Navbar= () =>{
  const dispatch = useDispatch()
  return (

    
<nav className="navbar navbar-expand-lg navbar-custom">
  <a className="navbar-brand" href="/"><img className='navbar-logo' src={logo}/> Carpool App</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item" >
        <a className="nav-link"  onClick={()=>dispatch(logOut())}>Logout</a>
      </li>
    </ul>
  </div>
</nav>
  );
}
export default Navbar;