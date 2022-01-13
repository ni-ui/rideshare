import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logOut } from '../../../redux/slices/appSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { changePassword } from '../../../redux/Thunks/UpdateThunk';


const ChangePassword = () =>{

    const user = useSelector((state)=>state.app.user)
    const dispatch = useDispatch()
    
    const [error, setError] = useState({});
    const [isRevealPwd, setIsRevealPwd] = useState(false);


    const validation = (payload) => {
        let errors = {
            password: '',
            confirmpassword: ''}

        let isError = false;
    
		if (payload.password.value=='') {
			errors.password = "Password is required";
            isError = true;
		} 
        if(payload.password.value.length < 8 ){
			errors.password = "Password length should be at least 8 characters";
            isError = true;
	    }
        if (payload.confirmpassword.value != payload.password.value){
			errors.confirmpassword = "Passwords don't match";
            isError = true;
        }
        return {err: errors, check: isError}
	}

    const handleSubmit = event => {
        event.preventDefault();
        console.log(event.target.confirmpassword.value)

        const err = validation(event.target)
        setError(err.err)

        if(!err.check){
        const payload = {oldPassword: event.target.oldpassword.value, newPassword: event.target.password.value};
        console.log("PASSWORDS", payload)

        dispatch(changePassword(payload)).then(value=>{           
            if(value.payload && value.payload.status == 200){
                toast.success("Password changed successfully")
                dispatch(logOut())
        }  
            if(value.error){
                toast.error(value.payload)
            }})   
        }
    }

    return(

        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-details">
            <div className="profile-detail-password">
            <div className="input-container">
            <div className='password-detail'>Old Password</div><input class="profile-form-input" type={isRevealPwd ? "text" : "password"} name="oldpassword" placeholder="Old Password"  />         
            <VisibilityIcon className="visibility-icon-register" onClick={() => setIsRevealPwd(!isRevealPwd)}/>
            </div>
            </div>
            <div className="profile-detail-password">
            <div className="input-container">
            <div className='password-detail'>New Password</div> <input className="profile-form-input"  type={isRevealPwd ? "text" : "password"} name="password" placeholder="New Password" />
            <VisibilityIcon className="visibility-icon-register" onClick={() => setIsRevealPwd(!isRevealPwd)}/>
            </div>
            </div>
            <p className="error-warning">{error.password}</p>
            <div className="profile-detail-password">
            <div className="input-container">
            <div className='password-detail'>Confirm Password</div> <input className="profile-form-input"  type={isRevealPwd ? "text" : "password"} name="confirmpassword" placeholder="Confirm Password" />
            <VisibilityIcon className="visibility-icon-register" onClick={() => setIsRevealPwd(!isRevealPwd)}/>
            </div>
            </div>
            <p className="error-warning">{error.confirmpassword}</p>
            
            <button class = "editprofile_button" type='submit'>
		    <span class="createride_button_text">Save</span>
		    </button> 
           </div>       
        </form>
    )
} 
export default ChangePassword;