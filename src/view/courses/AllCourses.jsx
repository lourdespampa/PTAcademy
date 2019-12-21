import React, { Component } from "react";
import {Link} from 'react-router-dom';
import cursoImg from '../../img/courses/cursos.jpg'
//import cursoIcon from '../assets/image/bg.curso.webp'
export default class AllCourses extends Component {
  render() {
    return (
      <>
        <div className="card_playtec">
        <div className="card_image"><img src={cursoImg} alt="some  value"/></div>
        <div className="card_content">
          <h2 className="card_title">{this.props.name_course}</h2>
          <p className="card_text">{this.props.description}</p>
          <Link to={`/ClassTeacher/${this.props.id}`} className="btn card_btn">Entrar a sus clases</Link>
          {/* <button>Eliminar el curso</button> */}
        </div>
      </div>
      </>
    );
  }
}
