import React, { Component } from 'react'
import '../Styles/Collaborators.css';

export default class Collaborators extends Component {
    render() {
        return (
            <div class="main">
                <div>
                    <form className="filters">
                        <h2>Filters</h2>
                        <div className="filters__section">
                            <h3 className="filters__section__header">Type</h3>
                            <div className="filters__inputs">
                                <label className="checkbox__container">
                                    <input type="checkbox" name="" id="ch1"/>Museum
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox__container">
                                    <input type="checkbox" name="" id="ch2"/>Gallery
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox__container">Exhibition
                                    <input type="checkbox" name="" id="ch3"/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div className="filters__section">
                            <h3 className="filters__section__header">Location</h3>
                            <div className="filters__inputs">
                                <label className="checkbox__container">Kyiv
                                    <input type="checkbox" name="" id="ch4"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox__container">Lviv
                                    <input type="checkbox" name="" id="ch5"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox__container">Odessa
                                    <input type="checkbox" name="" id="ch6"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox__container">Kharkiv
                                    <input type="checkbox" name="" id="ch7"/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-classic" type="submit">Apply filters</button>
                    </form>
                </div>
                <div className="collaborators">

                    {/* ////// */}
                    <div className="collaborator">
                        <img className="collaborator__ava" src="https://media-cdn.tripadvisor.com/media/photo-s/0f/d0/23/91/caption.jpg" alt=""/>
                        <div className="collaborator__info">
                            <div className="collaborator_text">
                                <h3 className="collaborator__name">
                                    Museum of water
                                </h3>
                                <h4 className="collaborator__type">
                                    Museum
                                </h4>
                                <p className="collaborator__about">
                                    The Kiev Water Museum is an educational centre that occupies one of the buildings from the early centralised water-supply system in the city which was built at the middle of the 19th century. It is located in Khreshchaty Park.
                                </p>
                            </div>
                            <div className="button__outer">
                                <button className="btn btn-classic" to="/visit">Visit</button>
                            </div>
                        </div>
                    </div>
                    {/* ////// */}
                    <div className="collaborator">
                        <img className="collaborator__ava" src="https://www.tripfoodmania.com.ua/wp-content/uploads/2019/01/IMG_9819.jpg" alt=""/>
                        <div className="collaborator__info">
                            <div className="collaborator_text">
                                <h3 className="collaborator__name">
                                    Muzey Meduz
                                </h3>
                                <h4 className="collaborator__type">
                                    Museum
                                </h4>
                                <p className="collaborator__about">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repudiandae ex vitae accusamus alias quae modi placeat sint tempore itaque nisi nostrum vero ducimus dolore, consequatur consequuntur expedita dolorem voluptatem!
                                </p>
                            </div>
                            <div className="button__outer">
                                <button className="btn btn-classic" to="/visit">Visit</button>
                            </div>
                        </div>
                    </div>
                    {/* ////// */}
                    <div className="collaborator">
                        <img className="collaborator__ava" src="https://nashkiev.ua/assets_images/post/000/126/109/image_810xs.jpg" alt=""/>
                        <div className="collaborator__info">
                            <div className="collaborator_text">
                                <h3 className="collaborator__name">
                                    Lorem Ipsum
                                </h3>
                                <h4 className="collaborator__type">
                                    Gallery
                                </h4>
                                <p className="collaborator__about">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio odit dignissimos non iste ipsa inventore quaerat, alias rem facilis. Eligendi provident esse enim placeat consequatur repudiandae quas corporis atque? Repudiandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempore tenetur error libero exercitationem sit, officiis laudantium fugit eius. Vero recusandae voluptatem quaerat delectus odio officiis ab libero mollitia ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod facere nulla iste, voluptate similique laborum alias velit culpa quis delectus placeat quas aliquid laboriosam adipisci aperiam asperiores vero? Odit, quae.
                                </p>
                            </div>
                            <div className="button__outer">
                                <button className="btn btn-classic" to="/visit">Visit</button>
                            </div>
                        </div>
                    </div>
                    {/* ////// */}

                </div>
            </div>
        )
    }
}
