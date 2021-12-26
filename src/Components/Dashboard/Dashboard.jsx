import React from 'react';
import {  Link } from "react-router-dom";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = ({Page})=>(
    <>
    <Navbar/>
    <div className='bodyLayout'>
        <Sidebar />
        <div className="bodyComponent"> 
        <Page />
        </div>
    </div>
    </>

)

export default Dashboard;