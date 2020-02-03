import React from 'react';
import Roulette from './Roulette';
import io from 'socket.io-client';
import axios from 'axios';
import { BtnPuntos } from '../lista/btnpuntos';
import iconExit from "../../../img/cerrar.png";

class Azar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todosAlumnos: [],
            alumnos: [],
            alumnoElegido: "",
            point: 10,
            showModal: 0,
            tipoPuntaje: 1,
            datapoint: {
                positivo: [
                    { imgen: require('../../../img/lista/punto1.png'), valor: 1, title: 'Ayuda a Otros' },
                    { imgen: require('../../../img/lista/punto2.png'), valor: 1, title: 'Cumplimiento de Tareas' },
                    { imgen: require('../../../img/lista/punto3.png'), valor: 1, title: 'Participacion' },
                    { imgen: require('../../../img/lista/punto4.png'), valor: 1, title: 'Persistencia' },
                    { imgen: require('../../../img/lista/punto5.png'), valor: 1, title: 'responsabilidad' },
                    { imgen: require('../../../img/lista/punto6.png'), valor: 1, title: 'trabajo en equipo' }],
                negativo: [
                    { imgen: require('../../../img/lista/punto-1.png'), valor: 1, title: 'Ayuda a Otros' },
                    { imgen: require('../../../img/lista/punto-2.png'), valor: 1, title: 'Cumplimiento de Tareas' },
                    { imgen: require('../../../img/lista/punto-3.png'), valor: 1, title: 'Participacion' }]
            }
        }
    }

    componentWillMount() {
        this.getStudents();
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })
        socket.on('newAlum', (data) => {
            if (data.pin === (this.props.id_access).toUpperCase()) {
                this.getStudents()
            }
        })
    }

    handleOnComplete = async (alumnoElegido) => {
        for (var alumno of this.state.todosAlumnos) {
            if (`${alumno.name_stu} ${alumno.lastName_stu}` === alumnoElegido) {
                await this.setState({ point: alumno.point })
            }
        }
        this.setState({ alumnoElegido, showModal: 1 })
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
            .then((res) => {
                const temp = [];
                res.data.map(alumno => {
                    temp.push(`${alumno.name_stu} ${alumno.lastName_stu}`)
                    return null
                })
                this.setState({ alumnos: this.sortearElementos(temp), todosAlumnos: res.data })
            })
    }
    sortearElementos = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    handleChangePScore = () => this.setState({ tipoPuntaje: 1 })
    handleChangeNScore = () => this.setState({ tipoPuntaje: 0 })

    onClickPointAdd = async (valor) => {

        let varToken = localStorage.getItem('token');
        for (var alumno of this.state.todosAlumnos) {
            if (`${alumno.name_stu} ${alumno.lastName_stu}` === this.state.alumnoElegido) {
                await this.setState({ point: alumno.point })
                let point = this.state.point + valor
                const data = { point }
                axios({
                    url: this.props.apiUrl + '/v1/api/student/update_score/' + alumno._id,
                    data,
                    method: 'put',
                    headers: {
                        'x-access-token': `${varToken}`
                    }
                })
            }
        }
        this.getStudents();
        this.setState({ showModal: 2 })
    }
    onClickPointRemove = async (valor) => {

        let varToken = localStorage.getItem('token');
        for (var alumno of this.state.todosAlumnos) {
            if (`${alumno.name_stu} ${alumno.lastName_stu}` === this.state.alumnoElegido) {
                await this.setState({ point: alumno.point })
                let point = this.state.point - valor
                const data = { point }
                axios({
                    url: this.props.apiUrl + '/v1/api/student/update_score/' + alumno._id,
                    data,
                    method: 'put',
                    headers: {
                        'x-access-token': `${varToken}`
                    }
                })
            }
        }
        this.getStudents();
        this.setState({ showModal: 2 })
    }


    render() {
        if (this.state.alumnos.length > 0) {
            return (
                <div>
                    <Roulette
                        options={this.state.alumnos}
                        baseSize={220}
                        onComplete={this.handleOnComplete}
                        socketUrl={this.props.socketUrl}
                        id_access={this.props.id_access}
                    />
                    <div id="modal-general_container" className={this.state.showModal === 0 ? "" : this.state.showModal === 1 ? "six" : this.state.showModal === 2 ? "six out" : ""}>
                        <div class="modal-general_background">
                            <div class="modal-general_bg_content">
                                <button className="modal-general_close" onClick={() => this.setState({showModal:2})}>
                                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                                </button>
                                <div className="modal-general_container">
                                    <div className="modal-general_container_header">
                                        <div className="modal-title">
                                            Alumno: {this.state.alumnoElegido}
                                        </div>
                                    </div>
                                    <div className="modal-general_container_body">
                                        <ul class="azar-tab-group">
                                            <li class={this.state.tipoPuntaje ? "azar-tab active" : "azar-tab"} onClick={this.handleChangePScore}><p className="azar-a">POSITIVO</p></li>
                                            <li class={this.state.tipoPuntaje ? "azar-tab" : "azar-tab active"} onClick={this.handleChangeNScore}><p className="azar-a">NEGATIVO</p></li>
                                        </ul>
                                        {
                                            this.state.tipoPuntaje
                                                ?
                                                <BtnPuntos data={this.state.datapoint.positivo} funcion={this.onClickPointAdd} />
                                                :
                                                <BtnPuntos data={this.state.datapoint.negativo} funcion={this.onClickPointRemove} />
                                        }
                                    </div>
                                </div>
                                <svg class="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                    <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <p className="text-center">Esperando alumnos para ruleta...</p>
        }
    }
}

export default Azar;