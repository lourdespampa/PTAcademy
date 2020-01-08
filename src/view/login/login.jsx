import React, { useState } from "react";
import {Redirect} from 'react-router-dom'
import "./login.css";

import axios from 'axios';
import Loading from "./Loading";

import firebase from "./firebaseConfig";

export default function App(props) {

  const [inputsLogin, setInputsLogin] = useState({ email: "", pass: "" });
  const [inputsRegister, setInputsRegister] = useState({ email: "", name: "", pass: "", rpass: "" });
  const [{ userState, message, token }, getMessage] = useState({ userState: false, message: "" });
  const [tipoAcceso, setTipoAcceso] = useState(false);
  const [{ loading }, setLoading] = useState({ loading: false });

  const cambiarTipoAcceso = () => {
    setTipoAcceso(!tipoAcceso)
  }

  //Funcion cuando cambia el value de los inputs del login
  const handleChangeInputsLogin = event => {
    setInputsLogin({ ...inputsLogin, [event.target.name]: event.target.value });
  };

  //Funcion cuando cambia el value de los inputs de registro
  const handleChangeInputsRegister = event => {
    setInputsRegister({ ...inputsRegister, [event.target.name]: event.target.value });
  };

  //Funcion para validar y conectar a la API
  const handleToLogin = async (event) => {
    event.preventDefault();
    const { email, pass } = inputsLogin;
    console.log(inputsLogin)
    setLoading({ loading: true });
    try {
      const { data } = await axios.post(`${props.apiUrl}/signin`, {fuente:'manual', email, pass });
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
      console.log(data, data.user);
    } catch (err) {
      console.log(err)
      getMessage({
        userState: null,
        message: "Correo o contraseña incorrecta!!",
        token: null
      });
      setLoading({ loading: false });
    }
  }

  //Funcion para registrar y conectar a la API
  const handleToRegister = async (event) => {
    event.preventDefault()
    const { email, name, pass, rpass } = inputsRegister;
    console.log(inputsRegister)
  }

  const signInWithGoogle =  () => {
    //Aqui se establecen los proveedores para los servicios que se utilicen
    let provider = new firebase.auth.GoogleAuthProvider()
    //Inicializamos la autenticación de firebase pasandole un proveedor
    firebase.auth().signInWithPopup(provider).then( async result => {
      setLoading({ loading: false });
      let displayName = result.user.displayName
      let emailGoogle = result.user.email
      let photoURL = result.user.photoURL
      //enviamos los datos a la API
      const { data } = await axios.post(`${props.apiUrl}/signin`, {"fuente": "google", displayName, "email": emailGoogle, photoURL });
      const { user, token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      getMessage({
        userState: user,
        message: `Logeado como ${user.email}`,
        token: token
      });
      setLoading({ loading: false });
      console.log(data) 
    }).catch( e => {
      setLoading({ loading: false });
      console.log(e)
    })
  }
  
  return (
    <div className="loginTeacher">
      {
      userState ? <Redirect to={'/CoursesTeacher/'+userState._id} /> : null
      }
      <div className={ tipoAcceso ? "loginTeacher-container log-in" : "loginTeacher-container" }>
        <div className="box"></div>
        <div className="container-forms">
          <div className="container-info">
            <div className="info-item">
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <p>¿Ya tienes una cuenta?</p>
                  <div className="btn" onClick={cambiarTipoAcceso}>Iniciar Sesión</div>
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <p>¿Aún no tienes una cuenta?</p>
                  <div className="btn" onClick={cambiarTipoAcceso}>Registrate</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-form">
            <form className="form-item log-in" onSubmit={handleToLogin} >
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <h2 className="loginTeacher-subtitle">Iniciar Sesión</h2>
                  <input name="email" placeholder="Correo" type="text" onChange={handleChangeInputsLogin} required/>
                  <input name="pass" placeholder="Contraseña" type="password" onChange={handleChangeInputsLogin} required/>
                  <input className="btn" type="submit" value="sign in"/>
                  <div style={{width:"210px", margin:"10px auto"}}>
                    <div className="linea">&nbsp;</div>
                    <div className="leyenda">&nbsp;&nbsp;o accede con Google&nbsp;&nbsp;</div>
                    <div className="linea">&nbsp;</div>
                  </div>
                  <a className="button-google" onClick={signInWithGoogle} >
                    <img className="google-icon" src="https://img.icons8.com/color/48/000000/google-logo.png" />
                      Sign in with Google
                  </a>
                </div>
              </div>
            </form>
            <form className="form-item sign-up" onSubmit={handleToRegister}>
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                <h2 className="loginTeacher-subtitle">Registrarse</h2>
                  <input name="email" placeholder="Correo" type="text" onChange={handleChangeInputsRegister} required/>
                  <input name="name" placeholder="Nombre Completo" type="text" onChange={handleChangeInputsRegister} required/>
                  <input name="pass" placeholder="Contraseña" type="password" onChange={handleChangeInputsRegister} required/>
                  <input name="rpass" placeholder="Repita su contraseña" type="password" onChange={handleChangeInputsRegister} required/>
                  <input className="btn" type="submit" value="Sign up"/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="login-loading">
          <Loading status={loading} />
        </div>
      </div>
    </div>
  );
}
