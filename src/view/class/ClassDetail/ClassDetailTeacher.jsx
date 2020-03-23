import React, { Component } from "react";
import axios from "axios";
import iconExit from "../../../img/cerrar1.png";
import NavClass from "./NavClass";
import Upload from "../../classAndCourse/upload/Upload";
import './ClassDetail.sass'
import AllQuestions from "./AllQuestions";
export default class ClassDetailTeacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id_class: '',
      fileActual: '',
      newQuestionModal: 0,
      preguntas: [],
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: 'rojo',


    }

    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    // this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }
  componentDidMount() {
    this.vistaBancoPreguntas();
    var varToken = localStorage.getItem("token");
    const {
      match: { params }
    } = this.props;
    this.setState({ id_class: params.id });

    console.log(params.id)
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/presentation_detail/${params.id}`,
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
  clearAll = () => {
    this.state.question = '';
    this.state.answer1 = '';
    this.state.answer2 = '';
    this.state.answer3 = '';
    this.state.answer4 = '';
    this.state.correctAnswer = '';
  }
  setShow = () => {
    this.setState({ newQuestionModal: 1 });
  };
  setClose = () => {
    this.setState({ newQuestionModal: 2 });
  };
  bancoPreguntas = () => {
    var varToken = localStorage.getItem("token");
    var clase = this.state.id_class;
    var data = {
      question: this.state.question,
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
      correctAnswer: this.state.correctAnswer
    }
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
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    this.setState({ "newQuestionModal": 2 });

  }
  vistaBancoPreguntas = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ id_class: params.id });

    console.log(params.id)
    var varToken = localStorage.getItem("token");
    // var clase = this.id_class;
    console.log(this.props.apiUrl)
    axios({
      url: `${this.props.apiUrl}/v1/api/question/get_questions/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then((res) => {
      this.setState({
        preguntas: res.data
      })
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  handleChangeQuestion = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
    console.log(name, value);
    if (name === 'correctAnswer') {
      switch (e.target.value) {
        case 'answer1':
          this.setState({ 'correctAnswer': "answer1" });
        case 'answer2':
          this.setState({ 'correctAnswer': "answer2" });
        case 'answer3':
          this.setState({ 'correctAnswer': "answer3" });
        case 'answer4':
          this.setState({ 'correctAnswer': "answer4" });
      }
    }
  }

  render() {
    const { question, answer1, answer2, answer3, answer4 } = this.state;
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
                              <input type="radio" id="color-1" name="correctAnswer" value="rojo"
                                checked={this.state.correctAnswer === 'rojo'}
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
                              <input type="text" id="res2" className="triviaT-input-respuestas" name="answer2" value={answer2} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-2" name="correctAnswer" value="naranja"
                                checked={this.state.correctAnswer === 'naranja'}
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
                              <input type="text" id="res3" className="triviaT-input-respuestas" name="answer3" value={answer3} onChange={this.handleChangeQuestion} autoComplete="off" />
                              <input type="radio" id="color-3" name="correctAnswer" value="azul"
                                checked={this.state.correctAnswer === 'azul'}
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
                              <input type="radio" id="color-4" name="correctAnswer" value="verde"
                                checked={this.state.correctAnswer === 'verde'}
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
                      <button className="modal-body__button backCursos" onClick={() => this.setShow() + this.clearAll()}>
                        <div className="button-zoom">AGREGAR PREGUNTA</div>
                      </button>
                    </div>
                  </div>
                  <div className="triviaQuestionsBody">
                    <ul className="Questions-ListCards">
                      {this.state.preguntas.length > 0 ? (
                        this.state.preguntas.map((preguntita, id) => (
                      <li className="Question-cards" key={id}>
                        {preguntita.question}
                      </li>
                        ))
                          ) : (<h3 className="Questioncards-nullcards">Cargando cursos... Si no tiene, puede crear uno.</h3>
                      )}
                      
                    </ul>
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
