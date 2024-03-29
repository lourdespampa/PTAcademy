import React from "react";
// import "./trivia.css";
import "./trivia.sass";
import "./botones.scss";
import iconExit from "../../../img/cerrar.png";
import axios from 'axios';
import io from 'socket.io-client';
import { BtnPuntos } from "../lista/btnpuntos";

// import { Container, Row, Col } from 'reactstrap'; no se esta usando

class Trivia extends React.Component {
  /** 
   * Fix pin 
   *  :: valor inicial de PIN al cargar component
   * */
  pin = ''
  puntaje = 0
  /******************* */
  constructor(props) {
    super(props)
    this.state = {
      todosAlumnos: [],
      pregunta: '',
      tiempo: '5',
      imagen64: '',
      respuestaOne: '',
      respuestaTwo: '',
      respuestaTree: '',
      respuestaFour: '',
      selectedCorrectAnswer: 'rojo',
      preguntaEnviada: false,
      alumnosRecibidos: [],
      modal: false,
      modalQuestions: false,
      navbarResponsive: false,
      showpuntosmas: 0,
      showpuntosmenos: 0,
      point: "",
      _id: "",
      datapoint: {
        positivo: [
          {
            imgen: require("../../../img/lista/punto1.png"),
            valor: 1,
            title: "Ayuda a Otros"
          },
          {
            imgen: require("../../../img/lista/punto2.png"),
            valor: 1,
            title: "Cumplimiento de Tareas"
          },
          {
            imgen: require("../../../img/lista/punto3.png"),
            valor: 1,
            title: "Participacion"
          },
          {
            imgen: require("../../../img/lista/punto4.png"),
            valor: 1,
            title: "Persistencia"
          },
          {
            imgen: require("../../../img/lista/punto5.png"),
            valor: 1,
            title: "responsabilidad"
          },
          {
            imgen: require("../../../img/lista/punto6.png"),
            valor: 1,
            title: "trabajo en equipo"
          }
        ],
        negativo: [
          {
            imgen: require("../../../img/lista/punto-1.png"),
            valor: 1,
            title: "Ayuda a Otros"
          },
          {
            imgen: require("../../../img/lista/punto-2.png"),
            valor: 1,
            title: "Cumplimiento de Tareas"
          },
          {
            imgen: require("../../../img/lista/punto-3.png"),
            valor: 1,
            title: "Participacion"
          }
        ]
      }
    }

    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handleSendQuestion = this.handleSendQuestion.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.changeAnswer1 = this.changeAnswer1.bind(this);
    this.changeAnswer2 = this.changeAnswer2.bind(this);
    this.changeAnswer3 = this.changeAnswer3.bind(this);
    this.changeAnswer4 = this.changeAnswer4.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }

