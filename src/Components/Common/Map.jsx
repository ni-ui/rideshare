import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

const Map = ({ location, zoomLevel }) => (

        <GoogleMapReact
          bootstrapURLKeys={{ 
          key: "AIzaSyBm13tDUmjrMlOIouKnd4Z5XZAs7X03GP0",
          language: "en",
          region: "Pakistan" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
         
        </GoogleMapReact>

  )

  export default Map;