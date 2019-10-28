import React, { Component } from 'react'

import FooterContainer from './../components/footer/FooterContainer';

class Footer extends Component {
    state = {
        // variable para mostrar u ocultar los 3 botones que aparecen al hacer hover en la diapositiva del footer
        diapositivaHover: false
    }

    //FUNCIONES DE FOOTERCONTAINER

    //Funcion para activar o desactivar el estado que se encarga de mostrar los botones de la diapositiva del footer
    toggleHoverSlide = () => {
        this.setState({diapositivaHover: !this.state.diapositivaHover})
    }


    render() {
        return (
            <div>
                <FooterContainer
                    // Envio del esatdo y funcion de mostrar los botones de la diapositiva del footer
                    diapositivaHover={this.state.diapositivaHover} toggleHoverSlide={this.toggleHoverSlide}
                />
            </div>
        )
    }
}

export default Footer;
