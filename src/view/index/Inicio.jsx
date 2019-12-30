import React from "react";
import {Link} from 'react-router-dom';
import './inicio.sass';

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="login-contenedor">
        <div className="login-general">
          <div className="login-imagen-robot">
            <img src={require('./robot.png')} className="login-robot" />
          </div>
          <h1 className="login-iniciar">Iniciar sesión en PlayTecEDU</h1>
          <div className="login-cuerpo">
            <Link to="/Login">
              <div className="login-izquierda">
                <img src={require('./alumno.png')} className="login-alumno" />
                <h1 className="login-students">Alumno</h1>
              </div>
            </Link>
            <Link to="/loginTeacher">
              <div className="login-centro">
                <img
                  src={require('./profesora.png')} className="login-teacher"
                />
                <h1 className="login-profesora">Docente</h1>
              </div>
            </Link>
            <Link to="#">
              <div className="login-derecha">
                <img src={require('./house.png')} className="login-house" />
                <h1 className="login-parents">Padre/Madre</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio
