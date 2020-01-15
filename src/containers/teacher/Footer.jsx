import React, { Component } from 'react'

import FooterContainer from '../../components/teacher/footer/FooterContainer';
import io from 'socket.io-client';

class Footer extends Component {
    state = {
        // variable para mostrar u ocultar los 3 botones que aparecen al hacer hover en la diapositiva del footer
        diapositivaHover: false,
        src: "https://docs.google.com/presentation/d/e/2PACX-1vQNDqsVLggLYCO546Knez7Ecbs0SCErBbtTfAOn74iEHVtHoUKKECnzcsD6btExAMfn9VnHjsrf867m/pub?start=false&loop=false&delayms=3000",
        srcForm: "https://docs.google.com/forms/d/e/1FAIpQLSftlA2JivBhsQ0mhdyJ4LQczijxvyjN-SClloK6-9gNIyK2Eg/viewform?usp=sf_link"
    }

    //FUNCIONES DE FOOTERCONTAINER

    //Funcion para activar o desactivar el estado que se encarga de mostrar los botones de la diapositiva del footer
    toggleHoverSlide = () => {
        this.setState({ diapositivaHover: !this.state.diapositivaHover })
    }
    openPopup = async (o, p) => {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })
        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        console.log(this.props.socketUrl)
        if (overlay.id == 'overlay' && popup.id == 'popup') {

            socket.emit('sendSlides')
        }


        overlay.classList.add('active');
        popup.classList.add('active');
    }
    closePopup = (o, p) => {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })

        var overlay = document.getElementById(o),
            popup = document.getElementById(p);

        if (overlay.id == 'overlay' && popup.id == 'popup') {
            socket.emit('closeSlides')
        }else if (overlay.id == 'overlay2' && popup.id == 'popupvideo') {
            socket.emit('closeVideo')
        }else if (overlay.id == 'overlayinframe' && popup.id == 'popupformulario') {
            socket.emit('closeForm')
        }


        overlay.classList.remove('active');
        popup.classList.remove('active');
        document.getElementById('video-frame').src = "";
    }
    getUrl = () => {
        var old = this.state.src;
        var casi = old.replace("pub", "embed");
        var enlace = casi.replace("delayms=3000", "delayms=3000&rm=minimal&slide=id.p1");
        console.log('get URL: ' + enlace)
        document.getElementById("diapo-frame").src = enlace;
        document.getElementById("diminute").src = enlace;
    }
    getUrlForm = () => {
        document.getElementById("diapo-formulario").src = this.state.srcForm;
    }

    nextPpt = () => {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })
        socket.emit('nextPpt')
        var cambiado = '';
        var url_string = document.getElementById("diapo-frame").src;
        var url = new URL(url_string);
        var c = url.searchParams.get("slide");
        //Consigue num de la pagina
        var pag = parseInt(c.substr(4));
        //Pasas a la siguiente diapo
        var slide = pag + 1;
        //Se quita la pagina antigua
        cambiado = (url.search).substr(0, 58);
        //Se agrega la nueva pagina
        cambiado += slide;
        var final = url.origin + url.pathname + cambiado;
        document.getElementById("diapo-frame").src = final;
        document.getElementById("diminute").src = final;
    }


    backtPpt = () => {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })
        socket.emit('backtPpt')
        var cambiado = '';
        var url_string = document.getElementById("diapo-frame").src;
        var url = new URL(url_string);
        var c = url.searchParams.get("slide");
        //Consigue num de la pagina
        var pag = c.substr(4);
        //Pasas a la siguiente diapo
        var slide = parseInt(pag) - 1;
        //Se quita la pagina antigua
        cambiado = (url.search).substr(0, 58);
        //Se agrega la nueva pagina
        cambiado += slide;
        var final = url.origin + url.pathname + cambiado;
        document.getElementById("diapo-frame").src = final;
        document.getElementById("diminute").src = final;
    }
    async componentDidMount() {
        this.getUrl();
        this.getUrlForm();
    }
    render() {
        return (
            <div>
                <FooterContainer
                    // Envio del esatdo y funcion de mostrar los botones de la diapositiva del footer
                    diapositivaHover={this.state.diapositivaHover} toggleHoverSlide={this.toggleHoverSlide}
                    closePopup={this.closePopup} openPopup={this.openPopup} nextPpt={this.nextPpt}
                    backtPpt={this.backtPpt} enviarvideo={this.enviarvideo} id_access={this.props.id_access}
                    botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}
                    changeOn={this.props.changeOn} txt={this.props.txt} socketUrl={this.props.socketUrl}
                />
            </div>
        )
    }
}

export default Footer;
