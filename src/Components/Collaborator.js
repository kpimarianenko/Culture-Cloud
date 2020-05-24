import React, { useEffect, useContext } from 'react'
import HTTP from '../http'
import { useState } from 'react';
import '../Styles/Collaborator.css';
import { Pagination, FormSection } from './Utilities';
import ModalWindow from './ModalWindow';
import { Context } from '../context'
import FormValidator from '../validator';
import { Link } from 'react-router-dom';

export default function Collaborator(props) {
    const { user } = useContext(Context)
    const { id } = props.match.params;

    const [formErrors, setFormErrors] = useState({})
    const [modal, setModal] = useState(false)
    const [collaborator, setCollaborator] = useState()

    const validate = FormValidator.setOptions({
        fields: {
          name: {
            max: 64,
            required: true,
          },
          price: {
            required: true,
            float: true,
            max: 5
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
        HTTP.getCollaborator(id)
        .then(collab => {
            setCollaborator(collab)
        })
        .catch(err => {/*@TODO ERROR*/})
    }, [])

    const addExcursion = (e) => {
        e.preventDefault(); 
        if (handleInput()) {
            setModal(false);
            HTTP.addExcursion('add-excursion')
            .then(x => {
                console.log(x)
            })
        }
    }
    
    return collaborator ? (
        <div className="card collaborator-page">
            <div className="info">
                <div className="photo">
                    <img className="card ava" src={collaborator.avaUrl || "/images/museum-placeholder.jpg"} alt=""/>
                    <Link className="gallery-link" to={`/collaborators/gallery/${id}`}>Gallery</Link>
                </div>
                <div className="details">
                    <h2 className="name">{collaborator.placeName}</h2>
                    <h3 className="type">{collaborator.type}</h3>
                    <div className="line"></div>
                    <p className="about">{collaborator.about}</p>
                </div>
            </div>
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
                        <tr className="excursion">
                            <td className="name">Картины витька</td>
                            <td>Пивас</td>
                        </tr>
                        <tr className="excursion">
                            <td className="name">Скульптуры петра</td>
                            <td>Чекушка</td>
                        </tr>
                        <tr className="excursion">
                            <td className="name">Выставка васи</td>
                            <td>Закусон</td>
                        </tr>
                    </tbody>
                </table>
                {user && user._id === id ? <AddExcursion onClick={() => {setModal(true)}} /> : null}
                <Pagination page={1} />
            </div>
            <ModalWindow 
              onCancel={() => {setModal(false)}} 
              onAccept={() => {setModal(false)}} 
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