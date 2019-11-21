import React, { Component } from 'react';
import './lista.css';
import axios from 'axios'
import {ExportCSV} from './exportbtn'
// import {alumnos} from '../../data/alumnos.json';

export default class ListaAlum extends Component {
   
        state={
            pin:'pin',
            point:'',
            note:'',
            conduct:'',
            _id:'',
            students:[],
            fileName: 'Nota de alumnos'
        }
    
    async componentDidMount() {
        this.getStudents();
    }
//rellenar state
    getStudents = async () => {
        const res = await axios.get('http://api-playtec.herokuapp.com/v1/api/students')
        this.setState({
            students :  await res.data['students']
        });
    }
//eliminar estudiante
    deleteStudents = async (studentsId) => {
        await axios.delete('http://api-playtec.herokuapp.com/v1/api/student/' + studentsId);
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
        await axios.put(''+this.state._id,note)
        this.getStudents();
    }

    onClickPointAdd=async(e)=>{
        e.preventDefault();
        const point=this.state.point+1
        await axios.put(''+this.state._id,point)
    }

    onClickPointRemove=async(e)=>{
        e.preventDefault();
        const point=this.state.point-1
        await axios.put(''+this.state._id,point)
    }

    onClickConductAdd=async(e)=>{
        e.preventDefault();
        const conduct=this.state.conduct
        await axios.put(''+this.state._id,conduct)
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

    render() {
        const studentsData=this.state.students.map(student=>(
                <tr key={student._id}>
                    <td className="nom" style={{width:"400px"}}>
                    {student.first_name}
                    </td>
                    <td className="ape" style={{width:"400px"}}>
                    {student.last_name}
                    </td>
                    <td className="nota"style={{textAlign:"center",width:'130px'}}>
                        {student.calific}10
                        <button id="btnEditPhotoModal3" onClick={()=>this.onClickNote(student._id,student.nota)} className="button pull-right btnMyM material-icons"  data-target="#editPhotoModal3" data-toggle="modal">
                    edit
                    </button>
                    </td>
                    <td className="compo"style={{textAlign:"center",width:'150px'}}>
                    {student.comportamiento}A
                    <button id="btnEditPhotoModal4" onClick={()=>this.onClick(student._id)} className="button pull-right btnMyM material-icons"  data-target="#editPhotoModal4" data-toggle="modal">
                    edit
                    </button>
                    </td>
                    <td style={{textAlign:"center",width:"160px"}}>
                    <button id="btnEditPhotoModal" className="button btnMyM material-icons" onClick={()=>this.onClickPoint(student._id,student.puntos)} data-target="#editPhotoModal" data-toggle="modal">
                    add_circle_outline
                    </button>
                    {student.puntos}12
                    <button id="btnEditPhotoModal2" className="button btnMyM material-icons" onClick={()=>this.onClickPoint(student._id,student.puntos)} data-target="#editPhotoModal2" data-toggle="modal">
                    remove_circle_outline
                    </button> 
                    </td>
                    <td style={{width:"80px"}}>
                    <button className="button btnMyM material-icons" onClick={() => this.deleteStudents(student._id)}>
                    delete
                    </button> 
                    </td>
                </tr>
            ))
        return(
            <>
            <div className="row center" >
                <button id='enviar' onClick={this.onClickEnviar} className="button btnMyM">Enviar</button>
                <ExportCSV csvData={this.state.students} fileName={this.state.fileName} />
            </div>
            <div className="">
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
                                       {studentsData}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editPhotoModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form action="/punto_mas" method="post">
                                <div className="modal-header">
                                    <div className="punto-posi">
                                        <h3 className="punto-text">Positivo</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <button id="puntomas" type="button" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto1.png')} alt="punto1" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Ayuda a Otros</i>
                                        </div>
                                    </button>
                                    <button id="puntomas2" type="button" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto2.png')} alt="punto2" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Cumplimiento de Tareas</i>
                                        </div>
                                    </button>
                                    <button id="puntomas3" type="submit" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto3.png')} alt="punto3" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Participacion</i>
                                        </div>
                                    </button>
                                    <button id="puntomas4" type="submit" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto4.png')} alt="punto4" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Persistencia</i>
                                        </div>
                                    </button>
                                    <button id="puntomas5" type="submit" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto5.png')} alt="punto5" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i> Responsabilidad</i>
                                        </div>
                                    </button>
                                    <button id="puntomas6" type="submit" onClick="$('#puntoextra').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto6.png')} alt="punto6" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Trabajo en Equipo</i>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div className="modal fade" id="editPhotoModal2" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form action="/punto_menos" method="post">
                                <div className="modal-header">
                                    <div className="punto-posi">
                                        <h3 className="punto-text">Necesitas Mejorar</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
    
    
                                    <button id="puntomenos" type="button" onClick="$('#puntoextra2').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto-1.png')} alt="punto-1"/>
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Puntualidad de Tareas</i>
                                        </div>
                                    </button>
                                    <button id="puntomenos2" type="button" onClick="$('#puntoextra2').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto-2.png')} alt="punto-2"/>
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Responsabilidad de trabajo</i>
                                        </div>
                                    </button>
                                    <button id="puntomenos3" type="button" onClick="$('#puntoextra2').val('1')" className="punto-marco" >
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto-3.png')} alt="punto-3" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Participacion</i>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div className="modal fade " id="editPhotoModal3" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content"  style={{minHeight: 'auto'}}>
                            <form action="/actualizar_notas" method="post">
                                <div className="modal-header">
                                    <div className="punto-posi">
                                        <h3 className="punto-text">Nota</h3>
                                    </div>
                                </div>
                                <div class="modal-body" style={{justifyContent: 'center',display: 'flex'}}>
                                    <input type="text" placeholder={this.state.note}/>
                                <button id="btnnotas" class="button btnMyM" type="button">modificar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div className="modal fade" id="editPhotoModal4" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <div className="punto-posi">
                                        <h3 className="punto-text">Comportamiento</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <button id="editcomportamiento" type="button" name="conduct" value="A" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/a.jpg')} alt="a" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento2" type="button" name="B" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/b.jpg')} alt="b" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento3" type="button" name="C" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/c.jpg')} alt="c" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento4" type="button" name="D" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/d.jpg')} alt="d" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento5" type="button" name="E" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/e.jpg')} alt="e" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento6" type="button" name="F" onClick={this.onClickConduc} className="punto-marco">
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/f.jpg')} alt="f"/>
                                        </div>
                                    </div>
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </>
                )
    }
}
