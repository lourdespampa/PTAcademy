import React, { Component } from "react";
import IconActive from "../../../img/lista/activeIcon.svg";
import IconInactive from "../../../img/lista/InactiveIcon.svg";
import axios from "axios";
import iconExit from "../../../img/cerrar.png";

export default class TableStudentSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      editar: false,
      idMapAlumno: "",
      apellidoAlumno: "",
      nombreAlumno: "",
      competencias: [],
      competenciasAlumnos: [],
      showdelete: 0,
      name_stu: "",
      lastName_stu: "",
      competencia: "",
      nota: ""
    };
  }
  componentDidMount() {
    console.log(this.props.id_class);

    // console.log(params)
  }
  handleEditStudent = idAlumno => {
    this.setState({
      editar: !this.state.editar,
      idMapAlumno: idAlumno
    });
    console.log("se va a guardar al alumnos");
    // v1/api/teacher/:id_lesson/add_score/:id_stud
  };
  handleChangeStudent = idAlumno => {
    this.setState({
      editar: !this.state.editar,
      idMapAlumno: idAlumno
    });
  };
  handleCompeten = (e, id) => {
    var varToken = localStorage.getItem("token");

    console.log(id);
    let name = e.target.name;
    let value = e.target.value;

    this.setState({ nota: value, competencia: name });
    console.log([name], value);
    console.log("nota del alumno", value, "nombre de la competencia", name);
    const data = {
      competencia: name,
      nota: parseInt(value)
    };
    console.log(this.props.apiUrl);
    console.log(this.props.id_class);
    console.log(id);
    console.log(data);
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.id_class}/add_score/${id}`,
      data,
      method: "POST",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => {
        console.log(res)
      })

      .catch(err => {
        console.log(err);
      });
  };
  handleChangeInputs = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
    console.log([name], value);
  };

  setShow = () => {
    this.setState({ showdelete: 1 });
  };
  setClose = () => {
    this.setState({ showdelete: 2 });
  };
  render() {
    return (
      <>
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
        <table className="table table-bordered table-striped table-hover dataTable js-exportable">
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "10%" }}>Activo</th>

              <th style={{ textAlign: "center", width: "10%" }}>Codigo</th>
              <th style={{ textAlign: "center", width: "10%" }}>Apellidos</th>
              <th style={{ textAlign: "center", width: "10%" }}>Nombres</th>

              {this.props.competencias ? (
                this.props.competencias.map((Competencia, id) => (
                  <th key={id} style={{ textAlign: "center", width: "35%" }}>
                    {Competencia}
                  </th>
                ))
              ) : (
                <h1>no hay competencias</h1>
              )}
              <th style={{ textAlign: "center", width: "10%" }}>Puntos</th>

              <th style={{ textAlign: "center", width: "10%" }}>Editar</th>
              <th style={{ textAlign: "center", width: "10%" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {this.props.students ? (
              this.props.students.map((alumno, idAlumno) => (
                <tr key={alumno._id}>
                  {alumno.state === "active" ? (
                    <td style={{ textAlign: "center" }}>
                      <img alt="icon active" src={IconActive}></img>
                    </td>
                  ) : (
                    <td style={{ textAlign: "center" }}>
                      <img src={IconInactive} alt="icon inactivo" />
                    </td>
                  )}
                  <td data-th="Codigo">{alumno.randonCode}</td>
                  <td data-th="Apellidos">
                    {this.state.editar ? (
                      this.state.idMapAlumno === idAlumno ? (
                        <input
                          type="text"
                          name="apellidoAlumno"
                          defaultValue={alumno.lastName_stu}
                          onChange={this.handleChangeInputs}
                        />
                      ) : (
                        alumno.lastName_stu
                      )
                    ) : (
                      alumno.lastName_stu
                    )}
                  </td>
                  <td data-th="Nombres">
                    {this.state.editar ? (
                      this.state.idMapAlumno === idAlumno ? (
                        <input
                          type="text"
                          name="name_stu"
                          defaultValue={alumno.name_stu}
                          onChange={this.handleChangeInputs}
                        />
                      ) : (
                        alumno.name_stu
                      )
                    ) : (
                      alumno.name_stu
                    )}
                  </td>
                  {this.props.competencias.map((Competencia, id) => (
                    <td key={id} data-th="Competencia d">
                      <select
                        name={Competencia}
                        onChange={e => this.handleCompeten(e, alumno._id)}
                      >
                        <option>Seleccionar</option>
                        <option value="20">AD</option>
                        <option value="16">A</option>
                        <option value="14">B</option>
                        <option value="10">C</option>
                      </select>
                    </td>
                  ))}
                  <td className="CourseDetail__table-td" data-th="Puntos">
                    {alumno.point}
                  </td>
                  <td className="CourseDetail__table-td" data-th="Editar">
                    {this.state.editar ? (
                      <button
                        className="courseTeacher__button-alumno"
                        onClick={() => this.handleEditStudent(idAlumno)}
                      >
                        <i className="courseTeacher__img fas fa-save"></i>
                      </button>
                    ) : (
                      <button
                        className="courseTeacher__button-alumno"
                        onClick={() => this.handleChangeStudent(idAlumno)}
                      >
                        <i className="courseTeacher__img fas fa-edit"></i>
                      </button>
                    )}
                  </td>
                  <td data-th="Eliminar">
                    <button onClick={this.setShow}>
                      <i className="courseTeacher__img fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <h1>no hay alumnos para mostrar</h1>
            )}
          </tbody>
        </table>
        <div
          id="modal-general_container"
          className={
            this.state.showdelete === 0
              ? ""
              : this.state.showdelete === 1
              ? "six"
              : this.state.showdelete === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={this.setClose}>
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">
                    ¿DESEA ELIMINAR AL ALUMNO?
                  </span>
                </div>
                <div className="modal-general_container_body">
                  <button
                    className="modal-body__button yes"
                    onClick={this.setClose}
                    type="button"
                  >
                    <div className="button-zoom">SI</div>
                  </button>
                  <button
                    className="modal-body__button no"
                    onClick={this.setClose}
                    type="button"
                  >
                    <div className="button-zoom">NO</div>
                  </button>
                </div>
              </div>
              <svg
                className="modal-general_svg"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }
}
