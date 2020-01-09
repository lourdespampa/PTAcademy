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
     var varToken = localStorage.getItem('token');
    axios({
      url: `${this.props.apiUrl}/v1/api/admin/user/${params.id_teacher}`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then(({data})=>{
      console.log(data)
      this.setState({nombreProfesor:data.user_name+" "+data.user_lastName})
    })
  }
  getClass=async ()=>{
    var varToken = localStorage.getItem('token');
    const res = await axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.state.idteacher}/course_detail/${this.state._id}`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    })
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
