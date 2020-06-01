import React, { useEffect, useContext, useState } from 'react'
import HTTP from '../http'
import '../Styles/Collaborator.css';
import { Pagination, FormSection, Loader } from './Utilities';
import ModalWindow from './ModalWindow';
import { Context } from '../context'
import FormValidator from '../validator';
import { Profile } from './Me'
import Error from './Error';
import Filters, { FilterSection } from './Filters';

export default function Collaborator(props) {
    const { user } = useContext(Context)
    const { id } = props.match.params;

    const [modalErrors, setModalErrors] = useState({})
    const [filtersErrors, setFiltersErrors] = useState({})
    const [modal, setModal] = useState(false)
    const [collaborator, setCollaborator] = useState()
    const [excursions, setExcursions] = useState()
    const [filteredExcursions, setFilteredExcursions] = useState()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    const quantity = 10;

    const modalValidator = new FormValidator()
    const validateModal = modalValidator.setOptions({
        fields: {
          name: {
            maxlen: 64,
            required: true,
          },
          price: {
            required: true,
            price: true,
            max: 1000,
            min: 0.5
          },
          about: {
            required: true,
            minlen: 20,
            maxlen: 500
          }
        },
        errors: {
          name: {
            maxlen: 'Name is too long',
            required: 'Name cannot be empty'
          },
          price: {
            required: 'Price cannot be empty',
            float: 'Price is a float number',
            maxlen: 'Price is too big'
          },
          about: {
            required: 'Information cannot be empty'
          }
        }
    })

    const handleInput = function(){
        const response = validateModal();
        setModalErrors(response.error)
        return response.formValid;
    }

    const filtersValidator = new FormValidator()
    const validateFilters = filtersValidator.setOptions({
        fields: {
            from: {
                lt: 'to',
                price: true
            },
            to: {
                gt: 'from',
                price: true
            }
        }
    })

    const handleFiltersInput = function(){
        const response = validateFilters();
        setFiltersErrors(response.error)
        return response.formValid;
    }

    useEffect(() => {
        setCollaborator(null)
        Promise.all([HTTP.getCollaborator(id), HTTP.getCollaboratorsExcursions(id)])
        .then(response => {
            if (response[0].status !== 200 || response[1].status !== 200) {
                setErrorCode(response[0].status || response[1].status)
                setErrorMessage(response[0].data.message || response[1].data.message)
            }
            setCollaborator(response[0].data)
            setExcursions(response[1].data)
            setFilteredExcursions(response[1].data)
        })
        .catch(() => setErrorCode(500))
    }, [id])

    useEffect(() => {
        if (!filteredExcursions) return;
        const maxPage = Math.ceil(filteredExcursions.length / quantity) || 1
        setMaxPage(maxPage)
    }, [filteredExcursions])

    const prev = () => {
        setPage(page - 1)
    }

    const next = () => {
        setPage(page + 1)
    }

    const addExcursion = (e) => {
        e.preventDefault(); 
        if (handleInput()) {
            setExcursions(null)
            setFilteredExcursions(null)
            setModal(false);
            HTTP.addExcursion('add-excursion')
            .then((response) => {
                if (response.status !== 200)
                    setErrorCode(response.status)
                return HTTP.getCollaboratorsExcursions(id)
            })
            .then(response => {
                if (response.status !== 200)
                    setErrorCode(response.status)
                setExcursions(response.data)
                setFilters();
            })
            .catch(() => setErrorCode(500))
        }
    }

    const applyFilters = (e) => {
        e.preventDefault()
        setFilters();
    }

    const setFilters = () => {
        if (handleFiltersInput()) {
            setFilteredExcursions(null)
            const from = document.getElementsByName('from')[0].value;
            const to = document.getElementsByName('to')[0].value;
            const search = document.getElementsByName('search')[0].value;
            const sort = document.getElementsByName('sort')[0].value;
            
            const filteredExcursions = filterExcursion(excursions, {from, to, search});
            const sortedExcursions = sortByPrice(filteredExcursions, sort)
            setFilteredExcursions(sortedExcursions)
            
            setPage(1)
        }
    }

    const sortByPrice = (excursions, by) => {
        excursions.sort(function(a, b) {
            if (by === "asc")
                return a.price - b.price;
            return b.price - a.price;
        });
        return excursions;
    }

    const filterExcursion = (excursions, filters) => {
        const { from, to, search } = filters;
        const newExcursions = [];
        excursions.forEach(element => {
            const isSearchIncludes = element.name.toLowerCase().includes(search.toLowerCase() || "");
            const isGTEFrom = from ? (element.price >= from) : true;
            const isLTETo = to ? (element.price <= to) : true;
            if (isSearchIncludes && isGTEFrom && isLTETo)
                newExcursions.push(element)
        });
        return newExcursions;
    }
    
    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return collaborator ? (
        <Profile role={collaborator.role} type={collaborator.type} userId={collaborator._id} name={collaborator.placeName} avaUrl={collaborator.avaUrl} about={collaborator.about}>
            <h2>Excursions</h2>
            <div className="excursions-outer">
                <div>
                    <Filters id="filters" onSubmit={applyFilters} >
                        <FormSection title="Search" placeholder="Enter name of excursion" name="search" />
                        <FilterSection title="Price">
                            <FormSection message={filtersErrors.from} onChange={handleFiltersInput}  title="From" placeholder="From" name="from" />
                            <FormSection message={filtersErrors.to} onChange={handleFiltersInput} title="To" placeholder="To" name="to" />
                        </FilterSection>
                        <FilterSection title="Sort">
                        <select name="sort">
                            <option value="asc">By ascending</option>
                            <option value="desc">By descending</option>
                        </select>
                        </FilterSection>
                    </Filters>
                </div>
                { filteredExcursions ? <Excursions excursions={filteredExcursions ? filteredExcursions.slice(quantity * (page - 1), quantity * (page - 1) + quantity) : filteredExcursions}>
                    {user && user._id === id ? <AddExcursion onClick={() => {setModal(true)}} /> : null}
                    <Pagination onPrev={prev} onNext={next} page={page} maxPage={maxPage} />
                </Excursions> : <Loader display />}
            </div>
            <ModalWindow 
              onCancel={() => {setModal(false)}} 
              display={modal}
              header="Add a new excursion"
              form="add-excursion"
              acceptButtonText="Add">
                <form id="add-excursion" encType="multipart/form-data" className="form" onSubmit={addExcursion}>
                    <FormSection message={modalErrors.name} onChange={handleInput} title="Name" placeholder="Enter name" name="name" />
                    <FormSection message={modalErrors.price} onChange={handleInput} title="Price" placeholder="Enter price" name="price" />
                    <FormSection message={modalErrors.about} onChange={handleInput} title="About" placeholder="Enter information about excursion" name="about" textarea />
                    <FormSection name="place" type="hidden" value={id}/>
                    <FormSection onChange={handleInput} title="Choose photo (optional)" name="avatar" type="file" />
                </form>
            </ModalWindow>
        </Profile>
    ) : <div className="loader"></div>
}

function AddExcursion(props) {
    const { ...attrs } = props;
    return ( <div {...attrs} className="btn-add_excursion">Add excursion</div> )
}

function Excursions(props) {
    const { excursions, children } = props;
    const [excursionsElement, setExcursionsElement] = useState(null)

    useEffect(() => {
        if (excursions) {
            const excursionsArray = excursions.map(element => (<Excursion key={element._id} excursion={element} />))
            setExcursionsElement(excursionsArray)
        }
    }, [excursions])

    return excursions ? (
    <div className="excursions-wrapper">
        <table className="excursions">
            <thead>
                <tr>
                    <th className="name">Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {excursionsElement}
            </tbody>
        </table>
        {excursions && excursions.length === 0 ? <ExcursionsError/> : null}
        { children }
    </div> ) : <Loader />
}

function Excursion(props) {
    const { excursion } = props;
    return (
        <tr className="excursion">
            <td className="name">{excursion.name}</td>
            <td className="price">{`${excursion.price.toFixed(2)}$`}</td>
        </tr>
    )
}

function ExcursionsError() {
    return (<div className="excursion message">No matches found</div>)
}