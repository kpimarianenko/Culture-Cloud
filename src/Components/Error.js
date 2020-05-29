import React from 'react'

export default function Error(props) {
    const { code, message } = props;
    return (
        <div className="card error-page">
            <h2 className="code">{code ? `Error ${code}` : `Unknown error`}</h2>
            <p className="message">{message || 'An error has occured'}</p>
        </div>
    )
}
