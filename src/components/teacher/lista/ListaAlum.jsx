import React, { Component } from 'react';
import './lista.sass';
import axios from 'axios'
import { ExportCSV } from './exportbtn'
import { BtnPuntos } from './btnpuntos'
import io from 'socket.io-client';
import { TableBody } from './tablebody'
import Modal from 'react-bootstrap/Modal';
import iconExit from "../../../img/cerrar.png";
// import {alumnos} from '../../data/alumnos.json';
export default class ListaAlum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_access: '',
            modals: {
                showpuntosmas: false,
                showpuntosmenos: false,
                showcomportamiento: false,
                shownota: false,
                showdelete: false
            },
            pin: 'pin',
            point: '',
            note: '',
            conduct: '',
            _id: '',
            students: [],
            fileName: 'Nota de alumnos',
            datapoint:{
                pocitivo:[{imgen:require('../../../img/lista/punto1.png'),valor:1,title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto3.png'),valor:1,title:'Participacion'},
                    {imgen:require('../../../img/lista/punto4.png'),valor:1,title:'Persistencia'},
                    {imgen:require('../../../img/lista/punto5.png'),valor:1,title:'responsabilidad'},
                    {imgen:require('../../../img/lista/punto2.png'),valor:1,title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto6.png'),valor:1,title:'trabajo en equipo'}],
                negativo:[{imgen:require('../../../img/lista/punto-1.png'),valor:1,title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto-2.png'),valor:1,title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto-3.png'),valor:1,title:'Participacion'}],
                camportamiento:[{imgen:require('../../../img/lista/a.jpg'),title:'',valor:'A'},
                    {imgen:require('../../../img/lista/b.jpg'),title:'',valor:'B'},
                    {imgen:require('../../../img/lista/c.jpg'),title:'',valor:'C'},
                    {imgen:require('../../../img/lista/d.jpg'),title:'',valor:'D'},
                    {imgen:require('../../../img/lista/e.jpg'),title:'',valor:'E'},
                    {imgen:require('../../../img/lista/f.jpg'),title:'',valor:'F'}]
                    }
                };
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    async componentDidMount() {
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

    //rellenar state
    getStudents = async () => {
        console.log(this.state.students)
        console.log(this.props.id_access)
        var varToken = localStorage.getItem('token');
        const res = await axios({
            url: `${this.props.apiUrl + '/v1/api/lesson'}/${this.props.id_access}/students`,
            method: 'GET',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.setState({
            students: await res.data
        });
    }
    //eliminar estudiante
    deleteStudents = async (studentsId) => {
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
        })
        var varToken = localStorage.getItem('token');
        await axios({
            url: this.props.apiUrl + '/v1/api/student/disable_student/' + this.state._id,
            method: 'put',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.getStudents();
        socket.emit('RemoveStud', { id: this.state._id })

    }
    //captura value y id 
    onClick = (id) => {
        this.setState({
            _id: id
        })
        console.log(id)
    }
    onClickNote = (id) => {
        this.setState({
            _id: id
        })
        console.log(id)
    }
    onClickPoint = (id, point) => {
        this.setState({
            _id: id,
            point: point
        })
        console.log(id, point)
    }
    onChangeInput(e) {
        this.setState({
            note: e.target.value
        })
        console.log(e.target.value)
    }
    //funciones cambiar nota,puto y comportamiento
    onSubmitNote = async () => {

        const data = {
            score: this.state.note
        }
        var varToken = localStorage.getItem('token');
        await axios({
            url: this.props.apiUrl + '/v1/api/student/update_score/' + this.state._id,
            data,
            method: 'put',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.getStudents();
    }
    onClickPointAdd = async (valor) => {
        const point = this.state.point + valor
        const data = {
            point: point
        }
        var varToken = localStorage.getItem('token');
        await axios({
            url: this.props.apiUrl + '/v1/api/student/update_score/' + this.state._id,
            data,
            method: 'put',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.getStudents();
        this.setShow('showpuntosmas', false)
    }
    onClickPointRemove = async (valor) => {
        const point = this.state.point - valor
        const data = {
            point: point
        }
        var varToken = localStorage.getItem('token');
        await axios({
            url: this.props.apiUrl + '/v1/api/student/update_score/' + this.state._id,
            data,
            method: 'put',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.getStudents();
        this.setShow('showpuntosmenos', false)
    }
    onClickConductAdd = async (valor) => {
        const data = {
            conduct: valor
        }
        var varToken = localStorage.getItem('token');
        await axios({
            url: this.props.apiUrl + '/v1/api/student/update_score/' + this.state._id,
            data,
            method: 'put',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        this.getStudents();
        this.setShow('showcomportamiento', false)
    }
    onClickEnviar = async (e) => {
        e.preventDefault();

        const a = this.state.students
        const text = a.map(student => (
            `<tr>
                 <td>${student.nombres}</td>
                 <td>${student.apodo}</td>
                 <td>${student.nota}</td>
                 <td>${student.comportamiento}</td>
                 <td>${student.puntos}</td>
             </tr>`))
        const html = (`<table>
                 <thead>
                     <tr>
                         <th>Nombres</th>
                         <th>Apellidos</th>
                         <th>Nota(0-20)</th>
                         <th>Comportamiento</th>
                         <th>puntos</th>
                     </tr>
                 </thead>
                 <tbody>
                     ${text}
                 </tbody>
             </table>`)
        var user = JSON.parse(localStorage.getItem('user'));

        const params = {
            hml: html,
            data: a,
            name: 'playtecAcademy Clase prueba',
            email: user.email
        }
        await axios.post('http://email-service-playtec.herokuapp.com/', params)

    }
    setShow = (nom, val) => {
        this.setState({

            modals:
                { [nom]: val }
        })
    }
    render() {
        return (
            <>
                <div className="mt-2 row text-center" >
                    <button id='enviar' onClick={this.onClickEnviar} className="button btnMyM">Enviar</button>
                    <ExportCSV csvData={this.state.students} fileName={this.state.fileName} />
                </div>
                <div className="clearfix" >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="body" id="html">
                                <div className="table-responsive">
                                    <table id="tabla_usuarios" className="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: "center" }}>Nombres</th>
                                                <th style={{ textAlign: "center" }}>Apellidos</th>
                                                <th style={{ textAlign: "center", width: "15%" }}>Nota(0-20)</th>
                                                <th style={{ textAlign: "center", width: "20%" }}>Comportamiento</th>
                                                <th style={{ textAlign: "center", width: "15%" }}>puntos</th>
                                                <th style={{ textAlign: "center", width: "5%" }}>...</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ 'height': '350px' }}>
                                            {this.state.students ?
                                                <TableBody students={this.state.students} onClickNote={this.onClickNote} onClick={this.onClick}
                                                    onClickPoint={this.onClickPoint} deleteStudents={this.deleteStudents} setShow={this.setShow} />
                                                : <h1>no hay alumnos para mostrar</h1>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Modal className="modal-teacher__general" size={'lg'} show={this.state.modals.showpuntosmas} onHide={() => this.setShow('showpuntosmas',false)}>
                <button className="modal-teacher__general-close" onClick={() => this.setShow('showpuntosmas',false)}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div className="punto-posi">
                        <span className="punto-text">POSITIVO</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                        <BtnPuntos data={this.state.datapoint.pocitivo} funcion={this.onClickPointAdd} />
                </Modal.Body>
            </Modal> 
            <Modal className="modal-teacher__general" size={'lg'} show={this.state.modals.showpuntosmenos} onHide={() => this.setShow('showpuntosmenos',false)}>
                <button className="modal-teacher__general-close" onClick={() => this.setShow('showpuntosmenos',false)}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div className="punto-posi">
                        <span className="punto-text">NECESITAS MEJORAR</span>            
                    </div>
                </Modal.Header>
                <Modal.Body>
                        <BtnPuntos data={this.state.datapoint.negativo} funcion={this.onClickPointRemove} />
                </Modal.Body>
            </Modal> 
            <Modal className="modal-teacher__general" show={this.state.modals.shownota} onHide={() => this.setShow('shownota',false)}>
                <button className="modal-teacher__general-close" onClick={() => this.setShow('shownota',false)}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div className="punto-posi">
                        <span className="punto-text">NOTA</span>          
                    </div>
                </Modal.Header>
                <Modal.Body style={{justifyContent: 'center'}}>
                    <input type="text"  value={this.state.note} onChange={this.onChangeInput} />
                    <button id="btnnotas" class="button btnMyM" onClick={()=>this.onSubmitNote() + this.setShow('shownota',false)} type="button" >MODIFICAR</button> 
                </Modal.Body>
            </Modal> 
            <Modal className="modal-teacher__general" size={'lg'} show={this.state.modals.showcomportamiento} onHide={() => this.setShow('showcomportamiento',false)}>
                <button className="modal-teacher__general-close" onClick={() => this.setShow('showcomportamiento',false)}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div className="punto-posi">
                        <span className="punto-text">COMPORTAMIENTO</span>          
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <BtnPuntos data={this.state.datapoint.camportamiento} funcion={this.onClickConductAdd}/>
                </Modal.Body>
            </Modal> 
            <Modal className="modal-teacher__general" size={'lg'} show={this.state.modals.showdelete} onHide={() => this.setShow('showdelete',false)}>
                <button className="modal-teacher__general-close" onClick={() => this.setShow('showdelete',false)}>
                    <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
                </button>
                <Modal.Header>
                    <div className="punto-posi">
                        <span className="punto-text">¿DESEA ELIMINAR AL ALUMNO?</span>          
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <button className="modal-body__button yes" onClick={() => this.deleteStudents()+this.setShow('showdelete',false)} type="button">
                        <div className="button-zoom">SI</div>
                    </button> 
                    <button className="modal-body__button no"  onClick={() => this.setShow('showdelete',false)} type="button">
                        <div className="button-zoom">NO</div>
                    </button> 
                </Modal.Body>
            </Modal> 
                </>
                )
    }
}
