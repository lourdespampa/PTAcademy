import React, { Component} from 'react';
// import {Link,Redirect}  from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
const { AudioStreamer } = require('sfmediastream');
let styles = {
    // background:'black',
    // margin: "auto",
    // width: "100%",
    // position: 'absolute',
    // top:"0",
    // left:"0",
    // bottom:"0",
    // rigth:"0",
    borderRadius:"10px",
    display: 'table-cell',
    verticalAlign: 'middle'
  };

export default class Audio extends Component {
    state={
        show:false,
        showGrupo:false,
        iframeon:false,
        Slides:[],
        src:"",
        positionPpt: 1,
        id_class:''
    }
    enviarvideo(url) {
        var urlnombre = url
        console.log(urlnombre)
        document.getElementById('overlay2').classList.add('active');
        document.getElementById('popupvideo').classList.add('active');
        var expresionRegular = 'https://www.youtube.com/watch?v=';
        var urlembed = urlnombre.split(expresionRegular);
        document.getElementById('video-frameStu').src = "https://www.youtube.com/embed/" + urlembed[1] + "?autoplay=1&controls=0"
    }
    DisablePopup() {
        const overlay_popup = document.getElementById('overlay2')
        const popup = document.getElementById('popupvideo')
        overlay_popup.className = 'overlay'
        popup.className = 'popup'
        document.getElementById('video-frameStu').src = ""
    }
    DisablePopup2() {
        const overlay_popup = document.getElementById('overlayinframe')
        const popup = document.getElementById('popupformulario')
        overlay_popup.className = 'overlay'
        popup.className = 'popup'
    }
    closePopup = (o, p) => {
        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        overlay.classList.remove('active');
        popup.classList.remove('active');
    }
    openPopup(o, p) {
        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        overlay.classList.add('active');
        popup.classList.add('active');
    }
    getUrl=()=> {
        var old = this.state.src;
        var casi = old.replace("pub", "embed");
        var enlace = casi.replace("delayms=3000", "delayms=3000&rm=minimal&slide=id.p"+this.state.positionPpt);
        console.log('get URL: ' + enlace)
        document.getElementById("diapo-frame").src = enlace;
        // document.getElementById("diminute").src = enlace;
    }
    componentDidMount() {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
          })
      let varToken = localStorage.getItem('token')
        //SLIDES
        axios({
            url:`${this.props.apiUrl}/v1/api/student/get_class/${this.props.id_access}`,
            method : 'GET',
            headers:{                
                "x-access-token" :`${varToken}`
            }
        }).then((response)=>{
            this.setState({id_class:response.data.id_class.id_class})
            console.log(response.data.id_class.id_class)
            axios({
                url : `${this.props.apiUrl}/v1/api/teacher/presentations/${response.data.id_class.id_class}`,
                method : 'GET',
                headers:{                
                    "x-access-token" :`${varToken}`
                }
            }).then((response) => {
              console.log(response.data)
              if(response.data.presentationIframe){
                this.setState({iframeon:true,src:response.data.presentationIframe})
                this.getUrl()
              }else{
                console.log(response.data);
                this.setState({Slides:response.data})
              }
            }).catch((err)=>{
                  console.log(err)
          })
        })
        
        socket.on('sendSlidesS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.openPopup(overlayDiapo.id, popupDiapo.id)}
        })
        socket.on('closeSlidesS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.closePopup(overlayDiapo.id, popupDiapo.id)}
        })
        socket.on('PositionPpt', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
                this.setState({
                    positionPpt:data.position
                })
                if(this.state.iframeon) {
                    this.getUrl()
                }else{

                }
            }
        })

        //SLIDES END
        //VIDEO

        socket.on('Video', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            this.enviarvideo(data.url)}
        })
        socket.on('closeVideo', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            this.DisablePopup()
            }
        })
        // FIN VIDEO
        // this.socket = io(socketUrl)
        //RECEPTOR
        var audioStreamer = false;
        var btn_play = document.getElementById('btn_play');
        // var debug = document.querySelector('#debug2');
        btn_play.style.visibility = 'hidden'
        btn_play.addEventListener('click', () => {

            btn_play.disabled = true;
            if (audioStreamer === false) {
                // Set latency to 100ms (Equal with presenter)
                audioStreamer = new AudioStreamer(500);
                audioStreamer.playStream();

                // Buffer header must be received first
                socket.on('bufferHeader',  (packet) =>{
                    if(packet.pin === (this.props.id_access).toUpperCase()) {
                    // if (packet.pin === ('<%= pin %>').toUpperCase()) {
                    console.log('ejecutando buffer');
                    audioStreamer.setBufferHeader(packet.audio);
                    // console.log('El profesor iniciara una demostracion de audio');
                    }
                });

                // Receive buffer and play it
                socket.on('stream', (packet) =>{
                    if(packet.pin === (this.props.id_access).toUpperCase()) {
                    //    console.log("3");
                    //if (packet.pin === ('<%= pin %>').toUpperCase()) {
                    //   debug.value = "Buffer received: " + packet.audio[0].byteLength + "bytes";
                    audioStreamer.receiveBuffer(packet.audio)
                    console.log('recibiendo stream...');
                     }
                    // audioStreamer.realtimeBufferPlay(packet);
                });
            }

            // Request buffer header
            socket.emit('requestBufferHeader');

        })
        socket.on('onPlay',  (data)=> {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            btn_play.click()}
        })
        //ROULETTE
        socket.on('rouletteWinnerS',  (data) =>{
            if(data.pin === (this.props.id_access).toUpperCase()) {
            console.log('escucha el alum')
            this.setState({show:true});
            document.getElementById("modal_luckyStudent").innerHTML = data.data;
            
            }
        })
        //ROULETTE END 
        //grupos
        socket.on('enviando grupos',  (data) =>{
            if(data.pin === (this.props.id_access).toUpperCase()) {
            console.log(data.data.data)
            this.setState({showGrupo:true});
            document.getElementById("imprimir").innerHTML = data.data.data;
            
            }
        })
        //grupos END 

        //FORM
        socket.on('SendFormS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            const overlay_popup = document.getElementById('overlayinframe')
            const popup = document.getElementById('popupformulario')

            overlay_popup.className = 'overlay active'
            popup.className = 'popup active'}
        })
        socket.on('closeForm', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
                this.DisablePopup2()
            }
        })
    }

   

    render() {
        return (
        <>
            <button id="btn_play"></button>
            {/* grupos */}
            <Modal className="modal-teacher__general" size={'xl'} show={this.state.showGrupo} onHide={()=>this.setState({showGrupo:false})}>
            <Modal.Header closeButton>
                <span className="title">GRUPOS ELEGIDOS SON:</span>
            </Modal.Header>
            <Modal.Body>
                <div id="modal_GrupoStudent" style={{maxHeight: '350px',overflow: 'auto'}}>
                    <ul className="grupos-cards" id="imprimir"></ul>
                </div>
            </Modal.Body>
          </Modal>

          {/* Azar */}
            <Modal size={'lg'} show={this.state.show} onHide={()=>this.setState({show:false})}>
            <Modal.Header closeButton>
                <h4 className="title"><strong>The lucky student is :</strong></h4>
            </Modal.Header>
            <Modal.Body>
                <div id="modal_luckyStudent" className="modal-body" style={{ fontSize: "60px" }}>
                            
                </div>
            </Modal.Body>
          </Modal>

            {/*VIDEO*/}
            <div className="overlay" id="overlay2">
                <div className="popup" id="popupvideo">
                    {/* <a href id="btn-cerrar-popup2" className="btn-cerrar-popup" onClick={() => this.DisablePopup()}><i className="material-icons">close</i></a> */}
                    <iframe title="iframevideo" id="video-frameStu" src="" frameborder="0" style={{ width: "100% !important", height: "100%" }}
                        allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
            {/*VIDEO FIN*/}
            <div className="overlay" id="overlayinframe">
                <div className="popup" id="popupformulario">
                    <div className="punto-posi">
                        <h1>Formulario</h1>
                    </div>
                    <br />
                    {/* <a href id="btnCerrarFormu" className="btn-cerrar-popup"><i className="material-icons" onClick={() => this.DisablePopup2()}>close</i></a> */}
                    <iframe title="diapo-iframe" id="diapo-formulario" frameBorder="0" style={{ width: "100% !important", height: "450px" }} allowFullScreen={true}
                        mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                </div>
            </div>
            {/*Diapo*/}

            <div className="overlay" id="overlay">
                <div className="popup" id="popup" style={{display: 'table', background: 'black'}}>
                    {this.state.iframeon ?
                    <>
                    <div style={styles}> 
                      <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="100%" height="100%" style={{ width: "100% !important", height: "100%", pointerEvents: "none" }} allowFullScreen={true}
                          mozallowfullscreen="true" webkitallowfullscreen="true" src="" >
                        </iframe>
                    </div>
                    </>
                        :
                    <div style={styles}> 
                      <Carousel showArrows={false} useKeyboardArrows={true} swipeable={true} emulateTouch={true} showIndicators={false} showThumbs={false} >
                          {
                              this.state.Slides.map((slide)=>(
                                  <div key={slide.index}>
                                  <img
                                    src={slide.url}
                                    alt="Hong Kong"
                                  />
                                </div>          
                              ))
                          }
                      </Carousel>
                    </div>}
                    {/* <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="960" height="569" style={{width: "100% !important",height: "100%", pointerEvents: "none"}} allowFullScreen={true}
                     mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe> */}
                </div>
             </div>

        {/*END Diapo*/}


        </>
        )
    }
}