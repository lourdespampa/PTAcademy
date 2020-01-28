import React, { Component } from "react";
import { Link } from "react-router-dom";
//import cursoIcon from '../assets/image/bg.curso.webp'
import iconDelete from "./assets/delete.svg";
// import iconView from "./assets/view.svg";
import iconEdit from "./assets/edit.svg";
import "./cardCourses.sass";
export default class AllCourses extends Component {

  componentDidMount(){
    console.log(this.props.id)
    console.log(this.props.idteacher)
  }
  
  render() {

    return (
      <>
        <div class="classTeacher-container">
          <div class="classTeacher-card">
            <div class="classTeacher-card__image-container">
              <button
                onClick={() =>
                  this.props.onClick(this.props.id) +
                  this.props.setShow("showdelete", true)
                }
                className="courseTeacher__button-delette"
              >
                <img
                  className="courseTeacher__img"
                  src={iconDelete}
                  alt="imagen de borrar cursos"
                />
              </button>
              <Link
                to={`/${this.props.idteacher}/course_detail/${this.props.id}`}
                className="courseTeacher__button-Edit"
              >
                <img
                  className="courseTeacher__img"
                  src={iconEdit}
                  alt="imagen de borrar cursos"
                />
              </Link>
              <img
                class="classTeacher-card__image"
                src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80"
                alt=""
              />
            </div>

            <svg class="classTeacher-card__svg" viewBox="0 0 800 500">
              <path
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                stroke="transparent"
                fill="#333"
              />
              <path
                class="classTeacher-card__line"
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                stroke="pink"
                stroke-width="3"
                fill="transparent"
              />
            </svg>

            <div class="classTeacher-card__content">
              <h1 class="classTeacher-card__title">{this.props.name_course}</h1>
              <p>{this.props.description}</p>
              <Link
                onClick={() => this.props.onClick(this.props.id)}
                to={`/${this.props.idteacher}/ClassTeacher/${this.props.id}`}
                className="courseTeacher__buttonEntry"
              >
                <label className="courseTeacher__buttonEntry-label">
                  VER CLASES
                </label>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="courseTeacher-card-item">
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
                  <Link to={`/${this.props.idteacher}/course_detail`} className="courseTeacher__button-Edit">
                    <img className="courseTeacher__img" src={iconEdit} alt="imagen de borrar cursos" />
                  </Link>
              </div>
              <div className="courseTeacher-card-info">
                <h2 className="courseTeacher-card-subtitle">{this.props.level}</h2>{this.props.grade}{this.props.section}
                <h1 className="courseTeacher-card-title">{this.props.name_course}</h1>
                <p className="courseTeacher-card-intro">
                {this.props.description}</p>
                <Link 
                onClick={()=>this.props.onClick(this.props.id)}
                to={`/${this.props.idteacher}/ClassTeacher/${this.props.id}`}
             className="courseTeacher__buttonEntry">
                      <label className="courseTeacher__buttonEntry-label">VER CLASES</label>
                    </Link>
              </div>
            </div> */}
      </>
    );
  }
}
