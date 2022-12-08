import React, {useState} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../styles/sidebar.css'
import  { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddCircleOutlined,ArrowBackRounded,ArrowForwardRounded,DirectionsCarRounded, HistoryRounded, ListAltRounded } from '@mui/icons-material';

const Sidebar = () =>{

const navigate = useNavigate()
const [menuCollapse, setMenuCollapse] = useState(false)
const [toggled, setToggled] = useState(false);

const menuIconClick = () => {
  //condition checking to change state from true to false and vice versa
  menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

const userType = useSelector((state)=>state.app.user.userType)

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
        <ProSidebar collapsed={menuCollapse} toggled={toggled} onToggle={handleToggleSidebar} breakPoint='xs'>
        <SidebarHeader>
  
        <div className="closemenu" onClick={menuIconClick}>
        {/* changing menu collapse icon on click */}
        {menuCollapse ? (
        <ArrowForwardRounded className='more-icon-sidebar'/>
        ) : (
        <ArrowBackRounded className='more-icon-sidebar'/>
        )}
        </div>
        </SidebarHeader>
        {
          userType === "Driver"?
          <Menu  >
          <MenuItem icon = {<AddCircleOutlined />} onClick = {createRide}> Create a Ride</MenuItem>
          <SubMenu icon ={<ListAltRounded/>} title= "View My Rides" >
            <MenuItem icon ={<DirectionsCarRounded/>} onClick = {viewActiveRides}>Active Rides</MenuItem>
            <MenuItem icon ={<HistoryRounded/>}onClick = {viewPastRides}>Past Rides</MenuItem>
          </SubMenu>
        </Menu> : 
         <Menu>
         <MenuItem icon = {<AddCircleOutlined />} onClick = {bookRide}>Book a Ride</MenuItem>  
         <SubMenu icon ={<ListAltRounded/>} title="View Bookings" >
            <MenuItem icon ={<DirectionsCarRounded/>} onClick = {viewActiveBookings}>Active Bookings</MenuItem>
            <MenuItem icon ={<HistoryRounded/>} onClick = {viewPastBookings}>Past Bookings</MenuItem>
          </SubMenu> 
       </Menu>
        } 
       
</ProSidebar>
</div>
    )
} 
export default Sidebar;




