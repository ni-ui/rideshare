import React, { useState } from "react";

import logo from "../../assets/logo.png"

const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {

  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = (payload) => {
    
		if (payload.email.value=='') {
			return false;
		} 
        if(!/\S+@\S+\.\S+/.test(payload.email.value)){
			return false;
	    }
        if (payload.name.value=='') {
			return false;
		  } 
        if (payload.phone.value=='') {
			return false
		  } 
		  return true
	}

    if (
     !validation(e.target)
    ) {
      setError(true);
    } else {
        values.email= e.target.email.value;
        values.phone = e.target.phone.value;
        values.name = e.target.name.value;
        console.log("VALUES",values)
      nextStep();
    }
  };

  return (
    <div class="register_container">
	<div class = "register_box">
    <img class = "logo" width='50px' src= {logo} />
			<form class="register_form" onSubmit={handleSubmit}>

                    <h2 class="register-h3">Sign up to drive</h2>
		            <h4 style = {{marginTop:"5%"}}>Enter your details!</h4>	

                    <input class="register_input" type="text" name="email" placeholder="Email"/>
                    <input class="register_input" type="text" name="name" placeholder="Name"/>                   		
                    <input class="register_input" type="text" name="phone" placeholder="Phone Number"/>	                   	
                <div style={{position:'relative',width:'100%',marginTop:"80px"}}> 
                <button class = "register_button"style={{position: 'absolute', bottom: '0px',left: '0px'}}  onClick={prevStep} >
					<span class="register_button_text">Prev</span>
				</button>    
				<button class = "register_button" style={{position: 'absolute', bottom: '0px',right: '0px'}} type="submit">
					<span class="register_button_text">Next</span>
				</button>
                </div>           				
			</form>
	</div>
</div>
  );
};

export default StepTwo;