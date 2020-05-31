import React, { useState, useEffect } from 'react'
import '../Styles/Gallery.css'
import { Loader } from './Utilities';
import Error from './Error'
import HTTP from '../http';

export default function Gallery(props) {
    const { id } = props.match.params;
    const [collaborator, setCollaborator] = useState(null)
    const [gallery, setGallery] = useState(null)
    const [page, setPage] = useState(1)
    const [galleryCount, setGalleryCount] = useState(0)
    const [displayLoader, setDisplayLoader] = useState(false)
    const [errorCode, setErrorCode] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        Promise.all([HTTP.getCollaborator(id), HTTP.getCollaboratorsGallery(id, page)])
        .then(response => {
            console.log(response)
            if (response[0].status !== 200) {
                setErrorCode(response[0].status)
                setErrorMessage(response[0].data.message)
            }
            setCollaborator(response[0].data)
            setGallery(gallery => gallery ? gallery.concat(response[1].data.urls) : response[1].data.urls)
            setGalleryCount(response[1].data.count)
            setDisplayLoader(false)
        })
        .catch(err => setErrorCode(500))
    }, [id, page])

    const loadMoreClickHandker = () => {
        setPage(page + 1); 
        setDisplayLoader(true)
    }

    if (errorCode) return <Error code={errorCode} message={errorMessage} />
    return collaborator ? (
        <div className="card gallery-wrapper">
            <div className="header">
                <h3>Photogallery of the {collaborator.placeName}</h3>
                <div className="line"></div>
            </div>
            <PhotoList gallery={gallery} /> 
            {displayLoader ? <Loader display /> : <LoadMore onClick={loadMoreClickHandker} count={galleryCount} gallery={gallery} />}
        </div>
    ) : <Loader display />
}

function PhotoList(props) {
    const { gallery } = props;
    const [galleryElements, setGalleryElements] = useState()

    useEffect(() => {
        if (gallery) {
            const elements = gallery.map((element, index) => <Photo key={index} src={element.avaUrl} />)
            
            setGalleryElements(elements)
        }
    }, [gallery])

    return galleryElements ? (<div className="gallery-outer">
        <div className="gallery">
            {galleryElements}
        </div>
    </div>) : <Loader display />
}

function Photo(props) {
    const {...attrs} = props;
    return (<img alt="" className="gallery-image" {...attrs} />)
}

function LoadMore(props) {
    const { count, gallery, ...attrs } = props;
    
    if (!gallery) return null;

    return gallery.length < count ? 
    (<p className="gallery-caption link" {...attrs}>Load more</p>) :
    (<p className="gallery-caption">No more photos</p>)
}