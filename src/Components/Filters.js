import React from 'react'
import { useState, useEffect } from 'react';

export default function Filters(props) {
    const { children, title, ...attrs } = props
    return (
        <form className="filters card" {...attrs}>
            <h2>{title || 'Filters'}</h2>
            {children}
            <button className="btn btn-white btn-classic" type="submit">Apply filters</button>
        </form>
    )
}

export function FilterSection(props) {
    const { title, values, name, children, ...attrs } = props;
    const [valuesElements, setValuesElements] = useState()

    useEffect(() => {
        if (values) {
            const elements = values.map((element, index) => 
            <FiltersCheckbox value={element} key={index} {...attrs} name={name} >{element}</FiltersCheckbox>)
            
            setValuesElements(elements)
        }
        // eslint-disable-next-line
    }, [values])

    return (<div className="filters__section">
        <h3 className="filters__section__header">{title}</h3>
        <div className="filters__inputs">
            {!valuesElements && !children ? <p className="filters__error">No suitable filters</p> : valuesElements}
            {children}
        </div>
    </div>)
}

export function FiltersCheckbox(props) {
    const {children, ...attrs} = props;
    return (<label className="checkbox__container">
        {children}
        <input type="checkbox" {...attrs} />
        <span className="checkmark"></span>
    </label>)
}