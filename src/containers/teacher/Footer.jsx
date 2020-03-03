import React, { Component } from "react";

import FooterContainer from "../../components/teacher/footer/FooterContainer";
import io from "socket.io-client";

class Footer extends Component {
  state = {
    diapositivaHover: false,
    srcForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSftlA2JivBhsQ0mhdyJ4LQczijxvyjN-SClloK6-9gNIyK2Eg/viewform?usp=sf_link"
  };
  //Funcion para activar o desactivar el estado que se encarga de mostrar los botones de la diapositiva del footer
  openPopup = async (o, p) => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    var overlay = document.getElementById(o),
      popup = document.getElementById(p);
    console.log(this.props.socketUrl);
    if (overlay.id === "overlay" && popup.id === "popup") {
      socket.emit("sendSlides");
    }
    overlay.classList.add("active");
    popup.classList.add("active");
  };
  closePopup = (o, p) => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    var overlay = document.getElementById(o),
      popup = document.getElementById(p);

    if (overlay.id === "overlay" && popup.id === "popup") {
      socket.emit("closeSlides");
    } else if (overlay.id === "overlay2" && popup.id === "popupvideo") {
      document.getElementById("video-frame").src = "";
      socket.emit("closeVideo");
    } else if (
      overlay.id === "overlayinframe" &&
      popup.id === "popupformulario"
    ) {
      socket.emit("closeForm");
    } else if(
      overlay.id === "overlayrouletteWinnerS"
    ) {
      socket.emit("closerouletteWinnerS")
    }
    overlay.classList.remove("active");
    popup.classList.remove("active");
  };
  getUrlForm = () => {
    document.getElementById("diapo-formulario").src = this.state.srcForm;
  };
  async componentDidMount() {
    this.getUrlForm();
  }
  render() {
    return (
      <FooterContainer
        // Envio del esatdo y funcion de mostrar los botones de la diapositiva del footer
        apiUrl={this.props.apiUrl}
        id_class={this.props.id_class}
        diapositivaHover={this.state.diapositivaHover}
        closePopup={this.closePopup}
        openPopup={this.openPopup}
        nextPpt={this.nextPpt}
        backtPpt={this.backtPpt}
        enviarvideo={this.enviarvideo}
        id_access={this.props.id_access}
        botonClick={this.props.botonClick}
        grabar={this.props.grabar}
        reproclick={this.props.reproclick}
        changeOn={this.props.changeOn}
        txt={this.props.txt}
        socketUrl={this.props.socketUrl}
      />
    );
  }
}

export default Footer;
