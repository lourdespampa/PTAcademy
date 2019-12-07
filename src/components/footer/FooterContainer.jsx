import React from 'react';
import {Link} from 'react-router-dom';
import './FooterContainer.css';
import Audio from '../audio/audio';

function FooterContainer(props){

    return(
        <>
            <footer className="footer-distributed">
                <div className="footer-left column">
                    <a id="btn-abrir-popup" className="btn-abrir-popup" />
                        {
                        (props.diapositivaHover)
                        ?
                            <div id="menupresentacion" className="footer-left" style={{position: "fixed",width: "23%",height: "18%",border: "solid 5px white",zIndex: 1}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}>
                                <button className="pres" id="btn-abrir-popup">DIAPOSITIVAS</button>
                                <button className="pres">FORMULARIO</button>
                                <button className="pres">VIDEO</button>
                            </div>
                        :
                            <div className="envoltura" style={{width: "23%", height: "90%", position: "absolute"}} onMouseEnter={props.toggleHoverSlide} onMouseLeave={props.toggleHoverSlide}></div>
                        }
                        <iframe className="miniatura" id="diminute" 
                            src="https://docs.google.com/presentation/d/e/2PACX-1vRZDJOxRieHaBo7oXEkyCVkdUha4GolZACvw6skP17Spvsty8SD6tG3zcmfZSphXBVxW5rNuklMQYtw/embed?start=false&amp;amp;loop=false&amp;amp;delayms=3000&amp;rm=minimal&amp;slide=id.p1" 
                            width="100%" height="100%" style={{background: "white"}}>
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
                    <Link to="/chat" className="icon-googleplus"><i class="far fa-comments"></i>CHAT</Link>
                    
                    <Audio/>
                </div>

                <div className="overlay" id="overlay">
                    <div className="popup" id="popup">
                        <a href="#" id="btn-cerrar-popup" className="btn-cerrar-popup"><i className="fas fa-times"></i></a>
                        <iframe id="diapo-frame" src="" frameBorder="0" width="960" height="569" style={{width: "100% !important",height: "100%"}} allowFullScreen={true} mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                        <div className="btn-back" onclick="backtPpt()"><img width="25" src="/plugin/images/presentation/btn-back.svg" /></div>
                        <div className="btn-next" onclick="nextPpt()"><img width="25" src="/plugin/images/presentation/btn-next.svg" /></div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterContainer;