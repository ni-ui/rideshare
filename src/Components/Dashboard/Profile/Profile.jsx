import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState} from 'react';
import { editProfile } from '../../../redux/Thunks/UpdateThunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import Loader from '../../Common/Loader';

const Profile = () =>{
   
    const user = useSelector((state)=>state.app.user)
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const [state, setState] = useState({
    name: user.name,
    email: user.email, 
    phone:user.phone, 
    city:user.city,
    defaultAddress: user.defaultAddress
    });


    const [isOpen, setIsOpen] = useState(false);

    const handleChange= (event) =>{
        if(event.target.name === 'name'){
            setState({...state, name: event.target.value})
        }
        if(event.target.name === 'email'){
            setState({...state, email: event.target.value})
        }
        if(event.target.name === 'phone'){
            setState({...state, phone: event.target.value})
        } 
        if(event.target.name === 'password'){
            setState({...state, password: event.target.value})
        }
        if(event.target.name === 'city'){
            setState({...state, city: event.target.value})
        }
        if(event.target.name === 'defaultAddress'){
            setState({...state, defaultAddress: event.target.value})
        }      
    }
    const handleSubmit = event => {
        event.preventDefault();
        const payload = {id: user._id, payload: state};
        dispatch(editProfile(payload)).then(value=>{
            if(value.payload && value.payload.status == 200){
                toast.success("Profile edited succesfully")
                navigate("/dashboard/profile",{replace:true})
        }  
            if(value.error){
                toast.error(value.payload)
            }})   
    }
    if(!user){
        return <Loader/>
    }

    return(
        <div>

        {/* <div className='profile-container'>
        <div className='profile-avatar'>
         <Avatar
          sx={{ width: 150, height: 150 }}
         ><div style={{fontSize: '80px'}}> {user.name[0]} </div></Avatar> 
         </div>
         <div style={{display:"flex",flexDirection:"column"}}>
         <div className="profile-username">{user.name}</div> 
         <div className="profile-location">{user.email}</div>
         <div className="profile-location">Karachi, Pakistan</div> 
         </div>
        </div> */}
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        {/* <div className="profile-box">
        <div className='profile-form-heading'>Saved Locations</div> 
        <div className='saved-locations-box'></div>
            </div> */}
        <div className="profile-form-box">
        <div className='profile-form-heading'>General Profile Settings</div>
        <div className='profile-navtab'>
            <ul class="nav nav-tabs">
            <li class="nav-item">
            <a class="nav-link" onClick={() => setIsOpen(false)}>Edit Profile</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" onClick={() => setIsOpen(true)}>Change Password</a>
            </li>
            </ul> 
            </div>
        
            {isOpen && (
           <ChangePassword/> 
        )}
          {!isOpen && (
              <form className="profile-form" onSubmit={handleSubmit}>
              <div className='profile-form-details'>
           <div className="profile-detail"><div className='profile-detail-name'>Name</div><input class="profile-form-input" value= {state.name} type="text" name="name" placeholder="Name" onChange={handleChange}/></div>
           <div className="profile-detail"><div className='profile-detail-name'>Phone</div> <input className="profile-form-input" value= {state.phone} type="tel" name="phone" placeholder="Phone" onChange={handleChange}/></div>
           <div className="profile-detail"><div className='profile-detail-name'>Email</div> <input className="profile-form-input" value= {state.email} type="text" name="email" placeholder="Email" onChange={handleChange}/></div>
           <div className="profile-detail"><div className='profile-detail-name'>City</div> <input className="profile-form-input" value= {state.city} type="text" name="city" placeholder="City" onChange={handleChange}/></div>
           <div className="profile-detail"><div className='profile-detail-name'>Address</div> <input className="profile-form-input" value= {state.defaultAddress} type="text" name="defaultAddress" placeholder="Address" onChange={handleChange}/></div>

           <button class = "editprofile_button" type='submit'>
           <span class="createride_button_text">Save</span>
       </button>   
       </div>    
       
            
        </form>
         )}
        </div>
        </div>
        </div>
        
    )
} 
export default Profile;