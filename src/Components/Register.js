import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../Styles/Auth.css';
import project from '../projectInfo';
import HTTP from '../http'
import { Loader, Error, FormSection } from './Utilities'

export default function Register() {
    let history = useHistory();

    const simpleUserText = "Do you want tot register your interesting place instead?"
    const intPlaceText = "Do you want tot register as simple user instead?"
    const simpleUserButtonText = "Register free account"
    const intPlaceButtonText = `Register for ${project.price}$ per month`

    const [displayCardInputs, setDisplayCardInputs] = useState(false)
    const [displayLoader, setDisplayLoader] = useState(false)
    const [changeTypeText, setChangeTypeText] = useState(simpleUserText)
    const [buttonText, setButtonText] = useState(simpleUserButtonText)
    const [errorMessage, setErrorMessage] = useState("");

    const changeType = function() {
        setDisplayCardInputs(!displayCardInputs);
        setChangeTypeText((displayCardInputs) ? simpleUserText : intPlaceText)
        setButtonText((displayCardInputs) ? simpleUserButtonText : intPlaceButtonText)
    }

    const register = function(event) {
        event.preventDefault();
        setErrorMessage("")
        setDisplayLoader(true)

        HTTP.register('register')
        .then(response => {
            if (response.status !== 200) setErrorMessage(response.message)
            else history.push('/auth/login')
            setDisplayLoader(false)
        })
        .catch(err => setErrorMessage(err))
    }

    return (
        <div className="auth">
            <div className="auth__bg auth__bg-register"></div>
            <div className="auth__window">
                <h2>Create account</h2>
                <p>{changeTypeText} <span onClick={changeType} className="link">Click here!</span></p>
                <form id="register" action="http://localhost:4000/api/v1/auth/register" encType="multipart/form-data" method="POST" className="form form-register" onSubmit={register}>
                    <input required type="hidden" name="issimpleuser" value={!displayCardInputs}/>
                    <FormSection title="Email" placeholder="Enter email" name="" />
                    <FormSection title="First name" placeholder="Enter first name" name="firstname" />
                    <FormSection title="Last name" placeholder="Enter last name" name="lastname" />
                    <FormSection title="Password" placeholder="Enter password" name="password" type="password" />
                    <FormSection title="Repeat password" placeholder="Repeat password" name="repeatPassword" type="password" />
                    <CardInputs display={displayCardInputs} />
                </form>
                <Error message={errorMessage}/>
                <button style={{ display: displayLoader ? 'none' : 'inline-block' }} type="submit" form="register" className="btn btn-classic">{buttonText}</button>
                <Loader display={displayLoader} />
            </div>
        </div>
    )
}

function CardInputs(props) {
    if (props.display)
    return ([
        <FormSection title="Card number" placeholder="Enter card number" name="cardNumber" />,
        <FormSection title="Expiration date" placeholder="Enter expiration date (MM/YY)" name="expDate" />,
        <FormSection title="Security code" placeholder="Enter security code (CVV)" name="cvv" />
    ])
    else return(null);
}