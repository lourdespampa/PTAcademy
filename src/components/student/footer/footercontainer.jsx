import React from 'react';
import './footerStyles.sass';
import Chat from '../chat/chat_stud'

export default function footercontainer(props) {
  return (
    <>
     
     <Chat name={props.name} lastName={props.lastName} socketUrl={props.socketUrl} id_access={props.id_access} />
      <footer id="footer" className="fixed-footer">
      
        {/* se esta poniendo el class name */}
        <div className="slide-container">
          <span>hola</span>
              <a id="btn-abrir-popup"href style={{right :"auto",left:"10px",position: "absolute"}} className="btn-abrir-popup">
                <div className="envoltura" onClick={()=>props.openPopup('overlay','popup')} style={{width: "100%" ,height: "100%", position: "absolute", pointerEvents:"none"}}></div>
                <iframe title="iframe" id="diminute" className="miniatura" src=""  style={{background: "url(https://s3-us-west-2.amazonaws.com/joinnus.com/user/308917/avatar.jpg) no-repeat",backgroundsize: "cover", pointerEvents:"none"}}>
                </iframe>
              </a>
        </div>
      
        {/* <div className="overlay" id="overlay" style={{pointerEvents:"none"}}>
          <div className="popup" id="popup">
              <a href onClick={()=>props.closePopup('overlay','popup')} id="btn-cerrar-popup" className="btn-cerrar-popup"><p>X</p></a>
              <div style={{position: "absolute",width: "100%",top: "0",height: "100%",left: "0"}}></div>
            <iframe title="iframe" id="diapo-frame" src="/plugin/images/icon/playtec-icon.png2" frameborder="0" width="960" height="569" style={{width: "100% !important",height: "100% ", pointerEvents:"none"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
        </div>
        <div className="overlay" id="overlay2">
                <div className="popup" id="popupvideo">
                  <a href id="btn-cerrar-popup2" className="btn-cerrar-popup"><p>X</p></a>
                  <iframe title="iframe" id="video-frame" src="" frameborder="0" style={{width: "100% !important",height:"100%"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
              </div> */}



        {/* <div className="container-fluid text-center text-md-left">
          <div className="row">
           
            <div className="col-md-6 mb-md-0 mb-3" >
          
              
              <div className="overlay" id="overlayForm">
                <div className="popup" id="popupform">
                  <a href id="btn-cerrar-popup4" className="btn-cerrar-popup"><p>X</p></a>
                  <iframe title="iframe" id="diapo-formulario" src="" frameborder="0" style={{width: "100% !important",height:"100%"}} allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" ></iframe>
                </div>
              </div>
              <div className="overlay" id="overlay3">
                <div className="popup" id="popupalumno">
                  <a href id="btn-cerrar-popup3" className="btn-cerrar-popup"><p>X</p></a>
                  <div id="lbResultado"></div>
                </div>
              </div>
              <button id="Streamer" hidden>Reproducir</button>
              <input type="hidden" id="debug" />
            </div>
          </div>
        </div> */}
      </footer>
    </>
  )
}
