import React, { Component } from "react";
import {Link} from 'react-router-dom'
import cursoImg from '../../assets/image/cursos.jpg'
export default class AllClass extends Component {
  render() {
    return (
      <>
        <div className="card">
          <div className="card_image">
            <img src={cursoImg} alt="some value" />
          </div>
          <div className="card_content">
            <h2 className="card_title">{this.props.name_class}</h2>
            <p className="card_text">{this.props.desc}</p>
            <Link to="/ClassTeacher" className="btn card_btn">
              Entrar a detalle de la clase
            </Link>
            <button>Eliminar el curso</button>
          </div>
        </div>
      </>
    );
  }
}
