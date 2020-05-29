import React from 'react'
import '../Styles/Utils.css'

export function Loader(props) {
    const { display } = props;
    return display ? (<div className="loader"></div>) : null
}

export function Error(props) {
    const { message } = props;
    return message ? (<div className="error">{message}</div>) : null
}

export function FormSection(props) {
    const { title, message, ...attrs } = props;
    return (<div className="form__section">
        <h4>{title}</h4>
        <ErrorInput message={message} {...attrs} />
    </div>)
}

export function ErrorInput(props) {
    const {id, textarea, message, value, ...attrs } = props;
    return (
    <div>
        <small className="error" htmlFor={id}>{message}</small>
        {   
            textarea ? 
            <textarea {...attrs } className={message ? 'error' : null} >{value}</textarea> :
            <input {...attrs} value={value} className={message ? 'error' : null} />
        }
    </div>)
}

export function Logo(props) {
    const { name, url } = props;
    return (
    <div>
        <h2>{name}</h2>
        <div className="logo">
            <img src={url} alt="logo"/>
        </div>
    </div>)
}

export function Pagination(props) {
    const { page, onPrev, onNext, maxPage } = props;
    return (<div className="pagination-wrapper">
        <div className="pagination">
            {page === 1 ? null : <div onClick={onPrev} className="pagination-element controls-btn">Prev</div>}
            <div className="pagination-element">{page}</div>
            {page === maxPage ? null : <div onClick={onNext} className="pagination-element controls-btn">Next</div>}
        </div>
    </div>)
}