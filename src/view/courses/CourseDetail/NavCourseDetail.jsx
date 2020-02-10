import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import iconExit from "../../../img/cerrar.png";
import FormAddStudent from "./FormAddStudent";
import iconBack from "../../../img/back_button.svg";
function BotonAgregar(props) {
  const [show, setShow] = useState(0);
  const handleClose = () => setShow(2);
  const handleShow = () => setShow(1);
  const AgregarClick = () => setShow(false) + props.getdata();
  return (
    <>
      <div
        className="teacherCourses__main-menu__addCourse"
        onClick={handleShow}
      >
        Agregar Alumno
      </div>
      <div
        id="modal-general_container"
        className={
          show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""
        }
      >
        <div className="modal-general_background">
          <div className="modal-general_bg_content">
            <button className="modal-general_close" onClick={handleClose}>
              <img
                className="button-zoom"
                src={iconExit}
                alt="imagen de cerrar modal"
              />
            </button>
            <div className="modal-general_container">
              <FormAddStudent
                handleClose={AgregarClick}
                apiUrl={props.apiUrl}
                idcourse={props.idcourse}
                idteacher={props.idteacher}
              />
            </div>
            <svg
              className="modal-general_svg"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
function BotonCerrarSesion(props) {
  const [show, setShow] = useState(0);
  const handleClose = () => setShow(2);
  const handleShow = () => setShow(1);
  return (
    <>
      <div className="teacherCourses__main-menu__LogOut" onClick={handleShow}>
        Cerrar sesion
      </div>
      <div
        id="modal-general_container"
        className={
          show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""
        }
      >
        <div className="modal-general_background">
          <div className="modal-general_bg_content">
            <button className="modal-general_close" onClick={handleClose}>
              <img
                className="button-zoom"
                src={iconExit}
                alt="imagen de cerrar modal"
              />
            </button>
            <div className="modal-general_container">
              <div className="modal-general_container_header">
                <span className="modal-title__controlname">
                  ¿DESEA CERRAR SESIÓN?
                </span>
              </div>
              <div className="modal-general_container_body">
                <Link style={{ textDecoration: "none" }} to="/">
                  <button
                    className="modal-body__button yes"
                    onClick={props.cerrarSesion}
                    variant="primary"
                  >
                    <div className="button-zoom">SI</div>
                  </button>
                </Link>

                <button className="modal-body__button no" onClick={handleClose}>
                  <div className="button-zoom">NO</div>
                </button>
              </div>
            </div>
            <svg
              className="modal-general_svg"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default class NavCourse extends Component {
  state = {
    token: false
  };

  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token");
    await this.setState({ token: tokenStorage });
  };

  cerrarSesion = () => {
    localStorage.clear();
    this.setState({ token: null });
  };

  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };

  render() {
    return (
      <>
        {this.state.token ? null : <Redirect to="/notfound"></Redirect>}
        <div className="teacherCourses__floatingActionButton teacherCourses_editStudent"><i className="fas fa-edit"></i></div>
        <div className="teacherCourses__floatingActionButton teacherCourses_addStudent" onClick={this.props.handleAddStudent}><i className="fas fa-plus"></i></div>
        <header className="teacherCourses__main-header">
          <div className="teacherCourses__l-container teacherCourses__main-header__block">
            <Link
              to={`/CoursesTeacher/${this.props.idteacher}`}
              style={{ textDecoration: "none" }}
            >
              <img src={iconBack} alt="imgagen de volver atras" />
            </Link>
            <h3>Bienvenido(a) </h3>

            <div
              className="teacherCourses__main-menu-toggle"
              id="main-menu-toggle"
              onClick={this.Abrir}
            ></div>
            {/* <div className="teacherCourseNav" onClick={this.SegundaFuncion}></div> */}

            <nav className="teacherCourses__main-nav" id="main-nav">
              <ul className="teacherCourses__main-menu">
                <li className="teacherCourses__main-menu__item">
                  <BotonAgregar
                    apiUrl={this.props.apiUrl}
                    idteacher={this.props.idteacher}
                    idcourse={this.props.idcourse}
                    agregarX={this.props.agregarX}
                    getdata={this.props.getdata}
                  ></BotonAgregar>
                </li>
                <li className="teacherCourses__main-menu__item">
                  <BotonCerrarSesion cerrarSesion={this.cerrarSesion} />
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
  }
}
