import React, { useState } from "react";
import "./FooterContainer.sass";
import Modal from "react-bootstrap/Modal";
import Audio from "../audio/audio";
import io from "socket.io-client";

import Slide from '../slides/slide_02';
import iconExit from "../../../img/cerrar.png";
function enviarvideo(url, url2, socketUrl, id_access) {
  var urlnombre = url + url2;
  const socket = io(socketUrl, {
    query: { pin: id_access }
  });
  socket.emit("VideoEmit", urlnombre);
  document.getElementById("overlay2").classList.add("active");
  document.getElementById("popupvideo").classList.add("active");
  var expresionRegular = "https://www.youtube.com/watch?v=";
  var urlembed = urlnombre.split(expresionRegular);
  document.getElementById("video-frame").src =
    "https://www.youtube.com/embed/" + urlembed[1] + "?autoplay=1&controls=0";
}
function SendForm(socketUrl, id_access) {
  //SEND FORM
  const socket = io(socketUrl, {
    query: { pin: id_access }
  });
  socket.emit("SendForm");

  //END SEND FORM
}
function FooterContainer(props){
    const [urlnombre,seturlnombre]=useState('');
    const [Show, setShow] = useState(false);
        return(
        <>           
            <div className="footer-distributed">
                <div id="btndiapo" onClick={()=>props.openPopup('overlay','popup')+props.botonClick('btndiapo')}>
                    <img width="30px" height="30px" src={require("../../../img/footer/slide.svg")} />
                    <span>Diapositivas</span>
                </div>
                <div id="btnform" onClick={()=>props.openPopup('overlayinframe','popupformulario')+props.botonClick('btnform')}>
                    <img width="30px" height="30px" src={require("../../../img/footer/form.svg")} />
                    <span>Formulario</span>
                </div>
                <div id="btnvideo" onClick={() => setShow(true)+props.botonClick('btnvideo')}>
                    <img width="30px" height="30px" src={require("../../../img/footer/video.svg")} />
                    <span>Youtube</span>
                </div>
                <div>
                    <img width="30px" height="30px" src={require("../../../img/footer/share.svg")} />
                    <span>Compartir Pantalla</span>
                </div>
                <div>
                    <Audio socketUrl={props.socketUrl} id_access={props.id_access}/>
                </div>
                <div>
                    <img id="btn-chat" width="30px" height="30px" src={require("../../../img/footer/chat.svg")} />
                    <span>Chat</span>
                </div>
            </div>
            <div className="overlay" id="overlay">
                <div className="popup" id="popup">
                    <a href id="btnCerrarDiapo" className="btn-cerrar-popup" onClick={()=>props.closePopup('overlay','popup')+props.botonClick('btnCerrarDiapo')} ><i class="material-icons">close</i></a>
                    <Slide/>
                    <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="960" height="569" style={{width: "100% !important",display:"none",height: "100%"}} allowFullScreen={true}
                    mozallowfullscreen="true" webkitallowfullscreen="true" src="" >
                    </iframe>
                    
                    <div id="btnBack" className="btn-back"  onClick={()=>props.backtPpt()+props.botonClick('btnBack')}><i class="material-icons">navigate_before</i></div>
                    <div id="btnNext" className="btn-next" onClick={()=>props.nextPpt()+props.botonClick('btnNext')}><i class="material-icons">navigate_next</i></div>
                </div>
            </div>
            <div className="overlay" id="overlayinframe">
                <div className="popup" id="popupformulario">
                    <div class="punto-posi">
                        <button className="modal-teacher__general-close" onClick={()=>props.closePopup('overlayinframe','popupformulario')+props.botonClick('btnCerrarFormu')} >
                            <img className="modal-teacher__general-cross" src={iconExit} alt="imagen de cerrar modal" />
                        </button>
                        <span className="formulario-title">EMITIR FORMULARIO</span>
                    </div>
                    <br/>
                    {/* <a href id="btnCerrarFormu" className="btn-cerrar-popup" onClick={()=>props.closePopup('overlayinframe','popupformulario')+props.botonClick('btnCerrarFormu')} ><i class="material-icons">close</i></a> */}
                    <iframe title="diapo-iframe" id="diapo-formulario" className="fc-formulario" frameBorder="0"  allowFullScreen={true}
                    mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                    <button class="button btnMyM" onClick={()=>SendForm(props.socketUrl,props.id_access)}>EMITIR</button>
                </div>
            </div>        

            <Modal className="modal-teacher__general" id="modalvideo" size={'SM'} show={Show}
            onHide={() => setShow(false)+props.botonClick('modalvideo')} >
                <button className="modal-teacher__general-close" onClick={() => setShow(false)+props.botonClick('modalvideo')}>
                    <img className="modal-teacher__general-cross" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div class="punto-posi">
                        <span>EMITIR VIDEO</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <input id="urlid" type="text" className="Opal" placeholder={props.txt} name="urlvideo" onChange={e => seturlnombre(e.target.value)+props.changeOn('urlvideo',e.target.value)} style={{fontSize:"20px",width: "80%"}} required/>
                    <button id="btnenviarvideo" className="Opal button btnMyM" onClick={()=>enviarvideo(urlnombre,props.txt,props.socketUrl,props.id_access,setShow(false))+props.botonClick('btnenviarvideo')} type="button">Enviar</button>
                </Modal.Body>
            </Modal>

            <div class="overlay" id="overlay2">
                <div class="popup" id="popupvideo">
                    <a href id="btn-cerrar-popup2" className="btn-cerrar-popup" onClick={()=>props.closePopup('overlay2','popupvideo')+props.botonClick('btn-cerrar-popup2')}><i class="material-icons">close</i></a>
                    <iframe  title="iframevideo" id="video-frame" src="" frameborder="0" style={{width: "100% !important",height: "100%"}} 
                    allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
        </>
    )
}

export default FooterContainer;
