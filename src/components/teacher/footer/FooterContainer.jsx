import React, { useState } from "react";
import "./FooterContainer.sass";
import "./boton.css";
import Audio from "../audio/audio";
import io from "socket.io-client";
import Slide from '../slides/slide_02';
import iconExit from "../../../img/cerrar1.png";
function enviarvideo(url, socketUrl, id_access, setShow,seturlnombre, setNoData) {
  var urlnombre = url ;
  const socket = io(socketUrl, {
    query: { pin: id_access }
  });
  

  var expresionRegular = "https://www.youtube.com/watch?v=";
  var urlembed = urlnombre.split(expresionRegular);
  document.getElementById("video-frame").src =
    "https://www.youtube.com/embed/" + urlembed[1] + "?autoplay=1&controls=0";
  if (url === "") {
    setNoData(true);
  } else {
    document.getElementById("overlay2").classList.add("active");
    document.getElementById("popupvideo").classList.add("active");
    setShow(2);
    seturlnombre("");
    setNoData(false);
    console.log(urlembed[1])
    socket.emit("VideoEmit", urlnombre);
  }
}
function SendForm(socketUrl, id_access) {
  //SEND FORM
  const socket = io(socketUrl, {
    query: { pin: id_access }
  });
  socket.emit("SendForm");

  //END SEND FORM
}
function Video (props){
  const [urlnombre, seturlnombre] = useState('');
  const [Show, setShow] = useState(0);
  const [NoData, setNoData] = useState(false);
  return(
    <>
    <div className="footer-div" id="btnvideo" onClick={() => setShow(1)+props.botonClick('btnvideo')+seturlnombre('')}>
            <img alt="" width="30px" height="30px" src={require("../../../img/footer/video.svg")} />
            <span className="footer-span">Youtube</span>
        </div>
  <div id="modal-general_container" className={Show === 0 ? "" : Show === 1 ? "six" : Show === 2 ? "six out" : ""}>
  <div class="modal-general_background">
    <div class="modal-general_bg_content">
      <button className="modal-general_close" onClick={() => setShow(2) + props.botonClick("modalvideo") + setNoData(false)}>
        <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
      </button>
      <div className="modal-general_container">
        <div className="modal-general_container_header">
          <span className="modal-title__controlname" style={{color:'black'}}>EMITIR VIDEO</span>
        </div>
        <div className="modal-general_container_body">
          <input
            id="urlid"
            type="text"
            name="urlvideo"
            onChange={e =>
              seturlnombre(e.target.value)
            }
            style={{ fontSize: "20px", width: "80%" }}
            value={urlnombre}
            required
          />
          <button
            className="btnenviarvideo"
            onClick={() =>
              enviarvideo(
                urlnombre,
                props.socketUrl,
                props.id_access,
                setShow,
                seturlnombre,
                setNoData
              )
            }
            type="button"
          >
            <div className="button-zoom">ENVIAR</div>
          </button>
          {NoData ? (
            <p style={{color:'red'}}className="mensageAction negative">AGREGE UNA URL DE VIDEO</p>
          ) : null}
        </div>
      </div>
      <svg class="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
      </svg>
    </div>
  </div>
</div>
<div className="overlay" id="overlay2">
        <div className="popup" id="popupvideo">
          <div
            id="cerrar-popup"
            className="btn-cerrar-popup"
            onClick={() =>
              props.closePopup("overlay2", "popupvideo") +
              props.botonClick("btn-cerrar-popup")
            }
          >
            <i className="material-icons">close</i>
          </div>
          <iframe
            title="iframevideo"
            id="video-frame"
            src=""
            frameBorder="0"
            style={{ width: "100% !important", height: "100%" }}
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
 </> 
 )}

function FooterContainer(props) {
  return (
    <>
      <div className="footer-distributed">
        <div className="footer-div" id="btndiapo" onClick={()=>props.openPopup('overlay','popup')+props.botonClick('btndiapo')}>
            <img alt="" width="30px" height="30px" src={require("../../../img/footer/slide.svg")} />
            <span className="footer-span">Diapositivas</span>
        </div>
        <div className="footer-div" id="btnform" onClick={()=>props.openPopup('overlayinframe','popupformulario')+props.botonClick('btnform')}>
            <img alt="" width="30px" height="30px" src={require("../../../img/footer/form.svg")} />
            <span className="footer-span">Formulario</span>
        </div>
        <Video socketUrl={props.socketUrl} id_access={props.id_access} closePopup={props.closePopup} botonClick={props.botonClick}></Video>
        <div className="footer-div">
            <img alt="" width="30px" height="30px" src={require("../../../img/footer/share.svg")} />
            <span className="footer-span">Compartir Pantalla</span>
        </div>
        <div className="footer-div">
            <Audio socketUrl={props.socketUrl} id_access={props.id_access}/>
        </div>
        <div className="footer-div">
            <img alt="" id="btn-chat" width="30px" height="30px" src={require("../../../img/footer/chat.svg")} />
            <span className="footer-span">Chat</span>
        </div>
      </div>
      <div className="overlay" id="overlay">
        <div className="popup" id="popup"style={{display: 'table', background: 'black'}}>
          <button id="btnCerrarDiapo" className="modal-teacher__general-close"style={{position: 'absolute',right: '0'}} onClick={() => props.closePopup('overlay', 'popup') + props.botonClick('btnCerrarDiapo')}>
            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
          </button>
          <Slide socketUrl={props.socketUrl} id_access={props.id_access} apiUrl={props.apiUrl} id_class={props.id_class}/>
        </div>
      </div>
      <div className="overlay" id="overlayinframe">
        <div className="popup" id="popupformulario">
          <button className="modal-teacher__general-close" onClick={() => props.closePopup('overlayinframe', 'popupformulario') + props.botonClick('btnCerrarFormu')} >
            <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
          </button>
          <div class="punto-posi">
            <span className="letra">EMITIR FORMULARIO</span>
          </div>
          <br />
          <iframe title="diapo-iframe" id="diapo-formulario" className="fc-formulario" frameBorder="0" allowFullScreen={true}
            mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
          <button class="Myni" onClick={() => SendForm(props.socketUrl, props.id_access)}>
            <div className="button-zoom">EMITIR</div>
          </button>
        </div>
      </div>
    {/*  */}
    </>
  );
}

export default FooterContainer;
