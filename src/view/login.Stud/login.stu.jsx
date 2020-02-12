import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./ingresarCodigo.sass";
import logo from "./images/Logo.svg";

export default class LoginStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      acceso: false,
      colegio: 'tipo',
      data:{}
    };
    this.id_access = "";
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = async (event) => {
    await this.setState({ value: event.target.value.toUpperCase() });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {}
  

  ValidateCode = e => {
    e.preventDefault();
    console.log(this.state.value)
    const codigo = this.state.value.toUpperCase();
    const data = {
      id_access: codigo
    };
    axios
      .post(this.props.apiUrl + "/verify_access", data)
      .then(result => {
        console.log(result);
        if (result.data.school === true) {
          this.setState({ id_access: codigo,data:{id_teacher:result.data.id_teacher,id_course:result.data.id_course}, acceso: true,colegio:'School'});
          console.log(result.data.id_teacher);
          console.log('se envio la data', this.state.data)
          // <Redirect to={`/loginStudentSchool/${this.state.id_access}`}/>;
        } else {
          console.log(result);
          this.setState({ id_access: codigo, acceso: true,colegio:'Private'  });
          console.log('este curso es un profe privadito  pe');
          // <Redirect to={`/loginStudentPrivate/${this.state.id_access}`}></Redirect>
        }
      })
      .catch(e => {
        console.log(e);
        alert("CODIGO INCORRECTO O SOLICITUD INCORRECTA");
      });
  };
  render() {
    return (
      <div className="enter-code__contenedor">
        {
          // console.log(this.state.data)
        this.state.acceso ? (
          // <Redirect to={`/loginStudent/${this.state.id_access}`} />
          <Redirect to={{pathname:`/loginStudent${this.state.colegio}/${this.state.id_access}`, state:this.state.data }}></Redirect>
        ) : null
      }
        <ul className="enter-code__header">
          <li className="enter-code__academy">
            <Link to="/">
              <img
                className="enter-code__academy-a"
                src={logo}
                alt="este logo es academy"
              />
            </Link>
          </li>
          <li className=""></li>
          <li className="enter-code__changeStudent">
            <Link className="enter-code__academy-a" to={"/loginTeacher"}>
              CAMBIAR A PROFESOR
            </Link>
          </li>
        </ul>
        <div className="enter-code__body">
          <div className="enter-code__formulario">
            <h1 className="enter-code__tittle-body">
              Ingresa el PIN para unirte a una clase como ALUMNO
            </h1>
            <form
              className="enter-code__body-body"
              onSubmit={this.ValidateCode}
            >
              <span className="enter-code__input input--kozakura">
                <input
                  className="input__field input__field--kozakura"
                  value={this.state.value}
                  onChange={this.handleChange}
                  id="inputCode"
                  type="text"
                  maxLength="5"
                  minLength="5"
                  autoComplete="off"
                  data-inputmask="'mask':'AAAAAA'"
                  im-insert="true"
                  required
                />
                <label
                  className="input__label input__label--kozakura"
                  htmlFor="inputCode"
                >
                  <span
                    className="input__label-content input__label-content--kozakura"
                    data-content="Código"
                  >
                    {this.state.value || "CÓDIGO..."}
                    {/* {existeCodigo ? this.state.value : "CÓDIGO..."} */}
                  </span>
                </label>
                <svg
                  className="graphic graphic--kozakura"
                  width="300%"
                  height="100%"
                  viewBox="0 0 1200 60"
                  preserveAspectRatio="none"
                >
                  <path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z" />
                </svg>
              </span>
              <button className="enter-code__button">INGRESAR</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
