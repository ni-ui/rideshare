import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookings } from '../../../redux/Thunks/RiderThunk';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { List, ListItem, ListItemText } from '@mui/material';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ViewBookings = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
    

    const bookings = useSelector((state)=>state.rider.bookings)
    let activeRides = []

    useEffect(() => { 
        dispatch(getBookings())
        // console.log("YO",rides)

    },[]);

    if(!bookings){
        return <Loader/>
    }

    return(
        <div className='view-ride-box'>
            <h1>Booked Rides</h1>
            {bookings.length > 0 ? 
            bookings.map((ride) =>
            {
              let date = new Date(ride.ride.when);
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
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}> {ride.ride.from}</div>
                  
                </ListItem>
                <div style={{borderLeft:'2px dotted grey',height:'20px',marginLeft:'1.4em'}}></div>
                <ListItem>
                    < CircleIcon/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}>{ride.ride.to} </div> 
                </ListItem>
                </List>
                </div>
                <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end",marginLeft:"70px",marginTop:"-10px"}}>
                <div style={{height:"50%" , paddingLeft: "10px", fontSize:"40px"}}>
                     {ride.ride.fare} PKR
                </div>
                <div style={{marginTop:"35px"}}>
                  <AccountCircleIcon fontSize='large'/>   {ride.driver.name}
                </div>
                </div>
              </CardContent>
            </Card>
            )}
            ) : <div >You haven't booked a ride yet!</div>}
   
    </div>
    )
} 
export default ViewBookings;