import React, { Component } from 'react';
import './lista.css';
import axios from 'axios'
import {ExportCSV} from './exportbtn'
import{BtnPuntos}from './btnpuntos'
import{TableBody}from './tablebody'
import Modal from 'react-bootstrap/Modal';
// import {alumnos} from '../../data/alumnos.json';

const apiurl='http://3.16.110.136:4200/v1/api/lesson/';
export default class ListaAlum extends Component {
   
        state={
            id_access:'',
                modals:{
                    showpuntosmas:false,
                    showpuntosmenos:false,
                    showcomportamiento:false,
                    shownota:false,
                    showdelete:false
                },
            pin:'pin',
            point:'',
            note:'',
            conduct:'',
            _id:'',
            students:[],
            fileName: 'Nota de alumnos',
            datapoint:{
                pocitivo:[{imgen:require('../../../img/lista/punto1.png'),title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto2.png'),title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto3.png'),title:'Participacion'},
                    {imgen:require('../../../img/lista/punto4.png'),title:'Persistencia'},
                    {imgen:require('../../../img/lista/punto5.png'),title:'responsabilidad'},
                    {imgen:require('../../../img/lista/punto6.png'),title:'trabajo en equipo'}],
                negativo:[{imgen:require('../../../img/lista/punto-1.png'),title:'Ayuda a Otros'},
                    {imgen:require('../../../img/lista/punto-2.png'),title:'Cumplimiento de Tareas'},
                    {imgen:require('../../../img/lista/punto-3.png'),title:'Participacion'}],
                camportamiento:[{imgen:require('../../../img/lista/a.jpg'),title:''},
                    {imgen:require('../../../img/lista/b.jpg'),title:''},
                    {imgen:require('../../../img/lista/c.jpg'),title:''},
                    {imgen:require('../../../img/lista/d.jpg'),title:''},
                    {imgen:require('../../../img/lista/e.jpg'),title:''},
                    {imgen:require('../../../img/lista/f.jpg'),title:''}]
                    }
                }
    async componentDidMount() {
        this.getStudents();
    }
    
//rellenar state
    getStudents = async () => {
        const res = await axios.get(`${apiurl}/${this.props.id_access}/students`)
        this.setState({
            students :  await res.data['students']
        });
    }
//eliminar estudiante
    deleteStudents = async (studentsId) => {
        await axios.delete(`${apiurl}/${this.props.id_access}/students`+ this.state._id);
        this.getStudents();
    }
//captura value y id 
    onClick = (id) => {
        this.setState({
            _id:id
        })
        console.log(id)
    }
    onClickNote = (id,n) => {
         this.setState({
            note: n,
            _id: id
         })
         console.log(id,n)
    }
    onClickPoint = (id,p) => {
         this.setState({
            point: p,
            _id: id
         })
         console.log(id,p)
    }
