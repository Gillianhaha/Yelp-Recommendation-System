import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';


const INIT_CENTER = {
  lat: 39.9861726,
  lng: -75.1322293
};

const containerStyle = {
  width: '100%',
  height: '100%'
};


const divStyle = {
  background: `white`,
  padding: 5
};



const DisplayResultMap = ({resultList}) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBQV96gXKOydEVUKAd3cNVITET0quarKEM"
  });

  const [currentView, setCurrentView] = useState(null);

  const getCenter = (list) => {
    if (!list || list.length === 0) {
      return INIT_CENTER;
    }

    let lat = 0, lng = 0;
    list.forEach((recommendation) => {
      lat += recommendation.latitude;
      lng += recommendation.longitude
    });

    return { lat: lat / list.length, lng: lng / list.length }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={getCenter(resultList)}
      zoom={14}
    >
      {resultList && resultList.length > 0 &&
        resultList.map(
          (recommendation) => (
            <Marker
              key={recommendation.name}
              title={recommendation.name}
              clickable={true}
              onClick={()=> setCurrentView(recommendation)}
              position={{lat: recommendation.latitude, lng: recommendation.longitude}}
            />))}

      {currentView && <InfoWindow
        position={{lat:currentView.latitude, lng: currentView.longitude}}
        onCloseClick={() => setCurrentView(null)}
      >
        <div style={divStyle}>
          <strong>{currentView.name}</strong>
          <p>{"Star Rate: "}{currentView.star}</p>
        </div>
      </InfoWindow>}
    </GoogleMap>
  ) : null;
};


export default DisplayResultMap;
