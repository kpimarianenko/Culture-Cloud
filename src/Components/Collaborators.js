import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../Styles/Collaborators.css';
import HTTP from '../http'

export default function Collaborators() {
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        HTTP.getCollaborators()
        .then(collabs => {
            const collaboratorsComponents = collabs.map(collaborator => 
                <Collaborator 
                id={collaborator._id}
                key={collaborator._id}
                avaUrl={collaborator.avaUrl || "/images/museum-placeholder.jpg"}
                name={collaborator.placeName}
                type={collaborator.type}
                about={collaborator.about} />)
            setCollaborators(collaboratorsComponents)
        })
        .catch(err => {/*@TODO ERROR*/})
    }, []);

    return (
        <div className="main">
            <div>
                <form className="filters">
                    <h2>Filters</h2>
                    <div className="filters__section">
                        <h3 className="filters__section__header">Type</h3>
                        <div className="filters__inputs">
                            <label className="checkbox__container">
                                <input type="checkbox" name="" id="ch1"/>Museum
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox__container">
                                <input type="checkbox" name="" id="ch2"/>Gallery
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox__container">Exhibition
                                <input type="checkbox" name="" id="ch3"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="filters__section">
                        <h3 className="filters__section__header">Location</h3>
                        <div className="filters__inputs">
                            <label className="checkbox__container">Kyiv
                                <input type="checkbox" name="" id="ch4"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox__container">Lviv
                                <input type="checkbox" name="" id="ch5"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox__container">Odessa
                                <input type="checkbox" name="" id="ch6"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox__container">Kharkiv
                                <input type="checkbox" name="" id="ch7"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-classic" type="submit">Apply filters</button>
                </form>
            </div>


            <CollaboratorsList collaborators={collaborators} />
        </div>
    )
}

function Collaborator(props) {
    const { avaUrl, name, type, about, id } = props;
    return (<div className="collaborator">
    <img className="collaborator__ava" src={avaUrl} alt=""/>
    <div className="collaborator__info">
        <div className="collaborator_text">
            <h3 className="collaborator__name">{name}</h3>
            <h4 className="collaborator__type">{type}</h4>
            <p className="collaborator__about">{about}</p>
        </div>
        <div className="button__outer">
            <Link to={`/collaborators/${id}`}><button className="btn btn-classic">Visit</button></Link>
        </div>
    </div>
</div>)
}

function CollaboratorsList(props) {
    const { collaborators } = props;
    return(
        <div className="collaborators">
            {collaborators}
        </div>
    )
}