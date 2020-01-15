import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

import './HeaderCode.sass'
function BotonSalir(props) {
    var user = JSON.parse(localStorage.getItem('user'));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     useEffect(() => console.log(user._id) );
    return (
      <>
        <div className="Header-code" onClick={handleShow}>   
        <li className="code-btn-menu material-icons" style={{ fontSize: "50px"}}>exit_to_app</li>
        </div>
        <Modal size={'lg'} show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>¿Desea cerrar sesión?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ButtonToolbar>
            <Link to='/' onClick={()=>props.ExitSocket()} variant="primary"><Button variant="secondary" size="sm" onClick={handleClose}>Si</Button></Link>`      `
            <Link><Button variant="secondary" size="sm" onClick={handleClose}>No</Button></Link>`      `
            {/* falta cambiar esta id_teacher estatica */}
            <Link to={`/CoursesTeacher/${user._id}`}>
            <Button variant="primary" size="sm" onClick={handleClose}>Regresar a cursos</Button>
            </Link>
          </ButtonToolbar>
          </Modal.Body>
        </Modal>
      </>
    );
  }


function HeaderCode(props){
    const [showcod, setShowcod] = useState(true);
    const handleClose = () => setShowcod(false);
    const handleShow = () => setShowcod(true);
    const codigo = () => {
        // alert('codigo')
    }
    const closeMenu = () => {
        document.getElementById('checked').click()
    }       
    return(
        <div className="Header-code__header" id="Header-code__header">
            <div className="code-clase-detail" onClick={codigo}>
                <h1 className="code-clase-detail__name">
                    Nombre del clase : {props.nombre_clase}
                </h1>
            </div>         
            <div id="menuToggle">
                <input id="checked" type="checkbox" className="check"/>
                <label class="menuToggle__menu-btn" for="checked">
                    <span className="bar top"></span>
                    <span className="bar middle"></span>
                    <span className="bar bottom"></span>
                </label>
                <label className="close-menu" for="checked"></label>
                <nav className="menuToggle__drawer-menu">
                    <ul className="menu-header" > 
                        <li className="menu-header__item"><Link onClick={closeMenu} className="menu-header__item-link" to={`/teacher/${props.id_class}/${props.id_access}`}>LISTA DE ALUMNOS</Link></li> 
                        <li className="menu-header__item"><Link onClick={closeMenu} className="menu-header__item-link" to={`/teacher/${props.id_class}/${props.id_access}/azar`}>AL AZAR</Link></li>
                        <li className="menu-header__item"><Link onClick={closeMenu} className="menu-header__item-link" to={`/teacher/${props.id_class}/${props.id_access}/grupos`}>GRUPOS</Link></li>
                        <li className="menu-header__item"><Link onClick={()=>props.redirect('temporizador')+closeMenu} className="menu-header__item-link" to={`/teacher/${props.id_class}/${props.id_access}/temporizador`}>TEMPORIZADOR</Link></li>
                        <li className="menu-header__item"><Link onClick={()=>props.redirect('trivia')+closeMenu} className="menu-header__item-link" to={`/teacher/${props.id_class}/${props.id_access}/trivia`}>TRIVIA</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="content-headercode">
                <div className="code-detail" onClick={handleShow}>
                    <a href className="code-a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                        <class className="code">Código:</class>
                        <div className="codigo-generado" onClick={handleShow}>
                        {props.id_access}
                        </div>
                    </a>
                </div>
                <div className="code-menu-detail">
                    
                    <BotonSalir ExitSocket={props.ExitSocket}/>
                    
                </div>
                <Modal size={'lg'} show={showcod} className="modal-headercode" onHide={handleClose}>
                <Modal.Header>
                    <h4 className="modal-title"><strong>CODIGO DE LA CLASE:</strong></h4>
                </Modal.Header>
                <Modal.Body>
                    <h1 id="modal-codigogenerado">{props.id_access}</h1>
                </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default HeaderCode;