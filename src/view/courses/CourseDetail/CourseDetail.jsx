import React, { Component, useState } from "react";
import "./CourseDetail.sass";
import NavCourse from "./NavCourse";
import axios from 'axios'
export default class CourseDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: false,
      id_course : "",
      id_teacher : ""
    }
  }
  
  componentDidMount(){
    const { match: { params } } = this.props;
    this.setState({ id_course: params.id_course, id_teacher: params.id });
    setTimeout(() => console.log(this.state.id_course, this.state.id_teacher), 2000)
  }
  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token");
    await this.setState({ token: tokenStorage });
  };
  getAlumnos = () => {
    console.log("listar cursos");
    const {
      match: { params }
    } = this.props;
    var varToken = localStorage.getItem("token");
    axios({
      url: `http://192.168.1.29:4200/v1/api/student/${this.state.id_teacher}/${this.state.id_course}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        console.log(data);
        if (data == []) {
          this.setState({ courses: [] });
        } else {
          this.setState({ courses: data });
        }
      })
      .catch(e => console.log(e));
  };
  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };
  render() {
    return (
      <>
        <NavCourse
          apiUrl={this.props.apiUrl}
          idcourse={this.state.id_course}
          idteacher={this.state.id_teacher}
          nombreProfesor={this.state.nombreProfesor}
          getdata={this.getAlumnos}
        ></NavCourse>

        <div className="CourseDetail__Container">
          <div>
            <h1 className="CourseDetail__title">Lista de alumnos</h1>
          </div>

          <table class="CourseDetail__table">
            <tbody className="CourseDetail__table-body">
              <tr className="CourseDetail__table-tr">
                <th className="CourseDetail__table-th">Apellidos</th>
                <th className="CourseDetail__table-th">Nombres</th>
                <th className="CourseDetail__table-th">Competencia 1</th>
                <th className="CourseDetail__table-th">Competencia 2</th>
                <th className="CourseDetail__table-th">Competencia 3</th>
                <th className="CourseDetail__table-th">Competencia 4</th>
              </tr>
              <tr className="CourseDetail__table-tr">
                <td className="CourseDetail__table-td" data-th="Apellidos">
                  UPS5005
                </td>
                <td className="CourseDetail__table-td" data-th="Nombres">
                  UPS
                </td>
                <td className="CourseDetail__table-td" data-th="Compentencia 1">
                  ASDF19218
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 2">
                  06/25/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 3">
                  12/25/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 4">
                  $8,322.12
                </td>
              </tr>
              <tr className="CourseDetail__table-tr">
                <td className="CourseDetail__table-td" data-th="Apellidos">
                  UPS3449
                </td>
                <td className="CourseDetail__table-td" data-th="Nombres">
                  UPS South Inc.
                </td>
                <td className="CourseDetail__table-td" data-th="Compentencia 1">
                  ASDF29301
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 2">
                  6/24/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 3">
                  12/25/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 4">
                  $3,255.49
                </td>
              </tr>
              <tr className="CourseDetail__table-tr">
                <td className="CourseDetail__table-td" data-th="Apellidos">
                  BOX5599
                </td>
                <td className="CourseDetail__table-td" data-th="Nombres">
                  BOX Pro West
                </td>
                <td className="CourseDetail__table-td" data-th="Compentencia 1">
                  ASDF43000
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 2">
                  6/27/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 3">
                  12/25/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 4">
                  $45,255.49
                </td>
              </tr>
              <tr className="CourseDetail__table-tr">
                <td className="CourseDetail__table-td" data-th="Apellidos">
                  PAN9999
                </td>
                <td className="CourseDetail__table-td" data-th="Nombres">
                  Pan Providers and Co.
                </td>
                <td className="CourseDetail__table-td" data-th="Compentencia 1">
                  ASDF33433
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 2">
                  6/29/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 3">
                  12/25/2016
                </td>
                <td className="CourseDetail__table-td" data-th="Competencia 4">
                  $12,335.69
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
