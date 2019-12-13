import React, { Component } from 'react';
import './audio.css'
import io from 'socket.io-client';
//import ScarletsMediaPresenter from './SFMediaStream.min.js'
//import {MediaPresenter} from 'sfmediastream';
const {MediaPresenter, AudioStreamer} = require('sfmediastream');

const socketUrl="http://localhost:4000";
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

    var presenterMedia = false;
    var micon = document.getElementById('btn');
    
 
    
//EMISOR
        const controller = []
    micon.addEventListener('click', () => {
        
     
        if(controller.length%2==0){

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
            }
            
        } else{
            if(controller.length%2!=0)
                presenterMedia.stopRecording();
                presenterMedia = false
                controller.push("xd")
                console.log('Stop');
                socket.emit('msj_stop', {
                    txt: "La transmicion de voz ha finalizado"
                });
            
        }       
    }
    )
  //  micon.addEventListener('click', () => {
        
    //})
//RECEPTOR
        var audioStreamer = false;
        var btn_play = document.getElementById('btn_play');
        var debug = document.querySelector('#debug2');
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
            socket.emit('requestBufferHeader', '');

        })
        socket.on('onPlay', function(data) {
           // if (data.pin == ('<%= pin %>').toUpperCase()) {
                btn_play.click()
//}
        })
/*BTN*/
var btn = document.getElementById('btn');
const i = [];
//alert(i.length)

btn.addEventListener('click',()=>{

    if(i.length%2==0){

	btn.style.animation ='ripple 1000ms infinite' ;
  i.push("sx");



}else{
   

btn.style.animation ='none';
i.push("sx");

}

})

    }

    render(){  
        return<div className="div_audio">
           
           <div class="div_btn" id="btn" >
           <i class="fas fa-microphone fa-3x"></i>
</div>


           <button id="btn_play"></button>
     
        </div>
    }
}