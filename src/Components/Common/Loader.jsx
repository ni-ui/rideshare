import React from 'react';
import logo from '../../assets/logo.png'
import Loaderr from 'react-loader-spinner';

const Loader = () =>{
    return(
        <div className='loader'>
        <img width = '50px' src={logo}/>
        <Loaderr type="ThreeDots" color="#D2E8F4" height={80} width={80}/>
        <p>Loading</p>
        </div>
        
    )
} 
export default Loader;