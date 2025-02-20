import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow , Marker} from "@react-google-maps/api";
const mapContainerStyle = { width: '300px', height: '200px' }; // Adjust size as needed

export function Map({ coordinates }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAC4b-WvuqiboL4puMddI_IDYmi6IH6ZMQ" 
    });

    const options = {
        streetViewControl: false, 
        mapTypeControl: false,
        scaleControl: true,
        rotateControl: true,
        fullscreenControl: true,
      };



    if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coordinates}
            zoom={10}
            options={options}
        >
            <Marker position={coordinates}/>
        </GoogleMap>
    ) : <></>;
}