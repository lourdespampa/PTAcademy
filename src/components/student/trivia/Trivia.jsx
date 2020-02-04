import React from "react";
import "./Trivia.sass";
import io from 'socket.io-client';

const styles = {
  botonInactivo: {
    background: '#7f8c8d'
  },
  warning: {
    background: 'yellow'
  }
}

export default class Trivia extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preguntaElegida: '',
      eligio: false,
      puntaje: 1000,
      preguntaCorrecta: '',
      respuestaRecibida: false,
      pregunta: '',
      time: 0,
      respuesta1: '',
      respuesta2: '',
      respuesta3: '',
      respuesta4: ''
    }
  }

  componentDidMount() {
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    socket.on('pregunta recibida', data => {
      if (data.pin === (this.props.id_access).toUpperCase()) {
        console.log(data)
        this.setState({
          pregunta: data.data.pregunta,
          time: data.data.tiempo,
          preguntaCorrecta: data.data.respuestaCorrecta,
          respuesta1: data.data.respuestaOne,
          respuesta2: data.data.respuestaTwo,
          respuesta3: data.data.respuestaTree,
          respuesta4: data.data.respuestaFour
        })

        setTimeout(() => {
          this.setState({ respuestaRecibida: true })
          this.interval = setInterval(() => this.cuentaRegresiva(), 1000)
          this.interval2 = setInterval(() => this.puntaje(), 50)
        }, 5000);
      }
    })

    socket.on('datos restaurados', data => {
      if (data.pin === (this.props.id_access).toUpperCase()) {
        this.setState({
          preguntaElegida: '',
          puntaje: 1000,
          eligio: false,
          preguntaCorrecta: '',
          respuestaRecibida: false,
          pregunta: '',
          time: 0,
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: ''
        })
      }
    })
  };

  cuentaRegresiva() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    } else {
      this.setState({ eligio: true });
      clearInterval(this.interval);
      //Aqui verficamos si el alumno ha elegido la respuesta correcta!!
      if (this.state.preguntaElegida === this.state.preguntaCorrecta) {
        console.log("elegiste la respuesta correcta!!")
      } else {
        console.log("no es la respuesta correcta :c")
        let color = this.state.preguntaCorrecta
        this.setState({ preguntaElegida: color })
      }
    }
  }

  puntaje() {
    if (this.state.puntaje > 0) {
      this.setState({ puntaje: this.state.puntaje - 1 });
    }
  }

  handleSelectAnswer = async () => {
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    clearInterval(this.interval2);
    await this.setState({ preguntaElegida: 'rojo', eligio: true })
    if (this.state.preguntaElegida === this.state.preguntaCorrecta) {
      console.log('pregunta elegida por alumno')
      socket.emit('enviando elegida', { alumno: this.props.fullname, puntaje: this.state.puntaje })
    }
    console.log(this.state.puntaje)
  }

  render() {
    const pe = this.state.preguntaElegida
    return (
      <>
        {
          this.state.respuestaRecibida
            ?
            null
            :
            <div id="animatedModal" style={{ zIndex: 1, marginTop: "65px" }}>
              <div className="close-animatedModal"></div>
              <div></div>
              <div className="modal-contenido">
                <div className="container2">
                  <div className="loader" id="loader">
                    Cargando...
                </div>
                  <h1 id="previo" style={{ color: "white", fontSize: "40px" }}>
                    {this.state.pregunta ? this.state.pregunta : "Esperando pregunta..."}
                  </h1>
                </div>
              </div>
            </div>
        }

        {/* contenido */}
        <div className="contenedorPrincipal">
          <div className="triviaS-preheader"><h1>{this.state.pregunta}</h1></div>
          <div className="header2">
            <h1 className="triviaStudent-title" id="question">{this.state.pregunta ? this.state.pregunta : "¿Es esta una pregunta?"}</h1>
          </div>
          <div className="contenedores" style={{ textAlign: "center", width: "99.5%" }}>
            <div className="left">
              {
                this.state.time > 9
                  ?
                  <nav className="contador"> <h1>{this.state.time}</h1> </nav>
                  :
                  <nav className="contador"> <h1>0{this.state.time}</h1> </nav>
              }
            </div>
            <div className="trivia-student-center" id="center">
              <img
                id="pre-imagen"
                src={require("./playvr.webp")}
                width="220"
                alt=""
              />
            </div>
            <div className="right">

            </div>

            <div className="triviaT-row">

              <div className=" triviaT-col-6 contendorDeBotonesRespuesta">

                <div>
                  <div style={pe === 'azul' || pe === 'naranja' || pe === 'verde' ? styles.botonInactivo : {}}
                    id="triangulo" className="trivia-student-button rojo"
                    onClick={this.state.eligio
                    ?
                    () => { }
                    :
                    this.handleSelectAnswer
                    }>
                    <div className="triviaStudentSimbol">
                      <img src={require("./rombo-blanco.webp")} alt="" />
                    </div>
                    <div className="triviaStudentText">
                      <p id="answerTriangulo">{this.state.respuesta1 ? this.state.respuesta1 : "Respuesta 1"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={pe === 'rojo' || pe === 'naranja' || pe === 'verde' ? styles.botonInactivo : {}}
                    id="equis" className="trivia-student-button azul"
                    onClick={this.state.eligio
                    ?
                    () => { }
                    :
                    async () => {
                      const socket = io(this.props.socketUrl, {
                        query:
                          { pin: this.props.id_access }
                      })
                      clearInterval(this.interval2);
                      await this.setState({ preguntaElegida: 'azul', eligio: true })
                      if (this.state.preguntaElegida === this.state.preguntaCorrecta) {
                        socket.emit('enviando elegida', { alumno: this.props.fullname, puntaje: this.state.puntaje })
                      }
                    }}>
                    <div className="triviaStudentSimbol">
                      <img src={require("./equis-blanco.webp")} alt="" />
                    </div>
                    <div className="triviaStudentText">
                      <p id="answerEquis">{this.state.respuesta2 ? this.state.respuesta2 : "Respuesta 2"}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="triviaT-col-6 contendorDeBotonesRespuesta">
                
                <div>
                  <div style={pe === 'rojo' || pe === 'azul' || pe === 'verde' ? styles.botonInactivo : {}}
                    id="circulo" className="trivia-student-button naranja"
                    onClick={this.state.eligio
                    ?
                    () => { }
                    :
                    async () => {
                      const socket = io(this.props.socketUrl, {
                        query:
                          { pin: this.props.id_access }
                      })
                      clearInterval(this.interval2);
                      await this.setState({ preguntaElegida: 'naranja', eligio: true })
                      if (this.state.preguntaElegida === this.state.preguntaCorrecta) {
                        socket.emit('enviando elegida', { alumno: this.props.fullname, puntaje: this.state.puntaje })
                      }
                    }}>
                    <div className="triviaStudentSimbol">
                      <img src={require("./circulo-blanco.webp")} alt="" />
                    </div>
                    <div className="triviaStudentText">
                      <p id="answerCirculo">{this.state.respuesta3 ? this.state.respuesta3 : "Respuesta 3"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={pe === 'rojo' || pe === 'azul' || pe === 'naranja' ? styles.botonInactivo : {}}
                    id="cuadrado" className="trivia-student-button verde"
                    onClick={this.state.eligio
                    ?
                    () => { }
                    :
                    async () => {
                      const socket = io(this.props.socketUrl, {
                        query:
                          { pin: this.props.id_access }
                      })
                      clearInterval(this.interval2);
                      await this.setState({ preguntaElegida: 'verde', eligio: true })
                      if (this.state.preguntaElegida === this.state.preguntaCorrecta) {
                        socket.emit('enviando elegida', { alumno: this.props.fullname, puntaje: this.state.puntaje })
                      }
                    }}>
                    <div className="triviaStudentSimbol">
                      <img src={require("./cuadrado-blanco.webp")} alt="" />
                    </div>
                    <div className="triviaStudentText">
                      <p id="answerCuadrado">{this.state.respuesta4 ? this.state.respuesta4 : "Respuesta 4"}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}
