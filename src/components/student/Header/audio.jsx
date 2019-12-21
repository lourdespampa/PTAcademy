import React, { Component } from 'react';
import io from 'socket.io-client';

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
    componentDidMount() {
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
    }


    render() {
        return <div>
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
                            asdasd
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


        </div>
    }
}