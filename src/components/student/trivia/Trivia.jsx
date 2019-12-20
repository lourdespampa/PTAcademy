import React from "react";
import "./trivia.css";
import io from 'socket.io-client';

const socketUrl="http://localhost:4000/student";
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
      time: 0,
      respuestaRecibida: false
    }
  }

  componentDidMount(){
    let enviado = false
    socket.on('pregunta recibida', data => {
        enviado = true;
        console.log(data)
    })
    if(enviado){
      this.setState({time: 15})
      setTimeout(() => {
        this.setState({respuestaRecibida: true})
        this.interval = setInterval( () => this.minusOne(), 1000)
      }, 5000);
    }else{
      return
    }
  };

  minusOne() {
    if(this.state.time > 0){
    this.setState({time: this.state.time -1});
    }else{
      clearInterval(this.interval);
    }
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
                  Esperando pregunta...
                </h1>
              </div>
            </div>
          </div>
        }
        
        {/* contenido */}
        <div class="contenedorPrincipal" style={{marginTop: "55px"}}>
          <div class="header2">
            <h1 id="question">¿Es esta una pregunta?</h1>
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
            <div class="center" id="center">
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
                          id="triangulo" class="button rojo"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'rojo', eligio: true}) }}>
                    <img src={require("./rombo-blanco.webp")} />
                    <span id="answerTriangulo">Respuesta 1</span>
                  </button>
                </td>
                <td>
                  <button style={pe === 'rojo'  || pe === 'naranja' || pe === 'verde' ? styles.botonInactivo : {} } 
                          id="equis" class="button azul"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'azul', eligio: true}) }}>
                    <img src={require("./equis-blanco.webp")} />
                    <span id="answerEquis">Respuesta 2</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button style={pe === 'rojo' || pe === 'azul' || pe === 'verde' ? styles.botonInactivo : {} }
                          id="circulo" class="button naranja"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'naranja', eligio: true}) }}>
                    <img src={require("./circulo-blanco.webp")} />
                    <span id="answerCirculo">Respuesta 3</span>
                  </button>
                </td>
                <td>
                  <button style={pe === 'rojo' || pe === 'azul' || pe === 'naranja' ? styles.botonInactivo : {} }
                          id="cuadrado" class="button verde"
                          onClick={this.state.eligio ? () => {} : () => { this.setState({preguntaElegida: 'verde', eligio: true}) }}>
                    <img src={require("./cuadrado-blanco.webp")} />
                    <span id="answerCuadrado">Respuesta 4</span>
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
