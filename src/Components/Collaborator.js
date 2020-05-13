import React from 'react'

export default function Collaborator(props) {
    const { id } = props.match.params;
    return (
        <div>
            {id}
        </div>
    )
}