  componentDidMount = () => {
    this.getStudents()
    const {
      id_access,
      socketUrl
    } = this.props
    /** Fix pin */
    this.pin = id_access
    console.log('valor de pin cuando inicia componente: ' + this.pin)
    /** **************** */
    const socket = io(socketUrl, {
      query:
        { pin: this.pin }
    })
    socket.on('pregunta escogida', (data) => {
      const pinTeacher = this.pin.toUpperCase();
      if (data.pin === pinTeacher) {
        this.state.alumnosRecibidos.push(data)
        const temp = this.state.alumnosRecibidos
        this.setState({ alumnosRecibidos: temp })
      }
    })
    setTimeout(() => console.log(this.props), 3000)
  }
  //por buenas practicas, se deberia finalizar toda accion que pueda afectar el rendimiento del componente al morir
  //por lo que toda accion por tiempo se finaliza en este metodo, por ejemplo en la función handleSendQuestion() al final
  //hay un TimeOut
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.pin = ''
  }

  getStudents = () => {
    var varToken = localStorage.getItem('token');
    axios({
      url: `${this.props.apiUrl}/v1/api/lesson/${this.props.id_access}/students/roulette`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    })
      .then((res) => {
        const temp = [];
        res.data.map(alumno => {
          temp.push({ _id: alumno._id, nombre: `${alumno.name_stu} ${alumno.lastName_stu}`, puntos: alumno.point })
        })
        this.setState({ todosAlumnos: temp })
      })
      .catch(e => console.log(e))
  }

  showModal = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
    if (this.state.modal) {

    }
  }
  showModalQ = () => {
    this.setState(state => ({
      modalQuestions: !state.modalQuestions
    }));
    if (this.state.modalQuestions) {

    }
  }
  handleNavbarResponsive = () => {
    this.setState(state => ({
      navbarResponsive: !state.navbarResponsive
    }));
  }
  //Funciones que obtienen los valores de sus respectivos inputs en tiempo real
  changeQuestion = e => {
    this.setState({
      pregunta: e.target.value
    })
  }
  handleChangeTime = e => {
    this.setState({
      tiempo: e.target.value
    })
  }
  handleChangeImage = e => {
    // console.log(e.target.files[0])
    let file = e.target.files[0]
    if (file.type.substr(0, 6) !== "image/") {
      return alert("Ingrese una imagen.")
    }
    var reader = new FileReader();
    reader.onload = eventImg => {
      var result = eventImg.target.result;
      this.setState({ imagen64: result })
      document.getElementById("imgSalida").setAttribute("src", result)
    }
    reader.readAsDataURL(file);
  }
  changeAnswer1 = e => {
    this.setState({
      respuestaOne: e.target.value
    })
  }
  changeAnswer2 = e => {
    this.setState({
      respuestaTwo: e.target.value
    })
  }
  changeAnswer3 = e => {
    this.setState({
      respuestaTree: e.target.value
    })
  }
  changeAnswer4 = e => {
    this.setState({
      respuestaFour: e.target.value
    })
  }
  handleCorrectAnswer = e => {
    this.setState({
      selectedCorrectAnswer: e.target.value
    });
  }

  handleSendQuestion() {
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    if (this.state.preguntaEnviada) {
      console.log("restaurando...")
      this.setState({
        pregunta: '',
        imagen64: '',
        respuestaOne: '',
        respuestaTwo: '',
        respuestaTree: '',
        respuestaFour: ''
      })
      document.getElementById("input-img").value = ""
      document.getElementById("imgSalida").setAttribute("src", "")
      socket.emit('restaurando datos', '')
    } else {
      socket.emit('restaurando datos', '')
      this.setState({ alumnosRecibidos: [] })
      // preguntaEnviada comienza en false por lo que no existe y a partir de aqui se envian los datos...
      const preg = this.state.pregunta,
        resp1 = this.state.respuestaOne,
        resp2 = this.state.respuestaTwo,
        resp3 = this.state.respuestaTree,
        resp4 = this.state.respuestaFour
      //validamos que todos los campos no esten vacios
      if (preg === '' || resp1 === '' || resp2 === '' || resp3 === '' || resp4 === '') {
        return alert('debe completar todos los campos')
      }
      //aqui ya se empiezan a enviar los datos
      const contenido = {
        pregunta: this.state.pregunta,
        tiempo: parseInt(this.state.tiempo, 10),
        imagen: this.state.imagen64,
        respuestaOne: this.state.respuestaOne,
        respuestaTwo: this.state.respuestaTwo,
        respuestaTree: this.state.respuestaTree,
        respuestaFour: this.state.respuestaFour,
        respuestaCorrecta: this.state.selectedCorrectAnswer
      }
      socket.emit('enviando pregunta', contenido)
      this.timeout = setTimeout(() => this.setState({ modal: true }), parseInt(`${this.state.tiempo}000`, 10) + 8000)
    }
    //finalmente cambia el estado del boton a restaurar.
    this.setState(state => ({ preguntaEnviada: !state.preguntaEnviada }));
  }
  
  onClickPoint = (id, point) => {
      this.setState({
      _id: id,
      point: point
    });
    console.log(id, point);
  };
  onClickPointAdd = async valor => {
    const point = this.state.point + valor;
    const data = { point: point };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    this.setState({ "showpuntosmas": 2 });
  };
  onClickPointRemove = async valor => {
    const point = this.state.point - valor;
    const data = { point: point };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    this.setState({ "showpuntosmenos": 2 });
  };

  setShow = (nom, val) => {
    this.setState({ [nom]: val });
  };
  setShowQuestions = (nom, val) => {
    this.setState({ [nom]: val });
  };
  render() {
    return (
      <>
        <div className={this.state.navbarResponsive ? "triviaT-topnav responsive" : "triviaT-topnav"}>
          <a className="titulo-responsive"><h1>PLAYTEC Trivia</h1></a>
          <a>
            <div className="contenedor-btn-enviar">
              {this.state.preguntaEnviada
                ?
                <button className="triviaT-restaurar" onClick={this.handleSendQuestion}>
                  Restaurar
                </button>
                :
                <button className="triviaT-enviar" onClick={this.handleSendQuestion}>
                  Enviar
              </button>
              }
              <button className="triviaT-preguntas" onClick={this.showModalQ}>
                Preguntas
              </button>
              <button className="triviaT-respuestas" onClick={this.showModal}>
                Respuestas
              </button>
            </div>
          </a>
          <a className="titulo"><h1>PLAYTEC Trivia</h1></a>
          <a className="triviaT-icon" onClick={this.handleNavbarResponsive}>
            <i className="fa fa-bars"></i>
          </a>
          {
            this.state.modal
              ?
              <div className="modal-respuestas">
                {/* Modal content */}
                <div className="modal-content-respuestas">
                  <button className="modal-general_closeTrivia" onClick={this.showModal}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                  </button>
                  <h2>Alumnos Finalistas</h2>
                  <ul className="rolldown-list" id="myList">
                    {this.state.alumnosRecibidos.length > 0
                      ?
                      this.state.alumnosRecibidos.map((alumno, index) => (
                        index > 4
                          ?
                          null
                          :
                          this.state.todosAlumnos.map(todoAlumno => (
                            todoAlumno.nombre === alumno.data.alumno
                            ?
                            <li className="lista-contenedora" key={index}>
                              {/* <img className="imagenClasificacion" src={require('./1ro.webp')} width="35"/> */}
                              <div className="trivia-respuestas">
                                <div className="name-contenedor">alumno:&nbsp;&nbsp;{alumno.data.alumno}&nbsp;&nbsp;
                                {/* puntaje:&nbsp;&nbsp;{alumno.data.puntaje}&nbsp;&nbsp; */}
                                </div>
                                <div className="points-contenedor">
                                  puntos:&nbsp;&nbsp;
                                  <button className="button btnMyM material-icons" onClick={() => this.onClickPoint(todoAlumno._id, todoAlumno.puntos) + this.setShow("showpuntosmas", 1)}>
                                    add_circle_outline
                                  </button>
                                  &nbsp;
                                    <label key={index}>{todoAlumno.puntos}</label>
                                  &nbsp;
                                  <button className="button btnMyM material-icons" onClick={() => this.onClickPoint(todoAlumno._id, todoAlumno.puntos) + this.setShow("showpuntosmenos", 1)}>
                                    remove_circle_outline
                                  </button>
                                </div>
                              </div>
                            </li>
                            :
                            null
                          ))
                      ))
                      :
                      <h2>Aún no hay alumnos en el top.</h2>
                    }
                  </ul>

                </div>
              </div>
              :
              null
          }
          {
            this.state.modalQuestions
              ?
              <div className="modal-respuestas">
                <div className="modal-content-respuestas">
                  <button className="modal-general_closeTrivia" onClick={this.showModalQ}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                  </button>
                  <h2>Banco de preguntas</h2>
                </div>
              </div>
              :
              null
          }
        </div>
        <div className="triviaT-cuerpo">
          <form>
            <div className="triviaT-row">
              <div className="triviaT-col-6">
                <label htmlFor="pregunta">Pregunta</label>
                <input type="text" id="pregunta" className="triviaT-input-pregunta" value={this.state.pregunta} onChange={this.changeQuestion} autoComplete="off" />
                <label htmlFor="time">Tiempo</label>
                <select id="time" name="tiempo" className="triviaT-input-pregunta triviaT-input-tiempo" value={this.state.value} onChange={this.handleChangeTime}>
                  <option value="5">5 segundos</option>
                  <option value="10">10 segundos</option>
                  <option value="20">20 segundos</option>
                  <option value="30">30 segundos</option>
                  <option value="60">60 segundos</option>
                </select>
              </div>
              <div className="triviaT-col-6">
                <label htmlFor="input-img">Medio de Comunicación (opcional)</label>
                <div className="triviaT-image-container">
                  <input type="file" id="input-img" className="imagen" onChange={this.handleChangeImage} />
                  <img alt="imagen a enviar " className="triviaT-imgSalida" id="imgSalida" width="120px" height="110px" src="" />
                </div>
              </div>
            </div>
            <div className="triviaT-row">
              <div className="triviaT-col-6">
                <label htmlFor="res1">Respuesta 1</label>
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

                <label htmlFor="res3">Respuesta 2</label>
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

              </div>

              <div className="triviaT-col-6">
                <label htmlFor="res2">Respuesta 3</label>
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

                <label htmlFor="res4">Respuesta 4</label>
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
              </div>

            </div>
          </form>
        </div>
        <div
          id="modal-general_container"
          className={this.state.showpuntosmas === 0 ? "" : this.state.showpuntosmas === 1 ? "six" : this.state.showpuntosmas === 2 ? "six out" : ""}
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showpuntosmas", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">POSITIVO:</span>
                </div>
                <div className="modal-general_container_body">
                  <BtnPuntos
                    data={this.state.datapoint.positivo}
                    funcion={this.onClickPointAdd}
                  />
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
        <div
          id="modal-general_container"
          className={
            this.state.showpuntosmenos === 0 ? "" : this.state.showpuntosmenos === 1 ? "six" : this.state.showpuntosmenos === 2 ? "six out" : ""}
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showpuntosmenos", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">NECESITAS MEJORAR:</span>
                </div>
                <div className="modal-general_container_body">
                  <BtnPuntos
                    data={this.state.datapoint.negativo}
                    funcion={this.onClickPointRemove}
                  />
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
      </>
    );
  }
}

export default Trivia;
