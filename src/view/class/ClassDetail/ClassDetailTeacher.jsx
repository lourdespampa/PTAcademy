import React, { useState, Component } from "react";
import axios from "axios";
import iconExit from "../../../img/cerrar1.png";
import NavClass from "./NavClass";
import Upload from "../../classAndCourse/upload/Upload"
import './ClassDetail.sass'
export default class ClassDetailTeacher extends Component {
  constructor (props){
  super(props)
  this.state = {
    id_class: '',
    fileActual: '',
    newQuestionModal: 0,
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    respuestacorrecta: '', 
      
  }
    
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);}
  componentDidMount() {
    this.vistaBancoPreguntas();
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
  bancoPreguntas = () =>{
    var varToken = localStorage.getItem("token");
    var clase = this.state.id_class;
    var data = {
    question: this.state.question,
    answer1: this.state.answer1,
    answer2: this.state.answer2,
    answer3: this.state.answer3,
    answer4: this.state.answer4,
    correctAnswer: this.state.respuestacorrecta }
    console.log(data)
    if (this.state.question === '' || this.state.answer1 === '' || this.state.answer2 === '' || this.state.answer3 === '' || this.state.answer4 === '') {
      return alert('debe completar todos los campos')
    }
    console.log(this.props.apiUrl)
    axios({
      url: `${this.props.apiUrl}/v1/api/question/new_question/${clase}`,
      method: "POST",
      data: data,
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then((res)=>{
      console.log(res)
    }).catch((err)=> {
      console.log(err)
    })

    this.setState({"newQuestionModal": 2 });

  }
  vistaBancoPreguntas = () => {
    const {
      match: { params }
    } = this.props;
     this.setState({ id_class: params.id });
    
    console.log(params.id)
    var varToken = localStorage.getItem("token");
    var clase = this.id_class;
    console.log(this.props.apiUrl)
    axios({
      url: `${this.props.apiUrl}/v1/api/question/get_questions/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  handleChangeQuestion = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name] : value
    })
    console.log(name,value);
    if(name==='respuestacorrecta'){
      switch(e.target.value){
        case 'rojo':
          this.setState({'respuestacorrecta'  :"answer1"});
        case 'naranja':
          this.setState({'respuestacorrecta':"answer2"});
        case 'azul':
          this.setState({'respuestacorrecta':"answer3"});
        case 'verde':
          this.setState({'respuestacorrecta':"answer4"});
        }
    }
  }
  
  handleCorrectAnswer = e => {
    this.setState({
      respuestacorrecta: e.target.value
    });
  }
  render() {
    const {question, answer1, answer2, answer3, answer4} = this.state;
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
                            <input type="text" id="pregunta" className="triviaT-input-pregunta" name="question" value={question} onChange={this.handleChangeQuestion} autoComplete="off" />
                            <label className="triviaRepuestas">Respuesta 1</label>
                            <br />
                            <br />
                            <div className="triviaT-contenedor-respuesta custom-radios">
                              <input type="text" id="res1" className="triviaT-input-respuestas" name="answer1" value={answer1} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-1" name="respuestacorrecta" value="rojo"
                                checked={this.state.respuestacorrecta === 'rojo'}
                                onChange={this.handleChangeQuestion}
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
                              <input type="text" id="res3" className="triviaT-input-respuestas" name="answer2" value={answer2} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-2" name="respuestacorrecta" value="naranja"
                                checked={this.state.respuestacorrecta === 'naranja'}
                                onChange={this.handleChangeQuestion}
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
                              <input type="text" id="res2" className="triviaT-input-respuestas" name="answer3" value={answer3} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-3" name="respuestacorrecta" value="azul"
                                checked={this.state.respuestacorrecta === 'azul'}
                                onChange={this.handleChangeQuestion}
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
                              <input type="text" id="res4" className="triviaT-input-respuestas" name="answer4" value={answer4} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-4" name="respuestacorrecta" value="verde"
                                checked={this.state.respuestacorrecta === 'verde'}
                                onChange={this.handleChangeQuestion}
                              />
                              <label htmlFor="color-4">
                                <span>
                                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                </span>
                              </label>
                            </div>
                            <div className="footerTriviaClass">
                              <button className="modal-body__button yes" onClick={this.bancoPreguntas}>
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
                  <div className="Item-card__text">
                  <div className="footerTriviaClass">
                    <button className="modal-body__button backCursos" onClick={this.setShow}>
                      <div className="button-zoom">AGREGAR PREGUNTA</div>
                    </button>
                  </div>
                  <div className="triviaQuestionsBody">
                    <ul className="QuestionsListClass">
                      <li className="QuestionsClass">¿Esta es una pregunta?
                        <button className="classTrivia__button-delette" >
                          <i className="courseTeacher__img fas fa-trash"></i>
                        </button>
                        <button className="classTrivia__button-Edit">
                          <i className="courseTeacher__img fas fa-edit"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
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
