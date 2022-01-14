import { Card, CardContent, List, ListItem, Tooltip } from '@mui/material';
import React, { useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getRides, getBookings } from '../../../redux/Thunks/RiderThunk';
import Loader from '../../Common/Loader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import { bookRide } from '../../../redux/Thunks/RiderThunk';
import { toast } from 'react-toastify';
import { useState } from 'react';
import DateRange from '@mui/icons-material/DateRange';
import { ArrowForwardRounded } from '@mui/icons-material';

const BookRide = () =>{

    const dispatch = useDispatch();
   
    const location = {
      lat: 37.42216,
      lng: -122.08427,
    } 

    const [isBooked, setIsBooked] = useState(false);

    const rides = useSelector((state)=>state.rider.rides)
    const bookings = useSelector((state)=>state.rider.bookings)
       
    const onBook = (id) =>{
        const payload = {ride:id}
        dispatch(bookRide(payload)).then(value=>{
            if(value.payload && value.payload.status === 200){
              toast("Ride booked succesfully!");
              window.location.reload();
              
            }     
            if(value.error){
              toast.error(value.payload);
            }})
    }
   
    useEffect(() => { 
        dispatch(getRides())
        dispatch(getBookings())

    },[]);

    if(!rides){
        return <Loader/>
    }

    return(
        <div className='view-ride-box'>
        <h1>Available Rides</h1>
        {
        rides.filter(function (ride) {  
          // for (let i = 0; i < bookings.length; i += 1) {
          //     if(bookings[i].ride._id === ride._id){
          //       console.log("HERE")
          //       setIsBooked(true);            
          //     }
          //     else{
          //       setIsBooked(false)
          //     }}
          return ride.capacity !== 0 && new Date(ride.when) >= new Date()
      }).map((ride) =>
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

            <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end", marginLeft:"auto",marginRight:"20px"}}>
                <div style={{ paddingLeft: "10px", fontSize:"35px"}}>
                       {ride.fare} PKR
                  </div>
                  <div style={{marginTop:"5%"}}>
                    <AccountCircleIcon/>   {ride.capacity}
                  </div>
                  
                <div style={{display:"flex", flexDirection:"row",marginTop:"16%",columnGap:"15%"}}>
                <button className='bookride_button' onClick={() => onBook(ride._id)}>Book</button>

                <Tooltip title="View Ride Details">
            <ArrowForwardRounded fontSize="large" className='more-icon'/>
            </Tooltip>
            </div>

            </div>
          </CardContent>
        </Card>
        )}
        )}
</div>
    )
} 
export default BookRide;