import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context'
import { Link, Redirect } from 'react-router-dom';
import { Loader } from './Utilities';
import Error from './Error'

export default function Me() {
    const context = useContext(Context)
    const { user, isUserRole, isAuth } = context;
    const [isAuthenticated , setIsAuthenticated] = useState(isAuth())

    useEffect(() => {
        setIsAuthenticated(isAuth())
    }, [user, isAuth])

    if (isUserRole(1)) return <Redirect to={`/collaborators/${user._id}`} />
    else if (!isAuthenticated) return <Error code="401" message="Unauthorized" />
    return user ? (<Profile name={user.name} avaUrl={user.avaUrl} about={user.about} />) : (<Loader display />)
}

export function Profile(props) {
    const context = useContext(Context)
    const { isUserRole } = context;
    const { avaUrl, userId, name, type, about, children } = props
    return (<div className="card collaborator-page">
        <div className="info">
            <div className="photo">
                <div className="ava-wrapper">
                    <img className="card ava" src={avaUrl || "/images/placeholder.png"} alt="avatar"/>
                </div>
                {isUserRole(1) ? <Link className="gallery-link" to={`/collaborators/gallery/${userId}`}>Gallery</Link> : null}
            </div>
            <div className="details">
                <h2 className="name">{name}</h2>
                <h3 className="type">{type}</h3>
                <div className="line"></div>
                <p className="about">{about}</p>
            </div>
        </div>
        { children }
    </div>)
}
