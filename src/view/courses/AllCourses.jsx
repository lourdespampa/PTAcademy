import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./cardCourses.sass";
import axios from 'axios';
export default class AllCourses extends Component {
  constructor(props){
    super(props)
    this.state = {
      cursoConAlumnos: true,
      hola: "holamunod"
    }
  }

  componentDidMount = () => {
    var varToken = localStorage.getItem("token");
    axios({
      url: `${this.props.apiUrl}/v1/api/student/${this.props.idteacher}/${this.props.id}/students`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({data}) => {
        if (data.length) {
          this.setState({ cursoConAlumnos: true });
        } else {
          this.setState({ cursoConAlumnos: false });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      
      <>
        <div className="classTeacher-container">
          <div className="classTeacher-card">
            <div className="classTeacher-card__image-container">
              <button onClick={() =>
                this.props.onClick(this.props.id) +
                this.props.setShow("show", 1)}
                className="courseTeacher__button-delette">
                    <i className="courseTeacher__img fas fa-trash"></i>
                </button>
                <div className={this.state.cursoConAlumnos ? "courseTeacher__containerButton-Edit" : "courseTeacher__containerButton-Edit courseTeacher__animationEdit"}>
                <Link to={{pathname:`/${this.props.idteacher}/course_detail/${this.props.id}`, state:this.props.competencias}} className="courseTeacher__button-Edit">
                    <i className="algodemargin courseTeacher__img fas fa-user-plus"></i>
                </Link>
                </div>
              <img className="classTeacher-card__image" src={this.props.imageURL || "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80"} alt="" />
            </div>              
              <svg className="classTeacher-card__svg" viewBox="0 0 800 500">

                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                <path className="classTeacher-card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth="3" fill="transparent"/>
              </svg>            
            <div className="classTeacher-card__content">
              <p className="classTeacher-card__grade">{this.props.grade}</p>&nbsp;&nbsp;
              <p className="classTeacher-card__section">{this.props.section}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p className="classTeacher-card__level">{this.props.level ? this.props.level : "particular"}</p>
              <h1 className="classTeacher-card__title">{this.props.name_course}</h1>
              <p>{this.props.description}</p>
            </div>
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
      </>
    );
  }
}
