import React, { useState, Component } from "react";
import axios from "axios";
import iconExit from "../../../img/cerrar1.png";
import NavClass from "./NavClass";
import Upload from "../../classAndCourse/upload/Upload"
import './ClassDetail.sass'
export default class ClassDetailTeacher extends Component {
  state = {
    id_class: '',
    fileActual: '',
    newQuestionModal: 0,
  }
  componentDidMount() {
    var varToken = localStorage.getItem("token");
    const {
      match: { params }
    } = this.props;
    this.setState({ id_class: params.id });
    console.log(params.id)
    axios({
      url: `http://192.168.1.66:4200/v1/api/teacher/presentation_detail/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then(({ data }) => {
      console.log(data.name)
      this.setState({
        fileActual: data.name
      });
    });
  };
  setShow = () => {
    this.setState({ newQuestionModal: 1 });
  };
  setClose = () => {
    this.setState({ newQuestionModal: 2 });
  };
  render() {
    return (
      <>
        <NavClass apiUrl={this.props.apiUrl}></NavClass>
        <div className="contenedor-Items">
          <ul className="Item-cards">
            <li className="Item-cards__item">
              <div className="Item-card">
                <div className="Item-card__content">
                  <div className="Item-card__title">
                    Diapositivas
                      </div><br />
                  <div className="Item-card__text">
                    <Upload EditDiapo={true} id_class={this.state.id_class} fileActual={[{
                      name: this.state.fileActual,
                      lastModified: 1568327872965,
                      webkitRelativePath: "",
                      size: 3195833,
                      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    }]} />
                  </div>
                </div>
              </div>
            </li>
            <li className="Item-cards__item">
              <div className="Item-card">
                <div className="Item-card__content">
                  <div className="Item-card__title">
                    Formularios
                      </div><br />
                  <div className="Item-card__text">

                  </div>
                </div>
              </div>
            </li>
            <li className="Item-cards__item">
              <div className="Item-card">
                <div className="Item-card__content">
                  <div className="Item-card__title">
                    Trivia
                  </div>
                  <br />
                  <div id="modal-general_container" className={this.state.newQuestionModal === 0 ? "" : this.state.newQuestionModal === 1 ? "six" : this.state.newQuestionModal === 2 ? "six out" : ""}>
                    <div className="modal-general_background">
                      <div className="modal-general_bg_content">
                        <button
                          className="modal-general_close"
                          onClick={this.setClose}
                        >
                          <img
                            className="button-zoom"
                            src={iconExit}
                            alt="imagen de cerrar modal"
                          />
                        </button>
                        <div className="modal-general_container">
                          <div className="Item-card_createquestion">
                            <label className="triviaPregunta">Pregunta</label>
                            <input type="text" id="pregunta" className="triviaT-input-pregunta" value={this.state.pregunta} onChange={this.changeQuestion} autoComplete="off" />
                            <label className="triviaRepuestas">Respuesta 1</label>
                            <br />
                            <br />
                            <div className="triviaT-contenedor-respuesta custom-radios">
                              <input type="text" id="res1" className="triviaT-input-respuestas" value={this.state.respuestaOne} onChange={this.changeAnswer1} autoComplete="off" />
                              <input type="radio" id="color-1" name="color" value="rojo"
                                checked={this.state.selectedCorrectAnswer === 'rojo'}
                                onChange={this.handleCorrectAnswer}
                              />
                              <label htmlFor="color-1">
                                <span>
                                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                </span>
                              </label>
                            </div>
                            <label className="triviaRepuestas">Respuesta 2</label>
                            <br />
                            <div className="triviaT-contenedor-respuesta custom-radios">
                              <input type="text" id="res3" className="triviaT-input-respuestas" value={this.state.respuestaTree} onChange={this.changeAnswer3} autoComplete="off" />
                              <input type="radio" id="color-2" name="color" value="naranja"
                                checked={this.state.selectedCorrectAnswer === 'naranja'}
                                onChange={this.handleCorrectAnswer}
                              />
                              <label htmlFor="color-2">
                                <span>
                                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                </span>
                              </label>
                            </div>
                            <label className="triviaRepuestas">Respuesta 3</label>
                            <br />
                            <div className="triviaT-contenedor-respuesta custom-radios">
                              <input type="text" id="res2" className="triviaT-input-respuestas" value={this.state.respuestaTwo} onChange={this.changeAnswer2} autoComplete="off" />
                              <input type="radio" id="color-3" name="color" value="azul"
                                checked={this.state.selectedCorrectAnswer === 'azul'}
                                onChange={this.handleCorrectAnswer}
                              />
                              <label htmlFor="color-3">
                                <span>
                                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                </span>
                              </label>
                            </div>
                            <label className="triviaRepuestas">Respuesta 4</label>
                            <br />
                            <div className="triviaT-contenedor-respuesta custom-radios">
                              <input type="text" id="res4" className="triviaT-input-respuestas" value={this.state.respuestaFour} onChange={this.changeAnswer4} autoComplete="off" />
                              <input type="radio" id="color-4" name="color" value="verde"
                                checked={this.state.selectedCorrectAnswer === 'verde'}
                                onChange={this.handleCorrectAnswer}
                              />
                              <label htmlFor="color-4">
                                <span>
                                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                </span>
                              </label>
                            </div>
                            <div className="footerTriviaClass">
                              <button className="modal-body__button yes">
                                <div className="button-zoom">AGREGAR</div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <svg
                          className="modal-general_svg"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                        >
                          <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="footerTriviaClass">
                    <button className="modal-body__button backCursos" onClick={this.setShow}>
                      <div className="button-zoom">AGREGAR PREGUNTA</div>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
