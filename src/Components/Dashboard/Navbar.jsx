import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/appSlice';
import logo from '../../assets/logo.png'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import '../../styles/navbar.css'

const Navbar= () =>{
  
  const dispatch = useDispatch()
  const userName = useSelector((state)=>state.app.user.name)
  const initial = userName[0]


  return (
<nav className="navbar navbar-expand-lg navbar-custom">
  <a className="navbar-brand" href="/"><img className='navbar-logo' src={logo}/> Carpool App</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item dropdown" >
     <Avatar className="avatar-button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
       {initial}
     </Avatar>

  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
    <li class="user-details">Signed in as {userName}</li>
    <li><a class="dropdown-item" >View Profile</a></li>
    <li><a class="dropdown-item" onClick={()=>dispatch(logOut())}>Logout</a></li>
  </ul>

      </li>
    </ul>
  </div>
</nav>
  );
}
export default Navbar;