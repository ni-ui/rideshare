import  { useState} from "react";
import { useDispatch } from "react-redux";
import  { useNavigate } from 'react-router-dom';
import { forgotPassword } from "../../redux/Thunks/AuthThunk";
import logo from "../../assets/logo.png"
import { toast } from 'react-toastify';


export default function ForgotPassword() {

	const navigate = useNavigate();
	const dispatch=useDispatch();

	const [error, setError] = useState({});

	const validation = (email) => {
        let errors = {
            email: ''
        }

        let isError = false;
		console.log("EMAIL",email)
		if (email === '') {
			errors.email = 'Email address is required';
            isError = true;
		  } else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email address is invalid';
            isError = true;
		  }
		  return {err: errors, check: isError}
	}

	const onBack = event => {
		event.preventDefault()
		navigate("/")
	}

	const handleSubmit = event => {
    
    event.preventDefault();
    const email = event.target.email.value
    const err = validation(email)
    setError(err.err)
    

	console.log(event.target.email.value)
    if (!err.check){
        const payload = {email:email}
	    dispatch(forgotPassword(payload)).then(value=>{
            // const response = value.payload
            if (value.payload && value.payload.status == 200){
               toast.success("Link sent successfully!")
    
            }
            if (value.error){
                toast.error(value.payload);
            }
        })
    }
 } 
		
	
    return (
<div class="login_container">
	<div class = "fp_box">
	<img class = "logo" width='50px' src= {logo} />

			<form class="fp_form" onSubmit={handleSubmit}>
                <h1 class="login-h3" >Find your account</h1>
				<div class="login-h4">
				<h5>Please enter your email. A password reset link will be mailed to your account.</h5>
				</div>
					<div className="email-container">
					<input class="login_input" type="text" name="email"  placeholder="Email" />
                    <p className="error-warning">{error.email}</p>
					</div>	

				<button class = "login_button"  type="submit">
					<span class="login_button_text" >Send Link</span>
				</button>	

				<div class ="login_link">
				<a style={{fontWeight:"bolder"}} onClick={onBack}>Go back?</a>
				</div>	

			</form>
	</div>
</div>
    )};