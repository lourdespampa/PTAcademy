import React, { Component} from 'react';
//import {Link,Redirect}  from 'react-router-dom';
import io from 'socket.io-client';
import {Modal/*, Button*/ } from "react-bootstrap";
const { AudioStreamer } = require('sfmediastream');


export default class Audio extends Component {
    state={
        show:false,
        showGrupo:false
    }
    enviarvideo(url) {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
          })
        var urlnombre = url
        console.log(urlnombre)
        socket.emit('VideoEmit', urlnombre)
        document.getElementById('overlay2').classList.add('active');
        document.getElementById('popupvideo').classList.add('active');
        var expresionRegular = 'https://www.youtube.com/watch?v=';
        var urlembed = urlnombre.split(expresionRegular);
        document.getElementById('video-frame').src = "https://www.youtube.com/embed/" + urlembed[1] + "?autoplay=1&controls=0"
    }
    DisablePopup() {
        const overlay_popup = document.getElementById('overlay2')
        const popup = document.getElementById('popupvideo')
        overlay_popup.className = 'overlay'
        popup.className = 'popup'
        document.getElementById('video-frame').src = ""
    }
    DisablePopup2() {
        const overlay_popup = document.getElementById('overlayinframe')
        const popup = document.getElementById('popupformulario')
        overlay_popup.className = 'overlay'
        popup.className = 'popup'
        document.getElementById('video-frame').src = ""
    }
    closePopup = (o, p) => {
        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        overlay.classList.remove('active');
        popup.classList.remove('active');
        document.getElementById('video-frame').src = "";
    }
    openPopup(o, p) {
        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        overlay.classList.add('active');
        popup.classList.add('active');
    }
    nextPpt=()=> {
           
        var cambiado = '';
        var url_string = document.getElementById("diapo-frame").src;
        var url = new URL(url_string);
        var c = url.searchParams.get("slide");
        //Consigue num de la pagina
        var pag = parseInt(c.substr(4)); 
        //Pasas a la siguiente diapo
        var slide = pag + 1;
        //Se quita la pagina antigua
        cambiado = (url.search).substr(0, 58);
        //Se agrega la nueva pagina
        cambiado += slide;
        var final = url.origin + url.pathname + cambiado;
        document.getElementById("diapo-frame").src = final;
        // document.getElementById("diminute").src = final;
    }

    backtPpt=()=> {
        var cambiado = '';
        var url_string = document.getElementById("diapo-frame").src;
        var url = new URL(url_string);
        var c = url.searchParams.get("slide");
        //Consigue num de la pagina
        var pag = c.substr(4);
        //Pasas a la siguiente diapo
        var slide = parseInt(pag) - 1;
        //Se quita la pagina antigua
        cambiado = (url.search).substr(0, 58);
        //Se agrega la nueva pagina
        cambiado += slide;
        var final = url.origin + url.pathname + cambiado;
        document.getElementById("diapo-frame").src = final;
        // document.getElementById("diminute").src = final;
    }   
    componentDidMount() {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
          })
        
        //SLIDES

        socket.on('sendSlidesS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.openPopup(overlayDiapo.id, popupDiapo.id)}
        })

        socket.on('nextPptS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            this.nextPpt()}
        })

        socket.on('backtPptS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            this.backtPpt()}
        })

        socket.on('closeSlidesS', (data) => {
            if(data.pin === (this.props.id_access).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.closePopup(overlayDiapo.id, popupDiapo.id)}
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
                    // if (packet.pin == ('<%= pin %>').toUpperCase()) {
                    console.log('ejecutando buffer');
                    audioStreamer.setBufferHeader(packet.audio);
                    // console.log('El profesor iniciara una demostracion de audio');
                    }
                });

                // Receive buffer and play it
                socket.on('stream', (packet) =>{
                    if(packet.pin === (this.props.id_access).toUpperCase()) {
                    //    console.log("3");
                    //if (packet.pin == ('<%= pin %>').toUpperCase()) {
                    //   debug.value = "Buffer received: " + packet.audio[0].byteLength + "bytes";
                    audioStreamer.receiveBuffer(packet.audio);
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
                <div id="modal_GrupoStudent" style={{display: 'flex',flexFlow: 'wrap',maxHeight: '350px',overflow: 'auto'}}>
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
            <div class="overlay" id="overlay2">
                <div class="popup" id="popupvideo">
                    {/* <a href id="btn-cerrar-popup2" className="btn-cerrar-popup" onClick={() => this.DisablePopup()}><i class="material-icons">close</i></a> */}
                    <iframe title="iframevideo" id="video-frame" src="" frameborder="0" style={{ width: "100% !important", height: "100%" }}
                        allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
            {/*VIDEO FIN*/}
            <div className="overlay" id="overlayinframe">
                <div className="popup" id="popupformulario">
                    <div class="punto-posi">
                        <h1>Formulario</h1>
                    </div>
                    <br />
                    {/* <a href id="btnCerrarFormu" className="btn-cerrar-popup"><i class="material-icons" onClick={() => this.DisablePopup2()}>close</i></a> */}
                    <iframe title="diapo-iframe" id="diapo-formulario" frameBorder="0" style={{ width: "100% !important", height: "450px" }} allowFullScreen={true}
                        mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>


                </div>
            </div>
            {/*Diapo*/}

        <div className="overlay" id="overlay">
                    <div className="popup" id="popup">
                        <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="960" height="569" style={{width: "100% !important",height: "100%", pointerEvents: "none"}} allowFullScreen={true}
                         mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                    </div>
                </div>

        {/*END Diapo*/}


        </>
        )
    }
}