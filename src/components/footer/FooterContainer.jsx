import React,{useState} from 'react';
import './FooterContainer.css';
import Modal from 'react-bootstrap/Modal';
function enviarvideo(url){
    var urlnombre=url
    document.getElementById('overlay2').classList.add('active');
    document.getElementById('popupvideo').classList.add('active');
    var expresionRegular = 'https://www.youtube.com/watch?v=';
    var urlembed = urlnombre.split(expresionRegular);
    document.getElementById('video-frame').src = "https://www.youtube.com/embed/"+urlembed[1]+"?autoplay=1&controls=0"
}
function closePopup(o,p){
    var overlay = document.getElementById(o),
        popup = document.getElementById(p);
        overlay.classList.remove('active');
        popup.classList.remove('active');
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
                            <div id="menupresentacion" className="footer-left" style={{position: "fixed",width: "23%",height: "18%",border: "solid 5px white",zIndex: 1}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}>
                                <button className="pres" onClick={()=>props.openPopup('overlay','popup')} >DIAPOSITIVAS</button>
                                <button className="pres">FORMULARIO</button>
                                <button className="pres" onClick={() => setShow(true)}>Video</button>
                            </div>
                        :
                            <div className="envoltura" style={{width: "23%", height: "90%", position: "absolute"}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}></div>
                        }
                        <iframe title="myiframe" className="miniatura" id="diminute" 
                            src="" width="100%" height="100%" style={{background: "white"}}>
                        </iframe>
                        {/* <div className="column">
                            <img src={require('../../img/footer/song.png')} width="25"/>
                        </div> */}
                </div>
                <div className="footer-center">
                    <div className="ml-4 center-container">
                        
                    </div>
                </div>
                <div className="footer-right">
                    <h3>unknown</h3>
                </div>

                <div className="overlay" id="overlay">
                    <div className="popup" id="popup">
                        <a href className="btn-cerrar-popup" onClick={()=>props.closePopup('overlay','popup')} ><i class="material-icons">close</i></a>
                        <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="960" height="569" style={{width: "100% !important",height: "100%"}} allowFullScreen={true}
                         mozallowfullscreen="true" webkitallowfullscreen="true" src="" ></iframe>
                        <div className="btn-back"  onClick={props.backtPpt}><a href >antes</a>{/*<img width="25" src={require('.../.../presentation/btn-back.svg')} />*/}</div>
                        <div className="btn-next" onClick={props.nextPpt}><a href>siguiente</a>{/*<img width="25" src={require('.../.../presentation/btn-next.svg')} />*/}</div>
                    </div>
                </div>
            </footer>
            <div class="modal fade bd-example-modal-lg" id="modalvideo" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" style={{minHeight: "auto"}}>
                            <div class="modal-header">
                                <div class="punto-posi">
                                    <h1>Emitir video</h1>
                                </div>
                            </div>
                            <div class="modal-body" style={{justifyContent: "center",display: "flex"}}>
                                <input id="urlid" type="text" name="urlvideo" placeholder="url" style={{fontSize:"15px",width: "100%"}} required/>
                                <br/>
                                <button id="btnvideo" onClick={props.enviarvideo} class="button btnMyM" type="button">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
            show={Show}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <div class="punto-posi">
                  <h1>Emitir video</h1>
              </div>
            </Modal.Header>
            <Modal.Body>
              <input id="urlid" type="text" name="urlvideo" onChange={e => seturlnombre(e.target.value)} placeholder="url" style={{fontSize:"15px",width: "100%"}} required/>
                  <br/>
              <button id="btnvideo" onClick={()=>enviarvideo(urlnombre,setShow(false))} class="button btnMyM" type="button">Enviar</button>
            </Modal.Body>
          </Modal>
          <div class="overlay" id="overlay2">
              <div class="popup" id="popupvideo">
                  <a href id="btn-cerrar-popup2" className="btn-cerrar-popup" onClick={()=>closePopup('overlay2','popupvideo')}><i class="material-icons">close</i></a>
                  <iframe  title="iframevideo" id="video-frame" src="" frameborder="0" width="960" height="569" style={{width: "100% !important",height: "100%"}} 
                  allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
              </div>
          </div>
        </>
    )
}

export default FooterContainer;