import React, { Component, useState } from "react";
import {Link} from 'react-router-dom'
import "../courses/Course.sass";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import FormularioCourse from './FormPostCourse'
import FormularioClass from './FormPostClass'
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
      <Modal id="modal-teacher__general2" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title >Agregando {props.agregarX}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (props.agregarX=='course')?
          <FormularioCourse apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} />
          :
          <FormularioClass apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse}/>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
function BotonCerrarSesion() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="teacherCourses__main-menu__LogOut" onClick={handleShow}>
        Cerrar sesion
      </div>
      <Modal size={'lg'} show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Desea cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonToolbar>
            <Link to='/'><Button variant="primary" size="sm">Si</Button></Link>
            <Button variant="secondary" size="sm" onClick={handleClose}>No</Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default class NavCourse extends Component {
  Abrir = () => {
    const nav = document.getElementById("main-nav");
          nav.classList.toggle("show");
  }
  render() {
    console.log(this.props)
    return (
      <>
         <header className="teacherCourses__main-header">
          <div className="teacherCourses__l-container teacherCourses__main-header__block">
            <h3>Nombre del querido profesor </h3>
            
            <div
              className="teacherCourses__main-menu-toggle"
              id="main-menu-toggle"
              onClick={this.Abrir}
            ></div>
            <nav className='teacherCourses__main-nav' id="main-nav">
              <ul className="teacherCourses__main-menu">
                <li className="teacherCourses__main-menu__item">
                  <BotonAgregar apiUrl={this.props.apiUrl} idteacher={this.props.idteacher} idcourse={this.props.idcourse} agregarX={this.props.agregarX}
             getdata={this.props.getdata}>
                  </BotonAgregar>
                </li>
                <li className="teacherCourses__main-menu__item">
                  <BotonCerrarSesion>
                  </BotonCerrarSesion>
                </li>
              </ul> 
            </nav>
          </div>
        </header>
      </>
    );
  }
}
