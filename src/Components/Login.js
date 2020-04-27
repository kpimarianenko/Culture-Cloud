import React, { useContext } from 'react'
import { Context } from '../context'
import '../Styles/Auth.css';
import { GoogleLogin } from 'react-google-login';
import project from '../projectInfo';
import { Link } from 'react-router-dom';
import { Logo } from './Utilities';

export default function Login() {
    const { setUser } = useContext(Context)

    function get() {
      fetch('http://localhost:4000/api/v1', {
        method: 'get'
      }).then(function(response) {
        console.log(response)
        return response.json();
      }).then(function(data) {
        console.log(data)
      });
    }

    const responseGoogle = (response) => {
      get();
      setUser({
        name: response.profileObj.name,
        email: response.profileObj.email,
        avaUrl: response.profileObj.imageUrl 
      })
    }

    return (
        <div className="auth">
            <div className="auth__window">
              <Logo name={project.name} url="/images/logo-black.png" />
              <form className="form form-login" action="">
                <GoogleLogin
                  clientId="1034855239672-07l8en2hv20fgm11a4nifl7vsr3sil7v.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <p className="or"><span>or</span></p>
                <input type="text" name="login" placeholder="Enter email" />
                <input type="password" name="password" placeholder="Enter a password" />
                <button className="btn btn-classic" type="submit">Login by email</button>
                <div className="caption">Don't have an account? <Link to="/auth/register">Sign up!</Link></div>
              </form>
            </div>
            <div className="auth__bg auth__bg-login"></div>
        </div>
    )
}