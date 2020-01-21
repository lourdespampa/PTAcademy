import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
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
        <img className="btn-setting" onClick={handleShow} width="35px" src={require("../../../img/index/settings.svg")} alt="" />           
        <Modal className="modal-teacher__general" show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title id="modal-header__title-question">¿DESEA CERRAR SESIÓN?</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body__exit">
          <ButtonToolbar>
            <Link id="modal-body__button-yes" className="btn" onClick={props.cerrarSesion} to='/' variant="primary">SI</Link>`      `
            <Link id="modal-body__button-no" className="btn" onClick={handleClose}>NO</Link>`      `
            <Link to={`/CoursesTeacher/${user._id}`}>
            <Button id="modal-body__button-cursos" onClick={handleClose}>Regresar a cursos</Button>
            </Link>
          </ButtonToolbar>
          </Modal.Body>
        </Modal>
      </>
    );
  }


class HeaderCode extends React.Component {
    state = {
        codigoModal: false
    }

    handleClose = () => this.setState({codigoModal: false});
    handleShow = () => this.setState({codigoModal: true});

    closeMenu = () => {
        document.getElementById('checked').click()
    }

    render(){
    return(
        <>
        <div className="Header-code__header" id="Header-code__header">
            <div className="logo">
                <img className="icon-img" height="45px" src={require("../../../img/index/icon.svg")} alt="" />        
                <img className="logo-img" src={require("../../../img/index/logo.svg")} alt="" />        
            </div>
            
            <div className="class-name">
                {this.props.nombre_clase}
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
                        <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}`}>LISTA DE ALUMNOS</Link></li> 
                        <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/azar`}>AL AZAR</Link></li>
                        <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/grupos`}>GRUPOS</Link></li>
                        <li className="menu-header__item"><Link onClick={()=>this.props.redirect('temporizador')+this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/temporizador`}>TEMPORIZADOR</Link></li>
                        <li className="menu-header__item"><Link onClick={()=>this.props.redirect('trivia')+this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/trivia`}>TRIVIA</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="content-headercode">
                <div className="code-detail" onClick={this.handleShow}>
                    <a href className="code-a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                        <class className="code">Código:</class>
                        <div className="codigo-generado" onClick={this.handleShow}>
                        {this.props.id_access}
                        </div>
                    </a>
                </div>
                <div className="code-menu-detail">
                    
                    {localStorage.getItem("token") ? <BotonSalir cerrarSesion={this.props.cerrarSesion} /> : null}
                    
                </div>
                <Modal className="modal-teacher__general" show={this.state.codigoModal} onHide={this.handleClose}>
                    <Modal.Header id="modal-general__header" closeButton>
                        <span className="modal-title"><strong>CODIGO DE LA CLASE:</strong></span>
                    </Modal.Header>
                    <Modal.Body>
                        <span id="modal-content__codigogenerado">{this.props.id_access}</span>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
        </>
    )}
}

export default HeaderCode;