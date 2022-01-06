import React from 'react';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch } from 'react-redux';
import { createRide } from '../../../redux/Thunks/DriverThunk';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidIcon from '@mui/icons-material/Paid';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

const CreateRide = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = React.useState(new Date());
    const [error, setError] = React.useState({});

    const handleChange = (newValue) => {
        setDate(newValue);
    }

    const validation = (payload) => {
		let errors = {};

		if (payload.to=='') {
			errors.to = 'Destination is required';
		} 
        if (payload.from=='') {
			errors.from = 'Departure point is required';
	    }
        if (payload.fare=='') {
			errors.fare = 'Fare is required';
		  }
          else if  (payload.fare>=250){
            errors.fare = 'Max limit reached';
          } 
        if (payload.capacity=='') {
			errors.capacity = 'Capacity is required';
		  } 
		  return errors
	}
    const handleSubmit = event => {
        event.preventDefault();  

        const to = event.target.to.value
        const from = event.target.from.value
        const fare = event.target.fare.value
        const capacity = event.target.capacity.value
        const when = date

    
        const payload = {to,from,fare,capacity,when}
        console.log("PAYLOAD",payload)
        setError(validation(payload));
        
        dispatch(createRide(payload)).then(value=>{
           // const response = value.payload
            if(value.payload && value.payload.status == 200){
                    navigate("/",{replace:true})
            }     
            if(value.error){
                console.log("there was an error", value)
            }})
        }
    return(
        <div class="createride_box">
        <form class="createride_form" onSubmit={handleSubmit}>
            
       <div style={{display:"flex", width: "100%"}}><DirectionsCarIcon fontSize='large'/> <input class="createride_input" type="text" name="to" placeholder="Where To?"/> </div> 
        <p className="error-warning">{error.to}</p>
		<div style={{display:"flex", width: "100%"}}><DirectionsCarIcon fontSize='large'/> <input class="createride_input" type="text" name="from" placeholder="From Where?"/></div> 
        <p className="error-warning">{error.from}</p>
        <div style={{marginTop:"15px",marginBottom:"15px",display:"flex", width: "100%"}}>
        <DepartureBoardIcon  style={{marginRight:"15px"}} fontSize='large'/>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Date&Time picker"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
         </LocalizationProvider>
         </div>
         <div style={{display:"flex", width: "100%"}}><GroupsIcon fontSize='large'/>  <input class="createride_input" type="number" name="capacity" placeholder="Capacity" /></div>
        <p className="error-warning">{error.capacity}</p>
        <div style={{display:"flex", width: "100%"}}><PaidIcon fontSize='large'/> <input class="createride_input" type="number" name="fare" placeholder="Fare"/></div>
        {/* <p className="error-warning">{error.fare}</p> */}

        <button class = "createride_button" type="submit">
		    <span class="createride_button_text">Create</span>
		</button>
        </form>            
        </div>
    )
} 
export default CreateRide;