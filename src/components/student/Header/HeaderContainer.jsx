import React from 'react'
import {Link} from 'react-router-dom'
import './headerStyles.css'
import Audio from './audio'

export default function HeaderContainer(props) {




    return (
        <div>
            <nav id="header" class="mb-1 navbar navbar-expand-lg navbar-dark primary-color lighten-1 fixed">
    <div class="navbar-brand">Bienvenido {props.name} {props.lastName} </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555" aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link class="nav-link" to={`/student/${props.id_student}/${props.id_access}`}>Inicio</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={`/student/${props.id_student}/${props.id_access}/temporizador`}>Temporizador</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={`/student/${props.id_student}/${props.id_access}/trivia`}>Trivia</Link>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    {/* <a class="nav-link" href="/Login" id="btnsalirclase">Salir</a> */}
                    <Link class="nav-link" to="/" id="btnsalirclase">Salir</Link>
                </li>
            </ul>
        </div>
    </nav>
    <Audio></Audio>
        </div>
    )
}
