import React, { Component } from 'react';
import './audio.sass'
import io from 'socket.io-client';
//import ScarletsMediaPresenter from './SFMediaStream.min.js'
//import {MediaPresenter} from 'sfmediastream';
const {MediaPresenter} = require('sfmediastream');

export default class Audio extends Component{
    constructor(props) {
        super(props);
        this.state = {
          socket:null
        }
      }
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
        if(controller.length%2 === 0){
            micro.style.animation ='ripple 1000ms infinite' ;
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
                if(controller.length%2 !== 0)
                presenterMedia.stopRecording();
                presenterMedia = false
                controller.push("xd")
                console.log('Stop');
                socket.emit('msj_stop', {
                    txt: "La transmicion de voz ha finalizado"
                });
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
        return  <div id="btn" >
                    <img id="micro" width="30px" height="30px" src={require("../../../img/footer/micro.svg")} alt='micro' />
                    <span>Audio</span>                
                </div>
                
    }
}