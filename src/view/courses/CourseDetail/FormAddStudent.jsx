import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap"; no se esta usando
import axios from "axios";
export default class FormAddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bloquearBoton: false,
      name_stu: "",
      lastName_stu: "",
      id_course: "",
      id_teacher: "",
      signup: false,
      login: true
    };
  }
  componentDidMount() {
    console.log(this.props.idteacher);
    console.log(this.props.idcourse);
  }
  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    this.setState({
      bloquearBoton: true
    });
    var varToken = localStorage.getItem("token");
    event.preventDefault();
    const data = {
      name_stu: this.state.name_stu,
      lastName_stu: this.state.lastName_stu,
      id_teach: this.props.idteacher,
      id_course: this.props.idcourse
    };

    axios({
      url: `${this.props.apiUrl}/v1/api/student`,
      data,
      method: "post",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => {
        console.log(res)
        this.setState({
          bloquearBoton: false,
          name_stu: "",
          lastName_stu: ""
        });
        this.props.handleClose();
        this.props.getdata();
      })

      .catch(err => {
        console.log(err);
        this.setState({
          bloquearBoton: false
        });
      });
  };
  render() {
    const { name_stu, lastName_stu } = this.state;
    return (
      <>
        
         <form onSubmit={this.handleSubmit}>
          <label className="modal-title__controlname">
            Nombres del alumno
          </label>
          <input
            className="modal-teacher__general-controlname"
            type="text"
            name="name_stu"
            onChange={this.handleChange}
            value={name_stu}
            placeholder="Ingresar nombres completos de los estudiantes"
            required
          />
          <label className="modal-title__controlname">
            Apellidos del alumno
          </label>
          <input
            className="modal-teacher__general-controlname"
            type="text"
            name="lastName_stu"
            onChange={this.handleChange}
            value={lastName_stu}
            placeholder="Ingresar apellidos completos de los estudiantes"
            required
          />
          <input type="file" />
          {this.state.bloquearBoton ? (
            <button className="modal-body__button cursos" type="button">
              <div className="button-zoom">Cargando ...</div>
            </button>
          ) : (
            <button className="modal-body__button cursos" type="submit">
              <div className="button-zoom">Agregar Alumno</div>
            </button>
          )}
        </form>
      </>
    );
  }
}
