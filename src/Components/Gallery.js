import React, { useState, useEffect } from 'react'
import '../Styles/Gallery.css'
import { Loader } from './Utilities';
import HTTP from '../http';

export default function Gallery(props) {
    const { id } = props.match.params;
    const [collaborator, setCollaborator] = useState(null)

    useEffect(() => {
        HTTP.getCollaborator(id)
        .then(user => {
            setCollaborator(user)
        })
        .catch(err => {/*@TODO ERROR*/})
    }, [])

    return collaborator ? (
        <div className="card gallery-wrapper">
            <div className="header">
                <h3>Photogallery of the {collaborator.placeName}</h3>
                <div className="line"></div>
            </div>
            <div className="gallery">
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://res.cloudinary.com/skybox/raw/upload/v1588872207/j2cxyeagu7oxwgdc1het" alt=""/>
                <img className="gallery-image" src="http://res.cloudinary.com/skybox/raw/upload/v1588872207/j2cxyeagu7oxwgdc1het" alt=""/>
                <img className="gallery-image" src="http://res.cloudinary.com/skybox/raw/upload/v1588872207/j2cxyeagu7oxwgdc1het" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
                <img className="gallery-image" src="http://localhost:3000/images/user-profile-ava.png" alt=""/>
            </div>
            <p className="link">Load more</p>
        </div>
    ) : <Loader display />
}
