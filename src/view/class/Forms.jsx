import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idteacher: "",
      valueType: "0",
      questions: [],
      questions1: [],
      questions2: [{
        question : '',
        answer: ''
      }],
      questions3: [],
      questions4: [],
    };
  }

  componentDidMount() {}
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      valueType: e.target.value
    });
  };
  saveInputs = e => {
    console.log(e.target.name, e.target.value);
    switch (this.state.valueType) {
      case "0":
        console.log("no se realiza ninguna accion");
        break;
      case "1":
        // console.log("primera opcion");
        this.setState({[e.target.name]: [e.target.value]})
        break;
      case "2":
        // console.log("segunda opcion");
        this.setState({
          questions2: {
            [e.target.name]: [e.target.value]
          }
        })
        break;
      case "3":
        console.log("tercera opcion");
        break;
      case "4":
        console.log("cuarta opcion");
        break;
      default:
        console.log('errr')
        break;
    }
  };
  saveQuestion = () => {
    console.log("se tiene que guardar la pregunta");
    console.log(this.state.questions1)
  };
  render() {
    return (
      <>
        <NavCourse
          idteacher={localStorage.getItem("id_teacher")}
          agregarX={"formulario"}
        ></NavCourse>
        parte de los formularios
        <div className="ClassTeacher-main">
          <h1 className="courseTeacher-title--class">SECCION DE FORMULARIOS</h1>
          <br></br>
          <button>AGREGAR FORMULARIOS</button>
          <form>
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
                    id=""
                  />
                  <input type="radio" value="answer1" name="answer" />
                  <br />
                  <input
                    type="text"
                    placeholder="escriba su segunda respuesta"
                    name="answer2"
                    id=""
                  />
                  <input type="radio" value="answer2" name="answer" />
                  <br />
                  <input
                    type="text"
                    placeholder="escriba su tercera respuesta"
                    name="answer3"
                    id=""
                  />
                  <input type="radio" value="answer3" name="answer" />
                  <br />
                  <input
                    type="text"
                    placeholder="escriba su cuarta respuesta"
                    name="answer4"
                    id=""
                  />
                  <input type="radio" value="answer4" name="answer" />
                  <br />
                </div>
                <button type="button" onClick={this.saveQuestion}>
                    GUARDAR PREGUNTA
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
                  <input type="radio" value="true" name="answer" id="true" />
                  <label htmlFor="true">verdadero</label>
                  <input type="radio" id="false" value="false" name="answer" />
                  <label htmlFor="false">falso</label>
                </div>
                <button type="button" onClick={this.saveQuestion}>
                  GUARDAR PREGUNTA
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
                  <button type="button" onClick={this.saveQuestion}>
                    GUARDAR PREGUNTA
                  </button>
                </div>
              </div>
            ) : (
              <div>pregunta para rellenar</div>
            )}
          </form>

          <div>
            <div>{/* opcion numero 1  */}</div>
          </div>
        </div>
      </>
    );
  }
}
