import React, { Component } from "react";
import { Link } from "react-router-dom";
//import cursoIcon from '../assets/image/bg.curso.webp'
import iconDelete from "./assets/delete.svg";
// import iconView from "./assets/view.svg";
import iconEdit from "./assets/edit.svg";
export default class AllCourses extends Component {
  render() {
    return (
      <>
            <div className="courseTeacher-card-item">
              <div className="courseTeacher-card-image">
              <button onClick={() =>
                this.props.onClick(this.props.id) +
                this.props.setShow("showdelete", true)
              } className="courseTeacher__button-delette">
                    <img
                      className="courseTeacher__img"
                      src={iconDelete}
                      alt="imagen de borrar cursos"
                    />
                  </button>
                  <button className="courseTeacher__button-Edit">
                    <img className="courseTeacher__img" src={iconEdit} alt="imagen de borrar cursos" />
                  </button>
              </div>
              <div className="courseTeacher-card-info">
                <h2 className="courseTeacher-card-title">{this.props.name_course}</h2>
                <p className="courseTeacher-card-intro">
                {this.props.description}</p>
                <Link 
                onClick={()=>this.props.onClick(this.props.id)}
                to={`/${this.props.idteacher}/ClassTeacher/${this.props.id}`}
             className="courseTeacher__buttonEntry">
                      <label className="courseTeacher__buttonEntry-label">ver clases</label>
                    </Link>
              </div>
            </div>
      </>
    );
  }
}
