import React, { Component, useState } from "react";
import {Link, Redirect } from 'react-router-dom'
import "../courses/Course.sass";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import FormularioCourse from './FormPostCourse'
import FormularioClass from './FormPostClass'
import iconExit from "../../img/cerrar.png";


function BotonAgregar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AgregarClick=()=>setShow(false)+props.getdata()

  return (
    <>
      <div className="teacherCourses__main-menu__addCourse" onClick={handleShow}>
        Agregar {props.agregarX}
      </div>
      <Modal className="modal-teacher__general" show={show} onHide={handleClose} animation={false}>
        <button className="modal-teacher__general-close" onClick={() => setShow(false)+props.botonClick('modalvideo')}>
          <img className="modal-teacher__general-cross" src={iconExit} alt="imagen de cerrar modal" />
        </button>
        <Modal.Header>
          <Modal.Title >Agregando {props.agregarX}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (props.agregarX === 'course')?
          <FormularioCourse apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} />
          :
          <FormularioClass apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse}/>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
function BotonCerrarSesion(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="teacherCourses__main-menu__LogOut" onClick={handleShow}>
        Cerrar sesion
      </div>
      <Modal className="modal-teacher__general" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-header__title-question">¿DESEA CERRAR SESIÓN?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonToolbar>
            <Link to='/'><Button id="modal-body__button-yes" className="btn" variant="primary" size="sm" onClick={props.cerrarSesion}>SI</Button></Link>
            <Button id="modal-body__button-no" className="btn" variant="secondary" size="sm" onClick={handleClose}>NO</Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default class NavCourse extends Component {
  state = {
    token: false
  }

  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token")
    await this.setState({token: tokenStorage})
  }

  cerrarSesion = () => {
    localStorage.clear();
    this.setState({token: null})
  }

  Abrir = () => {
    const nav = document.getElementById("main-nav");
          nav.classList.toggle("show");
  }
  render() {
    return (
      <>
        {this.state.token ? null : <Redirect to="/notfound"></Redirect>}
         <header className="teacherCourses__main-header">
          <div className="teacherCourses__l-container teacherCourses__main-header__block">
            <h3>Bienvenido(a) {this.props.nombreProfesor.replace(/\w\S*/g, (s) => (s.replace(/^\w/, (c) => c.toUpperCase())))} </h3>
            
            <div
              className="teacherCourses__main-menu-toggle"
              id="main-menu-toggle"
              onClick={this.Abrir}
            ></div>
            <nav className='teacherCourses__main-nav' id="main-nav">
              <ul className="teacherCourses__main-menu">
                <li className="teacherCourses__main-menu__item">
                  <BotonAgregar 
                    apiUrl={this.props.apiUrl} idteacher={this.props.idteacher} idcourse={this.props.idcourse} 
                    agregarX={this.props.agregarX} getdata={this.props.getdata}>
                  </BotonAgregar>
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
