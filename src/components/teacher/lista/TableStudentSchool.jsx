import React, { Component } from "react";
import IconActive from "../../../img/lista/activeIcon.svg";
import IconInactive from "../../../img/lista/InactiveIcon.svg";
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
      compentencias: [],
      competenciasAlumnos: [],
      showdelete: 0
    };
  }

  handleEditStudent = idAlumno => {
    this.setState({
      editar: !this.state.editar,
      idMapAlumno: idAlumno
    });
  };

  handleChangeInputs = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
    console.log(this.state.apellidoAlumno, this.state.nombreAlumno);
  };

  setShow = () => {
    this.setState({ showdelete: 1 });
  };
  setClose = () => {
    this.setState({ showdelete: 2 });
  };
  render() {
    return (
      <div>
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

              {this.props.compentencias ? (
                this.props.compentencias.map((compentencia, id) => (
                  <th key={id} style={{ textAlign: "center", width: "35%" }}>
                    {compentencia}
                  </th>
                ))
              ) : (
                <h1>no hay compentencias</h1>
              )}

              <th style={{ textAlign: "center", width: "10%" }}>Editar</th>
              <th style={{ textAlign: "center", width: "10%" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {this.props.students ? (
              this.props.students.map((alumno, idAlumno) => (
                <tr key={alumno._id}>
                  {(alumno.state === "active") ? (
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
                          name="nombreAlumno"
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
                  {this.props.compentencias.map((compentencia, id) => (
                    <td key={id} data-th="Competencia d">
                      <select>
                        <option value="AD">AD</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                      {this.state.editar ? (
                        this.state.idMapAlumno === idAlumno ? (
                          <input
                            type="text"
                            name="nombreAlumno"
                            defaultValue={compentencia}
                            onChange={this.handleChangeInputs}
                          />
                        ) : (
                          "descripción"
                        )
                      ) : (
                        "descripción"
                      )}
                    </td>
                  ))}
                  <td data-th="Editar">
                    <button onClick={() => this.handleEditStudent(idAlumno)}>
                      <i className="courseTeacher__img fas fa-edit"></i>
                    </button>
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
      </div>
    );
  }
}
