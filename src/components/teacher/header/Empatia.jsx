import React from 'react';

import {Link} from 'react-router-dom'

import './Empatia.sass'
//cambios 
function Empatia(props){

    return(
        <>
            <header id="Empatia-header">
                <div className="menu_bar">
                    <Link to="/" className="bt-menu"><span className="icon-list2"></span>Menú</Link>
                </div>
                <nav id="Empatia-header__menu">
                    <ul id="Empatia-header__menu-ul">
                        <li className="Empatia-header__menu-ul-li"><Link className="nav-menu" style={{display: "block"}} to={`/teacher/${props.id_class}/${props.id_access}`}>LISTA DE ALUMNOS</Link></li>
                        <li className="Empatia-header__menu-ul-li"><Link className="nav-menu" style={{display: "block"}} to={`/teacher/${props.id_class}/${props.id_access}/azar`}>AL AZAR</Link></li>
                        <li className="Empatia-header__menu-ul-li"><Link className="nav-menu" style={{display: "block"}} to={`/teacher/${props.id_class}/${props.id_access}/grupos`}>GRUPOS</Link></li>
                        <li className="Empatia-header__menu-ul-li"><Link onClick={()=>props.redirect('temporizador')}className="nav-menu" to={`/teacher/${props.id_class}/${props.id_access}/temporizador`}>TEMPORIZADOR</Link></li>
                        <li className="Empatia-header__menu-ul-li"><Link onClick={()=>props.redirect('trivia')}className="nav-menu" to={`/teacher/${props.id_class}/${props.id_access}/trivia`}>TRIVIA</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Empatia;