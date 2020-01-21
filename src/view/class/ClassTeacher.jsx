import React, { Component } from 'react'

import NavCourse from "../classAndCourse/NavCourse";
import axios from 'axios'
import AllClass from './AllClass'
export default class ClassTeacher extends Component {
  constructor(props){
    super(props)
      this.state = {
        nombreProfesor: "",
        _id: "",
        idcourse:"",
        idteacher:"",
        classes: []
      };
    }
  componentDidMount() {
    var varToken = localStorage.getItem('token');
   const { match: { params } } = this.props;
   this.setState({idteacher: params.id_teacher,idcourse:params._id})
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id_teacher}/course_detail/${params._id}`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then( ({ data }) => {
       console.log(data)
        if(data == []){
          this.setState({classes: []})
        }else{
          this.setState({classes: data})
        }
    })
    .catch( e => console.log(e))
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
  getClass=()=>{
    var varToken = localStorage.getItem('token');
    const { match: { params } } = this.props;
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id_teacher}/course_detail/${params._id}`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then( ({ data }) => {
        if(data == []){
          this.setState({classes: []})
        }else{
          this.setState({classes: data})
        }
})
    .catch( e => console.log(e))
  }
  render() {
    return (
      <>
      <NavCourse apiUrl={this.props.apiUrl} idteacher={this.state.idteacher} idcourse={this.state.idcourse} agregarX={'clase'}
       nombreProfesor={this.state.nombreProfesor} getdata={this.getClass}></NavCourse>
        <div className="ClassTeacher-main">
          <h1 className="courseTeacher-title--class">SECCION DE CLASES</h1>
          <ul className="courseTeacher-container class">
            {
              this.state.classes.length>0
              ?
              this.state.classes.map((clase,_id) => (
                <li className="courseTeacher-cards" key={_id}>
                  <AllClass
                    apiUrl={this.props.apiUrl}
                    name_class={clase.class_name}
                    desc={clase.desc} 
                    id={clase._id}/>
                </li>
              ))
              :<h3 className="courseTeacher-cards__nullCourses">Cargando cursos... Si no tiene, puede crear uno.</h3>
            }
          </ul>
        </div>
        {/* <Link to="ClassDetailTeacher">Ir a una clase detallada</Link> */}
      </>
    )
  }
}
