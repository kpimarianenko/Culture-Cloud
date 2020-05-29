import React from 'react'
import '../Styles/ModalWindow.css'

export default function ModalWindow(props) {
    const { header, acceptButtonText, cancelButtonText, display, onCancel, form, children, ...attrs} = props;

    const onOutsideClickHadler = (event) => {
        if (event.target === event.currentTarget)
            onCancel()
    }

    return display ? (
        <div onMouseDown={onOutsideClickHadler} className="modal-wrapper" {...attrs} >
            <div className="card modal">
                <div className="modal-header">
                    <h3>{header || "Are you sure?"}</h3>
                    <span onClick={onCancel}>&times;</span>
                </div>
                <div className="line"></div>
                <div>{children}</div>
                <div className="line"></div>
                <div className="modal-footer">
                    <button onClick={onCancel} className="btn">{cancelButtonText || "Cancel"}</button>
                    <button type="submit" form={form} className="btn btn-white btn-classic">{acceptButtonText || "OK"}</button>
                </div>
            </div>
        </div>
    ) : null;
}
