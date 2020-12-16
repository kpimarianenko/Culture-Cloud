import React, { useState, useEffect } from 'react'
import { Loader } from "./Utilities"
import HTTP from '../http';
import '../Styles/Demo.css'

export default function Excursions() {
    const [exhibits, setExhibits] = useState();
    const [currentExhibit, setCurrentExhibit] = useState(0);

    const getExhibits = response => {
        const exhibits = response.data.exhibits;
        setExhibits(exhibits.map((exhibit, index)=>{
            return {
                index: index,
                name: exhibit.name,
                mediaUrl: exhibit.url,
                isPicture: exhibit.isPicture,
                text: exhibit.text
            }
        }))
    }


    useEffect(() => {
        setExhibits(null)
        HTTP.getExhibits()
        .then(getExhibits)
        .catch()
    }, [])

    const getExhibit = (exhibits, index)=>{
        if(!exhibits){
            return <Loader display={true}/>
        }
        const exhibit = exhibits.find(exhibit => exhibit.index === index);
        return <div class="exhibit card">
            {exhibit.isPicture ?
            <img src={exhibit.mediaUrl} alt={exhibit.name}></img> :
            <iframe src={exhibit.mediaUrl} title={exhibit.name} allowFullScreen> </iframe>}
            <p>{exhibit.text}</p>
            
        </div>
            
    }

    const mapExhibitsButtons = (exhibits) => {
        return exhibits.map(exhibit => 
            <button onClick={()=>setCurrentExhibit(exhibit.index)} className="btn btn-white btn-classic">{exhibit.index+1} {exhibit.name}</button>)
    }

    

    return exhibits ? (
        <div className="exhibits-plot">
            <h3>Demo Exhibition</h3>
            <div className="exhibits-button-wrapper">
                {mapExhibitsButtons(exhibits)}
            </div>
            {getExhibit(exhibits, currentExhibit)}
        </div>
    ): <Loader display={true}/>
}
