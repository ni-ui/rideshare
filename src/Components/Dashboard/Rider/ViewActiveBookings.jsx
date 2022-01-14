import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../../redux/Thunks/RiderThunk';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { List, ListItem, Tooltip} from '@mui/material';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import DateRange from '@mui/icons-material/DateRange';
import { ArrowForwardRounded } from '@mui/icons-material';


const ViewActiveBookings = () =>{
    const dispatch = useDispatch();

    const location = {
      lat: 37.42216,
      lng: -122.08427,
    }
    

    const bookings = useSelector((state)=>state.rider.bookings)
    let activeBookings = [];

    const onCancel = (id) =>{

      // const payload = {ride:id}
      // dispatch(cancelRide(payload)).then(value=>{
      //     if(value.payload && value.payload.status === 200){
      //       toast("Ride cancelled succesfully!");
      //       window.location.reload();
            
      //     }     
      //     if(value.error){
      //       toast.error(value.payload);
      //     }})
  }

    useEffect(() => { 
        dispatch(getBookings())
        // console.log("YO",rides)

    },[]);

    if(!bookings){
        return <Loader/>
    }
    else{
      activeBookings =  bookings.filter(function(ride) {
          return new Date(ride.ride.when) >= new Date();
        });
        console.log("Active",activeBookings.length)

  }

    return(
        <div className='view-ride-box'>
            <h1>Active Bookings</h1>
            {activeBookings.length > 0 ? 
            activeBookings.map((ride) =>
            {
              let date = new Date(ride.ride.when);
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
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}> {ride.ride.from}</div>
                  
                </ListItem>
                <div style={{borderLeft:'2px dotted grey',height:'20px',marginLeft:'1.4em'}}></div>
                <ListItem>
                    < CircleIcon/>
                  <div style={{marginLeft:"10px", fontFamily:"Raleway"}}>{ride.ride.to} </div> 
                </ListItem>
                </List>
                </div>
                  <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end", marginLeft:"auto",marginRight:"20px"}}>
                <div style={{ paddingLeft: "10px", fontSize:"35px"}}>
                       {ride.ride.fare} PKR
                  </div>
                <div style={{display:"flex", flexDirection:"row",marginTop:"40%",columnGap:"15%"}}>
                {  ride.ride.status === "Cancelled"? <button className='cancelride_button_disable' disabled>Cancelled</button>:
                <button className='cancelride_button' onClick={onCancel(ride.ride._id)}>Cancel</button> }
                <Tooltip title="View Ride Details">
                <ArrowForwardRounded fontSize="large" className='more-icon'/>
                </Tooltip>
              </div>
              </div>
              </CardContent>
            </Card>
            )}
            ) : <div >You haven't booked a ride yet!</div>}
   
    </div>
    )
} 
export default ViewActiveBookings;