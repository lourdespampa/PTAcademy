import React, { Component } from 'react'

import cuatrocientoscuatro from './404.jpg';
import './notFound.css'
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <>
                <div className="layout">
                    <div class="title">404!</div>
                    <div class="text icon_500">La página que está buscando no se encuentra disponible</div>
                    <button className="home-notfound">
                        <Link className="notfound-link" to="/">Volver a la página principal</Link>
                    </button>
                </div>
            </>
        )
    }
}
