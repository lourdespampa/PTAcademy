import React, { Component, useState } from "react";
import {Link} from 'react-router-dom'
import "./Course.css";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import Formulario from './FormPostCourse'
function BotonAgregar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AgregarClick=()=>setShow(false)+props.getCursos
  return (
    <>
      <button variant="primary" onClick={handleShow}>
        Agregar curso
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Agregando curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formulario handleClose={AgregarClick} ></Formulario>
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
      <button variant="primary" onClick={handleShow}>
        Cerrar sesion
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Desea cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonToolbar>
            <Link to='/'><Button variant="primary" size="sm">Si</Button></Link>
            <Link><Button variant="secondary" size="sm" onClick={handleClose}>No</Button></Link>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default class NavCourse extends Component {
  render() {
    return (
      <>
        <div className="navegador">
          <input type="checkbox" id="navegador-check" />
          <div className="navegador-header">
            <img
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
              width="40px" alt="some value"
            />
            <div className="navegador-title">{this.props.nombreProfesor}</div>
          </div>
          <div className="navegador-btn">
            <label htmlFor="navegador-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="navegador-links">
            <BotonAgregar getCursos={this.props.getCursos}></BotonAgregar>
          </div>
          <div className="navegador-links">
            <BotonCerrarSesion />
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        ></div>
      </>
    );
  }
}
