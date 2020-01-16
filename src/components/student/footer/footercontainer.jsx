import React from 'react';
import './footerStyles.sass';

export default function footercontainer(props) {
  return (
    <>
      <footer id="footer" className="fixed-footer">
        <div class="slide-container">
              <a id="btn-abrir-popup"href style={{right :"auto",left:"auto",position: "absolute"}} class="btn-abrir-popup">
                <div class="envoltura" onClick={()=>props.openPopup('overlay','popup')} style={{width: "100%" ,height: "100%", position: "absolute", pointerEvents:"none"}}></div>
                <iframe title="iframe" id="diminute" class="miniatura" src=""  style={{background: "url(https://s3-us-west-2.amazonaws.com/joinnus.com/user/308917/avatar.jpg) no-repeat",backgroundsize: "cover", pointerEvents:"none"}}>
                </iframe>
              </a>
        </div>
        <div class="overlay" id="overlay" style={{pointerEvents:"none"}}>
          <div class="popup" id="popup">
              <a href style={{zIndex: "8"}} onClick={()=>props.closePopup('overlay','popup')} id="btn-cerrar-popup" class="btn-cerrar-popup"><p>X</p></a>
              <div style={{position: "absolute",width: "100%",top: "0",height: "100%",zIndex:"6",left: "0"}}></div>
            <iframe title="iframe" id="diapo-frame" src="/plugin/images/icon/playtec-icon.png2" frameborder="0" width="960" height="569" style={{width: "100% !important",height: "100% ", pointerEvents:"none"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
        </div>
        <div class="overlay" id="overlay2">
                <div class="popup" id="popupvideo">
                  <a href id="btn-cerrar-popup2" class="btn-cerrar-popup"><p>X</p></a>
                  <iframe title="iframe" id="video-frame" src="" frameborder="0" style={{width: "100% !important",height:"100%"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
              </div>








        <div class="container-fluid text-center text-md-left">
          <div class="row">
           
            <div class="col-md-6 mb-md-0 mb-3" >
          
              
              <div class="overlay" id="overlayForm">
                <div class="popup" id="popupform">
                  <a href id="btn-cerrar-popup4" class="btn-cerrar-popup"><p>X</p></a>
                  <iframe title="iframe" id="diapo-formulario" src="" frameborder="0" style={{width: "100% !important",height:"100%"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
                </div>
              </div>
              <div class="overlay" id="overlay3">
                <div class="popup" id="popupalumno">
                  <a href id="btn-cerrar-popup3" class="btn-cerrar-popup"><p>X</p></a>
                  <div id="lbResultado"></div>
                </div>
              </div>
              <button id="Streamer" hidden>Reproducir</button>
              <input type="hidden" id="debug" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
