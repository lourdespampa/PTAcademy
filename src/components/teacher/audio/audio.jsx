import React, { Component } from 'react';
import './audio.sass'
import io from 'socket.io-client';
import iconExit from "../../../img/cerrar1.png";
const {MediaPresenter} = require('sfmediastream/dist/SFMediaStream');

export default class Audio extends Component{
  constructor(props) {
      super(props);
      this.state = {
        socket:null,
        show:0,
        txtTransmision:"DESEA TRANSMITIR AUDIO"
      }
    }
  handleClose = () => this.setState({show:2});
  handleShow = () => this.setState({show:1});
  componentDidMount(){
      console.log(this.props.socketUrl)
      console.log(this.props.id_access)   
  var presenterMedia = false;
  var micon = document.getElementById('btn');
  var btn = document.getElementById('btn');
  var micro = document.getElementById('micro');
  //EMISOR
  const controller = []
  micon.addEventListener('click', () => {
      const socket = io(this.props.socketUrl, {
          query:
              { pin: this.props.id_access }
        })
          socket.emit('onPlay', {
              txt: "Se inicio una nueva emision de voz.Por favor da click en el boton reproducir"
          });
          if (presenterMedia === false) {
              // Set latency to 100ms (Equal with streamer)
              presenterMedia = new MediaPresenter({
                  audio: {
                      channelCount: 1,
                      echoCancellation: true
                  }
              }, 500);
              presenterMedia.onRecordingReady = function(packet) {
                  // Every new client streamer must receive this header buffer data
                  socket.emit('bufferHeader', packet);
                  console.log(packet)
              }
              presenterMedia.onBufferProcess = function(streamData) {
                  
                  socket.emit('stream', streamData);
                  console.log("2");
                  console.log(streamData)
              }
              presenterMedia.startRecording();
              controller.push("xd")
              this.setState({
                  txtTransmision:'DESEA DEJAR DE TRANSMITIR AUDIO'
              })
              this.handleClose()
              } else{
              presenterMedia.stopRecording();
              presenterMedia = false
              controller.push("xd")
              console.log('Stop');
              socket.emit('msj_stop', {
                  txt: "La transmicion de voz ha finalizado"
              });
              this.handleClose()
              this.setState({
                  txtTransmision:'DESEA TRANSMITIR AUDIO'
              })
          }       
      })
      const i = [];
      btn.addEventListener('click',()=>{
      
          if(i.length%2 === 0){
      	micro.style.animation ='ripple 1000ms infinite' ;
        i.push("sx");
      }else{
      micro.style.animation ='none';
      i.push("sx");
      }
      })
    }
    render(){  
        return  (
        <>
        
        <div className="footer-div" onClick={this.handleShow}>
            <img id="micro" alt="" width="30px" height="30px" src={require("../../../img/footer/micro.svg")} />
            <span>Audio</span>
        </div>
        <div id="modal-general_container" className={this.state.show === 0 ? "" : this.state.show === 1 ? "six" : this.state.show === 2 ? "six out" : ""}>
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={this.handleClose}>
                <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header" style={{color:'#000000'}}>
                  <span className="modal-title__controlname">¿{this.state.txtTransmision}?</span>
                </div>
                <div className="modal-general_container_body">
                  <button  id="btn" className="modal-body__button yes" variant="primary">
                        <div className="button-zoom">SI</div>
                  </button>
                  <button className="modal-body__button no"  onClick={this.handleClose} >
                      <div className="button-zoom">NO</div>
                  </button>
                </div>
              </div>
              <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>
        </>
        )
    }
}