//funciones cambiar nota,puto y comportamiento
    onSubmitNote=async (e)=>{
        e.preventDefault();
           const note=this.state.note
        await axios.put(`${apiurl}/${this.props.id_access}/students`+this.state._id,note)
        this.getStudents();
    }
    onClickPointAdd=async(e)=>{
        e.preventDefault();
        const point=this.state.point+1
        await axios.put(`${apiurl}/${this.props.id_access}/students`+this.state._id,point);
    }
    onClickPointRemove=async(e)=>{
        e.preventDefault();
        const point=this.state.point-1
        await axios.put(`${apiurl}/${this.props.id_access}/students`+this.state._id,point)
    }
    onClickConductAdd=async(e)=>{
        e.preventDefault();
        const conduct=this.state.conduct
        await axios.put(`${apiurl}/${this.props.id_access}/students`+this.state._id,conduct)
    }
    onClickConduc=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
         })
         console.log(e.target.value)
    }
    onClickEnviar=async(e)=>{
        e.preventDefault();
        
        const a=this.state.students
        const text=a.map(student=>(
                <tr>
                <td className="nom">{student.nombres}</td>
                <td className="ape">{student.apodo}</td>
                <td style={{textAlign: "center"}}className="nota">{student.nota}</td>
                <td style={{textAlign: "center"}}className="compo">{student.comportamiento}</td>
                <td style={{textAlign: "center"}}>{student.puntos}</td>
            </tr>))
            const html=(<table>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th style={{width: "20%"}}>Nota(0-20)</th>
                        <th style={{width: "20%"}}>Comportamiento</th>
                        <th style={{width: "20%"}}>puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {text}
                </tbody>
            </table>)
            const params={
                hml:html,
                data:a
            }
            await axios.post('/sendNotes',params)
        
    }
    setShow=(nom,val)=>{
        this.setState({
            
            modals:
                {[nom]:val}
         })
    }
    render() {
        return(
            <>
            <div className="row center" >
                <button id='enviar' onClick={this.onClickEnviar} className="button btnMyM">Enviar</button>
                <ExportCSV csvData={this.state.students} fileName={this.state.fileName} />
            </div>
            <div className="clearfix" >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="body" id="html">
                                <div className="table-responsive">
                                    <table id="tabla_usuarios" className="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style={{'display':'block'}}>
                                            <tr>
                                                <th style={{textAlign:"center",width:'400px'}}>Nombres</th>
                                                <th style={{textAlign:"center",width:'400px'}}>Apellidos</th>
                                                <th style={{textAlign:"center",width:'130px'}}>Nota(0-20)</th>
                                                <th style={{textAlign:"center",width:'150px'}}>Comportamiento</th>
                                                <th style={{textAlign:"center",width:'160px'}}>puntos</th>
                                                <th style={{textAlign:"center",width:'80px'}}>...</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{'height': '350px', 'overflow':'overlay','display':'block'}}>
                                            { this.state.students ?
                                       <TableBody students={this.state.students} onClickNote={this.onClickNote} onClick={this.onClick}
                                        onClickPoint={this.onClickPoint} deleteStudents={this.deleteStudents} setShow={this.setShow} />
                                        : <h1>no hay alumnos para mostrar</h1> }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Modal size={'SM'} show={this.state.modals.showpuntosmas} onHide={() => this.setShow('showpuntosmas',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">Positivo</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    { this.state.datapoint.pocitivo.map(point=>(
                        <BtnPuntos imgen={point.imgen} title={point.title} />
                    ))}    
                </Modal.Body>
            </Modal> 
            <Modal size={'SM'} show={this.state.modals.showpuntosmenos} onHide={() => this.setShow('showpuntosmenos',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">Necesitas Mejorar</h3>            
                    </div>
                </Modal.Header>
                <Modal.Body>
                    { this.state.datapoint.negativo.map(point=>(
                        <BtnPuntos imgen={point.imgen} title={point.title} />
                    ))}  
                </Modal.Body>
            </Modal> 
            <Modal size={'SM'} show={this.state.modals.shownota} onHide={() => this.setShow('shownota',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">Nota</h3>          
                    </div>
                </Modal.Header>
                <Modal.Body style={{justifyContent: 'center',display: 'flex'}}>
                    <input type="text" placeholder={this.state.note}/>
                    <button id="btnnotas" class="button btnMyM" type="button">modificar</button> 
                </Modal.Body>
            </Modal> 
            <Modal size={'SM'} show={this.state.modals.showcomportamiento} onHide={() => this.setShow('showcomportamiento',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">Comportamiento</h3>          
                    </div>
                </Modal.Header>
                <Modal.Body>
                    { this.state.datapoint.camportamiento.map(point=>(
                        <BtnPuntos imgen={point.imgen} title={point.title} />
                    ))} 
                </Modal.Body>
            </Modal> 
            <Modal size={'SM'} show={this.state.modals.showdelete} onHide={() => this.setShow('showdelete',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">Eliminara alumno?</h3>          
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <button class="button btnMyM" onClick={() => this.setShow('showdelete',false)} type="button">No</button> 
                    <button class="button btnMyM" onClick={() => this.deleteStudents()+this.setShow('showdelete',false)} type="button">si</button> 
                </Modal.Body>
            </Modal> 
                </>
                )
    }
}
