import React, { useEffect, useContext, useState } from 'react'
import HTTP from '../http'
import '../Styles/Collaborator.css';
import { Pagination, FormSection, Loader } from './Utilities';
import ModalWindow from './ModalWindow';
import { Context } from '../context'
import FormValidator from '../validator';
import { Link } from 'react-router-dom';
import Error from './Error';

export default function Collaborator(props) {
    const { user } = useContext(Context)
    const { id } = props.match.params;

    const [formErrors, setFormErrors] = useState({})
    const [modal, setModal] = useState(false)
    const [collaborator, setCollaborator] = useState()
    const [excursions, setExcursions] = useState()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    const quantity = 10;

    const validate = FormValidator.setOptions({
        fields: {
          name: {
            max: 64,
            required: true,
          },
          price: {
            required: true,
            float: true,
            max: 6
          },
          about: {
            required: true,
            min: 20,
            max: 500
          }
        },
        errors: {
          name: {
            max: 'Name is too long',
            required: 'Name cannot be empty'
          },
          price: {
            required: 'Price cannot be empty',
            float: 'Price is a float number',
            max: 'Price is too big'
          },
          about: {
            required: 'Infromation cannot be empty'
          }
        }
    })

    const handleInput = function(){
        const response = validate();
        setFormErrors(response.error)
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
        })
        .catch(() => setErrorCode(500))
    }, [id])

    useEffect(() => {
        if (!excursions) return;
        const maxPage = Math.ceil(excursions.length / quantity) || 1
        setMaxPage(maxPage)
    }, [excursions])

    const prev = () => {
        setPage(page - 1)
    }

    const next = () => {
        setPage(page + 1)
    }

    const addExcursion = (e) => {
        setExcursions(null)
        e.preventDefault(); 
        if (handleInput()) {
            setModal(false);
            HTTP.addExcursion('add-excursion')
            .then(() => {
                return HTTP.getCollaboratorsExcursions(id)
            })
            .then(response => {
                if (response.status)
                    setErrorCode(response.status)
                setExcursions(excursions.data)
            })
            .catch(() => setErrorCode(500))
        }
    }
    
    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return collaborator ? (
        <div className="card collaborator-page">
            <div className="info">
                <div className="photo">
                    <div className="ava-wrapper">
                        <img className="card ava" src={collaborator.avaUrl || "/images/museum-placeholder.jpg"} alt=""/>
                    </div>
                    <Link className="gallery-link" to={`/collaborators/gallery/${id}`}>Gallery</Link>
                </div>
                <div className="details">
                    <h2 className="name">{collaborator.placeName}</h2>
                    <h3 className="type">{collaborator.type}</h3>
                    <div className="line"></div>
                    <p className="about">{collaborator.about}</p>
                </div>
            </div>
            <Excursions excursions={excursions ? excursions.slice(quantity * (page - 1), quantity * (page - 1) + quantity) : excursions}/>
            {user && user._id === id ? <AddExcursion onClick={() => {setModal(true)}} /> : null}
            <Pagination onPrev={prev} onNext={next} page={page} maxPage={maxPage} />
            <ModalWindow 
              onCancel={() => {setModal(false)}} 
              display={modal}
              header="Add a new excursion"
              form="add-excursion"
              acceptButtonText="Add">
                <form id="add-excursion" encType="multipart/form-data" className="form" onSubmit={addExcursion}>
                    <FormSection message={formErrors.name} onChange={handleInput} title="Name" placeholder="Enter name" name="name" />
                    <FormSection message={formErrors.price} onChange={handleInput} title="Price" placeholder="Enter price" name="price" />
                    <FormSection message={formErrors.about} onChange={handleInput} title="About" placeholder="Enter information about excursion" name="about" textarea />
                    <FormSection name="place" type="hidden" value={id}/>
                    <FormSection onChange={handleInput} title="Choose photo (optional)" name="avatar" type="file" />
                </form>
            </ModalWindow>
        </div>
    ) : <div className="loader"></div>
}

function AddExcursion(props) {
    const { ...attrs } = props;
    return ( <div {...attrs} className="btn-add_excursion">Додати екскурсію</div> )
}

function Excursions(props) {
    const { excursions } = props;
    const [excursionsElement, setExcursionsElement] = useState(null)

    useEffect(() => {
        if (excursions) {
            const excursionsArray = excursions.map(element => (<Excursion key={element._id} excursion={element} />))
            setExcursionsElement(excursionsArray)
        }
    }, [excursions])

    return excursions ? (
    <div className="excursions-wrapper">
        <h2>Excursions</h2>
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
    </div> ) : <Loader />
}

function Excursion(props) {
    const { excursion } = props;
    return (
        <tr className="excursion">
            <td className="name">{excursion.name}</td>
            <td>{`${excursion.price}$`}</td>
        </tr>
    )
}

function ExcursionsError() {
    return (<div className="excursion message">
        Нажаль цей заклад поки не додав екскурсій
    </div>)
}