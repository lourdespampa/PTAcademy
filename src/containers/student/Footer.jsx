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
    getUrl=()=> {
            var old = this.state.src;
            var casi = old.replace("pub", "embed");
            var enlace = casi.replace("delayms=3000", "delayms=3000&rm=minimal&slide=id.p1");
            console.log('get URL: ' + enlace)
            document.getElementById("diapo-frame").src = enlace;
            document.getElementById("diminute").src = enlace;
        }
        getUrlForm=()=> {
            document.getElementById("diapo-formulario").src = this.state.srcForm;
        }

    nextPpt=()=> {
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
    
    backtPpt=()=> {
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

    async componentDidMount(){
            this.getUrl();
        this.getUrlForm();
        }

    render(){
    return (
        <>
        <FooterContainer 
        diapositivaHover={this.state.diapositivaHover} toggleHoverSlide={this.toggleHoverSlide} 
        closePopup={this.closePopup} openPopup={this.openPopup} nextPpt={this.nextPpt} 
        backtPpt={this.backtPpt}
        />
        </>
    )}
}
