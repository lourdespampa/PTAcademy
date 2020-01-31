import React, { Component, useState } from "react";
import {Link, Redirect } from 'react-router-dom'
import "../courses/Course.sass";
import { Modal, ButtonToolbar } from "react-bootstrap";
import FormularioCourse from './FormPostCourse'
import FormularioClass from './FormPostClass'
import iconExit from "../../img/cerrar.png";
import Loanding from "../../components/teacher/loanding/spinner"
function BotonAgregar(props) {
  const [show, setShow] = useState(false);
  const [activarX, setActivarX] = useState(true);
  const [loanding, setLoanding] = useState(false);
  //no se esta usando esta variable
  const handleDisableX = () => setActivarX(false)+setLoanding(true)
  const handleClose = () => setActivarX(true)+setShow(false)
  const handleEnableX=()=>setActivarX(true)+setLoanding(false)
  const handleShow = () => setShow(true);
  const AgregarClick=()=>setShow(false)+props.getdata()
  return (
    <>
    {loanding?
    <Loanding/>:null

    }
      <div className="teacherCourses__main-menu__addCourse" onClick={handleShow}>
        Agregar {props.agregarX}
      </div>
      <Modal className="modal-teacher__general" show={show} onHide={handleClose} animation={false}>
          {
            activarX
            ?
            <button className="modal-teacher__general-close" onClick={handleClose}>
            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
            </button>
            :
            <button className="modal-teacher__general-close" onClick={handleClose} disabled>
            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
            </button>
          }
        <Modal.Header>
          <Modal.Title >Agregando {props.agregarX}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (props.agregarX === 'curso')?
          <FormularioCourse apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} menuToggleNavbar={props.menuToggleNavbar}/>
          :
          <FormularioClass handleEnableX={handleEnableX} handleDisableX={handleDisableX}  apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} menuToggleNavbar={props.menuToggleNavbar}/>
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
          <button className="modal-teacher__general-close" onClick={handleClose}>
            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
          </button>
        <Modal.Header>
          <Modal.Title id="modal-header__title-question">¿DESEA CERRAR SESIÓN?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonToolbar>
            <button className="modal-body__button yes" onClick={props.cerrarSesion} variant="primary">
                <Link style={{textDecoration:"none"}} to="/">
                  <div className="button-zoom">SI</div>
                </Link>
            </button>
            <button className="modal-body__button no" onClick={handleClose}>
                <div className="button-zoom">NO</div>
            </button>
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

  AbriryCerrar = () => {
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
              onClick={this.AbriryCerrar}
            ></div>
            <nav className='teacherCourses__main-nav' id="main-nav">
              <ul className="teacherCourses__main-menu">
                <li className="teacherCourses__main-menu__item">
                  <BotonAgregar 
                    apiUrl={this.props.apiUrl} idteacher={this.props.idteacher} idcourse={this.props.idcourse} 
                    agregarX={this.props.agregarX} getdata={this.props.getdata} menuToggleNavbar={this.AbriryCerrar}>
                  </BotonAgregar>
                </li>
                {this.props.agregarX==='clase'?
                <li className="teacherCourses__main-menu__item">
                  <Link to={`/CoursesTeacher/${this.props.idteacher}`} style={{textDecoration: 'none'}}>
                    <div className="teacherCourses__main-menu__LogOut">
                      Regresar a cursos
                    </div>
                  </Link>
                </li>
                :null}
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
