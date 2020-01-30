import React, { Component } from "react";
import "./CourseDetail.sass";
import NavCourse from "./NavCourseDetail";
import axios from 'axios'
export default class CourseDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: false,
      id_course : "",
      id_teacher : "",
      students : []
    }
  }
  
  componentDidMount(){
    var varToken = localStorage.getItem('token');
    const { match: { params } } = this.props;
    this.setState({ id_course: params.id_course, id_teacher: params.id });
    setTimeout(() => console.log(this.state.id_course, this.state.id_teacher), 2000)
    axios({
      url: `${this.props.apiUrl}/v1/api/student/${params.id}/${params.id_course}/students`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        if (data === []) {
          this.setState({ students: [] });
        } else {
          this.setState({ students: data });
        }
      })
      .catch(e => console.log(e));
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
      url: `${this.props.apiUrl}/v1/api/student/${params.id}/${params.id_course}/students`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        if (data === []) {
          this.setState({ students: [] });
        } else {
          this.setState({ students: data });
        }
      })
      .catch(e => console.log(e));
  };
  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };
  Cerrar = () => {
    console.log('se tiene que cerrar')
    const nav = document.getElementById("main-nav");
    nav.classList.remove('show')
  }
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

        <div className="CourseDetail__Container" onClick={this.Cerrar}>
          <div>
            <h1 className="CourseDetail__title">Lista de alumnos</h1>
          </div>

          <table className="CourseDetail__table">
          <tbody className="CourseDetail__table-body">
              {/* <tr className="CourseDetail__table-tr">
                <th className="CourseDetail__table-th">Apellidos</th>
                <th className="CourseDetail__table-th">Nombres</th>
                <th className="CourseDetail__table-th">Competencia 1</th>
                <th className="CourseDetail__table-th">Competencia 2</th>
                <th className="CourseDetail__table-th">Competencia 3</th>
                <th className="CourseDetail__table-th">Competencia 4</th>
              </tr> 
               */}
              {this.state.students.map(alumno => (
              <tr className="CourseDetail__table-tr" key={alumno._id}>
               <td className="CourseDetail__table-td" data-th="Apellidos">
                  <h1>{alumno.name_stu}</h1>
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
            ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}