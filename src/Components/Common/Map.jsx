import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

const Map = ({ location, zoomLevel }) => (

        <GoogleMapReact
          bootstrapURLKeys={{ 
          key: process.env.REACT_APP_GOOGLE_MAP_API,
          language: "en",
          region: "Pakistan" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
         
        </GoogleMapReact>

  )

  export default Map;