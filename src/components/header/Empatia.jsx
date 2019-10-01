import React from 'react';

import {Link} from 'react-router-dom'

import './Empatia.css'

function Empatia(){

    return(
        <>
            <header>
                <div class="menu_bar">
                    <Link to="/" class="bt-menu"><span class="icon-list2"></span>Menú</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link className="a" id="nav-lista" style={{display: "block"}} to="/alumnos">LISTA DE ALUMNOS</Link></li>
                        <li><Link className="a" id="nav-azar" to="/azar/profesor">AL AZAR</Link></li>
                        <li><Link className="a" id="nav-grupos" to="/grupos/profesor">GRUPOS<span class="caret icon-arrow-down6"></span></Link></li>
                        <li><Link className="a" id="nav-temporizador" to="/temporizador/profesor">TEMPORIZADOR</Link></li>
                        <li><Link className="a" id="nav-trivia" to="/trivia/profesor">TRIVIA</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Empatia;