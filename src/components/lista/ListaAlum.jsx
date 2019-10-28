import React, { Component } from 'react';
import './lista.css';
import {alumnos} from '../../data/alumnos.json';

export default class ListaAlum extends Component {
    constructor(){
        super();
        this.state={
            alumnos
        }
    }
    render() {
        const alumnos=this.state.alumnos.map((alumnos,i)=>{
            return(
                <tr>
                    <td className="nom">
                    {alumnos.nombre}
                    </td>
                    <td className="ape">
                    {alumnos.apellido}
                    </td>
                    <td className="nota"style={{textAlign:"center"}}>
                        {alumnos.nota}
                        <button id="btnEditPhotoModal3" className="button pull-right btnMyM material-icons"  data-target="#editPhotoModal3" data-toggle="modal">
                    edit
                    </button>
                    </td>
                    <td className="compo"style={{textAlign:"center"}}>
                    {alumnos.comportamiento}
                    <button id="btnEditPhotoModal4" className="button pull-right btnMyM material-icons"  data-target="#editPhotoModal4" data-toggle="modal">
                    edit
                    </button>
                    </td>
                    <td style={{textAlign:"center"}}>
                    <button id="btnEditPhotoModal" className="button btnMyM"  data-target="#editPhotoModal" data-toggle="modal">
                    +
                    </button>
                    {alumnos.puntos}
                    <button id="btnEditPhotoModal2" className="button btnMyM"  data-target="#editPhotoModal2" data-toggle="modal">
                    -
                    </button> 
                    </td>
                </tr>
            )
        })
        return(
            <>
            <br/>
            <div className="row center" >
                <button id='getalum' className="button btnMyM">Mostrar Alumnos</button>
                <button id='exportar' className="button btnMyM">Exportar</button>
                <button id='enviar' className="button btnMyM">Enviar</button>
            </div>
                     <div className="">
                <div className="clearfix" >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="body" id="html">
                                <div className="table-responsive">
                                    <table id="tabla_usuarios" className="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:"center"}}>Nombres</th>
                                                <th style={{textAlign:"center"}}>Apellidos</th>
                                                <th style={{width: "10%",textAlign:"center"}}>Nota(0-20)</th>
                                                <th style={{width: "10%",textAlign:"center"}}>Comportamiento</th>
                                                <th style={{width: "15%",textAlign:"center"}}>puntos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                       {alumnos}
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
                                    <input id="nombre" type="hidden" name="nombre" required />
                                    <input id="punto" type="hidden" name="punto" required />
                                    <input id="puntoextra" type="hidden" name="puntoextra" required />
    
                                    <button id="puntomas" type="button" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{left: "40px" ,top: "0px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto1.png')} alt="punto1" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Ayuda a Otros</i>
                                        </div>
                                    </button>
                                    <button id="puntomas2" type="button" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{left: "195px",top: "0px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto2.png')} alt="punto2" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Cumplimiento de Tareas</i>
                                        </div>
                                    </button>
                                    <button id="puntomas3" type="submit" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{left: "350px",top: "0px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto3.png')} alt="punto3" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Participacion</i>
                                        </div>
                                    </button>
                                    <button id="puntomas4" type="submit" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{left: "40px",top: "150px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto4.png')} alt="punto4" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Persistencia</i>
                                        </div>
                                    </button>
                                    <button id="puntomas5" type="submit" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{top: "150px",left:"195px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/punto5.png')} alt="punto5" />
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i> Responsabilidad</i>
                                        </div>
                                    </button>
                                    <button id="puntomas6" type="submit" onclick="$('#puntoextra').val('1')" className="punto-marco" style={{top: "150px",left:"350px"}}>
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
                                    <input id="nombre2" type="hidden" name="nombre" required/>
                                    <input id="punto2" type="hidden" name="punto" required />
                                    <input id="puntoextra2" type="hidden" name="puntoextra" required />
    
    
                                    <button id="puntomenos" type="button" onclick="$('#puntoextra2').val('1')" className="punto-marco" style={{left: "40px",top: "0px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto-1.png')} alt="punto-1"/>
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Puntualidad de Tareas</i>
                                        </div>
                                    </button>
                                    <button id="puntomenos2" type="button" onclick="$('#puntoextra2').val('1')" className="punto-marco" style={{left: "195px",top: "0px"}}>
                                        <div className="punto-marco2">
                                            <div className="punto-marco3">
                                                <img className="punto-img" src={require('../../img/lista/punto-2.png')} alt="punto-2"/>
                                            </div>
                                        </div>
                                        <div className="punto-texto">
                                            <i>Responsabilidad de trabajo</i>
                                        </div>
                                    </button>
                                    <button id="puntomenos3" type="button" onclick="$('#puntoextra2').val('1')" className="punto-marco" style={{left: "350px",top: "0px"}}>
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
                                <input id="nombre3" type="hidden" name="nombre" required/>
                                <input id="nota" type="text" name="nota" placeholder="nota" style={{fontSize:'20px'}} required/>
                                <button id="btnnotas" class="button btnMyM" type="button">modificar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editPhotoModal4" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form action="/actualizar_Comportamiento" method="post">
                                <div className="modal-header">
                                    <div className="punto-posi">
                                        <h3 className="punto-text">Comportamiento</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <input id="nombre4" type="hidden" name="nombre" required />
                                    <input id="comportamiento" type="hidden" name="comportamiento" placeholder="comportamiento" required />
                                    <button id="editcomportamiento" type="button" onclick="$('#comportamiento').val('A')" className="punto-marco" style={{left: "40px",top: "0px"}}>
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/a.jpg')} alt="a" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento2" type="button" onclick="$('#comportamiento').val('B')" className="punto-marco" style={{left: "195px",top: "0px"}}>
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/b.jpg')} alt="b" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento3" type="submit" onclick="$('#comportamiento').val('C')" className="punto-marco" style={{left: "350px",top: "0px"}}>
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/c.jpg')} alt="c" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento4" type="submit" onclick="$('#comportamiento').val('D')" className="punto-marco" style={{left: "40px",top: "150px"}}>
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/d.jpg')} alt="d" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento5" type="submit" onclick="$('#comportamiento').val('E')" className="punto-marco" style={{left:"195px",top: "150px"}}>
                                    <div className="punto-marco2">
                                        <div className="punto-marco3">
                                            <img className="punto-img" src={require('../../img/lista/e.jpg')} alt="e" />
                                        </div>
                                    </div>
                                </button>
                                    <button id="editcomportamiento6" type="submit" onclick="$('#comportamiento').val('F')" className="punto-marco" style={{left:"350px",top: "150px"}}>
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
