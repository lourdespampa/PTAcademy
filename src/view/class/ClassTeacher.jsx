import React, { Component } from 'react'

import NavCourse from "../classAndCourse/NavCourse";
import axios from 'axios'
import AllClass from './AllClass'
export default class ClassTeacher extends Component {
  state = {
    nombreProfesor: "",
    _id: "",
    classes: [],
    idcourse:"",
    idteacher:""
  };
  componentDidMount() {
    this.getClass()
    const { match: { params } } = this.props;
    this.setState({
      _id:params._id,
      idteacher:params.id_teacher
    })
    axios.get(`${this.props.apiUrl}/v1/api/admin/user/${params.id_teacher}`).then(({data})=>{
      console.log(data)
      this.setState({nombreProfesor:data.user_name+" "+data.user_lastName})
    })
  }
  getClass=async ()=>{
    // axios.get(`http://3.16.110.136:4200/v1/api/teacher/5db74edbae96433b08911b38/course_detail/${params._id}`)
    const res = await axios.get(`${this.props.apiUrl}/v1/api/teacher/${this.state.idteacher}/course_detail/${this.state._id}`);
     
        this.setState({ classes: await res.data });;
  }
  render() {
    return (
      <>
      <NavCourse apiUrl={this.props.apiUrl} idteacher={this.state.idteacher} idcourse={this.state._id} agregarX={'clase'} nombreProfesor={this.state.nombreProfesor} getdata={this.getClass()}></NavCourse>
        <div className="main">
          <h1>SECCION DE CLASES</h1>
          <ul className="cards">
            {this.state.classes.map(clase => (
              <li className="cards_item" key={clase._id}>
                <AllClass
                  apiUrl={this.props.apiUrl}
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
