import React,{Component} from 'react'
import FooterContainer from '../../components/student/footer/footercontainer'

export default class Footer extends Component {
    state = {
        // variable para mostrar u ocultar los 3 botones que aparecen al hacer hover en la diapositiva del footer
        diapositivaHover: false,
        src:"https://docs.google.com/presentation/d/e/2PACX-1vQNDqsVLggLYCO546Knez7Ecbs0SCErBbtTfAOn74iEHVtHoUKKECnzcsD6btExAMfn9VnHjsrf867m/pub?start=false&loop=false&delayms=3000",
        srcForm:"https://docs.google.com/forms/d/e/1FAIpQLSftlA2JivBhsQ0mhdyJ4LQczijxvyjN-SClloK6-9gNIyK2Eg/viewform?usp=sf_link"
    }
        
    //FUNCIONES DE FOOTERCONTAINER
    getUrlForm=()=> {
        document.getElementById("diapo-formulario").src = this.state.srcForm;
    }
    //Funcion para activar o desactivar el estado que se encarga de mostrar los botones de la diapositiva del footer
    toggleHoverSlide = () => {
        this.setState({diapositivaHover: !this.state.diapositivaHover})
    }
    openPopup=(o,p)=>{
    var overlay = document.getElementById(o),
        popup = document.getElementById(p);

        overlay.classList.add('active');
        popup.classList.add('active');
    }
    closePopup=(o,p)=>{
    var overlay = document.getElementById(o),
        popup = document.getElementById(p);
    
            overlay.classList.remove('active');
            popup.classList.remove('active');
            document.getElementById('video-frame').src ="";
        }
    

    async componentDidMount(){
        this.getUrlForm();
        }

    render(){
    return (
        <>
        <FooterContainer socketUrl={this.props.socketUrl} id_access={this.props.id_access}
        diapositivaHover={this.state.diapositivaHover} toggleHoverSlide={this.toggleHoverSlide} 
        closePopup={this.closePopup} openPopup={this.openPopup} nextPpt={this.nextPpt} 
        backtPpt={this.backtPpt}
        />
        </>
    )}
}
