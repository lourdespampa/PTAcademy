import React,{useState} from 'react';
import './FooterContainer.sass';
import Modal from 'react-bootstrap/Modal';
import Audio from '../audio/audio';
import io from 'socket.io-client';

function enviarvideo(url,url2,socketUrl,id_access){
    var urlnombre=url+url2
    const socket = io(socketUrl, {
        query:
            { pin: id_access }
    })
    socket.emit('VideoEmit',urlnombre)
    document.getElementById('overlay2').classList.add('active');
    document.getElementById('popupvideo').classList.add('active');
    var expresionRegular = 'https://www.youtube.com/watch?v=';
    var urlembed = urlnombre.split(expresionRegular);
    document.getElementById('video-frame').src = "https://www.youtube.com/embed/"+urlembed[1]+"?autoplay=1&controls=0"
}
function SendForm(socketUrl,id_access){
    
    //SEND FORM
    const socket = io(socketUrl, {
        query:
            { pin: id_access }
    })
    socket.emit('SendForm')
    

    //END SEND FORM
}
function FooterContainer(props){
    const [urlnombre,seturlnombre]=useState('');
    const [Show, setShow] = useState(false);
        return(
        <>
            <footer className="footer-distributed">
                <div className="footer-left column">
                        {
                        (props.diapositivaHover)
                        ?
                            <div id="menupresentacion" className="footer-left" style={{position: "fixed",width: "23%",height: "18%",border: "solid 5px white",zIndex: 0.1}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}>
                                <button id="btndiapo" className="pres" onClick={()=>props.openPopup('overlay','popup')+props.botonClick('btndiapo')} >DIAPOSITIVAS</button>
                                <button id="btnform" className="pres" onClick={()=>props.openPopup('overlayinframe','popupformulario')+props.botonClick('btnform')}>FORMULARIO</button>
                                <button id="btnvideo" className="pres" onClick={() => setShow(true)+props.botonClick('btnvideo')}>VIDEO</button>
                            </div>
                        :
                            <>
                                <div id="envoltura" className="envoltura" style={{width: "23%", height: "90%", position: "absolute"}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}></div>
                            </>
                        }
                        <iframe title="myiframe" className="miniatura" id="diminute" 
                            src="" width="100%" height="100%" style={{background: "white"}}>
                        </iframe>
                </div>
                <div className="footer-center">
                </div>
                <div className="footer-right">
                    <button className="col-6 " onClick={()=>props.grabar()}>
                        grabar
                    </button>
                    <button className="col-6 " onClick={()=>props.reproclick()}>
                        reproducir
                    </button>
                    <div>
                        <Audio socketUrl={props.socketUrl} id_access={props.id_access}/>
                    </div>
                    
                </div>

                <div className="overlay" id="overlay">
                    <div className="popup" id="popup">
                        <a href id="btnCerrarDiapo" className="btn-cerrar-popup" onClick={()=>props.closePopup('overlay','popup')+props.botonClick('btnCerrarDiapo')} ><i class="material-icons">close</i></a>
                        <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="960" height="569" style={{width: "100% !important",height: "100%"}} allowFullScreen={true}
                         mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                        <div id="btnBack" className="btn-back"  onClick={()=>props.backtPpt()+props.botonClick('btnBack')}><i class="material-icons">navigate_before</i></div>
                        <div id="btnNext" className="btn-next" onClick={()=>props.nextPpt()+props.botonClick('btnNext')}><i class="material-icons">navigate_next</i></div>
                    </div>
                </div>
                <div className="overlay" id="overlayinframe">
                    <div className="popup" id="popupformulario">
                        <div class="punto-posi">
                            <h1>Emitir Formulario</h1>
                        </div>
                        <br/>
                        <a href id="btnCerrarFormu" className="btn-cerrar-popup" onClick={()=>props.closePopup('overlayinframe','popupformulario')+props.botonClick('btnCerrarFormu')} ><i class="material-icons">close</i></a>
                        <iframe title="diapo-iframe" id="diapo-formulario" frameBorder="0" style={{width: "100% !important",height: "450px"}} allowFullScreen={true}
                         mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                         
                         <button className="btn btn-block btn-info" onClick={()=>SendForm(props.socketUrl,props.id_access)}>EMITIR</button>
                    </div>
                </div>
            </footer>
                <Modal
                id="modalvideo"
                size={'SM'}
            show={Show}
            onHide={() => setShow(false)+props.botonClick('modalvideo')}
          >
            <Modal.Header closeButton>
              <div class="punto-posi">
                  <h2>Emitir video</h2>
              </div>
            </Modal.Header>
            <Modal.Body>
              <input id="urlid" type="text" placeholder={props.txt} name="urlvideo" onChange={e => seturlnombre(e.target.value)+props.changeOn('urlvideo',e.target.value)} style={{fontSize:"20px",width: "80%"}} required/>
              <button id="btnenviarvideo" onClick={()=>enviarvideo(urlnombre,props.txt,props.socketUrl,props.id_access,setShow(false))+props.botonClick('btnenviarvideo')} class="button btnMyM" type="button">Enviar</button>
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