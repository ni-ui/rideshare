import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"

const StepThree = ({ nextStep, prevStep, values }) => {

  const [error, setError] = React.useState({});

  const navigate = useNavigate();

  const onSignIn = event => {
    event.preventDefault()
    navigate("/")
}

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = (payload) => {
        let errors = {
            city: '',
            address: ''}

        let isError = false;
    
		if (payload.city.value === '') {
			errors.city = "City is required";
            isError = true;
		} 
        if (payload.address.value === '') {
			errors.address = "Address is required";
            isError = true;
		} 
        
        return {err: errors, check: isError}
	}

    const err = validation(e.target)
    setError(err.err)

    if (!err.check){
        values.city= e.target.city.value;
        values.defaultAddress= e.target.address.value;
        nextStep();
    }
  };

  return (
    <div class="register_container">
	<div class = "register_box">
    <img alt="Carpool-Logo" class="logo" width='50px' src= {logo} />
			<form class="register_form" onSubmit={handleSubmit}>

                    <h2 class="register-h3">Sign up to drive</h2>
		            <h5 style = {{marginTop:"5%", marginBottom:'10px'}}>Please enter your details!</h5>	

                    <input class="register_input" type="text" name="city" placeholder="City"/>
                    <p className="error-warning">{error.city}</p>
                    <input class="register_input" type="text" name="address" placeholder="Address"/>
                    <p className="error-warning">{error.address}</p>
                    	
                <div style={{position:'relative',width:'100%',marginTop:"80px"}}> 
                <button class = "register_button"style={{position: 'absolute', bottom: '0px',left: '0px'}}  onClick={prevStep} >
					<span class="register_button_text">&nbsp;&nbsp;Prev&nbsp;&nbsp;</span>
				</button>    
				<button class = "register_button" style={{position: 'absolute', bottom: '0px',right: '0px'}} type="submit">
					<span class="register_button_text">&nbsp;Next&nbsp;&nbsp;</span>
				</button>
                </div>
                <div class ="login_link">
                <span>Already have an account?</span> <div style={{color:"#523be4", fontWeight:"bolder"}} onClick={onSignIn}>&nbsp;Sign In</div>
                </div>             				
			    </form>
	        </div>
        </div>
  );
};

export default StepThree;