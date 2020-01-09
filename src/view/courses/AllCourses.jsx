import React, { Component } from "react";
import { Link } from "react-router-dom";
//import cursoIcon from '../assets/image/bg.curso.webp'
export default class AllCourses extends Component {
  render() {
    return (
      <>
          <Link
            to={`/${this.props.idteacher}/ClassTeacher/${this.props.id}`}
            class="courseTeacher-cards"
          >
            <div class="courseTeacher-card-item">
              <div class="courseTeacher-card-image"></div>
              <div class="courseTeacher-card-info">
                <h2 class="courseTeacher-card-title">{this.props.name_course}</h2>
                <p class="courseTeacher-card-intro">
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
