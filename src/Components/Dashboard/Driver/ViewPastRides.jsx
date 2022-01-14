import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRides } from '../../../redux/Thunks/DriverThunk';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { List, ListItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapSection from '../../Common/Map'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import DateRange from '@mui/icons-material/DateRange';


const ViewPastRides = () =>{

    const dispatch = useDispatch();

    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
    
    const rides = useSelector((state)=>state.driver.rides)
    let pastRides = []
    console.log("RIDES",rides)

    useEffect(() => { 
        dispatch(getRides())

    },[]);

    if(!rides){
        return <Loader/>
    }
    else{
      pastRides =  rides.filter(function(ride) {
        return new Date(ride.when) < new Date();
      });
      console.log("Past",pastRides.length)
    }

    return(
        <div className='view-ride-box'>
            <h1>Past Rides</h1>
            {pastRides.length > 0 ?
            pastRides.map((ride) =>
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
                <div style={{display:"flex", flexDirection:"row",marginTop:"28%",columnGap:"2%"}}>
          {  ride.status === "Completed"? <button className='completeride_button' disabled>Completed</button>:
             ride.status === "Cancelled"? <button className='cancelride_button' disabled>Cancelled</button>:
             <button className='startride_button_disable' disabled>Pending</button> }
            </div>
                </div>
                </CardContent>
              </Card>
              
                )}
             )
             :<div >No Past Rides </div>}
    </div>
    )
} 
export default ViewPastRides;