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
import { Edit } from '@mui/icons-material';


const ViewActiveRides = () =>{

    const dispatch = useDispatch();
    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
  
    const rides = useSelector((state)=>state.driver.rides)
    let activeRides = []

    const onStart = (id) =>{
      const payload = {id}
      dispatch(startRide(payload)).then(value=>{
          if(value.payload && value.payload.status === 200){
            toast("Status updated succesfully!");
            window.location.reload();
            
          }     
          if(value.error){
            toast.error(value.payload);
          }})
  }

    const onComplete = (id) =>{
      const payload = {id}
      dispatch(completeRide(payload)).then(value=>{
          if(value.payload && value.payload.status === 200){
            toast("Status updated succesfully!");
            window.location.reload();
            
          }     
          if(value.error){
            toast.error(value.payload);
          }})
  }
    const onCancel = (id) =>{
      const payload = {id}
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
      activeRides =  rides.filter(function(ride) {
        return new Date(ride.when) >= new Date();
      });
      console.log("Active",activeRides.length)
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
                <div style={{width:"50%",height:"20vh"}}>
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
                <div style={{borderLeft:'2px dotted grey',height:'20px',marginLeft:'1.4em'}}></div>
                <ListItem>
                    < CircleIcon/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}>{ride.to} </div> 
                </ListItem>
                </List>
                </div>
                <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end",marginLeft:"5%"}}>
                <div style={{ paddingLeft: "10px", fontSize:"35px"}}>
                       {ride.fare} PKR
                  </div>
                  <div style={{marginTop:"5%"}}>
                    <AccountCircleIcon/>   {ride.capacity}
                  </div>
                <div style={{display:"flex", flexDirection:"row",marginTop:"17%",columnGap:"2%"}}>
          {  ride.status === "Started"? <button className='startride_button' disabled>Started</button>:
             <button className='startride_button' onClick={() => onStart(ride._id)}>Start</button>}
            <button className='completeride_button' onClick={() => onComplete(ride._id)}>End</button>
            <button className='cancelride_button' onClick={() => onCancel(ride._id)}>Cancel</button>
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