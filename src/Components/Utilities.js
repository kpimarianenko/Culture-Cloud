import React from 'react'

export function Loader(props) {
    const { display } = props;
    return display ? (<div className="loader"></div>) : null
}

export function Error(props) {
    const { message } = props;
    return message ? (<div className="error">{message}</div>) : null
}

export function FormSection(props) {
    const { title, placeholder, name, type } = props;
    return (<div className="form__section">
        <h4>{title}</h4>
        <input placeholder={placeholder} name={name} type={type} />
    </div>)
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