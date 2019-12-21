import React, { Component, useState } from "react";
import "./Course.css";
import { Modal } from "react-bootstrap";
import Formulario from './FormPostCourse'
function BotonAgregar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Formulario></Formulario>
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
            <label htmlFor ="navegador-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="navegador-links">
            <BotonAgregar></BotonAgregar>
          </div>
          <div className="navegador-links">
            <button
              href="http://stackoverflow.com/users/4084003/"
              target="_blank"
            >
              Cerrar sesion
            </button>
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
