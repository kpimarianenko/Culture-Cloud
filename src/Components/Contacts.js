import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import '../Styles/Contacts.css';
import project from '../projectInfo';
import { Logo } from './Utilities';

function Map() {
    return (
        <GoogleMap defaultCenter={{lat: 50.447522, lng: 30.456629}} defaultZoom={17}>
            <Marker position={{lat: 50.447522, lng: 30.456629}} />
        </GoogleMap>
    )
}

function SocialMedia(props) {
    const { name, value, logoUrl, url } = props;
    return (<div className="socmedia">
        <div className="socmedia__logo__outer">
            <img src={logoUrl} alt={name} className="socmedia__logo" />
        </div>
        <h3 className="socmedia__name">{name}</h3>
        <a href={url}><p className="socmedia__info">{value}</p></a>
    </div>)
}


export default function Contacts() {
    const WrappedMap = withScriptjs(withGoogleMap(Map))
    return (
    <div className="contacts">
        <div className="contacts__wrapper">
            <Logo name={project.name} url="/images/logo-black.png" />
            <div className="socmedias">
                <SocialMedia name="Email" value={project.email} logoUrl="/images/gmail.png" url={`mailto:${project.email}`} />
                <SocialMedia name="Phone" value={project.phone} logoUrl="/images/phone.png" />
                <SocialMedia name="Twitter" value="Follow us" logoUrl="/images/twitter.png" url="https://twitter.com" />
                <SocialMedia name="Skype" value={project.skype} logoUrl="/images/skype.png" url="https://skype.com" />
            </div>
        </div>
        <div className="map__wrapper">
            <h2>Find us</h2>
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
                <p>{project.address}</p>
            </div>
        </div>
    </div>)
}