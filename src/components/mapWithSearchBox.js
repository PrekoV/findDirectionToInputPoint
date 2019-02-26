import { withGoogleMap, GoogleMap, DirectionsRenderer, withScriptjs } from 'react-google-maps';
import React from 'react';
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
const { compose, withProps, lifecycle } = require("recompose");

const location = "вулиця Шкільна, 56, Запоріжжя, Запорізька область, 69000"

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR5dtYn2uoLVh_Mvz7kjBlmCXtM9UoItg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const refs = {}
            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const DirectionsService = new window.google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: location,
                        destination: document.getElementById("end").value,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                    this.setState({
                        places,
                    });
                },
            })
        },
    }),
)(props =>
    <div>
        <div data-standalone-searchbox="">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    id="end"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </StandaloneSearchBox>
        </div>
        <GoogleMap
            defaultCenter={{ lat: 47.81825537, lng: 35.16810107, }}
            defaultZoom={13}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    </div>
);

export default PlacesWithStandaloneSearchBox;