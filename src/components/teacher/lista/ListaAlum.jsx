import React, { Component } from "react";
import "./lista.sass";
import axios from "axios";
import { ExportCSV } from "./exportbtn";
import { BtnPuntos } from "./btnpuntos";
import io from "socket.io-client";
// import { TableBody } from "./tablebody"; no se esta usando by: Miryan
import iconExit from "../../../img/cerrar1.png";

import TablePrivate from "./TableStudentPrivate";
import TableSchool from "./TableStudentSchool";
// import {alumnos} from '../../data/alumnos.json';
export default class ListaAlum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validarColegio: true,
      TipoColegio: "",
      id_teacher: "",
      id_course: "",
      competencias: [],
      alumnosColegio: [],
      id_access: "",
      modals: {
        showpuntosmas: 0,
        showpuntosmenos: 0,
        showcomportamiento: 0,
        shownota: 0,
        showdelete: 0
      },
      pin: "pin",
      point: "",
      note: "",
      conduct: "",
      _id: "",
      students: [],
      fileName: "Nota de alumnos",
      datapoint: {
        pocitivo: [
          {
            imgen: require("../../../img/lista/punto1.png"),
            valor: 1,
            title: "Ayuda a Otros"
          },
          {
            imgen: require("../../../img/lista/punto3.png"),
            valor: 1,
            title: "Participacion"
          },
          {
            imgen: require("../../../img/lista/punto4.png"),
            valor: 1,
            title: "Persistencia"
          },
          {
            imgen: require("../../../img/lista/punto5.png"),
            valor: 1,
            title: "responsabilidad"
          },
          {
            imgen: require("../../../img/lista/punto2.png"),
            valor: 1,
            title: "Cumplimiento de Tareas"
          },
          {
            imgen: require("../../../img/lista/punto6.png"),
            valor: 1,
            title: "trabajo en equipo"
          }
        ],
        negativo: [
          {
            imgen: require("../../../img/lista/punto-1.png"),
            valor: 1,
            title: "Ayuda a Otros"
          },
          {
            imgen: require("../../../img/lista/punto-2.png"),
            valor: 1,
            title: "Cumplimiento de Tareas"
          },
          {
            imgen: require("../../../img/lista/punto-3.png"),
            valor: 1,
            title: "Participacion"
          }
        ],
        camportamiento: [
          { imgen: require("../../../img/lista/a.jpg"), title: "", valor: "A" },
          { imgen: require("../../../img/lista/b.jpg"), title: "", valor: "B" },
          { imgen: require("../../../img/lista/c.jpg"), title: "", valor: "C" },
          { imgen: require("../../../img/lista/d.jpg"), title: "", valor: "D" },
          { imgen: require("../../../img/lista/e.jpg"), title: "", valor: "E" },
          { imgen: require("../../../img/lista/f.jpg"), title: "", valor: "F" }
        ]
      }
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }
  componentWillMount() {
    var competencias = JSON.parse(localStorage.getItem("competencias"));
    this.setState({
      competencias: competencias
    });
  }
  componentDidMount() {
    this.getStudents();
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    socket.on("newAlum", data => {
      console.log("El pin de ese curso es:", data.pin);
      console.log("1. nuevo alumno entrando");

      if (data.pin === this.props.id_access.toUpperCase()) {
        this.getStudents();
        console.log("2. pin validad para el alumno ingresante");
      }
    });
  }
  //rellenar state de estudiantes de profesor privado

  getStudents = async () => {
    var varToken = localStorage.getItem("token");
    var id_teacher = localStorage.getItem("id_teacher");
    var id_course = localStorage.getItem("id_course");
    var varToken = localStorage.getItem("token");
    console.log(this.props.school);
    if (this.props.school) {
      console.log("3. el profesor es de colegio y se lista al colegio");
      axios({
        url: `${this.props.apiUrl}/v1/api/student/${id_teacher}/${id_course}/students`,
        method: "GET",
        headers: {
          "x-access-token": `${varToken}`
        }
      })
        .then(({ data }) => {
          console.log(data);
          if (data === []) {
            console.log("no tiene ningun alumnos");
            this.setState({ students: [] });
          } else {
            this.setState({ students: data });
          }
        })
        .catch(e => console.log(e));
    } else {
      console.log("3. el profesor es privado y se lista lo privado");
      axios({
        url: `${this.props.apiUrl + "/v1/api/lesson"}/${
          this.props.id_access
        }/students`,
        method: "GET",
        headers: {
          "x-access-token": `${varToken}`
        }
      })
        .then(({ data }) => {
          if (data === []) {
            console.log("no tiene ningun alumnos");
            this.setState({ students: [] });
          } else {
            this.setState({ students: data });
          }
        })
        .catch(e => console.log(e));
    }
  };
  //eliminar estudiante
  deleteStudents = async studentsId => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    var varToken = localStorage.getItem("token");
    await axios({
      url:
        this.props.apiUrl + "/v1/api/student/disable_student/" + this.state._id,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    socket.emit("RemoveStud", { id: this.state._id });
  };
  //captura value y id
  onClick = id => {
    this.setState({
      _id: id
    });
    console.log(id);
  };
  onClickNote = id => {
    this.setState({
      _id: id
    });
    console.log(id);
  };
  onClickPoint = (id, point) => {
    this.setState({
      _id: id,
      point: point
    });
    console.log(id, point);
  };
  onChangeInput(e) {
    this.setState({
      note: e.target.value
    });
    console.log(e.target.value);
  }
  //funciones cambiar nota,puto y comportamiento
  onSubmitNote = async () => {
    const data = {
      score: this.state.note
    };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
  };
  onClickPointAdd = async valor => {
    const point = this.state.point + valor;
    const data = {
      point: point
    };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    this.setShow("showpuntosmas", 2);
  };
  onClickPointRemove = async valor => {
    const point = this.state.point - valor;
    const data = {
      point: point
    };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    this.setShow("showpuntosmenos", 2);
  };
  onClickConductAdd = async valor => {
    const data = {
      conduct: valor
    };
    var varToken = localStorage.getItem("token");
    await axios({
      url: this.props.apiUrl + "/v1/api/student/update_score/" + this.state._id,
      data,
      method: "put",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.getStudents();
    this.setShow("showcomportamiento", 2);
  };
  onClickEnviar = async e => {
    e.preventDefault();

    // const a = this.state.students;
    // const text = a.map(
    //   student =>
    //     `<tr>
    //              <td>${student.nombres}</td>
    //              <td>${student.apodo}</td>
    //              <td>${student.nota}</td>
    //              <td>${student.comportamiento}</td>
    //              <td>${student.puntos}</td>
    //          </tr>`
    // );
    // const html = `<table>
    //              <thead>
    //                  <tr>
    //                      <th>Nombres</th>
    //                      <th>Apellidos</th>
    //                      <th>Nota(0-20)</th>
    //                      <th>Comportamiento</th>
    //                      <th>Puntos</th>
    //                  </tr>
    //              </thead>
    //              <tbody>
    //                  ${text}
    //              </tbody>
    //          </table>`;
    // var user = JSON.parse(localStorage.getItem("user"));

    // const params = {
    //     hml: html,
    //     data: a,
    //     name: 'playtecAcademy Clase prueba',
    //     email: user.email
    // }
    // await axios.post('http://email-service-playtec.herokuapp.com/', params)
  };
  setShow = (nom, val) => {
    this.setState({
      modals: { [nom]: val }
    });
  };
  render() {
    return (
      <>
        <div className="mt-2 row text-center">
          <button
            id="enviar"
            onClick={this.onClickEnviar}
            className="button btnMyM"
          >
            Enviar
          </button>
          <ExportCSV
            csvData={this.state.students}
            fileName={this.state.fileName}
          />
        </div>
        <div className="clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="body" id="html">
                <div className="table-responsive">
                  {this.props.school ? (
                    <TableSchool
                      students={this.state.students}
                      competencias={this.state.competencias}
                      apiUrl={this.props.apiUrl}
                      id_class={this.props.id_class}
                    ></TableSchool>
                  ) : (
                    <TablePrivate
                      students={this.state.students}
                      onClickNote={this.onClickNote}
                      onClick={this.onClick}
                      onClickPoint={this.onClickPoint}
                      deleteStudents={this.deleteStudents}
                      setShow={this.setShow}
                    ></TablePrivate>
                  )}
                  {/* <table
                    id="tabla_usuarios"
                    className="table table-bordered table-striped table-hover dataTable js-exportable"
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>Nombres</th>
                        <th style={{ textAlign: "center" }}>Apellidos</th>
                        <th style={{ textAlign: "center", width: "15%" }}>
                          Nota(0-20)
                        </th>
                        <th style={{ textAlign: "center", width: "20%" }}>
                          Comportamiento
                        </th>
                        <th style={{ textAlign: "center", width: "15%" }}>
                          Puntos
                        </th>
                        <th style={{ textAlign: "center", width: "5%" }}>
                          ...
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ height: "350px" }}>
                      {this.state.students ? (
                        <TableBody
                          students={this.state.students}
                          onClickNote={this.onClickNote}
                          onClick={this.onClick}
                          onClickPoint={this.onClickPoint}
                          deleteStudents={this.deleteStudents}
                          setShow={this.setShow}
                        />
                      ) : (
                        <h1>no hay alumnos para mostrar</h1>
                      )}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="modal-general_container"
          className={
            this.state.modals.showpuntosmas === 0
              ? ""
              : this.state.modals.showpuntosmas === 1
              ? "six"
              : this.state.modals.showpuntosmas === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showpuntosmas", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">POSITIVO:</span>
                </div>
                <div className="modal-general_container_body">
                  <BtnPuntos
                    data={this.state.datapoint.pocitivo}
                    funcion={this.onClickPointAdd}
                  />
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
        <div
          id="modal-general_container"
          className={
            this.state.modals.showpuntosmenos === 0
              ? ""
              : this.state.modals.showpuntosmenos === 1
              ? "six"
              : this.state.modals.showpuntosmenos === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showpuntosmenos", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">NECESITAS MEJORAR:</span>
                </div>
                <div className="modal-general_container_body">
                  <BtnPuntos
                    data={this.state.datapoint.negativo}
                    funcion={this.onClickPointRemove}
                  />
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
        <div
          id="modal-general_container"
          className={
            this.state.modals.shownota === 0
              ? ""
              : this.state.modals.shownota === 1
              ? "six"
              : this.state.modals.shownota === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("shownota", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">NOTA:</span>
                </div>
                <div className="modal-general_container_body">
                  <input
                    type="text"
                    value={this.state.note}
                    onChange={this.onChangeInput}
                  />
                  <button
                    id="btnnotas"
                    className="button btnMyM"
                    onClick={() =>
                      this.onSubmitNote() + this.setShow("shownota", 2)
                    }
                    type="button"
                  >
                    MODIFICAR
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
        <div
          id="modal-general_container"
          className={
            this.state.modals.showcomportamiento === 0
              ? ""
              : this.state.modals.showcomportamiento === 1
              ? "six"
              : this.state.modals.showcomportamiento === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showcomportamiento", 2)}
              >
                <img
                  className="button-zoom"
                  src={iconExit}
                  alt="imagen de cerrar modal"
                />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title">COMPORTAMIENTO:</span>
                </div>
                <div className="modal-general_container_body">
                  <BtnPuntos
                    data={this.state.datapoint.camportamiento}
                    funcion={this.onClickConductAdd}
                  />
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
        <div
          id="modal-general_container"
          className={
            this.state.modals.showdelete === 0
              ? ""
              : this.state.modals.showdelete === 1
              ? "six"
              : this.state.modals.showdelete === 2
              ? "six out"
              : ""
          }
        >
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button
                className="modal-general_close"
                onClick={() => this.setShow("showdelete", 2)}
              >
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
                    onClick={() =>
                      this.deleteStudents() + this.setShow("showdelete", 2)
                    }
                    type="button"
                  >
                    <div className="button-zoom">SI</div>
                  </button>
                  <button
                    className="modal-body__button no"
                    onClick={() => this.setShow("showdelete", 2)}
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
