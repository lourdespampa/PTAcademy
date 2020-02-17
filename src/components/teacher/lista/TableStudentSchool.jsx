import React, { Component } from "react";
import IconActive from "../../../img/lista/activeIcon.svg";
import IconInactive from "../../../img/lista/InactiveIcon.svg";
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
      showdelete: 0
    };
  }
componentDidMount(){
  console.log(this.props.students)
}
  handleEditStudent = (idAlumno) => {
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
                    {this.state.editar ? 
                      this.state.idMapAlumno === idAlumno ? 
                        <input
                          type="text"
                          name="apellidoAlumno"
                          defaultValue={alumno.lastName_stu}
                          onChange={this.handleChangeInputs}
                        />
                       : 
                        alumno.lastName_stu
                     : 
                      alumno.lastName_stu
                    }
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
                  {this.props.competencias.map((Competencia, id) => (
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
                            defaultValue={Competencia}
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
