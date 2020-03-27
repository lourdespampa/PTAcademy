import React, { Component } from "react";
import axios from "axios";
import iconExit from "../../img/cerrar1.png";

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_class: "",
      valueType: "0",
      questions: [],
      type: "",
      question: "",
      answer: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
      newQuestionModal: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveInputs = this.saveInputs.bind(this);
  }

  componentDidMount() {
    console.log(this.props.apiUrl);
    console.log(this.props.id_class);
    console.log(this.state.questions);
    // "add form": "POST  /v1/api/form/add_form/:id_class    (questions:array)",
    // "get form": "GET  /v1/api/form/get_form/:id_class",
    this.getQuestions();
  }
  setShow = () => {
    this.setState({ newQuestionModal: 1 });
  };
  setClose = () => {
    this.setState({ newQuestionModal: 2 });
  };
  getQuestions() {
    var varToken = localStorage.getItem("token");
    axios({
      url: `${this.props.apiUrl}/v1/api/form/get_form/${this.props.id_class}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange = e => {
    this.setState({
      valueType: e.target.value
    });
  };
  saveInputs = e => {
    switch (this.state.valueType) {
      case "0":
        console.log("no se realiza ninguna accion");
        break;
      case "1":
        this.setState({
          [e.target.name]: e.target.value
        });

        break;
      case "2":
        this.setState({
          [e.target.name]: e.target.value
        });
        break;
      case "3":
        this.setState({
          [e.target.name]: e.target.value
        });
        break;
      case "4":
        console.log("cuarta opcion");
        break;
      default:
        console.log("errr");
        break;
    }
  };
  saveQuestion = () => {
    switch (this.state.valueType) {
      case "0":
        console.log("no se realiza ninguna accion");
        break;
      case "1":
        if (this.state.question !== "") {
          this.state.questions.push({
            type: this.state.valueType,
            pregunta: this.state.question,
            res1: this.state.answer1,
            res2: this.state.answer2,
            res3: this.state.answer3,
            res4: this.state.answer4,
            correctAnswer: this.state.correctAnswer
          });
          this.setState(this.state);
        } else {
          console.log("esta vacio los campos");
        }

        break;
      case "2":
        if (this.state.question !== "") {
          this.state.questions.push({
            type: this.state.valueType,
            pregunta: this.state.question,
            correctAnswer: this.state.answer
          });
        } else {
          console.log("esta vacio los campos");
        }
        this.setState(this.state);

        break;
      case "3":
        if (this.state.question !== "") {
          this.state.questions.push({
            type: this.state.valueType,
            pregunta: this.state.question,
            correctAnswer: this.state.answer
          });
        } else {
          console.log("esta vacio los campos");
        }
        this.setState(this.state);
        break;
      default:
        console.log(this.state.questions);
    }
  };
  handleSubmit = e => {
    console.log(this.state.questions);
    e.preventDefault();
    axios({
      url: `${this.props.apiUrl}/v1/api/form/add_form/${this.props.id_class}`,
      method: "POST",
      data: { questions: this.state.questions }
    })
      .then(res => {
        console.log(res);
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let { questions } = this.state;
    return (
      <>
        <div>seccion donde se van a mostrar los formularios</div>
        <div
          id="modal-general_container"
          className={
            this.state.newQuestionModal === 0
              ? ""
              : this.state.newQuestionModal === 1
              ? "six"
              : this.state.newQuestionModal === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={this.setClose}>
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-formulario">
                  {questions.map((pregunta, id) => {
                    return (
                      <div key={id}>
                        pregunta {id + 1}
                        {pregunta.type === "1" ? (
                          <div>
                            pregunta: {pregunta.pregunta}
                            <br />
                            respuesta 1: {pregunta.res1}
                            <br />
                            respuesta 2: {pregunta.res2}
                            <br />
                            respuesta 3: {pregunta.res3}
                            <br />
                            respuesta 4: {pregunta.res4}
                            <br />
                          </div>
                        ) : pregunta.type === "2" ? (
                          <div>
                            pregunta: {pregunta.pregunta}
                            <br />
                            respuesta correcta: {pregunta.correctAnswer}
                            <br />
                          </div>
                        ) : pregunta.type === "3" ? (
                          <div>
                            pregunta: {pregunta.pregunta}
                            <br />
                            respuesta correcta: {pregunta.correctAnswer}
                            <br />
                          </div>
                        ) : pregunta.type === "4" ? (
                          <div>pregunta tipo 4</div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <form onSubmit={this.handleSubmit}>
                  <select
                    value={this.state.handleChange}
                    onChange={this.handleChange}
                    name="tipo"
                  >
                    <option value="0">seleccionar</option>
                    <option value="1">Para marcar</option>
                    <option value="2">True and false</option>
                    <option value="3">responder preguntar</option>
                    <option value="4">Rellenar</option>
                  </select>
                  {this.state.valueType === "1" ? (
                    <div>
                      <div onChange={this.saveInputs.bind(this)}>
                        <label>pregunta</label>
                        <input
                          type="text"
                          placeholder="insertar pregunta"
                          name="question"
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="escriba su primera respuesta"
                          name="answer1"
                        />
                        <input
                          type="radio"
                          value="answer1"
                          name="correctAnswer"
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="escriba su segunda respuesta"
                          name="answer2"
                        />
                        <input
                          type="radio"
                          value="answer2"
                          name="correctAnswer"
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="escriba su tercera respuesta"
                          name="answer3"
                        />
                        <input
                          type="radio"
                          value="answer3"
                          name="correctAnswer"
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="escriba su cuarta respuesta"
                          name="answer4"
                        />
                        <input
                          type="radio"
                          value="answer4"
                          name="correctAnswer"
                        />
                        <br />
                      </div>
                      <button type="button" onClick={this.saveQuestion}>
                        AÑADIR PREGUNTA
                      </button>
                    </div>
                  ) : this.state.valueType === "2" ? (
                    <div>
                      <input
                        type="text"
                        placeholder="insertar preguntar"
                        onChange={this.saveInputs}
                        name="question"
                      />
                      <div onChange={this.saveInputs.bind(this)}>
                        <input
                          type="radio"
                          value="true"
                          name="answer"
                          id="true"
                        />
                        <label htmlFor="true">verdadero</label>
                        <input
                          type="radio"
                          id="false"
                          value="false"
                          name="answer"
                        />
                        <label htmlFor="false">falso</label>
                      </div>
                      <button type="button" onClick={this.saveQuestion}>
                        AÑADIR PREGUNTA
                      </button>
                    </div>
                  ) : this.state.valueType === "3" ? (
                    <div>
                      pregunta para responder
                      <div>
                        <label>insertar pregunta</label>
                        <input
                          onChange={this.saveInputs}
                          name="question"
                          type="text"
                          placeholder="insertar preguntar"
                        />
                        <input
                          onChange={this.saveInputs}
                          name="answer"
                          type="text"
                          placeholder="insertar respuesta"
                        />
                        <button type="button" onClick={this.saveQuestion}>
                          AÑADIR PREGUNTA
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>pregunta para rellenar</div>
                  )}
                  <input type="submit" value="GUARDAR FORMULARIO" />
                </form>
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
        {/*  */}
        {/* */}
        <button
          className="modal-body__button backCursos"
          onClick={() => this.setShow()}
        >
          <div className="button-zoom">AGREGAR FORMULARIO</div>
        </button>
      </>
    );
  }
}
