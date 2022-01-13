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
import { toast } from 'react-toastify';
import MapSection from '../../Common/Map'



const CreateRide = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = React.useState(new Date());
    const [error, setError] = React.useState({});

    const location = {
      lat: 24.935101549207285,
      lng:67.06534204041614
    }
    const handleChange = (newValue) => {
        setDate(newValue);
    }

    const validation = (payload) => {
		let errors = {};
    let isError = false;

		if (payload.to === '') {
			errors.to = 'Destination is required';
      isError = true
		} 
        if (payload.from === '') {
			errors.from = 'Departure point is required';
      isError = true
	    }
        if (payload.fare === '') {
			errors.fare = 'Fare is required';
      isError = true
		  }
      if  (payload.fare >= 25000){
        errors.fare = 'Max limit reached';
        isError = true
      } 
      if (payload.capacity ==='') {
			errors.capacity = 'Capacity is required';
       isError = true
		  } 
      const err = {err: errors,check: isError}
		  return err
	}
    const handleSubmit = event => {
        event.preventDefault();  

        const to = event.target.to.value
        const from = event.target.from.value
        const fare = event.target.fare.value
        const capacity = event.target.capacity.value
        const when = date

    
        const payload = {to,from,fare,capacity,when}

        const err = validation(payload)
        setError(err.err);
        
        if(!err.check){
        dispatch(createRide(payload)).then(value=>{
            if(value.payload && value.payload.status === 200){
                  toast("Ride created succesfully!")
                    navigate("/",{replace:true})
            }     
            if(value.error){
              toast.error("Something went wrong")
            }})
        }}
    return(
        <div class="createride_box">
        <form class="createride_form" onSubmit={handleSubmit}>
        <h1 class="createride-h3" >Karachi</h1>
       <div style={{display:"flex", width: "100%"}}>
       <label for="focus-where" style={{cursor:"pointer"}}>
         <DirectionsCarIcon fontSize='large'/> 
        </label>
         <input id="focus-where" class="createride_input" type="text" name="to" placeholder="Where To?"/> 
         </div> 
        <p className="error-warning">{error.to}</p>

		  <div style={{display:"flex", width: "100%"}}>
      <label for="focus-to" style={{cursor:"pointer"}}> 
        <DirectionsCarIcon fontSize='large'/> 
        </label>
        <input id="focus-to" class="createride_input" type="text" name="from" placeholder="From Where?"/>
        </div> 
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
         
         <div style={{display:"flex", width: "100%"}}>
           <label for="focus-cap" style={{cursor:"pointer"}}>
           <GroupsIcon fontSize='large'/> 
           </label>
          <input id= "focus-cap" class="createride_input" type="number" name="capacity" placeholder="Capacity" />
          </div>
        <p className="error-warning">{error.capacity}</p>
        
        <div style={{display:"flex", width: "100%"}}>
        <label for="focus-fare" style={{cursor:"pointer"}}>
           <PaidIcon fontSize='large'/> 
           </label>
           <input id= "focus-fare" class="createride_input" type="number" name="fare" placeholder="Fare"/>
           </div>
        <p className="error-warning">{error.fare}</p>

        <button class = "createride_button" type="submit">
		    <span class="createride_button_text">Create</span>
		</button>
        </form>
        <div class='map-container'>
        <MapSection location={location} zoomLevel={17} /> 
        </div>        
        </div>
    )
} 
export default CreateRide;