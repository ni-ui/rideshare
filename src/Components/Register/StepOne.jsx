import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png"

const StepOne = ({ nextStep, values }) => {
  const navigate = useNavigate();

  const onSignIn = event => {
    event.preventDefault()
    navigate("/")
}

  const handleSubmit = (e) => {
    e.preventDefault();
        values.userType =  e.target.usertype.value
        nextStep();
  };

  return (
    <div class="register_container">
	<div class = "register_box">
    <img class = "logo" width='50px' src= {logo} />
			<form class="register_form" onSubmit={handleSubmit}>
                    <h2 class="register-h3">Sign up to drive</h2>
		            <h5 style = {{textAlign: 'left',marginTop:"5%", marginBottom:'10px'}}>What do you want to do?</h5>	
                    <select class="register_input" name="usertype" placeholder="Book Ride or Offer Ride">
                    <option value="Rider">Book a Ride</option>
                    <option value="Driver">Offer a Ride</option>	
                  </select>				
                
				<button class = "register_button" type="submit">
					<span class="register_button_text">Next</span>
				</button>

        <div class ="login_link">
				<span>Already have an account?</span> <a style={{color:"#523be4", fontWeight:"bolder"}} onClick={onSignIn}>&nbsp;Sign In</a>
				</div>	
                				
			</form>
	</div>
</div>
  );
};

export default StepOne;