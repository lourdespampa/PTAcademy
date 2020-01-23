import React from 'react';
import Roulette from './Roulette';
import io from 'socket.io-client';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { BtnPuntos } from '../lista/btnpuntos';
import iconExit from "../../../img/cerrar.png";

class Azar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alumnos: [],
            alumnoElegido : "",
            showModal : false,
            tipoPuntaje: false,
            datapoint:{
                positivo:[
                    {imgen:require('../../../img/lista/punto1.png'),valor:1,title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto2.png'),valor:1,title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto3.png'),valor:1,title:'Participacion'},
                    {imgen:require('../../../img/lista/punto4.png'),valor:1,title:'Persistencia'},
                    {imgen:require('../../../img/lista/punto5.png'),valor:1,title:'responsabilidad'},
                    {imgen:require('../../../img/lista/punto6.png'),valor:1,title:'trabajo en equipo'}],
                negativo:[
                    {imgen:require('../../../img/lista/punto-1.png'),valor:1,title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto-2.png'),valor:1,title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto-3.png'),valor:1,title:'Participacion'}]
            }
        }
    }

    componentWillMount(){
        this.getStudents();
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
          })
          socket.on('newAlum',(data)=>{
            if(data.pin == (this.props.id_access).toUpperCase()) {
                this.getStudents()
            }
          })
    }

    handleOnComplete = (alumno) => {
        console.log(alumno);
        this.setState({alumnoElegido : alumno, showModal : true})
      };

    getStudents = () => {
        var varToken = localStorage.getItem('token');
        axios({
            url: `${this.props.apiUrl}/v1/api/lesson/${this.props.id_access}/students/roulette`,
            method: 'GET',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        .then( (res) => {
            const temp = [];
            res.data.map( alumno => {
                temp.push(alumno.name_stu)
            })
            this.setState({ alumnos: this.sortearElementos(temp) })
        })
    }
    sortearElementos = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    handleChangePScore = () => this.setState({tipoPuntaje:true})
    handleChangeNScore = () => this.setState({tipoPuntaje:false})


    render(){
        if(this.state.alumnos.length > 0){
            return(
                <div>
                    <Roulette 
                        options={this.state.alumnos} 
                        baseSize={220} 
                        onComplete={this.handleOnComplete} 
                        socketUrl={this.props.socketUrl} 
                        id_access={this.props.id_access}
                    />
                    <Modal className="modal-teacher__general" size={'lg'} show={this.state.showModal} onHide={() => this.setState({showModal:false})}>
                        <button className="modal-teacher__general-close" onClick={() => this.setState({showModal:false})}>
                            <img className="modal-teacher__general-cross" src={iconExit} alt="imagen de cerrar modal" />
                        </button>
                        <Modal.Header>
                             <div>
                                Alumno: {this.state.alumnoElegido}
                             </div>
                        </Modal.Header>
                        <Modal.Body>
                            <ul class="azar-tab-group">
                                <li class={this.state.tipoPuntaje ? "azar-tab active" : "azar-tab"} onClick={this.handleChangePScore}><a className="azar-a">POSITIVO</a></li>
                                <li class={this.state.tipoPuntaje ? "azar-tab" : "azar-tab active"} onClick={this.handleChangeNScore}><a className="azar-a">NEGATIVO</a></li>
                            </ul>
                            {
                                this.state.tipoPuntaje
                                ?
                                <BtnPuntos data={this.state.datapoint.positivo} funcion={this.onClickPointAdd} />
                                :
                                <BtnPuntos data={this.state.datapoint.negativo} funcion={this.onClickPointRemove} />
                            }
                        </Modal.Body>
                    </Modal>
                </div>
            )
        } else {
            return <p className="text-center">Esperando alumnos para ruleta...</p>
          }
    }
}

export default Azar;