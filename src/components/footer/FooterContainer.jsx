import React from 'react';

import './FooterContainer.css';

function FooterContainer(){

    return(
        <>
            <footer className="footer-distributed">
                <div className="footer-left column" onmouseout="DesactivarPres()" onmouseover="ActivarPres()">
                    <a id="btn-abrir-popup" className="btn-abrir-popup" />
                        <div className="envoltura" style={{width: "23%", height: "90%", position: "absolute"}}></div>
                        <iframe class="miniatura" id="diminute" 
                            src="https://docs.google.com/presentation/d/e/2PACX-1vRZDJOxRieHaBo7oXEkyCVkdUha4GolZACvw6skP17Spvsty8SD6tG3zcmfZSphXBVxW5rNuklMQYtw/embed?start=false&amp;amp;loop=false&amp;amp;delayms=3000&amp;rm=minimal&amp;slide=id.p1" 
                            width="100%" height="100%" style={{background: "white"}}>
                        </iframe>
                        {/* <div className="column">
                            <img src={require('../../img/footer/song.png')} width="25"/>
                        </div> */}
                </div>
                <div className="footer-center">
                    <div class="ml-4 center-container">
                        
                    </div>
                </div>
                <div className="footer-right">
                    <h3>unknown</h3>
                </div>
            </footer>
        </>
    )
}

export default FooterContainer;