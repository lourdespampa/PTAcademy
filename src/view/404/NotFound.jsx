import React, { Component } from 'react'

import cuatrocientoscuatro from './404.jpg';
import './notFound.css'
import { Link } from 'react-router-dom';


export default class NotFound extends Component {
    render() {
        return (
            <>
                <div className="notFound-image-container">
                    <img src={cuatrocientoscuatro} className="notFound-image"/>
                </div>
                <div className="notFound-body">
                    <h1>Ups! pagina no encontrada</h1>
                    <br/>
                </div>
                <button className="home-notfound" >
                    <Link className="notFound-link" to="/">Volver a la pagina Principal</Link>
                </button>
                
            </>
        )
    }
}
