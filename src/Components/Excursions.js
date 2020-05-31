import React, { useState, useEffect } from 'react'
import Filters, { FilterSection } from "./Filters"
import Error from './Error'
import ModalWindow from './ModalWindow'
import { Pagination, Loader, FormSection, Entity, NothingFound } from "./Utilities"
import HTTP from '../http';
import FormValidator from '../validator'

export default function Excursions() {
    const [excursions, setExcursions] = useState()
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [modal, setModal] = useState(false);
    const [buyExcursion, setBuyExcursion] = useState()
    const [formErrors, setFormErrors] = useState({})

    const validator = new FormValidator()
    const validate = validator.setOptions({
        fields: {
            firstName: {
                required: true,
                maxlen: 64,
            },
            lastName: {
                required: true,
                maxlen: 64,
            },
            cardNumber: {
                length: 16,
                required: true,
                int: true,
            },
            expDate: {
                cardExpDate: true,
                required: true,
            },
            cvv: {
                required: true,
                int: true,
                length: 3,
            }
        }
    })

    const handleInput = function(){
        const response = validate();
        setFormErrors(response.error)
        return response.formValid;
    }

    const getExcursions = response => {
        if (response.status !== 200) {
            setErrorCode(response.status)
            setErrorMessage(response.data.message)
        }
        setExcursions(response.data.excursions)
        setMaxPage(response.data.maxPage)
    }

    useEffect(() => {
        setExcursions(null)
        HTTP.getExcursions()
        .then(getExcursions)
        .catch(() => setErrorCode(500))
    }, [])

    useEffect(() => { 
        setExcursions(null)
        if(!isFirstLoad)
        HTTP.getFilteredExcursions(page, 'filters')
        .then(getExcursions)
        .catch(() => setErrorCode(500))
        setIsFirstLoad(false)
        // eslint-disable-next-line
    }, [page])

    const onPrev = () => {
        setPage(page - 1)
    }

    const onNext = () => {
        setPage(page + 1)
    }

    const filterSubmitHandler = (e) => {
        e.preventDefault()
        setExcursions(null)
        HTTP.getFilteredExcursions(page, 'filters')
        .then(getExcursions)
        .catch(() => setErrorCode(500))
        setPage(1)
    }

    const buyTicket = (e) => {
        e.preventDefault();
        if (handleInput()) {
            setModal(false)
            setFormErrors({})
        }
    }

    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return (
        <div className="main">
            <div>
                <Filters onSubmit={filterSubmitHandler} id="filters" >
                    <FormSection title="Search" placeholder="Enter name of excursion" name="search" />
                    <FilterSection title="Price">
                        <FormSection title="From" placeholder="From" name="from" />
                        <FormSection title="To" placeholder="To" name="to" />
                    </FilterSection>
                </Filters>
            </div>
            {excursions ? <ExcursionsList setBuyExcursion={setBuyExcursion} setModal={setModal} excursions={excursions}>
                <div>
                    <NothingFound values={excursions} />
                    <Pagination page={page} maxPage={maxPage} onPrev={onPrev} onNext={onNext} />
                </div>
                {buyExcursion ? <ModalWindow 
                    onCancel={() => {setFormErrors({}); setModal(false)}} 
                    display={modal}
                    header={`Buy ticket on ${buyExcursion.name}`}
                    form="buy-excursion"
                    acceptButtonText={`Buy for ${buyExcursion.price}$`}>
                      <form id="buy-excursion" encType="multipart/form-data" className="form" onSubmit={buyTicket} >
                          <FormSection message={formErrors.firstName} onChange={handleInput} title="First name" placeholder="Enter first name" name="firstName" />
                          <FormSection message={formErrors.lastName} onChange={handleInput} title="Last name" placeholder="Enter last name" name="lastName" />
                          <FormSection message={formErrors.cardNumber} onChange={handleInput} title="Card number" placeholder="Enter card number" name="cardNumber" />
                          <FormSection message={formErrors.cvv} onChange={handleInput} title="Security code (CVV)" placeholder="Enter CVV" name="cvv" />
                          <FormSection message={formErrors.expDate} onChange={handleInput} title="Expiration date" placeholder="Enter expiration date" name="expDate" />
                      </form>
                </ModalWindow> : null}
            </ExcursionsList> : <Loader display />}
        </div>
    )
}

function ExcursionsList(props) {
    const { excursions, setModal, setBuyExcursion, children } = props;
    const [excursionsComponents, setExcursionsComponents] = useState()

    const mapExcursions = (excurs) => {
        return excurs.map(excursion => 
            <Entity 
            id={excursion._id}
            onClick={() => {setBuyExcursion(excursion); setModal(true)}}
            adds={`Price: ${excursion.price.toFixed(2)}$`}
            buttonText="Buy ticket"
            key={excursion._id}
            avaUrl={excursion.avaUrl}
            title={excursion.name}
            subtitle={excursion.place.placeName}
            about={excursion.about} />)
    }

    useEffect(() => {
        setExcursionsComponents(mapExcursions(excursions))
        // eslint-disable-next-line
    }, [excursions])

    return (
        <div className="entities">
            {excursionsComponents}
            {children}
        </div>
    )
}