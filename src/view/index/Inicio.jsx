import React from "react";
import {Link} from 'react-router-dom';

import './inicio.sass';

function Inicio() {

  return (
    <div className="login-contenedor">
      <div className="login-general">
        <div className="login-cabecera">
          <div className="login-imagen-robot">
          <img src={require('./robot.png')} className="login-robot" alt="robot"/>
        </div>
        <div className="login-iniciar-sesion">
          <h1 className="login-iniciar">Iniciar sesión en PlayTec Academy</h1>
        </div>
        </div>
        <div className="login-cuerpo">
          <Link to="/Login">
            <div className="login-izquierda">
              <img src={require('./alumno.png')} className="login-alumno" alt="" />
              <h1 className="login-students">Alumno</h1>
            </div>
          </Link>
          <Link to="/loginTeacher">
            <div className="login-centro">
              <img src={require('./profesora.png')} className="login-teacher" alt="" />
              <h1 className="login-profesora">Docente</h1>
            </div>
          </Link>
          <Link to="#">
            <div className="login-derecha">
              <img src={require('./house.png')} className="login-house" alt="" />
              <h1 className="login-parents">Padre/Madre</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inicio
