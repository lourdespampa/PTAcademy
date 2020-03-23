import React, { Component} from 'react';
// import {Link,Redirect}  from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
import iconExit from "../../../img/cerrar1.png";
// import { Modal } from "react-bootstrap"; no se esta usando
import './socketStream.sass'
import { Carousel } from "react-responsive-carousel";
const { AudioStreamer } = require('sfmediastream');
let styles = {
    borderRadius:"10px",
    display: 'table-cell',
    verticalAlign: 'middle'
  };

export default class Audio extends Component {
     /** 
   * Fix notificatión 
   *  :: valor inicial de PIN al cargar component
   * */ 
  pin = ''
  /******************* */
    state={
        show:0,
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
        popup.className = 'popup '
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
        const { 
            id_access, 
            socketUrl 
          } = this.props

          this.pin = id_access
          console.log('valor de pin cuando inicia componente: ' + this.pin)


        const socket = io(socketUrl, {
            query:
                { pin: this.pin }
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
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.openPopup(overlayDiapo.id, popupDiapo.id)}
            this.setState({showGrupo:2});
        })
        socket.on('closeSlidesS', (data) => {
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            const overlayDiapo = document.getElementById('overlay')
            const popupDiapo = document.getElementById('popup')
            this.closePopup(overlayDiapo.id, popupDiapo.id)}
        })
        socket.on('PositionPpt', (data) => {
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
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
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            this.enviarvideo(data.url)}
            this.setState({showGrupo:2});
        })
        socket.on('closeVideo', (data) => {
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
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
                    const pinTeacher = this.pin.toUpperCase();
                    if(packet.pin === (pinTeacher).toUpperCase()) {
                    // if (packet.pin === ('<%= pin %>').toUpperCase()) {
                    console.log('ejecutando buffer');
                    audioStreamer.setBufferHeader(packet.audio);
                    // console.log('El profesor iniciara una demostracion de audio');
                    }
                });

                // Receive buffer and play it
                socket.on('stream', (packet) =>{
                    const pinTeacher = this.pin.toUpperCase();
                    if(packet.pin === (pinTeacher).toUpperCase()) {
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
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            btn_play.click()}
        })
        //ROULETTE
        socket.on('rouletteWinnerS',  (data) =>{
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            console.log('escucha el alum')
            this.setState({show:1});
            document.getElementById("modal_luckyStudent").innerHTML = data.data;
            
            }
        })
        //ROULETTE END 
        //grupos
        socket.on('enviando grupos',  (data) =>{
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            console.log(data.data.data)
            document.getElementById("imprimir").innerHTML = data.data.data;
            this.setState({showGrupo:1});
            }
        })
        socket.on('closeModalGrupo',  (data) =>{
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            this.setState({showGrupo:2});
            }
        })
        //grupos END 

        //FORM
        socket.on('SendFormS', (data) => {
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
            const overlay_popup = document.getElementById('overlayinframe')
            const popup = document.getElementById('popupformulario')

            overlay_popup.className = 'overlay active'
            popup.className = 'popup active '}
            this.setState({showGrupo:2});
        })
        socket.on('closeForm', (data) => {
            const pinTeacher = this.pin.toUpperCase();
            if(data.pin === (pinTeacher).toUpperCase()) {
                this.DisablePopup2()
            }
        })
    }
/** Fix pin */
componentWillUnmount() {
    // valor despues de salir del component
    this.pin = ''

    console.log('componente desmontado')
  }
  /****************** */
   

    render() {
        return (
        <>
            <button id="btn_play"></button>
            {/* grupos */}
            <div id="modal-general_container" className={this.state.showGrupo === 0 ? "" : this.state.showGrupo === 1 ? "six" : this.state.showGrupo === 2 ? "six out" : ""}>
                <div className="modal-general_background" >
                    <div className="modal-general_bg_content" >
                        <button className="modal-general_close" onClick={()=>this.setState({showGrupo:0})}>
                            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                        </button>
                        <div className="modal-general_container">
                            <div className="modal-general_container_header">
                            <h4 className="title"><strong>GRUPOS ELEGIDOS SON</strong></h4>
                            </div>
                            <div id="modal_GrupoStudent" style={{maxHeight: '350px',height:'350px',overflow: 'auto'}}>
                                <ul className="grupos-cards" id="imprimir"></ul>
                            </div>
                        </div>
                        <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                        </svg>
                    </div>
                </div>
            </div>

            {/* <Modal className="modal-teacher__general" size={'xl'} show={this.state.showGrupo} onHide={()=>this.setState({showGrupo:false})}>
            <Modal.Header closeButton>
                <span className="title">GRUPOS ELEGIDOS SON:</span>
            </Modal.Header>
            <Modal.Body>
                <div id="modal_GrupoStudent" style={{maxHeight: '350px',overflow: 'auto'}}>
                    <ul className="grupos-cards" id="imprimir"></ul>
                </div>
            </Modal.Body>
          </Modal> */}

          {/* Azar */}
            {/* <Modal size={'lg'} show={this.state.show} 
                <button className="modal-general_close" onClick={()=>this.setState({show:false})}>
                    <img className="button-zoom tamaño" src={iconExit} alt="imagen de cerrar modal" />
                </button>
            <Modal.Header>
                <h4 className="title"><strong>The lucky student is :</strong></h4>
            </Modal.Header>
            <Modal.Body>
                <div id="modal_luckyStudent" className="modal-body" style={{ fontSize: "60px" }}></div>
            </Modal.Body>
          </Modal>
          <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg> */}
            <div id="modal-general_container" className={this.state.show === 0 ? "" : this.state.show === 1 ? "six" : this.state.show === 2 ? "six out" : ""}>
                <div className="modal-general_background" >
                    <div className="modal-general_bg_content" >
                        <button className="modal-general_close" onClick={()=>this.setState({show:0})}>
                            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                        </button>
                        <div className="modal-general_container">
                            <div className="modal-general_container_header">
                            <h4 className="title"><strong>El estudiante afortunado(a) es:</strong></h4>
                            </div>
                            <div className="modal-general_container_body">
                            <div id="modal_luckyStudent" className="modal-body texto" style={{ fontSize: "45px" }}></div>
                            </div>
                        </div>
                        <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                        </svg>
                    </div>
                </div>
            </div>




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
                <button className="modal-general_close" onClick={()=>this.setState({show:0})}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <div className="popup" id="popupformulario">
                    <div className="punto-posi">
                        <h1 className="t">Formulario</h1>
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
                      <Carousel selectedItem={this.state.positionPpt-1} showArrows={false} useKeyboardArrows={false} swipeable={false} emulateTouch={false} showIndicators={false} showThumbs={false} >
                          {
                              this.state.Slides.map((slide)=>(
                                <div className="imagenes" key={slide.index}>
                                <div style={{width:"5%",float:'left'}}></div>
                              <img className="imagenes-indiviuales"
                              style={{width:"90%",float:'left',marginLeft:'calc(50% - 45%)'}}
                                src={slide.url}
                                alt="Hong Kong"
                              />
                               <div style={{width:"5%",float:'left'}}></div> 
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