import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import project from '../projectInfo';
import HTTP from '../http'
import FormValidator from '../validator'
import { Loader, Error, FormSection } from './Utilities'
import '../Styles/Auth.css';

export default function Register() {
    let history = useHistory();
    const simpleUserText = "Do you want to register your interesting place instead?"
    const intPlaceText = "Do you want to register as simple user instead?"
    const simpleUserButtonText = "Register free account"
    const intPlaceButtonText = `Register for ${project.price}$ per month`

    const [displayCardInputs, setDisplayCardInputs] = useState(false)
    const [displayLoader, setDisplayLoader] = useState(false)
    const [changeTypeText, setChangeTypeText] = useState(simpleUserText)
    const [buttonText, setButtonText] = useState(simpleUserButtonText)
    const [formErrors, setFormErrors] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validate = FormValidator.setOptions({
        fields: {
          email: {
            email: true,
            required: true,
            max: 256,
            min: 4,
          },
          firstname: {
            required: true,
            max: 64,
          },
          lastname: {
            required: true,
            max: 64,
          },
          password: {
            required: true,
            max: 64,
            min: 8,
          },
          repeatPassword: {
            required: true,
            match: 'password',
          },
          cardNumber: {
            length: 16,
            required: true,
            number: true,
          },
          expDate: {
            cardExpDate: true,
            required: true,
          },
          cvv: {
            required: true,
            number: true,
            length: 3,
          },
          placename: {
            required: true,
            max: 64,
          },
          city: {
            required: true,
            max: 64,
          }
        }
      })

    const handleInput = function(){
      const response = validate();
      setFormErrors(response.error)
      return response.formValid;
    }


    const changeType = function() {
        setDisplayCardInputs(!displayCardInputs);
        setChangeTypeText((displayCardInputs) ? simpleUserText : intPlaceText)
        setButtonText((displayCardInputs) ? simpleUserButtonText : intPlaceButtonText)
    }

    const register = function(event) {
        event.preventDefault();
        setErrorMessage("")
        if (handleInput()) {
            setDisplayLoader(true)
            HTTP.register('register')
            .then(response => {
                if (response.status !== 200) setErrorMessage(response.message)
                else history.push('/auth/login')
                setDisplayLoader(false)
            })
            .catch(err => setErrorMessage(err))
        }
    }

    return (
        <div className="auth">
            <div className="auth__bg auth__bg-register"></div>
            <div className="auth__window">
                <h2>Create account</h2>
                <p>{changeTypeText} <span onClick={changeType} className="link">Click here!</span></p>
                <form id="register" action="http://localhost:4000/api/v1/auth/register" encType="multipart/form-data" method="POST" className="form" onSubmit={register}>
                    <div className="form-register">
                        <input required type="hidden" name="issimpleuser" value={!displayCardInputs}/>
                        <FormSection message={formErrors.email} onChange={handleInput} title="Email" placeholder="Enter email" name="email" />
                        <FormSection message={formErrors.firstname} onChange={handleInput} title="First name" placeholder="Enter first name" name="firstname" />
                        <FormSection message={formErrors.lastname} onChange={handleInput} title="Last name" placeholder="Enter last name" name="lastname" />
                        <FormSection message={formErrors.password} onChange={handleInput} title="Password" placeholder="Enter password" name="password" type="password" />
                        <FormSection message={formErrors.repeatPassword} onChange={handleInput} title="Repeat password" placeholder="Repeat password" name="repeatPassword" type="password" />
                        <CardInputs messages={[formErrors.placename, formErrors.city, formErrors.cardNumber, formErrors.expDate, formErrors.cvv]} handleInput={handleInput} display={displayCardInputs} />
                        <FormSection onChange={handleInput} title="Choose avatar (optional)" name="avatar" type="file" />
                    </div>
                </form>
                <Error message={errorMessage}/>
                <button style={{ display: displayLoader ? 'none' : 'inline-block' }} type="submit" form="register" className="btn btn-classic">{buttonText}</button>
                <Loader display={displayLoader} />
            </div>
        </div>
    )
}

function CardInputs(props) {
    const {display, handleInput, messages} = props;
    if (display)
    return ([
        <FormSection message={messages[0]} onChange={handleInput} title="Place name" placeholder="Enter place name" name="placename" />,
        <FormSection message={messages[1]} onChange={handleInput} title="City" placeholder="Enter city" name="city" />,
        <FormSection message={messages[2]} onChange={handleInput} title="Card number" placeholder="Enter card number" name="cardNumber" />,
        <FormSection message={messages[3]} onChange={handleInput} title="Expiration date" placeholder="Enter expiration date (MM/YY)" name="expDate" />,
        <FormSection message={messages[4]} onChange={handleInput} title="Security code" placeholder="Enter security code (CVV)" name="cvv" />,
        <div className="form__section">
            <h4>Type</h4>
            <select name="type">
                <option value="museum">Museum</option>
                <option value="gallery">Gallery</option>
                <option value="exhibition">Exhibition</option>
            </select>
        </div>
    ])
    else return(null);
}