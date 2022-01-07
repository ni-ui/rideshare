import React from "react";
import logo from "../../assets/logo.png"

const StepTwo = ({ nextStep, prevStep, values }) => {

  const [error, setError] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = (payload) => {

        let errors = {
        email: '',
        phone: '',
        name:''}

        let isError = false;
    
		if (payload.email.value=='') {
            errors.email = "Email is required"
			isError = true;
		} 
        if(!/\S+@\S+\.\S+/.test(payload.email.value)){
            errors.email = "Invalid email"
			isError = true;
	    }
        if (payload.name.value=='') {
            errors.name = "Name is required"
			isError = true;
		  } 
        if (payload.phone.value=='') {
            errors.phone = "Phone is required"
			isError = true;
		  } 
		  return {err: errors, check: isError}
	}

    const err = validation(e.target)
    setError(err.err)
    console.log("ERRR", err)
    if (!err.check) {
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
                    <p className="error-warning">{error.email}</p>
                    <input class="register_input" type="text" name="name" placeholder="Name"/>   
                    <p className="error-warning">{error.name}</p>                		
                    <input class="register_input" type="text" name="phone" placeholder="Phone Number"/>	
                    <p className="error-warning">{error.phone}</p>                   	
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