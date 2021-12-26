import react, { useState, setState} from "react";
import axios from "axios"
import API from "../../services/api/ApiService";
import { useDispatch } from "react-redux";
import  { useNavigate } from 'react-router-dom';
import { registerUser } from "../../redux/Thunks/AuthThunk";
import logo from "../../assets/logo.png"

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState({});

	const validation = (payload) => {
		let errors = {};
		// console.log("EMAIL",email)
		if (payload.email=='') {
			errors.email = 'Email address is required';
		  } 
        else if (!/\S+@\S+\.\S+/.test(payload.email)) {
		    errors.email = 'Email address is invalid';
		  }
		if (payload.password=='') {
			errors.password = 'Password is required';
		} 
        else if (payload.password.length < 8) {
			errors.password = 'Password must be 8 or more characters';
	    }
        if (payload.name=='') {
			errors.name = 'Name is required';
		  } 
		  return errors
	}

    const onSignIn = event => {
        event.preventDefault()
        navigate("/")
    }

    const handleSubmit = event => {
        setError({})
        event.preventDefault();  

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const userType = "Driver"
        //console.log(event.target.email.value, event.target.password.value)
    
        const payload = {email,password,name,userType}
        setError(validation(payload));
        // console.log("PAYLOAD",payload)
        
        dispatch(registerUser(payload)).then(value=>{
           // const response = value.payload
            if(value.payload && value.payload.status == 200){
                    navigate("/",{replace:true})
            }     
            if(value.error){
                console.log("there was an error", value)
            }})
        }


    return(
        <div class="register_container">
	<div class = "register_box">
    <img class = "logo" width='50px' src= {logo} />
			<form class="register_form" onSubmit={handleSubmit}>
                    <h2 class="register-h3">Sign up to drive</h2>
		            <h4 style = {{marginTop:"5%"}}>Enter your details!</h4>
                    <input class="register_input" type="text" name="name" placeholder="Name"/>
                    <p className="error-warning">{error.name}</p>	
					<input class="register_input" type="text" name="email" placeholder="Email"/>
                    <p className="error-warning">{error.email}</p>	
                    <input class="register_input" type="text" name="password" placeholder="Password"/>	
                    <p className="error-warning">{error.password}</p>					
                
				<button class = "register_button" type="submit">
					<span class="register_button_text">Sign Up</span>
				</button>

                <div class ="login_link">
				<span>Already have an account?</span> <a style={{color:"#523be4", fontWeight:"bolder"}} onClick={onSignIn}>&nbsp;Sign In</a>
				</div>	
                				
			</form>
	</div>
</div>

    )};