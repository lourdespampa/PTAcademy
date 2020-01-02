import React, { Component} from 'react';
import {Link}  from 'react-router-dom';
import io from 'socket.io-client';
import {Button } from "react-bootstrap";
const { AudioStreamer } = require('sfmediastream');

const socketUrl = "http://192.168.1.65:4000/student";
const socket = io(socketUrl)

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null
        }
    }
    enviarvideo(url) {

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
        document.getElementById("diminute").src = final;
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
        document.getElementById("diminute").src = final;
    }   
    componentDidMount() {
        
        //liSTA
        socket.on('RemoveStudS',()=>{
        document.getElementById('ReturnToLogin2').click()
        })
        //END LISTA
       
       
        //SLIDES

        socket.on('sendSlidesS', () => {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.openPopup(overlayDiapo.id, popupDiapo.id)
        })

        socket.on('nextPptS', () => {
            this.nextPpt()
        })

        socket.on('backtPptS', () => {
            this.backtPpt()
        })

        socket.on('closeSlidesS', () => {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.closePopup(overlayDiapo.id, popupDiapo.id)
        })

        //SLIDES END
        //VIDEO

        socket.on('Video', (url) => {

            this.enviarvideo(url)
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
                socket.on('bufferHeader', function (packet) {
                    // if (packet.pin == ('<%= pin %>').toUpperCase()) {
                    console.log('ejecutando buffer');
                    audioStreamer.setBufferHeader(packet.audio);
                    // console.log('El profesor iniciara una demostracion de audio');
                    // }
                });

                // Receive buffer and play it
                socket.on('stream', function (packet) {

                    //    console.log("3");
                    //if (packet.pin == ('<%= pin %>').toUpperCase()) {
                    //   debug.value = "Buffer received: " + packet.audio[0].byteLength + "bytes";
                    audioStreamer.receiveBuffer(packet.audio);
                    console.log('recibiendo stream...');
                    // }
                    // audioStreamer.realtimeBufferPlay(packet);
                });
            }

            // Request buffer header
            socket.emit('requestBufferHeader');

        })
        socket.on('onPlay', function () {
            btn_play.click()
        })
        //ROULETTE
        socket.on('rouletteWinnerS', function (data) {
            console.log('escucha el alum')
            document.getElementById("modal_luckyStudent").innerHTML = data
            document.getElementById("btnLuckyStudent").click()
        })

        //ROULETTE END 
        //FORM
        socket.on('SendFormS', () => {

            const overlay_popup = document.getElementById('overlayinframe')
            const popup = document.getElementById('popupformulario')

            overlay_popup.className = 'overlay active'
            popup.className = 'popup active'
        })
        //FORM END
    }

   

    render() {
        return <div>
             <a id="ReturnToLogin2" style={{display: "none"}} href='/login'></a>
         
            <button id="btn_play"></button>
            <div>
                <a href className="a" data-toggle="modal" data-target="#modalRoulette" id="btnLuckyStudent" />
            </div>
            <div id="modalRoulette" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>The lucky student is :</strong></h4>
                        </div>
                        <div id="modal_luckyStudent" className="modal-body" style={{ fontSize: "100px" }}>

                        </div>
                    </div>
                </div>
            </div>

            {/*VIDEO*/}
            <div class="overlay" id="overlay2">
                <div class="popup" id="popupvideo">
                    <a href id="btn-cerrar-popup2" className="btn-cerrar-popup" onClick={() => this.DisablePopup()}><i class="material-icons">close</i></a>
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
                    <a href id="btnCerrarFormu" className="btn-cerrar-popup"><i class="material-icons" onClick={() => this.DisablePopup2()}>close</i></a>
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


        </div>
    }
}