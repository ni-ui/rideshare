import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../styles/sidebar.css'
import CreateRide from './Driver/CreateRide';
import  { useNavigate } from 'react-router-dom';

const Sidebar = () =>{

const navigate = useNavigate()

const createRide = event => {
  event.preventDefault()
  navigate("/dashboard/driver/create")

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
        <Menu iconShape="square">
          <MenuItem onClick = {createRide}>Create a Ride</MenuItem>
          <SubMenu title="View My Rides" >
            <MenuItem onClick = {viewActiveRides}>Active Rides</MenuItem>
            <MenuItem onClick = {viewPastRides}>Past Rides</MenuItem>
          </SubMenu>
        </Menu>
</ProSidebar>
</div>
    )
} 
export default Sidebar;



