import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelRide, completeRide, getRides, startRide } from '../../../redux/Thunks/DriverThunk';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { List, ListItem} from '@mui/material';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import { toast } from 'react-toastify';

const ViewActiveRides = () =>{

    const dispatch = useDispatch();
    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
  
    const rides = useSelector((state)=>state.driver.rides)
    let activeRides = []

    const onStart = (event) =>{
      event.preventDefault()
      const payload = event.target.value
      dispatch(startRide(payload)).then(value=>{
          if(value.payload && value.payload.status === 200){
            toast("Status updated succesfully!");
            window.location.reload();
            
          }     
          if(value.error){
            toast.error(value.payload);
          }})
  }

    const onComplete = (event) =>{
      event.preventDefault()
      const payload = event.target.value
      dispatch(completeRide(payload)).then(value=>{
          if(value.payload && value.payload.status === 200){
            toast("Status updated succesfully!");
            window.location.reload();
            
          }     
          if(value.error){
            toast.error(value.payload);
          }})
  }
    const onCancel = (event) =>{
      event.preventDefault()
      const payload = event.target.value
      dispatch(cancelRide(payload)).then(value=>{
          if(value.payload && value.payload.status === 200){
            toast("Ride canceled succesfully!");
            window.location.reload();
            
          }     
          if(value.error){
            toast.error(value.payload);
          }})
  }

    useEffect(() => { 
        dispatch(getRides())
        // console.log("YO",rides)

    },[]);

    if(!rides){
        return <Loader/>
    }
    else{
      if(rides.length > 0 )
      {activeRides =  rides.filter(function(ride) {
        return new Date(ride.when) >= new Date() || ride.status === "Started";
      });
      console.log("Active",activeRides.length)}
    }

    return(
        <div className='view-ride-box'>
            <h1>Active Rides</h1>
            {activeRides.length > 0 ? 
            activeRides.map((ride) =>
            {
              let date = new Date(ride.when);
              if(ride.status === "Started" || ride.status === "Pending" )
              return(
              <Card Card variant="outlined" className="ride-card">
              <CardContent style={{display:"flex", flexDirection:"row"}}>
                <div className='ride-card-map'>
              <MapSection location={location} zoomLevel={17} />
              </div>
              <div style={{display: "flex", flexDirection: "column",marginLeft:"20px"}}>
                <div style={{ display: "flex", flexDirection: "column",marginLeft:"15px"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
               <DateRangeIcon style={{marginTop:"2%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold", color:"gray", letterSpacing:"2px"}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                <AccessTimeIcon style={{marginTop:"3%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold"}}>{date.getHours()}:{date.getMinutes()}</div>
                </div>
                </div>
                <List>
                <ListItem>
                    <TripOriginIcon/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}> {ride.from}</div>
                  
                </ListItem>
                <div className='icon-dotted-line'></div>
                <ListItem>
                    < CircleIcon/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}>{ride.to} </div> 
                </ListItem>
                </List>
                </div>
                <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end", marginLeft:"auto",marginRight:"20px"}}>
                <div style={{ paddingLeft: "10px", fontSize:"xx-large"}}>
                       {ride.fare} PKR
                  </div>
                  <div style={{marginTop:"5%"}}>
                    <AccountCircleIcon/>   {ride.capacity}
                  </div>
                <div style={{display:"flex", flexDirection:"row",marginTop:"17%",columnGap:"2%"}}>
          {  ride.status === "Started"? <button className='completeride_button'value={ride._id} onClick={onComplete}>End</button>:
             <button className='startride_button' value={ride._id} onClick={onStart}>Start</button>}
            <button className='cancelride_button'value={ride._id} onClick={onCancel}>Cancel</button>
            </div>
                </div>
              </CardContent>
            </Card>
            )}
            ) : <div >No Active Rides </div>}
   
    </div>
    )
} 
export default ViewActiveRides;