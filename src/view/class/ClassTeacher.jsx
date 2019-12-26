import React, { Component } from 'react'

import NavCourse from "../classAndCourse/NavCourse";
import axios from 'axios'
import AllClass from './AllClass'
export default class ClassTeacher extends Component {
  state = {
    nombreProfesor: "carlos",
    _id: "",
    classes: []
  };

  //http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course_detail/id del curso
  componentDidMount() {
    const { match: { params } } = this.props;
    console.log("yara mano",params)
    axios.get(`http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course_detail/${params._id}`)
    // axios.get(`http://3.16.110.136:4200/v1/api/teacher/${}/course_detail/${params._id}`)
      .then(res => {
        const classes = res.data;
        this.setState({ classes });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
      <NavCourse idteacher={this.props.idteacher} idcourse={this.props.idcourse} agregarX={'class'} nombreProfesor={this.state.nombreProfesor} getCursos={console.log('xD')}></NavCourse>
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
