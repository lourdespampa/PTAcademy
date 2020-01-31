import React, { Component } from 'react'
import './notFound.css'
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <>
            <div className="body-404">
                <div className="layout">
                    <div className="title-404">404!</div>
                    <div className="text icon_500">La página que está buscando no se encuentra disponible</div>
                    <Link className="notfound-link" to="/">
                        <button className="home-notfound">
                            Volver a la página principal
                        </button>
                    </Link>
                </div>
            </div>
            </>
        )
    }
}

