import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import { Modal ,Button, ButtonToolbar } from "react-bootstrap";
import './HeaderCode.css'
function BotonSalir(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const AgregarClick=()=>setShow(false)+props.getCursos
    return (
      <>
        <div className="menu-detail-content" onClick={handleShow}>   
        <li className="btn-menu material-icons" style={{ fontSize: "50px"}}>exit_to_app</li>
        </div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>¿Desea cerrar sesión?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ButtonToolbar>
            <Button href='/' variant="primary" size="sm">Si</Button>
            <br/><br/>
            <Link ><Button variant="secondary" size="sm" onClick={handleClose}>No</Button></Link>`      `
            <Button href='/CoursesTeacher/5db74edbae96433b08911b38' variant="primary" size="sm" onClick={handleClose}>Regresar a cursos</Button>
          </ButtonToolbar>
          </Modal.Body>
        </Modal>
      </>
    );
  }
function HeaderCode(props){

    return(
        <div className="header">
            <div className="clase-detail">
                <h1>
                    Nombre del clase : {props.nombre_clase}
                </h1>
            </div>
            <div className="code-detail">
                <a href className="a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                    <span>Código:</span>
                    <h3>
                       {props.id_access}
                    </h3>
                </a>
            </div>
            <div className="menu-detail">
                
                <BotonSalir/>
                
            </div>
            <div id="miCodigo" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>CODIGO DE LA CLASE:</strong></h4>
                        </div>
                        <div className="modal-body" style={{fontSize: "100px"}}>
                        {props.id_access}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCode;