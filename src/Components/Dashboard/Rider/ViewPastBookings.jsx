import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getMyRides } from '../../../redux/Thunks/RiderThunk';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { List, ListItem, Tooltip} from '@mui/material';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import DateRange from '@mui/icons-material/DateRange';
import { ArrowForwardRounded } from '@mui/icons-material';


const ViewPastBookings = () =>{
    const dispatch = useDispatch();

    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
    
    const myrides = useSelector((state)=>state.rider.myrides)
    
    let pastBookings= [];

    useEffect(() => { 
        dispatch(getMyRides())
    },[]);

    if(!myrides){
        return <Loader/>
    }
    else{
      if(myrides.length > 0)
       { 
          //filters rides whose date has passed or status is completed or cancelled
          pastBookings =  myrides.filter(function(ride) {
          return new Date(ride.when) < new Date() || ride.status === "Completed" || ride.status === "Cancelled" ;
          });
          console.log("Past",pastBookings.length)
}
    }

    return(
        <div className='view-ride-box'>
            <h1>Past Bookings</h1>
            {pastBookings.length > 0 ? 
            pastBookings.map((ride) =>
            {
              let date = new Date(ride.when);
              return(
              <Card Card variant="outlined" className="ride-card">
              <CardContent style={{display:"flex", flexDirection:"row"}}>
                <div className='ride-card-map'>
              <MapSection location={location} zoomLevel={17} />
              </div>
              <div style={{display: "flex", flexDirection: "column",marginLeft:"20px"}}>
                <div style={{ display: "flex", flexDirection: "column",marginLeft:"15px"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
               <DateRange style={{marginTop:"2%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold", color:"gray", letterSpacing:"2px"}}>
                  {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                <AccessTimeIcon style={{marginTop:"3%"}} fontSize='small'/>
                <div  style={{ marginLeft:"10px", width:"max-content", fontWeight:"bold"}}>
                  {date.getHours()}:{date.getMinutes()}</div>
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
                  
                <div style={{display:"flex", flexDirection:"row",marginTop:"40%",columnGap:"15%"}}>
                {  ride.status === "Completed"? <button className='completeride_button' disabled>Completed</button>:
             ride.status === "Cancelled"? <button className='cancelride_button' disabled>Cancelled</button>:
             ride.status === "Started"? <button className='cancelride_button' disabled>Cancelled</button>:
             <button className='startride_button_disable' disabled>Pending</button> }
            {/* <Tooltip title="View Ride Details">
            <ArrowForwardRounded fontSize="large" className='more-icon'/>
            </Tooltip> */}
            </div>
                </div>
              </CardContent>
            </Card>
            )}
            ) : <div >You haven't booked a ride yet!</div>}
   
    </div>
    )
} 
export default ViewPastBookings;