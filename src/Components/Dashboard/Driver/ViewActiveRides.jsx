import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRides } from '../../../redux/Thunks/DriverThunk';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Common/Loader';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ViewActiveRides = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rides = useSelector((state)=>state.driver.rides)
    let activeRides = []

    console.log("RIDES",rides)

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
    }

    return(
        <div className='view-ride-box'>
            <h1>Active Rides</h1>
            {activeRides.length ? 
            activeRides.map((ride) =>
            {
              let date = new Date(ride.when);
               <Card variant="outlined" className="ride-card" sx={{ maxWidth: 500 },{borderColor: 'primary.main' }}>
                <CardContent>
                  <div>
                    <AccessTimeIcon/> {date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                  </div>
                  <div>
                    From: {ride.from}
                  </div>
                  <div>
                    To: {ride.to}
                  </div>
                  <div>
                    <PaidIcon/>   {ride.fare} PKR
                  </div>
                  <div>
                    <AccountCircleIcon/>   {ride.capacity}
                  </div>
                </CardContent>
              </Card>
            }): <div >No Active Rides </div>}
   
    </div>
    )
} 
export default ViewActiveRides;