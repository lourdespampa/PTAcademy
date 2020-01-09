import React from "react";
import "./trivia.sass";
import "./botones.scss";

import io from 'socket.io-client';

import { Container, Row, Col } from 'reactstrap';

class Trivia extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pregunta: '',
      tiempo: '5',
      respuestaOne: '',
      respuestaTwo: '',
      respuestaTree: '',
      respuestaFour: '',
      selectedCorrectAnswer: 'rojo',
      preguntaEnviada: false,
      modal:false
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

  componentDidMount(){
    const socket = io(this.props.socketUrl, {
      query:
          { pin: this.props.id_access }
    })
      socket.on('pregunta escogida', function(data){
        console.log(data)
      })
  }
  showModal = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
    if(this.state.modal){

    }
  }
  //Funciones que obtienen los valores de sus respectivos inputs en tiempo real
  changeQuestion = e => {
      this.setState({
        pregunta: e.target.value
      })
  }
  handleChangeTime =e => {
    this.setState({
      tiempo: e.target.value
    })
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
    if(this.state.preguntaEnviada){
      console.log("restaurando...")
      this.setState({
        pregunta: '',
        tiempo: '5',
        respuestaOne: '',
        respuestaTwo: '',
        respuestaTree: '',
        respuestaFour: ''
      })
      socket.emit('restaurando datos', '')
    }else{
      // preguntaEnviada comienza en false por lo que no existe y a partir de aqui se envian los datos...
      const preg = this.state.pregunta,
            resp1 = this.state.respuestaOne,
            resp2 = this.state.respuestaTwo,
            resp3 = this.state.respuestaTree,
            resp4 = this.state.respuestaFour
      //validamos que todos los campos no esten vacios
      if(preg === '' || resp1 === '' || resp2 === '' || resp3 === '' || resp4 === ''){
        return alert('debe completar todos los campos')
      }
      //aqui ya se empiezan a enviar los datos
      const contenido = {
        pregunta: this.state.pregunta,
        tiempo: parseInt(this.state.tiempo,10),
        respuestaOne: this.state.respuestaOne,
        respuestaTwo: this.state.respuestaTwo,
        respuestaTree: this.state.respuestaTree,
        respuestaFour: this.state.respuestaFour,
        respuestaCorrecta: this.state.selectedCorrectAnswer
      }
      socket.emit('enviando pregunta', contenido)
    }
    this.setState(state => ({
      preguntaEnviada: !state.preguntaEnviada
    }));
  }

  render() {
    return (
      <>
      <div id="cabeza" className="cabeza">
        <div className="titulo">
          <h1>PLAYTEC Trivia</h1>
        </div>
        <div className="cont-btn-resp">
          { this.state.preguntaEnviada
          ?
          <button id="restaurar" className="restaurar" onClick={this.handleSendQuestion}>
            Restaurar
          </button>
          :
          <button id="enviar" className="enviar" onClick={this.handleSendQuestion}>
          Enviar
        </button>
          }
        </div>
        <div className="cont-btn-resp2">
          <button id="myBtn" className="respuestas" onClick={this.showModal}>
            Respuestas
          </button>
        </div>
        {
        this.state.modal
        ?
        <div id="myModal" className="modal-respuestas">
        {/* Modal content */}
          <div className="modal-content-respuestas">
            <span id="cerrar" className="close" onClick={this.showModal}>x</span>
            <h2>Clasificación</h2>
              <div className="modal-body-respuestas">
              <ul className="rolldown-list" id="myList">
                <li className="lista-contenedora">
                    <div id="one" style={{display: "inline-block"}}></div>
                    {/* <img className="imagenClasificacion" src={require('./1ro.webp')} width="35"/> */}
                    <h5 style={{display: "inline-block", marginLeft: "20px"}}></h5>
                </li>
                <li className="lista-contenedora">
                    <div id="two" style={{display: "inline-block"}}></div>
                    {/* <img className="imagenClasificacion" src={require('./2do.webp')} width="35"/> */}
                    <h5 style={{display: "inline-block", marginLeft: "20px"}}></h5>
                </li>
                <li className="lista-contenedora">
                    <div id="three" style={{display: "inline-block"}}></div>
                    {/* <img className="imagenClasificacion" src={require('./3ro.webp')} width="40"/> */}
                    <h5 style={{display: "inline-block", marginLeft: "20px"}}></h5>
                </li>
                <li className="lista-contenedora">
                    <div id="four" style={{display: "inline-block"}}></div>
                    {/* <img className="imagenClasificacion" src={require('./4to.webp')} width="30"/> */}
                    <h5 style={{display: "inline-block", marginLeft: "20px"}}></h5>
                </li>
                <li className="lista-contenedora">
                    <div id="five" style={{display: "inline-block"}}></div>
                    {/* <img className="imagenClasificacion" src={require('./5to.webp')} width="30"/> */}
                    <h5 style={{display: "inline-block", marginLeft: "20px"}}></h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
        :
        null
      }
      </div>
      <Container>
        <form>
        <Row>
            <Col md="6">
              <div style={{marginTop:"5px"}}>
                <label className="label" for="pregunta">Pregunta</label>
                <input type="text" id="pregunta" name="firstname" className="pregunta" value={this.state.pregunta} onChange={this.changeQuestion}/>
                <label className="label" for="time">Tiempo</label>
                <select id="time" name="tiempo" className="pregunta input-tiempo" value={this.state.value} onChange={this.handleChangeTime}>
                    <option value="5">5 segundos</option>
                    <option value="10">10 segundos</option>
                    <option value="20">20 segundos</option>
                    <option value="30">30 segundos</option>
                    <option value="60">60 segundos</option>
                </select>
                
                <label className="label" for="res1">Respuesta 1</label>
                <br/>
                <div className="resp-grp custom-radios">
                  <input type="text" id="res1" name="res1" className="input-respuestas" value={this.state.respuestaOne} onChange={this.changeAnswer1} />
                  <input type="radio" id="color-1" name="color" value="rojo" 
                          checked={this.state.selectedCorrectAnswer === 'rojo'}
                          onChange={this.handleCorrectAnswer}
                          />
                  <label for="color-1">
                    <span>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                    </span>
                  </label>
                </div>
                <label className="label" for="res2">Respuesta 3</label>
                <br/>
                <div className="resp-grp custom-radios">
                  <input type="text" id="res3" name="res2" className="input-respuestas" value={this.state.respuestaTree} onChange={this.changeAnswer3}/>
                  <input type="radio" id="color-2" name="color" value="naranja"
                          checked={this.state.selectedCorrectAnswer === 'naranja'}
                          onChange={this.handleCorrectAnswer}
                          />
                  <label for="color-2">
                    <span>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                    </span>
                  </label>
                </div>            
              </div>
            </Col>
            <Col md="6">
              <div style={{marginTop:"5px"}}> 
                <div className="containerRight">
                  <label for="fname">Medio de Comunicación</label>
                  <div className="image-container">
                    <input type="file" id="file-input" name="file-input" className="imagen"/>
                    <img id="imgSalida" width="120px" height="100px" src="" />
                  </div>
                </div>
                <label className="label" for="res1">Respuesta 2</label>
                <br/>
                <div className="resp-grp custom-radios">
                  <input type="text" id="res2" name="res1" className="input-respuestas" value={this.state.respuestaTwo} onChange={this.changeAnswer2}/>
                  <input type="radio" id="color-3" name="color" value="azul" 
                          checked={this.state.selectedCorrectAnswer === 'azul'}
                          onChange={this.handleCorrectAnswer}
                          />
                  <label for="color-3">
                    <span>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                    </span>
                  </label>
                </div>
                <label className="label" for="res2">Respuesta 4</label>
                <br/>
                <div className="resp-grp custom-radios">
                  <input type="text" id="res4" name="res2" className="input-respuestas" value={this.state.respuestaFour} onChange={this.changeAnswer4}/>
                  <input type="radio" id="color-4" name="color" value="verde" 
                          checked={this.state.selectedCorrectAnswer === 'verde'}
                          onChange={this.handleCorrectAnswer}
                          />
                  <label for="color-4">
                    <span>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                    </span>
                  </label>
                </div>
              </div>
            </Col>
        </Row>
        </form>
      </Container>
      </>
    );
  }
}

export default Trivia;
