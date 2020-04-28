import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../context'
import { Logo, Error, ErrorInput } from './Utilities';
import HTTP from '../http';
import project from '../projectInfo';
import '../Styles/Auth.css';
import { useState } from 'react';
import FormValidator from '../validator';

export default function Login() {
  const { renderUser } = useContext(Context)
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

    const validate = FormValidator.setOptions({
      fields: {
        email: {
          required: true,
        },
        password: {
          required: true
        }
      },
      errors: {
        email: {
          required: 'Email cannot be empty'
        },
        password: {
          required: 'Password cannot be empty'
        }
      }
    })

    const login = function(event){
      event.preventDefault();
      if (handleInput())
      HTTP.login('login')
      .then(response => {
        if (response.status !== 200) {
          setErrorMessage(response.message);
        }
        else {
          localStorage.setItem('token', response.token);
          return HTTP.getProfile()
        }
      })
      .then(authData => {
        if (authData) {
          renderUser(authData.user)
          history.push('/')
        }
      })
      .catch(err => setErrorMessage(err))
    }

    const failureResponseGoogle = function(response) {
      setErrorMessage("Sorry, but we can't sign in you with Google now. Try to login by email.")
    }

    const successResponseGoogle = function(response){
      const registerFormData = new FormData();

      registerFormData.append("name", response.profileObj.name);
      registerFormData.append("email", response.profileObj.email);
      registerFormData.append("avaUrl", response.profileObj.imageUrl);
      registerFormData.append("googleId", response.profileObj.googleId);

      HTTP.registerByGoogle(registerFormData)
      .then(() => {
        const loginFormData = new FormData();
        loginFormData.append("googleId", response.profileObj.googleId)
        loginFormData.append("email", response.profileObj.email);

        return HTTP.loginByGoogle(loginFormData)
        .then(tokenData => {
          localStorage.setItem('token', tokenData.token)
          return HTTP.getProfile()
        })
        .then(authData => {
          renderUser(authData.user)
          history.push('/')
        })
        .catch(err => setErrorMessage(err))
      })
    }

    const handleInput = function(){
      const response = validate();
      setFormErrors(response.error)
      return response.formValid;
    }

    return (
        <div className="auth">
            <div className="auth__window">
              <Logo name={project.name} url="/images/logo-black.png" />
              <form className="form form-login" onSubmit={login} id="login">
                <GoogleLogin
                  clientId="1034855239672-07l8en2hv20fgm11a4nifl7vsr3sil7v.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={successResponseGoogle}
                  onFailure={failureResponseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <p className="or"><span>or</span></p>
                <ErrorInput message={formErrors.email} onChange={handleInput} name="email" placeholder="Enter email" id="email" />
                <ErrorInput message={formErrors.password} onChange={handleInput} name="password" type="password" placeholder="Enter a password" id="password" />
                <Error message={errorMessage} />
                <button className="btn btn-classic" type="submit">Login by email</button>
                <div className="caption">Don't have an account? <Link to="/auth/register">Sign up!</Link></div>
              </form>
            </div>
            <div className="auth__bg auth__bg-login"></div>
        </div>
    )
}