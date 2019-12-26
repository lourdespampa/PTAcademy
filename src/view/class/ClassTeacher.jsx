import React, { Component } from 'react'

import NavCourse from "../classAndCourse/NavCourse";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AllClass from './AllClass'
export default class ClassTeacher extends Component {
  state = {
    nombreProfesor: "carlos",
    _id: "",
    classes: [],
    idcourse:"",
    idteacher:""
  };

  //http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course_detail/id del curso
  componentDidMount() {
    this.getClass()
    const { match: { params } } = this.props;
    this.setState({
      _id:params._id,
      idteacher:params.id_teacher
    })
    
  }
  getClass=async ()=>{
    // axios.get(`http://3.16.110.136:4200/v1/api/teacher/5db74edbae96433b08911b38/course_detail/${params._id}`)
    const res = await axios.get(`http://3.16.110.136:4200/v1/api/teacher/${this.state.idteacher}/course_detail/${this.state._id}`);
     
        this.setState({ classes: await res.data });;
  }
  render() {
    return (
      <>
      <NavCourse idteacher={this.state.idteacher} idcourse={this.state._id} agregarX={'class'} nombreProfesor={this.state.nombreProfesor} getdata={this.getClass()}></NavCourse>
        <div className="main">
          <h1>SECCION DE CLASES</h1>
          <ul className="cards">
            {this.state.classes.map(clase => (
              <li className="cards_item" key={clase._id}>
                <AllClass
                  name_class={clase.class_name}
                  desc={clase.desc} 
                  id={clase._id}/>
              </li>
            ))}
          </ul>
        </div>
        {/* <Link to="ClassDetailTeacher">Ir a una clase detallada</Link> */}

      </>
    )
  }
}
