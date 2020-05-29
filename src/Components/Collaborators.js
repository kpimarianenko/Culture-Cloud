import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Pagination, Loader } from "./Utilities"
import Error from "./Error"
import Filters, { FilterSection, FiltersCheckbox } from "./Filters"
import '../Styles/Collaborators.css';
import HTTP from '../http'

export default function Collaborators() {
    const [collaborators, setCollaborators] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [filter, setFilters] = useState();

    const renderCollaborators = () =>  {
        setCollaborators(null)
        Promise.all([HTTP.getCollaborators(page), HTTP.getCollaboratorsFilters()])
        .then(response => {
            console.log(response[1])
            if (response[0].status !== 200) {
                setErrorCode(response[0].status)
                setErrorMessage(response[0].data.message)
            }
            setMaxPage(response[0].data.maxPage)
            setCollaborators(response[0].data.collaborators)
            setFilters(response[1].data)
        })
        .catch(() => setErrorCode(500))
    }

    useEffect(renderCollaborators, [page]);

    const onPrev = () => {
        setPage(page - 1)
    }

    const onNext = () => {
        setPage(page + 1)
    }

    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return collaborators ? (
        <div className="main">
            <div>
                {filter ? <Filters>
                    <FilterSection name="type" values={filter.types} title="Type" />
                    <FilterSection name="city" values={filter.cities} title="Location" />
                </Filters> : <Loader display />}
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
    }, [collaborators])

    return (
        <div className="collaborators">
            {collaboratorsComponents}
            {children}
        </div>
    )
}