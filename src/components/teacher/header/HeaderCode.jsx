import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import iconExit from "../../../img/cerrar.png";
import './HeaderCode.sass'
function BotonSalir(props) {
    var user = JSON.parse(localStorage.getItem('user'));
    const [show, setShow] = useState(0);
    const handleClose = () => setShow(2);
    const handleShow = () => setShow(1);
    useEffect(() => console.log(user._id));
    return (
        <>
            <img className="btn-setting" onClick={handleShow} width="35px" src={require("../../../img/index/settings.svg")} alt="" />
            {/* <Modal className="modal-teacher__general" show={show} onHide={handleClose} animation={false}>
                <button className="modal-teacher__general-close" onClick={handleClose}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header >
                    <Modal.Title id="modal-header__title-question">¿DESEA CERRAR SESIÓN?</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body__exit">
                    <ButtonToolbar>
                        <button className="modal-body__button yes" onClick={props.cerrarSesion} variant="primary">
                            <Link style={{ textDecoration: "none" }} to="/">
                                <div className="button-zoom">SI</div>
                            </Link>
                        </button>
                        <button className="modal-body__button no" onClick={handleClose}>
                            <div className="button-zoom">NO</div>
                        </button>
                        <Link to={`/CoursesTeacher/${user._id}`}>
                            <Button className="modal-body__button  backCursos" onClick={handleClose}>
                                <div className="button-zoom">REGRESAR A CURSOS</div>
                            </Button>
                        </Link>
                    </ButtonToolbar>
                </Modal.Body>
            </Modal> */}
        <div id="modal-general_container" className={show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""}>
            <div class="modal-general_background">
                <div class="modal-general_bg_content">
                    <button className="modal-general_close" onClick={handleClose}>
                        <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                    </button>
                    <div className="modal-general_container">
                        <div className="modal-general_container_header">
                            <span>¿DESEA CERRAR SESIÓN?</span>
                        </div>
                        <div className="modal-general_container_body">
                            <button className="modal-body__button yes" onClick={props.cerrarSesion} variant="primary">
                                <Link style={{ textDecoration: "none" }} to="/">
                                    <div className="button-zoom">SI</div>
                                </Link>
                            </button>
                            <button className="modal-body__button no" onClick={handleClose}>
                                <div className="button-zoom">NO</div>
                            </button>
                            <button className="modal-body__button  backCursos" onClick={handleClose}>
                                <div className="button-zoom">REGRESAR A CURSOS</div>
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


class HeaderCode extends React.Component {
    state = {
        codigoModal: 0
    }

    handleClose = () => this.setState({ codigoModal: 2 });
    handleShow = () => this.setState({ codigoModal: 1});

    closeMenu = () => {
        document.getElementById('checked').click()
    }

    render() {
        return (
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
                        <input id="checked" type="checkbox" className="check" />
                        <label className="menuToggle__menu-btn" htmlFor="checked">
                            <span className="bar top"></span>
                            <span className="bar middle"></span>
                            <span className="bar bottom"></span>
                        </label>
                        <label className="close-menu" htmlFor="checked"></label>
                        <nav className="menuToggle__drawer-menu">
                            <ul className="menu-header" >
                                <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}`}>LISTA DE ALUMNOS</Link></li>
                                <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/azar`}>AL AZAR</Link></li>
                                <li className="menu-header__item"><Link onClick={this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/grupos`}>GRUPOS</Link></li>
                                <li className="menu-header__item"><Link onClick={() => this.props.redirect('temporizador') + this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/temporizador`}>TEMPORIZADOR</Link></li>
                                <li className="menu-header__item"><Link onClick={() => this.props.redirect('trivia') + this.closeMenu} className="menu-header__item-link" to={`/teacher/${this.props.id_class}/${this.props.id_access}/trivia`}>TRIVIA</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="content-headercode">
                        <div className="code-detail" onClick={this.handleShow}>
                            <label className="code-a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                                <label className="code">Código:</label>
                                <div className="codigo-generado" onClick={this.handleShow}>
                                    {this.props.id_access}
                                </div>
                            </label>
                        </div>
                        <div className="code-menu-detail">

                            {localStorage.getItem("token") ? <BotonSalir cerrarSesion={this.props.cerrarSesion} /> : null}

                        </div>
                        {/* <Modal className="modal-teacher__general" show={this.state.codigoModal} onHide={this.handleClose}>
                    <button className="modal-teacher__general-close" onClick={this.handleClose}>
                        <img className="modal-teacher__general-cross" src={iconExit} alt="imagen de cerrar modal" />
                    </button>
                    <Modal.Header id="modal-general__header">
                        <span className="modal-title">CODIGO DE LA CLASE:</span>
                    </Modal.Header>
                    <Modal.Body>
                        <span id="modal-content__codigogenerado">{this.props.id_access}</span>
                    </Modal.Body>
                </Modal> */}
                        <div id="modal-general_container" className={this.state.codigoModal === 0 ? "" : this.state.codigoModal === 1 ? "six" :this.state.codigoModal === 2 ? "six out" : ""}>
                            <div class="modal-general_background">
                                <div class="modal-general_bg_content">
                                    <button className="modal-general_close" onClick={this.handleClose}>
                                        <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                                    </button>
                                    <div className="modal-general_container">
                                        <div className="modal-general_container_header">
                                            <span>CODIGO DE LA CLASE:</span>
                                        </div>
                                        <div className="modal-general_container_body">
                                            <span id="modal-content__codigogenerado">{this.props.id_access}</span>
                                        </div>
                                    </div>
                                    <svg class="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HeaderCode;