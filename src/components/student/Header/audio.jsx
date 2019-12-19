import React, { Component } from 'react';
import io from 'socket.io-client';
//import ScarletsMediaPresenter from './SFMediaStream.min.js'
//import {MediaPresenter} from 'sfmediastream';
const {AudioStreamer} = require('sfmediastream');

const socketUrl="http://192.168.1.65:4000/student";
const socket = io(socketUrl)

export default class Audio extends Component{
    constructor(props) {
        super(props);
        this.state = {
          socket:null
        }
      }
    componentDidMount(){
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
                socket.on('bufferHeader', function(packet) {
                   // if (packet.pin == ('<%= pin %>').toUpperCase()) {
                        console.log('ejecutando buffer');
                        audioStreamer.setBufferHeader(packet.audio);
                        // console.log('El profesor iniciara una demostracion de audio');
                   // }
                });

                // Receive buffer and play it
                socket.on('stream', function(packet) {

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
        socket.on('onPlay', function() {
                btn_play.click()
        })

    }

    render(){  
        return<div>
           <button id="btn_play"></button>
        </div>
    }
}