import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Pagination, Loader } from "./Utilities"
import '../Styles/Collaborators.css';
import HTTP from '../http'

export default function Collaborators() {
    const [collaborators, setCollaborators] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const renderCollaborators = () =>  {
        setCollaborators(null)
        HTTP.getCollaborators(page)
        .then(response => {
            setMaxPage(response.maxPage)
            setCollaborators(response.collaborators)
        })
        .catch(err => {/*@TODO ERROR*/})
    }

    useEffect(renderCollaborators, []);
    useEffect(renderCollaborators, [page]);

    const onPrev = () => {
        setPage(page - 1)
    }

    const onNext = () => {
        setPage(page + 1)
    }

    return collaborators ? (
        <div className="main">
            <div>
                <form className="filters card">
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

            <CollaboratorsList collaborators={collaborators}>
                <Pagination page={page} maxPage={maxPage} onPrev={onPrev} onNext={onNext} />
            </CollaboratorsList>
        </div>
    ) : <Loader display />
}

function Collaborator(props) {
    const { avaUrl, name, type, about, id } = props;
    return (<div className="collaborator card">
    <img className="collaborator__ava" src={avaUrl || "/images/museum-placeholder.jpg"} alt=""/>
    <div className="collaborator__info">
        <div className="collaborator_text">
            <h3 className="collaborator__name">{name}</h3>
            <h4 className="collaborator__type">{type}</h4>
            <p className="collaborator__about">{about}</p>
        </div>
        <div className="button__outer">
            <Link to={`/collaborators/${id}`}><button className="btn btn-white btn-classic">Visit</button></Link>
        </div>
    </div>
</div>)
}

function CollaboratorsList(props) {
    const { collaborators, children } = props;
    const [collaboratorsComponents, setCollaboratorsComponents] = useState(null)

    const mapCollaborators = (collabs) => {
        return collabs.map(collaborator => 
            <Collaborator 
            id={collaborator._id}
            key={collaborator._id}
            avaUrl={collaborator.avaUrl}
            name={collaborator.placeName}
            type={collaborator.type}
            about={collaborator.about} />)
    }

    useEffect(() => {
        setCollaboratorsComponents(mapCollaborators(collaborators))
    }, [])

    return (
        <div className="collaborators">
            {collaboratorsComponents}
            {children}
        </div>
    )
}