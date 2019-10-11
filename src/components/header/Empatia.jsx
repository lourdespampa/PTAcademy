import React from 'react';

import {Link} from 'react-router-dom'

import './Empatia.css'
//cambios 
function Empatia(props){

    return(
        <>
            <header>
                <div className="menu_bar">
                    <Link to="/" className="bt-menu"><span className="icon-list2"></span>Menú</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link className="a nav-lista" style={{display: "block"}} to="/alumnos">LISTA DE ALUMNOS</Link></li>
                        <li><Link className="a nav-azar" style={{display: "block"}} to="/azar/profesor">AL AZAR</Link></li>
                        <li><Link className="a nav-grupos" style={{display: "block"}} to="/grupos/profesor">GRUPOS</Link></li>
                        <li><Link className="a nav-temporizador" to="/temporizador/profesor">TEMPORIZADOR</Link></li>
                        <li><Link className="a nav-trivia" to="/trivia/profesor">TRIVIA</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Empatia;