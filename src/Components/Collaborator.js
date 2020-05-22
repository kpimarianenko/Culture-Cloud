import React, { useEffect } from 'react'
import HTTP from '../http'
import { useState } from 'react';
import '../Styles/Collaborator.css';
import { Pagination } from './Utilities';

export default function Collaborator(props) {
    const { id } = props.match.params;

    const [collaborator, setCollaborator] = useState()
    useEffect(() => {
        HTTP.getCollaborator(id)
        .then(collab => {
            setCollaborator(collab)
        })
        .catch(err => {/*@TODO ERROR*/})
    }, [])
    
    return collaborator ? (
        <div className="card collaborator-page">
            <div className="info">
                <img className="card ava" src={collaborator.avaUrl || "/images/museum-placeholder.jpg"} alt=""/>
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
                        <th className="name">Name</th>
                        <th>Price</th>
                    </thead>
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
                </table>
                <Pagination page={1} />
            </div>
        </div>
    ) : <div className="loader"></div>
}
