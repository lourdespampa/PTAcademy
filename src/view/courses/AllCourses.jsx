import React, { Component } from "react";
import { Link } from "react-router-dom";
//import cursoIcon from '../assets/image/bg.curso.webp'
export default class AllCourses extends Component {
  render() {
    return (
      <>
          <Link
            to={`/${this.props.idteacher}/ClassTeacher/${this.props.id}`}
            className="courseTeacher-cards"
            onClick={()=>this.props.onClick(this.props.id)}
          >
            <div className="courseTeacher-card-item">
              <div className="courseTeacher-card-image"></div>
              <div className="courseTeacher-card-info">
                <h2 className="courseTeacher-card-title">{this.props.name_course}</h2>
                <p className="courseTeacher-card-intro">
                {this.props.description}</p>
                <button
              onClick={() =>
                this.props.onClick(this.props.id) +
                this.props.setShow("showdelete", true)
              }
              className="btn card_btn"
            >
              Eliminar el curso
            </button>
              </div>
            </div>
          </Link>
      </>
    );
  }
}
