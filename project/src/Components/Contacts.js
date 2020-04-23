import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import '../Styles/Contacts.css';

function Map() {
    return (
        <GoogleMap defaultCenter={{lat: 50.447522, lng: 30.456629}} defaultZoom={17}>
            <Marker position={{lat: 50.447522, lng: 30.456629}} />
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

class Contacts extends Component {
    render() {
        return (
            <div className="contacts">
                <div className="contacts__wrapper">
                    <h2 className="contact__header">Culture Cloud</h2>
                    <div className="logo">
                        <img src="/images/logo-black.png" alt="logo_bull"/>
                    </div>
                    <div className="social__networks">
                        <div className="network">
                            <div className="network__logo__outer">
                                <img src="/images/gmail.png" alt="mail" className="network__logo" />
                            </div>
                            <h3 className="network__name">Email</h3>
                            <p className="network__info">culture.cloud@gmail.com</p>
                        </div>
                        <div className="network">
                            <div className="network__logo__outer">
                                <img src="/images/phone.png" alt="phone" className="network__logo" />
                            </div>
                            <h3 className="network__name">Phone</h3>
                            <p className="network__info">+38(050)4442334</p>
                        </div>
                        <div className="network">
                            <div className="network__logo__outer">
                                <img src="/images/twitter.png" alt="twitter" className="network__logo" />
                            </div>
                            <h3 className="network__name">Twitter</h3>
                            <a href="https://twitter.com"><p className="network__info">Follow us</p></a>
                        </div>
                        <div className="network">
                            <div className="network__logo__outer">
                                <img src="/images/skype.png" alt="skype" className="network__logo" />
                            </div>
                            <h3 className="network__name">Skype</h3>
                            <p className="network__info">CultureCloud</p>
                        </div>
                    </div>
                </div>
                <div className="map__wrapper">
                    <h2 className="contact__header">Find us</h2>
                    <div className="map">
                        <WrappedMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCtsEasWzAcjE9Byagh0D4dw5VpcGH8bNc`}
                            loadingElement={<div className="map__element" />}
                            containerElement={<div className="map__element" />}
                            mapElement={<div className="map__element" />}
                        />
                    </div>
                    <div className="address">
                        <img src="/images/pin.png" alt="pin"/>
                        <p>Peremohy Ave, 37, Kyiv, 03056</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contacts