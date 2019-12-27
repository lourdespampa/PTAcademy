import React from "react";
import {Link} from 'react-router-dom'
import './inicio.css';

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="contenedor">
        <div className="general">
          <div className="imagen-robot">
            <img src={require('./robot.png')} className="robot" />
          </div>
          <h1 className="iniciar">Iniciar sesión en PlayTecEDU</h1>
          <div className="cuerpo">
            <Link to="/Login">
              <div className="izquierda">
                <img src={require('./alumno.png')} className="alumno" />
                <h1 className="students">Alumno</h1>
              </div>
            </Link>
            <Link to="/loginTeacher">
              <div className="centro">
                <img
                  src={require('./profesora.png')} className="teacher"
                />
                <h1 className="profesora">Docente</h1>
              </div>
            </Link>
            <Link to="#">
              <div className="derecha">
                <img src={require('./house.png')} className="house" />
                <h1 className="parents">Padre/Madre</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio
