import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import logo from "../../assets/logo.png"
import VisibilityIcon from '@mui/icons-material/Visibility';

import { registerUser } from "../../redux/Thunks/AuthThunk";

const StepFour = ({ prevStep, values }) => {

  const [error, setError] = React.useState({});
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealCPwd, setIsRevealCPwd] = useState(false);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignIn = event => {
    event.preventDefault()
    navigate("/")
}

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = (payload) => {
        let errors = {
            password: '',
            confirmpassword: ''}

        let isError = false;
    
		if (payload.password.value === '') {
			errors.password = "Password is required";
            isError = true;
		} 
        if(payload.password.value.length < 8 ){
			errors.password = "Password length should be at least 8 characters";
            isError = true;

        }
        if (payload.confirmpassword.value !== payload.password.value){
			errors.confirmpassword = "Passwords don't match";
            isError = true;
        }
        return {err: errors, check: isError}
	}

    const err = validation(e.target)
    setError(err.err)

    if (!err.check){
        values.password= e.target.password.value;
        const payload = values;
        dispatch(registerUser(payload)).then(value=>{
            if(value.payload && value.payload.status === 200){
                toast.success("User registered successfully!")
                    navigate("/",{replace:true})
            }     
            if(value.error){
                toast.error(value.payload)
            }})
      
    }
  };

  return (
    <div class="register_container">
	<div class = "register_box">
    <img class = "logo" width='50px' src= {logo} />
			<form class="register_form" onSubmit={handleSubmit}>

                    <h2 class="register-h3">Sign up to drive</h2>
		            <h5 style = {{marginTop:"5%", marginBottom:'10px'}}>Set password!</h5>	

                    <div className="input-container">
                    <input class="register_input" type={isRevealPwd ? "text" : "password"} name="password" placeholder="Password"/>
	                <VisibilityIcon className="visibility-icon-register" onClick={() => setIsRevealPwd(!isRevealPwd)}/>
					</div>
                    <p className="error-warning">{error.password}</p>

                    <div className="input-container">
                    <input class="register_input" type={isRevealCPwd ? "text" : "password"}  name="confirmpassword" placeholder="Confirm Password"/>
	                <VisibilityIcon className="visibility-icon-register" onClick={() => setIsRevealCPwd(!isRevealCPwd)}/>
					</div>
                    <p className="error-warning">{error.confirmpassword}</p>
                    	
                <div style={{position:'relative',width:'100%',marginTop:"80px"}}> 
                <button class = "register_button"style={{position: 'absolute', bottom: '0px',left: '0px'}}  onClick={prevStep} >
					<span class="register_button_text">&nbsp;&nbsp;&nbsp;Prev&nbsp;&nbsp;&nbsp;</span>
				</button>    
				<button class = "register_button" style={{position: 'absolute', bottom: '0px',right: '0px'}} type="submit">
					<span class="register_button_text">Submit</span>
				</button>
                </div> 
                <div class ="login_link_steptwo">
                <span>Already have an account?</span> <a style={{color:"#523be4", fontWeight:"bolder"}} onClick={onSignIn}>&nbsp;Sign In</a>
                </div>              				
			</form>
	</div>
</div>
  );
};

export default StepFour;