import React, { useState, useEffect } from 'react'
import { Pagination, Loader, FormSection, Entity, NothingFound } from "./Utilities"
import Error from "./Error"
import Filters, { FilterSection } from "./Filters"
import '../Styles/Collaborators.css';
import HTTP from '../http'

export default function Collaborators() {
    const [collaborators, setCollaborators] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [filter, setFilters] = useState();
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const getCollaborators = (collaborators) => {
        if (collaborators.status !== 200) {
            setErrorCode(collaborators.status);
            setErrorMessage(collaborators.data.message);
        }
        setMaxPage(collaborators.data.maxPage);
        setCollaborators(collaborators.data.collaborators);
    }

    useEffect(() => {
        setCollaborators(null)
        Promise.all([HTTP.getCollaboratorsFilters(), HTTP.getCollaborators()])
        .then(response => {
            if (response[1].status !== 200) {
                setErrorCode(response[1].status)
                setErrorMessage(response[1].data.message)
            }
            setFilters(response[0].data)
            setMaxPage(response[1].data.maxPage);
            setCollaborators(response[1].data.collaborators);
        })
        .catch(() => setErrorCode(500))
    }, []);

    useEffect(() => {
        setCollaborators(null)
        if(!isFirstLoad)
        HTTP.getFilteredCollaborators(page, 'filters')
        .then(getCollaborators)
        .catch(() => setErrorCode(500))
        setIsFirstLoad(false)
        // eslint-disable-next-line
    }, [page]);

    const onPrev = () => {
        setPage(page - 1)
    }

    const onNext = () => {
        setPage(page + 1)
    }

    const filterSubmitHandler = (e) => {
        e.preventDefault()
        setCollaborators(null)
        HTTP.getFilteredCollaborators(page, 'filters')
        .then(getCollaborators)
        .catch(() => setErrorCode(500))
        setPage(1)
    }

    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return (
        <div className="main">
            <div>
                {filter ? <Filters onSubmit={filterSubmitHandler} id="filters" >
                    <FilterSection defaultChecked name="type" values={filter.types} title="Type" />
                    <FilterSection defaultChecked name="city" values={filter.cities} title="Location" />
                    <FormSection title="Search" placeholder="Enter name of institution" name="search" />
                </Filters> : <Loader display />}
            </div>
            {collaborators ? <CollaboratorsList collaborators={collaborators}>
                <div>
                    <NothingFound values={collaborators} />
                    <Pagination page={page} maxPage={maxPage} onPrev={onPrev} onNext={onNext} />
                </div>
            </CollaboratorsList> : <Loader display />}
        </div>
    ) 
}

function CollaboratorsList(props) {
    const { collaborators, children } = props;
    const [collaboratorsComponents, setCollaboratorsComponents] = useState()

    const mapCollaborators = (collabs) => {
        return collabs.map(collaborator => 
            <Entity 
            to={`/collaborators/${collaborator._id}`}
            key={collaborator._id}
            avaUrl={collaborator.avaUrl}
            title={collaborator.placeName}
            subtitle={collaborator.type}
            about={collaborator.about} />)
    }

    useEffect(() => {
        setCollaboratorsComponents(mapCollaborators(collaborators))
    }, [collaborators])

    return (
        <div className="entities">
            {collaboratorsComponents}
            {children}
        </div>
    )
}