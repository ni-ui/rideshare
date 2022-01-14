import { AccessTime } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Circle from '@mui/icons-material/Circle';
import DateRange from '@mui/icons-material/DateRange';
import TripOrigin from '@mui/icons-material/TripOrigin';
import { Card, CardContent, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import illustration from "../../assets/illustration.jpg"
import { cancelRide, completeRide, getRides, startRide } from '../../redux/Thunks/DriverThunk';
import Loader from '../Common/Loader';
import MapSection from '../Common/Map'

const LandingPage = () =>{

    const dispatch = useDispatch();

    const location= {
        lat: 24.935101549207285,
      lng:67.06534204041614
    }

    const rides = useSelector((state)=>state.driver.rides)

    let upComingRides = []
    console.log("RIDES", rides)

    const onStart = (id) =>{
        const payload = id
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
        const payload = id
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
        const payload = id
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
        dispatch(getRides()).then(value=>{
                if(value.payload && value.payload.status === 200){
                 console.log("SUUCEESS")
                  
                }     
                if(value.error){
                  console.log(value.payload)
                }})
        // console.log("YO",rides)

    },[]);

    if(!rides){
        return <Loader/>
    }
    else{
        const upComingRideDate = new Date(Math.min.apply(null, rides.filter(ride => new Date(ride.when) >= new Date()).map(ride => {
            return new Date(ride.when);
          })));
          console.log(rides)
         upComingRides =  rides.filter(ride => new Date(ride.when).getTime() == upComingRideDate.getTime() )
          console.log("ehweiw",upComingRides)
    }

    return(
        
        <div>
            {/* "Please select an option from the sidebar to get started!" */}
            {/* <img src={illustration}></img> */}
            {/* <div class='map-banner'>
        <MapSection location={location} zoomLevel={17} /> 
        </div>  */}
        <div className='view-ride-box'>
            <h1>Upcoming Ride</h1>
            {upComingRides.length > 0 ? 
            upComingRides.map((ride) =>
            {
              let date = new Date(ride.when);
              return(
              <Card Card variant="outlined" className="ride-card">
              <CardContent style={{display:"flex", flexDirection:"row"}}>
                <div style={{width:"50%",height:"20vh"}}>
              <MapSection location={location} zoomLevel={17} />
              </div>
              <div style={{display: "flex", flexDirection: "column",marginLeft:"20px"}}>
                <div style={{ display: "flex", flexDirection: "column",marginLeft:"15px"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
               <DateRange style={{marginTop:"2%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold", color:"gray", letterSpacing:"2px"}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                <AccessTime style={{marginTop:"3%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold"}}>{date.getHours()}:{date.getMinutes()}</div>
                </div>
                </div>
                <List>
                <ListItem>
                    <TripOrigin/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}> {ride.from}</div>
                  
                </ListItem>
                <div style={{borderLeft:'2px dotted grey',height:'20px',marginLeft:'1.4em'}}></div>
                <ListItem>
                    < Circle/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}>{ride.to} </div> 
                </ListItem>
                </List>
                </div>
                <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end",marginLeft:"5%"}}>
                <div style={{ paddingLeft: "10px", fontSize:"35px"}}>
                       {ride.fare} PKR
                  </div>
                  <div style={{marginTop:"5%"}}>
                    <AccountCircle/>   {ride.capacity}
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

        </div>
    )
} 
export default LandingPage;