import React from 'react'
import '../Styles/About.css'

export default function About() {
    const dev1 = "Mrychko Bogdan"
    const dev2 = "Marianenko Roman"
    return (
        <div className="card about-wrapper">
            <Info />
            <Photos>
                <Photo alt={`Developer ${dev1}`} src="/images/developer1.jpg" caption={dev1} />
                <Photo alt={`Developer ${dev2}`} src="/images/developer2.jpg" caption={dev2} />
            </Photos>
            <Roles>
                <Role role="CEO" name={dev2} />
                <Role role="Developer" name={dev2} />
                <Role role="Designer" name={dev2} />
                <Role role="Composer" name={dev2} />
                <Role role="Artist" name={dev1} />
                <Role role="Producer" name={dev1} />
                <Role role="PR-manager" name={dev1} />
                <Role role="BD-specialist" name={dev2} />
                <Role role="Just good man" name={dev2} />
                <Role role="Muse" name={dev1} />
            </Roles>
        </div>
    )
}

function Info() {
    return (<p className="info">
    Hey. We are third-year students of the Kiev Polytechnic Institute
    named after Igor Sikorsky. We study at the faculty of applied
    mathematics and together develop this project. Below, in the
    photos you can see us.
    </p>)
}

function Photos(props) {
    const {children} = props;
    return (<div className="photos">{children}</div>)
}

function Photo(props) {
    const {caption, ...attrs} = props
    return (<div className="photo">
        <img alt="" {...attrs} className="card about-photo"/>
        <p className="caption">{caption}</p>
    </div>)
}

function Roles(props) {
    const { children } = props;
    return (<div className="roles-wrapper">
        <h3>Roles in our team:</h3>
        <ul className="roles">
            {children}
        </ul>
    </div>)
}

function Role(props) {
    const { role, name } = props;
    return (<li className="role">
        <h4>{role}</h4>
        <p>{name}</p>
    </li>)
}