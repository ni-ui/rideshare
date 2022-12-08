import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/appSlice';
import logo from '../../assets/logo.png'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import '../../styles/navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar= () =>{
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state)=>state.app.user.name)
  const initial = userName[0]

  const viewProfile= event => {
    event.preventDefault()
    navigate("/dashboard/profile")
  
  }


  return (
<nav className="navbar navbar-expand-lg navbar-custom shadow-sm">
  <a className="navbar-brand" href="/"><img alt="carpool-logo" className='navbar-logo' src={logo}/> Carpool App</a>
    <ul className="navbar-nav ms-auto">
      <li className="nav-item dropdown" >
     <Avatar className="avatar-button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
       {initial}
     </Avatar>

  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
    <li class="user-details">Signed in as {userName}</li>
    <li><a class="dropdown-item" onClick={viewProfile}>View Profile</a></li>
    <li><a class="dropdown-item" onClick={()=>dispatch(logOut())}>Logout</a></li>
  </ul>

      </li>
    </ul>
  
</nav>
  );
}
export default Navbar;