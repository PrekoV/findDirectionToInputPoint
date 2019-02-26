import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
export const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
        defaultCenter={{ lat: 47.81825537, lng: 35.16810107 }}
        defaultZoom={13}
    >

        <Marker
            position={{ lat: 47.81825537, lng: 35.16810107 }}
        />
    </GoogleMap>
));
