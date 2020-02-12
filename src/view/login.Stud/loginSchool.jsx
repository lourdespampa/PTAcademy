import React, { Component } from "react";
import robot from "./images/playtecrobot.gif";
import { Redirect } from "react-router-dom";

import axios from "axios";
export default class loginPrivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_student: "",
      last_student: "",
      id_access: "",
      redirection: false,
      idStudent: "",
      id_teacher:'',
      id_course:'',
      codigoSecreto:'',
      hasStudents:false
    };
  }
  componentDidMount() {

    console.log(this.props.location.state)

    console.log(this.props.apiUrl);
    const data = this.props.match.params.id_access;
    this.setState({ id_access: data ,
      id_teacher:this.props.location.state.id_teacher,
      id_course:this.props.location.state.id_course,
      hasStudents:this.props.location.state.hasStudents
    });
  }
  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    console.log(value);

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    console.log(this.props.apiUrl);
    var varToken = localStorage.getItem("token");

    const data = {
      name_stu: this.state.name_student,
      lastName_stu: this.state.last_student,
      id_access: this.state.id_access,
      id_teacher:this.state.id_teacher,
      id_course:this.state.id_course
    };
    const data2={
      name_stu: this.state.name_student,
      lastName_stu: this.state.last_student,
      randonCode:this.state.codigoSecreto
    }
    if(this.state.hasStudents===true){
      axios({
        url: `${this.props.apiUrl}/verify_student_code`,
        data2,
        method: "post",
        headers: {
          "x-access-token": `${varToken}`
        }
      })
        .then(res => {
          console.log(res);
          this.setState({
            redirection: true,
            idStudent: res.data.idStu
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("alumId", res.data.idStu);
        })
        .catch(err => console.log(err));
    }else{
    axios({
      url: `${this.props.apiUrl}/signin_student`,
      data,
      method: "post",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => {
        console.log(res);
        this.setState({
          redirection: true,
          idStudent: res.data.idStu
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("alumId", res.data.idStu);
      })
      .catch(err => console.log(err));
    }
  };
  render() {
    const { name_student, last_student,codigoSecreto,hasStudents } = this.state;

    return (
      <div className="limiter">
        {this.state.redirection ? (
          <Redirect
            to={`/student/${this.state.idStudent}/${this.state.id_access}`}
          />
        ) : null}
        <div className="container-login100">
          <form onSubmit={this.handleSubmit}>
            <div className="wrap-login100">
              <span className="login100-form-title p-b-26">
                INGRESO A LA CLASE
              </span>
              <span className="login100-form-title">
                <img
                  src={robot}
                  alt="robot"
                  className="login-imagen-robot-student"
                />
              </span>

              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  autoComplete="off"
                  placeholder="Nombres"
                  type="text"
                  onChange={this.handleChange}
                  name="name_student"
                  value={name_student}
                  required
                />
                <span className="focus-input100"></span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  autoComplete="off"
                  placeholder="Apellidos"
                  type="text"
                  onChange={this.handleChange}
                  name="last_student"
                  value={last_student}
                  required
                />
                <span className="focus-input100"></span>
              </div>
              {hasStudents?
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  autoComplete="off"
                  placeholder="Codigo Secreto"
                  type="password"
                  onChange={this.handleChange}
                  name="codigoSecreto"
                  value={codigoSecreto}
                  required
                />
                <span className="focus-input100"></span>
              </div>
                :null}
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    Ingresar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
