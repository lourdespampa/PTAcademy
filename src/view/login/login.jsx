import React, { useState } from "react";
import {Redirect} from 'react-router-dom'
import logo from "./bg-teacher-login.jpg";
import "./login.sass";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import Loading from "./Loading";
import axios from "axios";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

//Aqui se establecen los proveedores para los servicios que se utilicen
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

//Componente principal
function App(props) {
  const [methodPay, setMethodPay] = useState(false);
  const [inputs, setInputs] = useState({ email: "", pass: "" });
  const [{ userState, message, token }, getMessage] = useState({ userState: false, message: "" });
  const [{ loading }, setLoading] = useState({ loading: false });

  //valores que devuelve firebase
  const { user, signOut, signInWithGoogle } = props;

  //URL de la Api
  const URL = "http://3.16.110.136:4200";

  //Funcion cuando cambia el value de los inputs
  const handleChangeInputs = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  //el estado inputs se destructura en correo y contraseña
  const { email, pass } = inputs;

  //Funcion para validar y conectar a la API
  const handleToLogin = async event => {
    event.preventDefault();
    setLoading({ loading: true });
    try {
      const { data } = await axios.post(`${URL}/signin`, {fuente:'manual', email, pass });
      const { user, token } = data;
      // console.log(data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      getMessage({
        userState: user,
        message: `Logeado como ${user.email}`,
        token: token
      });
      setLoading({ loading: false });
      console.log(data,user._id);
    } catch (err) {
      console.log(err)
      getMessage({
        userState: null,
        message: "Email and password incorrects!!",
        token: null
      });
      setLoading({ loading: false });
    }
  };

  return (
    <div>
    {
      userState ? <Redirect to={'/CoursesTeacher/'+userState._id} /> : null
    }
    
    <div>
      <nav
        className="navbar navbar-color-on-scroll navbar-transparent fixed-top login-navbar-expand-lg"
        color-on-scroll="100"
      >
        <div className="login-container">
          <div className="navbar-translate">
            <a className="login-navbar-brand navbar-brand" href="/">
              PlayTecAcademy
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/student/access/" className="nav-link">
                  <i className="material-icons">face</i> Cambiar a alumno
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="masthead page-header header-filter login-background"
        data-parallax="true"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="container-login-form">
          <div className="row">
            <div className="mr-auto">
              <div className="card card-login">
                <form
                  className="form"
                  onSubmit={handleToLogin}
                >
                  <div className="card-header card-header-info text-center">
                    <h4 className="card-title">Iniciar sesión como PROFESOR</h4>
                  </div>
                  <div className="card-body">
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">mail</i>
                          </span>
                        </div>
                        <input
                          onChange={handleChangeInputs}
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          autoComplete="off"
                          placeholder="Correo Electrónico"
                          required
                        />
                      </div>
                    </span>
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">lock_outline</i>
                          </span>
                        </div>
                        <input
                          onChange={handleChangeInputs}
                          type="password"
                          style={{ fontFamily: "serif" }}
                          className="form-control"
                          id="password"
                          name="pass"
                          placeholder="Contraseña"
                          required
                        />
                      </div>
                    </span>
                  </div>

                  <div className="container mt-4">
                    <div className="row">
                      <div className="col-md-10 ml-auto mr-auto">
                        <div className="brand">
                          <input
                            type="submit"
                            value="Ingresar"
                            className="btn btn-info btn-round btn-small btn-block"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row espacio">
                      <div className="col-md-10 ml-auto mr-auto">
                        <div className="brand">
                          <a
                            className="button-google"
                            onClick={signInWithGoogle}
                          >
                            <img
                              className="google-icon"
                              src="https://img.icons8.com/color/48/000000/google-logo.png"
                            />
                            Sign in with Google
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <% if (records_error === '') { %> <% } else { %>
                <div class="alert alert-danger" role="alert">
                  <%= records_error %>
                </div>
                <% } %> */}
                </form>
              </div>
              <div className="loading">
                <Loading status={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        data-toggle="modal"
        data-target="#miCodigo"
        id="btnVerAlumnos"
        className="footerLogin"
      >
        <img
          className="img-rbt"
          src={require("./robotito.webp")}
          width="180"
          style={{ left: 0, opacity: 0.7 }}
        />
        <i
          style={{
            color: "#fff",
            marginTop: "70px",
            fontSize: "20px",
            marginLeft: "-20px",
            opacity: 0.7
          }}
        >
          Conoce sobre
          <br />
          nuestra versión <br />
          PREMIUN
        </i>
      </footer>

      <div
        id="miCodigo"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ marginTop: "20px" }}>
          <div className="modal-content" style={{ color: "#fff" }}>
            <div
              className="modal-header"
              style={{ justifyContent: "center", background: "#19b5c8" }}
            >
              <h1
                className="modal-title"
                style={{ marginBottom: "10px", marginTop: "2px" }}
              >
                <strong>Academy Premium</strong>
              </h1>

              <div
                id="close-info-modal"
                style={{
                  position: "absolute",
                  right: "30px",
                  cursor: "pointer"
                }}
                data-dismiss="modal"
                aria-label="Close"
              >
                X
              </div>
            </div>
            <div className="modal-body " style={{ color: "black" }}>
              <div
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  padding: 0,
                  margin: 0
                }}
              >
                <table className="table " style={{ padding: 0, margin: 0 }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>VERSIÓN FREE</th>

                      <th style={{ textAlign: "center" }}>VERSIÓN PREMIUN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lista de Alumnos</td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Al Azar</td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Temporizador</td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Trivia</td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Audio</td>
                      <td style={{ color: "red", textAlign: "center" }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Webinar</td>
                      <td style={{ color: "red", textAlign: "center" }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </td>
                      <td style={{ color: "green", textAlign: "center" }}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Cantidad de Alumnos</td>
                      <td style={{ textAlign: "center" }}>Max. 30 Alumnos</td>
                      <td style={{ textAlign: "center" }}>Max. 100 Alumnos</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Tipo de Codigo</td>
                      <td style={{ textAlign: "center" }}>Autogenerado</td>
                      <td style={{ textAlign: "center" }}>
                        Autogenerado nivel LATAM
                      </td>
                    </tr>
                    <tr
                      id="onHover-Modal"
                      onMouseEnter={() => setMethodPay(true)}
                      onMouseLeave={() => setMethodPay(false)}
                    >
                      <td></td>
                      <td
                        style={{
                          backgroundColor: "#b3ffb3",
                          textAlign: "center",
                          cursor: "pointer"
                        }}
                      >
                        Gratis 1 año
                      </td>
                      <td
                        style={{
                          backgroundColor: "#b3ffb3",
                          textAlign: "center",
                          cursor: "pointer"
                        }}
                      >
                        S/.30 mensuales
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {methodPay ? (
                <div
                  id="mostrar-desc"
                  style={{ textAlign: "center", padding: 0, margin: 0 }}
                  onMouseEnter={() => setMethodPay(true)}
                  onMouseLeave={() => setMethodPay(false)}
                >
                  <br />
                  Realizar el pago a la cuenta de Playtec S.A.C <br />
                  <strong style={{ color: "#ff6666" }}>
                    Cta. en soles Interbank : 076-308395511-2
                  </strong>
                  <br />
                  <strong style={{ color: "#ff6666" }}>
                    CCI : 003-076-013083955112-79
                  </strong>
                  <br />
                  Enviar el voucher del pago por Whatsapp al telefono
                  <strong style={{ color: "#ff6666" }}>+51945626719</strong> ó
                  al correo
                  <strong style={{ color: "#ff6666" }}>
                    info@playtecgroup.com
                  </strong>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
