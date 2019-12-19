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
                        <li><Link className="a nav-lista" style={{display: "block"}} to="/teacher/xxxxxx/alumnos">LISTA DE ALUMNOS</Link></li>
                        <li><Link className="a nav-azar" style={{display: "block"}} to="/teacher/xxxxxx/azar">AL AZAR</Link></li>
                        <li><Link className="a nav-grupos" style={{display: "block"}} to="/teacher/xxxxxx/grupos">GRUPOS</Link></li>
                        <li><Link className="a nav-temporizador" to="/teacher/xxxxxx/temporizador">TEMPORIZADOR</Link></li>
                        <li><Link className="a nav-trivia" to="/teacher/xxxxxx/trivia">TRIVIA</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Empatia;