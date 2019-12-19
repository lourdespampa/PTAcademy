import React, { Component } from "react";
import NavCourse from "../componentes/courses/NavCourse";
import AllCourses from "../componentes/courses/AllCourses";
import axios from "axios";
import "../assets/Course.css";
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
    );
    this.setState({
      courses: await res.data
    });
  };

  render() {
    return (
      <>
        <NavCourse nombreProfesor={this.state.nombreProfesor}></NavCourse>
        <div className="main">
          <h1>SECCION DE CURSOS</h1>
          <ul className="cards">
            {this.state.courses.map(cursos => (
              <li className="cards_item" key={cursos._id}>
                <AllCourses
                  name_course={cursos.course_name}
                  description={cursos.desc}
                  img={cursos.img}
                  id={cursos._id}
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
