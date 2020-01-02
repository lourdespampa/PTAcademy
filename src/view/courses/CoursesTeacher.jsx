import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
import AllCourses from "./AllCourses";
import axios from "axios";
import "../courses/Course.css";


export default class CoursesTeacher extends Component {

  finalizarComponente = false

  constructor(props){
    super(props)
    this.state = {
      nombreProfesor: "profesor",
      _id: "",
      courses: []
    }
  }

  componentDidMount() {
    this.finalizarComponente = true
    //obtenemos el id de la url pasada a través de las propiedades
    const { match: { params } } = this.props;
    this.setState({_id: params.id})
    //luego, obtenemos la lista de cursos del profesor por petición a la API
    axios.get(`http://3.16.110.136:4200/v1/api/teacher/${params.id}/course_detail`).then( ({ data }) => {
      console.log(data)
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

  componentWillUnmount(){
    this.finalizarComponente = false
  }

  getCursos(){
    axios.get(`http://3.16.110.136:4200/v1/api/teacher/${this.state._id}/course_detail`).then( ({ data }) => {
      console.log(data)
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

  render() {
    return (
      <>
        <NavCourse idcourse={this.props.idcourse} idteacher={this.state._id} agregarX={'course'} nombreProfesor={this.state.nombreProfesor} getdata={this.getCursos()}></NavCourse>
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
                  />
                </li>
                ))
              :
              // <div>false</div>
              <h3>Cargando cursos... Si no tiene, puede crear uno.</h3>
              }
          </ul>
        </div>
      </>
    );
  }
}
