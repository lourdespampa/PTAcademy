import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
import AllCourses from "./AllCourses";
import axios from "axios";
import "../courses/Course.sass";
import {Modal} from 'react-bootstrap'
export default class CoursesTeacher extends Component {

  finalizarComponente = false

  constructor(props){
    super(props)
    this.state = {
      nombreProfesor: "",
      _id: "",
      id_curso: "",
      showdelete:false,
      courses: []
    }
  }

  componentDidMount() {
    this.finalizarComponente = true
    //obtenemos el id de la url pasada a través de las propiedades
    const { match: { params } } = this.props;
    this.setState({_id: params.id})
    //luego, obtenemos la lista de cursos del profesor por petición a la API
    axios.get(`${this.props.apiUrl}/v1/api/teacher/${params.id}/course_detail`).then( ({ data }) => {
      // console.log(data)
      if(this.finalizarComponente){
        if(data == []){
          this.setState({courses: []})
        }else{
          this.setState({courses: data})
        }
      }
    })
    .catch( e => console.log(e))
    axios.get(`${this.props.apiUrl}/v1/api/admin/user/${params.id}`).then(({data})=>{
      console.log(data)
      this.setState({nombreProfesor:data.user_name+" "+data.user_lastName})
    })
  }

  componentWillUnmount(){
    this.finalizarComponente = false
  }

  getCursos(){
    axios.get(`${this.props.apiUrl}/v1/api/teacher/${this.state._id}/course_detail`).then( ({ data }) => {
      // console.log(data)
      if(this.finalizarComponente){
        if(data == []){
          this.setState({courses: []})
        }else{
          this.setState({courses: data})
        }
      }
    })
    .catch( e => console.log(e))
  }

  deleteCurso = async () => {
    await axios.delete(this.props.apiUrl+'/v1/api/admin/course/'+ this.state.id_curso);
    this.getCursos();
  }
  onClick = (id) => {
    this.setState({
      id_curso:id
    })
    console.log(id)
}
setShow=(nom,val)=>{
  this.setState({
          [nom]:val
   })
}
  render() {
    return (
      <>
        <NavCourse apiUrl={this.props.apiUrl} idcourse={this.props.idcourse} idteacher={this.state._id}
         agregarX={'course'} nombreProfesor={this.state.nombreProfesor} getdata={this.getCursos()}></NavCourse>
        <div className="main">
          <h1>SECCION DE CURSOS</h1>
          <ul className="cards">
            {
            this.state.courses.length > 0
              ?  
              // <div>true</div>
              this.state.courses.map((cursos,id) => (
                <li className="cards_item" key={id}>
                  <AllCourses
                    name_course={cursos.course_name}
                    description={cursos.desc}
                    img={cursos.img}
                    id={cursos._id}
                    idteacher={this.state._id}
                    onClick={this.onClick}
                    setShow={this.setShow}
                  />
                </li>
                ))
              :
              // <div>false</div>
              <h3>Cargando cursos... Si no tiene, puede crear uno.</h3>
              }
          </ul>
        </div>
        <Modal size={'SM'} show={this.state.showdelete} onHide={() => this.setShow('showdelete',false)}>
                <Modal.Header closeButton>
                    <div className="punto-posi">
                        <h3 className="punto-text">¿Desea eliminar al Curso?</h3>          
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <button class="button btnMyM" onClick={() => this.deleteCurso()+this.setShow('showdelete',false)} type="button">si</button> 
                    <button class="button btnMyM" onClick={() => this.setShow('showdelete',false)} type="button">No</button> 
                </Modal.Body>
            </Modal> 
      </>
    );
  }
}
