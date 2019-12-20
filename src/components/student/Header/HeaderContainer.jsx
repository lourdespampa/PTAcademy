import React from 'react'
import './headerStyles.css'

export default function HeaderContainer() {
    return (
        <div>
            <nav id="header" class="mb-1 navbar navbar-expand-lg navbar-dark primary-color lighten-1 fixed">
        <div class="navbar-brand">Bienvenido cristhian</div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555" aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Inicio
                  <span class="sr-only">(current)</span>
                </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">Temporizador</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">Trivia</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/" id="btnsalirclase">Salir</a>
                </li>
            </ul>
        </div>
    </nav>
        </div>
    )
}
