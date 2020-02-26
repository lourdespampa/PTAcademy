import React, { Component } from "react";
import "./CourseDetail.sass";
import NavCourse from "./NavCourseDetail";
import axios from "axios";
import iconExit from "../../../img/cerrar.png";
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      id_course: "",
      id_teacher: "",
      notaCompe: "",
      students: [],
      editar: false,
      idMapAlumno: "",
      apellidoAlumno: "",
      nombreAlumno: "",
      descAlumno: "",
      compentencias: [],
      competenciasAlumnos: [],
      showdelete: 0
    };
  }

  componentDidMount() {
    console.log(this.props, this.props.location.state)
    const {
      match: { params }
    } = this.props;
    this.setState({ id_course: params.id_course, id_teacher: params.id, compentencias: this.props.location.state });
    setTimeout(
      () => console.log('id del curso', this.state.id_course, 'id del teacher:', this.state.id_teacher,'listado de als compentencias', this.state.compentencias),
      2000
    );
    this.getAlumnos()
  }
  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token");
    await this.setState({ token: tokenStorage });
  };

  handleEditStudent = (idAlumno) => {
    this.setState({
      editar: !this.state.editar,
      idMapAlumno: idAlumno
    })
  }
  handleChange = e => {
    console.log(`Seleccionaste ${e.target.value}`);
  }
  handleChangeInputs = e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({[name]: value})
  }
  handleEditStudent = (idAlumno) => {
    this.setState({
      editar: !this.state.editar,
      idMapAlumno: idAlumno
    })
  }

  getAlumnos = () => {
    const {
      match: { params }
    } = this.props;
    var varToken = localStorage.getItem("token");
    axios({
      url: `${this.props.apiUrl}/v1/api/student/${params.id}/${params.id_course}/students`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(({ data }) => {
        console.log(data);
        if (data === []) {
          this.setState({ students: [], });
        } else {
          this.setState({ students: data, competenciasAlumnos: data.competences })
          
          console.log(data[0].competences);
        }
      })
      .catch(e => console.log(e));
  };
  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };
  Cerrar = () => {
    console.log("se tiene que cerrar");
    const nav = document.getElementById("main-nav");
    nav.classList.remove("show");
  };
  setShow = () => {
    this.setState({showdelete:1})
  };
  setClose = () => {
    this.setState({showdelete:2})
  };

  render() {
    return (
      <>
        <NavCourse
          apiUrl={this.props.apiUrl}
          idcourse={this.state.id_course}
          idteacher={this.state.id_teacher}
          nombreProfesor={this.state.nombreProfesor}
          getdata={this.getAlumnos}
        ></NavCourse>
        {/* <CardStudent></CardStudent> */}
        <div className="CourseDetail__Container" onClick={this.Cerrar}>
          <div>
            <h1 className="CourseDetail__title">Lista de alumnos</h1>
          </div>

          <table className="CourseDetail__table">
            <thead>
              <tr className="CourseDetail__table-tr">
                <th className="CourseDetail__table-th">Codigo</th>
                <th className="CourseDetail__table-th">Apellidos</th>
                <th className="CourseDetail__table-th">Nombres</th>
                {this.state.compentencias.map((compentencia, id) => (
                  <th key={id} className="CourseDetail__table-th">{compentencia}</th>
                ))}
                <th className="CourseDetail__table-th">Editar</th>
                <th className="CourseDetail__table-th">Eliminar</th>
              </tr>
            </thead>
            {/* cuerpo de la tabla */}
            <tbody className="CourseDetail__table-body">
              {this.state.students.map((alumno,idAlumno) => (
                <tr className="CourseDetail__table-tr" key={alumno._id}>
                  <td className="CourseDetail__table-td" data-th="Codigo">
                    {alumno.randonCode}
                  </td>
                  <td className="CourseDetail__table-td" data-th="Apellidos">
                    {
                      this.state.editar
                      ?
                        this.state.idMapAlumno === idAlumno
                        ?
                        <input type="text" name="apellidoAlumno" defaultValue={alumno.lastName_stu} onChange={this.handleChangeInputs} />
                        :
                        alumno.lastName_stu
                      :
                      alumno.lastName_stu
                    }
                  </td>
                  <td
                    className="CourseDetail__table-td"
                    data-th="Nombres"
                  >
                    {
                      this.state.editar
                      ?
                        this.state.idMapAlumno === idAlumno
                        ?
                        <input type="text" name="nombreAlumno" defaultValue={alumno.name_stu} onChange={this.handleChangeInputs} />
                        :
                        alumno.name_stu
                      :
                      alumno.name_stu
                    }
                  </td>
                  {/* {alumno.competences.map((a,id)=>
                    <td key={id}>
                      {a.comp}
                      {a.nota}
                    </td>
                  )} */}
                  {alumno.competences.map((compentencia, id) => (
                    <td
                      key={id}
                      className="CourseDetail__table-td"
                      data-th="Competencia d"
                    >
                      {compentencia.nota}
                    </td>
                  ))}
                  <td
                    className="CourseDetail__table-td"
                    data-th="Editar"
                  >
                    {(this.state.editar)?(
                      <button className="courseTeacher__button-alumno" onClick={() => this.handleEditStudent(idAlumno)} >
                      <i className="courseTeacher__img fas fa-save"></i>
                    </button>
                    ):(
                      <button className="courseTeacher__button-alumno" onClick={() => this.handleEditStudent(idAlumno)} >
                      <i className="courseTeacher__img fas fa-edit"></i>
                    </button>
                    )}
                    
                  </td>
                  <td
                    className="CourseDetail__table-td"
                    data-th="Eliminar"
                  >
                    <button className="courseTeacher__button-delette" onClick={this.setShow}>
                      <i className="courseTeacher__img fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="modal-general_container" className={this.state.showdelete === 0 ? "" : this.state.showdelete === 1 ? "six" : this.state.showdelete === 2 ? "six out" : ""}>
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={this.setClose}>
                <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">¿DESEA ELIMINAR AL ALUMNO?</span>
                </div>
                <div className="modal-general_container_body">
                  <button className="modal-body__button yes" onClick={this.setClose} type="button">
                    <div className="button-zoom">SI</div>
                  </button>
                  <button className="modal-body__button no" onClick={this.setClose} type="button">
                    <div className="button-zoom">NO</div>
                  </button>
                </div>
              </div>
              <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }
}
