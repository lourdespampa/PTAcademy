import React from "react";
import "./trivia.css";
import io from 'socket.io-client';

const socketUrl="http://192.168.1.65:4000/student";
const socket = io(socketUrl)

const styles = {
  botonInactivo: {
    background: '#7f8c8d'
  },
  warning: {
    background: 'yellow'
  }
}

export default class Trivia extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      preguntaElegida: '',
      eligio: false,
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

  componentDidMount(){
    socket.on('pregunta recibida', data => {
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
        this.setState({respuestaRecibida: true})
        this.interval = setInterval( () => this.minusOne(), 1000)
      }, 5000);
    })
  };

  minusOne() {
    if(this.state.time > 0){
    this.setState({time: this.state.time -1});
    }else{
      clearInterval(this.interval);
      //Aqui verficamos si el alumno ha elegido la respuesta correcta!!
      if(this.state.preguntaElegida === this.state.preguntaCorrecta){
        console.log("elegiste la respuesta correcta!!")
      }else{
        console.log("no es la respuesta correcta :c")
        let color = this.state.preguntaCorrecta
        this.setState({preguntaElegida: color})
      }
    }
  }

  handleSelectAnswer =() => {
    this.setState({preguntaElegida: 'rojo', eligio: true})
  }

  render(){
    const pe = this.state.preguntaElegida
    return (
      <>
        {
          this.state.respuestaRecibida
          ?
          null
          : 
          <div id="animatedModal" style={{ zIndex: 1, marginTop: "65px" }}>
            <div class="close-animatedModal"></div>
            <div></div>
            <div class="modal-contenido">
              <div class="container2">
                <div class="loader" id="loader">
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
        <div class="contenedorPrincipal" style={{marginTop: "55px"}}>
          <div class="header2">
            <h1 id="question">{this.state.pregunta ? this.state.pregunta : "¿Es esta una pregunta?"}</h1>
          </div>
          <div class="contenedores" style={{textAlign: "center", width: "99.5%"}}>
            <div class="left">
              {
                this.state.time > 9
                ?
                <nav class="contador"> {this.state.time} </nav>
                :
                <nav class="contador"> 0{this.state.time} </nav>
              }
            </div>
            <div class="trivia-student-center" id="center">
              <img
                id="pre-imagen"
                src={require("./playvr.webp")}
                width="420"
              />
            </div>
            <div className="right">

            </div>

            <table class="footer">
              <tr>
                <td>
                  <button style={pe === 'azul' || pe === 'naranja' || pe === 'verde' ? styles.botonInactivo : {} }
                          id="triangulo" class="trivia-student-button rojo"
                          onClick={this.state.eligio ? () => {} : this.handleSelectAnswer}>
                    <img src={require("./rombo-blanco.webp")} />
                    <span id="answerTriangulo">{this.state.respuesta1 ? this.state.respuesta1 : "Respuesta 1"}</span>
                  </button>
                </td>
                <td>
                  <button style={pe === 'rojo'  || pe === 'naranja' || pe === 'verde' ? styles.botonInactivo : {} } 
                          id="equis" class="trivia-student-button azul"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'azul', eligio: true}) }}>
                    <img src={require("./equis-blanco.webp")} />
                    <span id="answerEquis">{this.state.respuesta2 ? this.state.respuesta2 : "Respuesta 2"}</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button style={pe === 'rojo' || pe === 'azul' || pe === 'verde' ? styles.botonInactivo : {} }
                          id="circulo" class="trivia-student-button naranja"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'naranja', eligio: true}) }}>
                    <img src={require("./circulo-blanco.webp")} />
                    <span id="answerCirculo">{this.state.respuesta3 ? this.state.respuesta3 : "Respuesta 3"}</span>
                  </button>
                </td>
                <td>
                  <button style={pe === 'rojo' || pe === 'azul' || pe === 'naranja' ? styles.botonInactivo : {} }
                          id="cuadrado" class="trivia-student-button verde"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'verde', eligio: true}) }}>
                    <img src={require("./cuadrado-blanco.webp")} />
                    <span id="answerCuadrado">{this.state.respuesta4 ? this.state.respuesta4 : "Respuesta 4"}</span>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </>
    );
  }
}
