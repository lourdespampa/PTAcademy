import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
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
            <div id="modal-general_container" className={show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""}>
                <div className="modal-general_background">
                    <div className="modal-general_bg_content">
                        <button className="modal-general_close" onClick={handleClose}>
                            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                        </button>
                        <div className="modal-general_container">
                            <div className="modal-general_container_header">
                                <span className="modal-title__controlname">¿DESEA CERRAR SESIÓN?</span>
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
                            <button className="modal-body__button  backCursos" onClick={props.ExitSocket}>
                                <Link style={{ textDecoration: "none" }} to={`/CoursesTeacher/${user._id}`}>
                                    <div className="button-zoom">REGRESAR A CURSOS</div>
                                </Link>
                            </button>
                        </div>
                        </div>
                        <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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
    handleShow = () => this.setState({ codigoModal: 1 });

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

                            {localStorage.getItem("token") ? <BotonSalir ExitSocket={this.props.ExitSocket} cerrarSesion={this.props.cerrarSesion} /> : null}

                        </div>
                        <div id="modal-general_container" className={this.state.codigoModal === 0 ? "" : this.state.codigoModal === 1 ? "six" : this.state.codigoModal === 2 ? "six out" : ""}>
                            <div className="modal-general_background" >
                                <div className="modal-general_bg_content">
                                    <button className="modal-general_close" onClick={this.handleClose}>
                                        <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                                    </button>
                                    <div className="modal-general_container">
                                        <div className="modal-general_container_header">
                                            <span className="modal-title">CODIGO DE LA CLASE:</span>
                                        </div>
                                        <div className="modal-general_container_body codigogenerado">
                                            <span id="modal-content__codigogenerado">{this.props.id_access}</span>
                                        </div>
                                    </div>
                                    <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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