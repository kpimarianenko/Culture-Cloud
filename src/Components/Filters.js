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
    const { title, values, name, children } = props;
    const [valuesElements, setValuesElements] = useState()

    useEffect(() => {
        const elements = values.map(element => <FiltersCheckbox name={name} >{element}</FiltersCheckbox>)

        setValuesElements(elements)
    }, [values])

    return (<div className="filters__section">
        <h3 className="filters__section__header">{title}</h3>
        <div className="filters__inputs">
            {valuesElements || <p className="filters__error">No suitable filters</p>}
            {children}
        </div>
    </div>)
}

export function FiltersCheckbox(props) {
    const {children, ...attrs} = props;
    return (<label className="checkbox__container">
        {children}
        <input type="checkbox" value="" {...attrs} />
        <span className="checkmark"></span>
    </label>)
}