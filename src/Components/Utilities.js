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
    const {id, message, ...attrs } = props;
    return ([
        <small className="error" htmlFor={id}>{message}</small>,
        <input {...attrs} className={message ? 'error' : null} />
    ])
}

export function Logo(props) {
    const { name, url } = props;
    return ([
    <h2>{name}</h2>,
    <div className="logo">
        <img src={url} alt="logo"/>
    </div>
    ])
}