import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../styles/sidebar.css'
import  { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Sidebar = () =>{

const navigate = useNavigate()

const userType = useSelector((state)=>state.app.user.userType)
console.log("usertype",userType)
const createRide = event => {
  event.preventDefault()
  navigate("/dashboard/driver/create")

}

const bookRide = event =>{
  event.preventDefault()
  navigate("/dashboard/rider/book")
}

const viewActiveBookings= event => {
  event.preventDefault()
  navigate("/dashboard/rider/viewactivebookings")

}

const viewPastBookings= event => {
  event.preventDefault()
  navigate("/dashboard/rider/viewpastbookings")

}

const viewActiveRides= event => {
  event.preventDefault()
  navigate("/dashboard/driver/viewactive")

}

const viewPastRides= event => {
  event.preventDefault()
  navigate("/dashboard/driver/viewpast")

}


    return(
        <div id="header">
        <ProSidebar>
        {
          userType === "Driver"?
          <Menu iconShape="square">
          <MenuItem onClick = {createRide}>Create a Ride</MenuItem>
          <SubMenu title="View My Rides" >
            <MenuItem onClick = {viewActiveRides}>Active Rides</MenuItem>
            <MenuItem onClick = {viewPastRides}>Past Rides</MenuItem>
          </SubMenu>
        </Menu> : 
         <Menu iconShape="square">
         <MenuItem onClick = {bookRide}>Book a Ride</MenuItem>  
         <SubMenu title="View Bookings" >
            <MenuItem onClick = {viewActiveBookings}>Active Rides</MenuItem>
            <MenuItem onClick = {viewPastBookings}>Past Rides</MenuItem>
          </SubMenu> 
         {/* <MenuItem onClick = {viewBookings}>View Bookings</MenuItem> */}
       </Menu>
        } 
       
</ProSidebar>
</div>
    )
} 
export default Sidebar;



