import React ,{ useState} from "react";
import { useDispatch } from "react-redux";
import  { useNavigate} from 'react-router-dom';
import { resetPassword } from "../../redux/Thunks/AuthThunk";
import logo from "../../assets/logo.png"
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';



export default function ResetPassword() {

    const [error, setError] = React.useState({});
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isRevealCPwd, setIsRevealCPwd] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onBack = event => {
		event.preventDefault()
		navigate("/")
	}

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


  
    const handleSubmit = (e) => {
      e.preventDefault();
      const err = validation(e.target)
      setError(err.err)
  
      if (!err.check){

        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token');
        console.log(token)

        const payload = {token: token, newPassword: e.target.password.value};
        dispatch(resetPassword(payload)).then(value=>{
            if(value.payload && value.payload.status === 200){
                toast.success("Password changed successfully!")
                    navigate("/",{replace:true})
            }     
            if(value.error){
                toast.error(value.payload)
            }})
        
      }
    };
		
	
    return (
<div class="login_container">
	<div class = "fp_box">
	<img class = "logo" width='50px' src= {logo} />

			<form class="fp_form" onSubmit={handleSubmit}>
                <h1 class="login-h3" >Reset Password</h1>
				{/* <div class="login-h4">
				<h5 style = {{marginTop:"5%", marginBottom:'10px'}}>Reset password!</h5>
				</div> */}
                <div className="input-container">
                    <input class="login_input" type={isRevealPwd ? "text" : "password"} name="password" placeholder="Password"/>
	                <VisibilityIcon className="visibility-icon" onClick={() => setIsRevealPwd(!isRevealPwd)}/>
					</div>
                    <p className="error-warning">{error.password}</p>

                    <div className="input-container">
                    <input class="login_input" type={isRevealCPwd ? "text" : "password"}  name="confirmpassword" placeholder="Confirm Password"/>
	                <VisibilityIcon className="visibility-icon" onClick={() => setIsRevealCPwd(!isRevealCPwd)}/>
					</div>
                    <p className="error-warning">{error.confirmpassword}</p>

				<button class = "login_button"  type="submit">
					<span class="login_button_text" >Reset</span>
				</button>		

                
				<div class ="login_link">
				<a style={{fontWeight:"bolder"}} onClick={onBack}>Go back?</a>
				</div>	

			</form>
	</div>
</div>
    )};