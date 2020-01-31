import React, { Component } from 'react'
import { Modal } from "react-bootstrap";
import NavCourse from "../classAndCourse/NavCourse";
import axios from 'axios'
import AllClass from './AllClass'
import iconExit from "../../img/cerrar.png";
export default class ClassTeacher extends Component {
  constructor(props){
    super(props)
      this.state = {
        nombreProfesor: "",
        _id: "",
        idcourse:"",
        idteacher:"",
        id_class:"",
        show: 0,
        classes: [],
        showdelete: false,
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
        if(data === []){
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
        if(data === []){
          this.setState({classes: []})
        }else{
          this.setState({classes: data})
        }
})
    .catch( e => console.log(e))
  }
  deleteClass= async () => {
    console.log('delete clase_ '+this.state.id_class)
    var varToken = localStorage.getItem("token");

    await axios({
      url:`${this.props.apiUrl}/v1/api/teacher/change_lesson_state/${this.state.id_class}`,
      method:'get',
      headers:{
        'x-access-token': `${varToken}`
      }});
    this.getClass();
  };
  onClick = id => {
    this.setState({
      id_class: id
    });
    console.log(id);
  };
  setShow = (nom, val) => {
    this.setState({
      [nom]: val
    });
  };
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
                    id={clase._id}
                    onClick={this.onClick}
                    setShow={this.setShow}
                    />
                </li>
              ))
              :<h3 className="courseTeacher-cards__nullCourses">Cargando cursos... Si no tiene, puede crear uno.</h3>
            }
          </ul>
        </div>
        {/* <Modal className="modal-teacher__general"
          size={"lg"}
          show={this.state.showdelete}
          onHide={() => this.setShow("showdelete", false)}
        >
          <button className="modal-teacher__general-close" onClick={() => this.setShow("showdelete", false)}>
                <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
            </button>
          <Modal.Header>
            <div className="modal-title h4">
              ¿DESEA ELIMINAR LA CLASE?
            </div>
          </Modal.Header>
          <Modal.Body>
            <button
              id="modal-body__button-yes" className="btn"
              onClick={() =>
                this.deleteClass() + this.setShow("showdelete", false)
              }
              type="button"
            >
              SI
            </button>
            <button
              id="modal-body__button-no" className="btn"
              onClick={() => this.setShow("showdelete", false)}
              type="button"
            >
              NO
            </button>
          </Modal.Body>
        </Modal> */}
        <div id="modal-general_container" class={this.state.show === 0 ? "" : this.state.show=== 1 ? "six" : this.state.show===2 ?"six out" : ""}>
        <div class="modal-general_background">
          <div class="modal-general_bg_content">
            <button className="modal-general_close" onClick={() => this.setShow("show", 2)}>
              <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
            </button>
            <div className="modal-general_container">
              <div className="modal-general_container_header">
                <span className="modal-title__controlname">¿DESEA ELIMINAR LA CLASE?</span>
              </div>
              <div className="modal-general_container_body">
                <button 
                  className="modal-body__button yes"
                  onClick={() =>
                  this.deleteClass() + this.setShow("show", 2)}
                  type="button">
                    <div className="button-zoom">SI</div>
                </button>
                <button 
                  className="modal-body__button no"
                  onClick={() => this.setShow("show", 2)}
                  type="button">
                    <div className="button-zoom">NO</div>
                </button>
              </div>
            </div>
            <svg class="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
        {/* <Link to="ClassDetailTeacher">Ir a una clase detallada</Link> */}
      </>
    )
  }
}
