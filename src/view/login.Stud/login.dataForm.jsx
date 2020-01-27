import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./loginStu.sass";
import robot from "./images/playtecrobot.gif";

export default class FormLoginStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: "",
      value2: "",
      id_access: "",
      idStu: ""
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const data = this.props.match.params.id_access;
    this.setState({ id_access: data });
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.SaveStudent();
    }
  };

  handleChange1(event) {
    this.setState({ value1: event.target.value });
  }
  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  async SaveStudent() {
    const inputName = document.getElementById("inputName");
    const inputLastName = document.getElementById("inputLastName");

    if (inputName.value === "" || inputLastName.value === "") {
      alert("Nombre y Apellidos son requeridos");
    } else {
      const data = {
        name_stu: inputName.value,
        lastName_stu: inputLastName.value,
        id_access: this.state.id_access
      };

      localStorage.setItem("alumno", JSON.stringify(data));
      const VerifyCode = await axios.post(
        this.props.apiUrl + "/signin_student",
        data
      );
      const id = VerifyCode.data.idStu;
      const token = VerifyCode.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("alumId", id);
      this.setState({ idStu: id });
      document.getElementById("link_form").click();
    }
  }
  render() {
    return (
      <div>
        <Link
          id="link_form"
          to={`/student/${this.state.idStu}/${this.state.id_access}`}
        />

        <div className="limiter">
          <div className="container-login100">
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
                  id="inputName"
                  className="input100"
                  autoComplete="off"
                  placeholder="Nombres"
                  type="text"
                  onKeyPress={this.handleKeyPress}
                  value={this.state.value1}
                  onChange={this.handleChange1}
                />
                <span className="focus-input100"></span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  id="inputLastName"
                  className="input100"
                  autoComplete="off"
                  placeholder="Apellidos"
                  type="text"
                  onKeyPress={this.handleKeyPress}
                  value={this.state.value2}
                  onChange={this.handleChange2}
                />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button
                    onClick={() => this.SaveStudent()}
                    className="login100-form-btn"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
