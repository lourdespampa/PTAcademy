import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
import AllCourses from "./AllCourses";
import axios from "axios";
import "../courses/Course.css";
export default class CoursesTeacher extends Component {
  state = {
    nombreProfesor: "carlos",
    _id: "",
    courses: []
  };

  componentDidMount() {
    this.getCursos();
  }
  getCursos = async () => {
    const res = await axios.get(
      "http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course_detail"
      // `http://3.16.110.136:4200/v1/api/teacher/${this.props.idteacher}/course_detail`
    );
    this.setState({
      courses: await res.data
    });
  };

  render() {
    return (
      <>
        <NavCourse idcourse={this.props.idcourse} idteacher={this.props.idteacher} agregarX={'course'} nombreProfesor={this.state.nombreProfesor} getCursos={this.getCursos()}></NavCourse>
        <div className="main">
          <h1>SECCION DE CURSOS</h1>
          <ul className="cards">
            {
            this.state.courses.map((cursos,id) => (
              <li className="cards_item" key={id}>
                <AllCourses
                  name_course={cursos.course_name}
                  description={cursos.desc}
                  img={cursos.img}
                  id={cursos._id}
                />
              </li>
              ))
              }
          </ul>
        </div>
      </>
    );
  }
}
