import React, { Component } from "react";

import NavCourse from "../classAndCourse/NavCourse";
import AllCourses from "./AllCourses";

import axios from "axios";

import "../courses/Course.sass";
import { Modal } from "react-bootstrap";
import iconExit from "../../img/cerrar.png";

export default class CoursesTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreProfesor: "",
      _id: "",
      show: 0,
      id_curso: "",
      courses: []
    };
  }
  componentDidMount() {
    // en varToken se guarda la variable almacenada del localstorage
    var varToken = localStorage.getItem('token');
    //obtenemos el id de la url pasada a través de las propiedades
    const {
      match: { params }
    } = this.props;
    this.setState({ _id: params.id });
    //luego, obtenemos la lista de cursos del profesor por petición a la API
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id}/course_detail`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        if (data == []) {
          this.setState({ courses: [] });
        } else {
          this.setState({ courses: data });
        }
      })
      .catch(e => console.log(e));
    axios({
      url: `${this.props.apiUrl}/v1/api/admin/user/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then(({ data }) => {
      // console.log(data);
      this.setState({ nombreProfesor: `${data.user_name} ${data.user_lastName}` });
    });
  }
  getCursos=()=>{
    console.log('listar cursos')
    const { match: { params } } = this.props;
    var varToken = localStorage.getItem('token');
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id}/course_detail`,
      method: "GET",
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then( ({ data }) => {
      //  console.log(data)
        if(data == []){
          this.setState({courses: []})
        }else{
          this.setState({courses: data})
      }
    })
      .catch(e => console.log(e));
  }

  deleteCurso = async () => {
    var varToken = localStorage.getItem("token");

    await axios({
      url:`${this.props.apiUrl}/v1/api/teacher/${this.state._id }/${this.state.id_curso}`,
      method:'put',
      headers:{
        'x-access-token': `${varToken}`
      }});
    this.getCursos();
  };
  onClick = id => {
    this.setState({
      id_curso: id
    });
    console.log(id);
  };
  setShow = (nom, val) => {
    this.setState({
      [nom]: val
    });
  };
  render() {
    return (
      <>
        <NavCourse apiUrl={this.props.apiUrl} idcourse={this.state.id_curso} idteacher={this.state._id}
         agregarX={'curso'} nombreProfesor={this.state.nombreProfesor} getdata={this.getCursos}></NavCourse>
        <div className="CourseTeacher-main">
          <h1 className="courseTeacher-title">SECCION DE CURSOS</h1>
          <ul className="courseTeacher-container">
            {this.state.courses.length > 0 ? (
              // <div>true</div>
              this.state.courses.map((cursos, id) => (
                <li className="courseTeacher-cards" key={id}>
                  <AllCourses
                    level={cursos.level}
                    grade={cursos.grade}
                    section={cursos.section}
                    name_course={cursos.course_name}
                    description={cursos.description}
                    imageURL={cursos.imageURL}
                    id={cursos._id}
                    idteacher={this.state._id}
                    onClick={this.onClick}
                    setShow={this.setShow}
                  />
                </li>
              ))
            ) : (
              // <div>false</div>
              <h3 className="courseTeacher-cards__nullCourses">Cargando cursos... Si no tiene, puede crear uno.</h3>
            )}
          </ul>
        </div>
        <div id="modal-general_container" class={this.state.show === 0 ? "" : this.state.show=== 1 ? "six" : this.state.show===2 ?"six out" : ""}>
        <div class="modal-general_background">
          <div class="modal-general_bg_content">
            <button className="modal-general_close" onClick={() => this.setShow("show", 2)}>
              <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
            </button>
            <div className="modal-general_container">
              <div className="modal-general_container_header">
                <span className="modal-title__controlname">¿DESEA ELIMINAR EL CURSO?</span>
              </div>
              <div className="modal-general_container_body">
                <button 
                  className="modal-body__button yes"
                  onClick={() =>
                  this.deleteCurso() + this.setShow("show", 2)}
                  type="button">
                    <div className="button-zoom">SI</div>
                </button>
                <button 
                  className="modal-body__button no"
                  onClick={() => this.setShow("show", 2)}
                  type="button">
                    <div className="button-zoom">NO</div>
                </button>
              </div>
            </div>
            <svg class="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
      </>
    );
  }
}
