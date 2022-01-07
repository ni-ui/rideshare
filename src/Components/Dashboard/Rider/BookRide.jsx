import { Button, Card, CardContent, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getRides } from '../../../redux/Thunks/RiderThunk';
import Loader from '../../Common/Loader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import { bookRide } from '../../../redux/Thunks/RiderThunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookRide = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    } 

    const rides = useSelector((state)=>state.rider.rides)
    // const notify = () => toast("Ride booked succesfully!");
    
    const onBook = (id) =>{
        const payload = {ride:id}
         
        dispatch(bookRide(payload)).then(value=>{
           const response = value.payload
            if(value.payload && value.payload.status == 200){
              toast("Ride booked succesfully!", {
                toastId: 'success1',
            });
              
            }     
            if(value.error){
              toast.error("Something went wrong", {
                toastId: 'error3',
            });
            }})
    }
   
    useEffect(() => { 
        dispatch(getRides())
    },[]);

    if(!rides){
        return <Loader/>
    }

    return(
        <div className='view-ride-box'>
        <h1>Available Rides</h1>
        {
        rides.filter(function (ride) {
          return ride.capacity != 0;
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
            <div style={{ display: "flex", flexDirection: "row",marginLeft:"15px"}}>
              <AccessTimeIcon/>  
              <div  style={{ marginLeft:"10px"}}>{date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
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
            <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end",marginLeft:"70px",marginTop:"-10px"}}>
            <div style={{height:"50%" , paddingLeft: "10px", fontSize:"40px"}}>
                 {ride.fare} PKR
            </div>
            <div style={{display:"flex", flexDirection:"row",marginTop:"30px"}}>
            <div style={{marginRight:"35px"}}>
              <AccountCircleIcon/>   {ride.capacity}
            </div>
            <Button onClick={() => onBook(ride._id)} variant="outlined">Book</Button>
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