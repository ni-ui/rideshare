import { AccessTime, ArrowForwardRounded } from '@mui/icons-material';
import Circle from '@mui/icons-material/Circle';
import DateRange from '@mui/icons-material/DateRange';
import TripOrigin from '@mui/icons-material/TripOrigin';
import { Card, CardContent, List, ListItem, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import illustration from "../../assets/illustration.jpg"
import { getMyRides } from '../../redux/Thunks/RiderThunk';
import Loader from '../Common/Loader';
import MapSection from '../Common/Map'

const RiderLandingPage = () =>{

    const dispatch = useDispatch();

    const location= {
        lat: 24.935101549207285,
        lng:67.06534204041614
    }

    const bookings = useSelector((state)=>state.rider.myrides)

    let upComingRides = []

   useEffect(() => { 
        dispatch(getMyRides()).then(value=>{
                if(value.payload && value.payload.status === 200){
                 console.log("SUUCEESS")
                  
                }     
                if(value.error){
                  console.log(value.payload)
                }})
        // console.log("YO",rides)

    },[]);

    if(!bookings){
        return <Loader/>
    }
    else{
       if(bookings.length > 0)
        {
            //returns upcoming ride with status pending
            const upComingRideDate = new Date(Math.min.apply(null, 
            bookings.filter(ride => new Date(ride.when) >= new Date() && ride.status === "Pending").map(ride => {
            return new Date(ride.when);
          })));
         upComingRides =  bookings.filter(ride => new Date(ride.when).getTime() === upComingRideDate.getTime() )}
    }

    return(
        
        <div>
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
                  <div style={{display: "flex", flexDirection:"column", alignItems:"flex-end", marginLeft:"auto",marginRight:"20px"}}>
                <div style={{ paddingLeft: "10px", fontSize:"xx-large"}}>
                       {ride.fare} PKR
                  </div>
                <div style={{display:"flex", flexDirection:"row",marginTop:"40%",columnGap:"15%"}}>
          {  ride.status === "Cancelled"? <button className='cancelride_button_disable' disabled>Cancelled</button>:
             <button className='cancelride_button'>Cancel</button> }

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

        </div>
    )
} 
export default RiderLandingPage;