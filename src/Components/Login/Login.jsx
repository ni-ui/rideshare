import  { useState, setState, useEffect} from "react";
import { useDispatch } from "react-redux";
import API from "../../services/api/ApiService";
import  { useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/Thunks/AuthThunk";
import logo from "../../assets/logo.png"

export default function Login() {

	const navigate = useNavigate();
	const dispatch=useDispatch();

	const [error, setError] = useState({});

	const validation = (email,password) => {
		let errors = {};
		console.log("EMAIL",email)
		if (email=='') {
			errors.email = 'Email address is required';
		  } else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email address is invalid';
		  }
		  if (password=='') {
			errors.password = 'Password is required';
		  } else if (password.length < 8) {
			errors.password = 'Password must be 8 or more characters';
		  }
		  return errors
	}

	const onSignUp = event => {
		event.preventDefault()
		navigate("/signup")
	}

	const handleSubmit = event => {
	setError({})
    event.preventDefault();
	const email = event.target.email.value
	const password = event.target.password.value
	const payload = {email,password}

	setError(validation(email,password));
	console.log(event.target.email.value, event.target.password.value)
	
	//if(Object.keys(error).length === 0){
	dispatch(loginUser(payload)).then(value=>{
		// const response = value.payload
		if (value.payload && value.payload.status == 200){
			const response = value.payload
			API.defaults.headers.common["x-auth-token"] = `${response.data.tokens.access}`;
			localStorage.setItem("carpool-auth-token",response.data.tokens.access)

			if(response.data.user.userType==="Driver")
			navigate("/dashboard/driver",{replace:true})

			else
			navigate("/dashboard/rider",{replace:true})

		}
		if (value.error){
			console.log(value.error)			
		}
	}) } 
		
	
    return (
<div class="login_container">
	<div class = "login_box">
	<img class = "logo" width='50px' src= {logo} />

			<form class="login_form" onSubmit={handleSubmit}>
                <h1 class="login-h3" >Welcome to Carpool App</h1>
				<div class="login-h4">
				<h4>Enter your details!</h4>
				</div>
				
					<input class="login_input" type="text" name="email"  placeholder="User name / Email" />
                    <p className="error-warning">{error.email}</p>			
					<input class="login_input" type="password" name="password" placeholder="Password" />					
                    <p className="error-warning">{error.password}</p>
				
				<button class = "login_button" type="submit">
					<span class="login_button_text">Log In</span>
				</button>	

				<div class ="login_link">
				<span>Don't have an account?</span> <a style={{color:"#523be4", fontWeight:"bolder"}} onClick={onSignUp}>&nbsp;Sign Up</a>
				</div>	
			</form>
	</div>
</div>
    )};