import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
import AllCourses from "./AllCourses";
import axios from "axios";
import "../courses/Course.sass";
import { Modal } from "react-bootstrap";
export default class CoursesTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreProfesor: "",
      _id: "",
      id_curso: "",
      showdelete: false,
      courses: []
    };
  }

  componentDidMount() {
    // en varToken se guarda la variable almacenada del localstorage
    var varToken = localStorage.getItem('token');
    //obtenemos el id de la url pasada a través de las propiedades
    const {
      match: { params }
    } = this.props;
    this.setState({ _id: params.id });
    //luego, obtenemos la lista de cursos del profesor por petición a la API
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id}/course_detail`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        // console.log(data)
        if (data == []) {
          this.setState({ courses: [] });
        } else {
          this.setState({ courses: data });
        }
      })
      .catch(e => console.log(e));
    axios({
      url: `${this.props.apiUrl}/v1/api/admin/user/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then(({ data }) => {
      console.log(data);
      this.setState({ nombreProfesor: data.displayName });
    });
  }
  getCursos=()=>{
    console.log('listar cursos')
    const { match: { params } } = this.props;
    var varToken = localStorage.getItem('token');
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${params.id}/course_detail`,
      method: "GET",
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then( ({ data }) => {
       console.log(data)
        if(data == []){
          this.setState({courses: []})
        }else{
          this.setState({courses: data})
      }
    })
      .then(({ data }) => {
        // console.log(data)
          if (data == []) {
            this.setState({ courses: [] });
          } else {
            this.setState({ courses: data });
          }
      })
      .catch(e => console.log(e));
  }

  deleteCurso = async () => {
    var varToken = localStorage.getItem("token");

    await axios({
      url:`${this.props.apiUrl}/v1/api/teacher/${this.state._id }/${this.state.id_curso}`,
      method:'put',
      headers:{
        'x-access-token': `${varToken}`
      }});
    this.getCursos();
  };
  onClick = id => {
    this.setState({
      id_curso: id
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
        <NavCourse apiUrl={this.props.apiUrl} idcourse={this.state.id_curso} idteacher={this.state._id}
         agregarX={'course'} nombreProfesor={this.state.nombreProfesor} getdata={this.getCursos}></NavCourse>
        <div className="main">
          <h1 className="courseTeacher-title">SECCION DE CURSOS</h1>
          <ul className="courseTeacher-container">
            {this.state.courses.length > 0 ? (
              // <div>true</div>
              this.state.courses.map((cursos, id) => (
                <li className="courseTeacher-cards" key={id}>
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
            ) : (
              // <div>false</div>
              <h3>Cargando cursos... Si no tiene, puede crear uno.</h3>
            )}
          </ul>
        </div>
        <Modal
          size={"lg"}
          show={this.state.showdelete}
          onHide={() => this.setShow("showdelete", false)}
        >
          <Modal.Header closeButton>
            <div className="punto-posi">
              <h3 className="punto-text">¿Desea eliminar al Curso?</h3>
            </div>
          </Modal.Header>
          <Modal.Body>
            <button
              className="button btnMyM"
              onClick={() =>
                this.deleteCurso() + this.setShow("showdelete", false)
              }
              type="button"
            >
              si
            </button>
            <button
              className="button btnMyM"
              onClick={() => this.setShow("showdelete", false)}
              type="button"
            >
              No
            </button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
