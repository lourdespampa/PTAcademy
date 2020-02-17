import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./login.sass";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
//importamos la configuración de firebase
import firebase from "./firebaseConfig";
import openEye from "../../img/openEyes.svg";
import closeEye from "../../img/closeEyes.svg";

//libreria que cifra el token
// import aesjs from 'aes-js'

export default function App(props) {
  //login para ver contraseña
  const [type, setType] = useState(true);
  const [hidden, setHidden] = useState(true);

  //hook para obtener valores de los inputs de login
  const [inputsLogin, setInputsLogin] = useState({ email: "", pass: "" });
  //hook para obtener valores de los inputs de registro y acceso con google
  const [inputsRegister, setInputsRegister] = useState({
    email: "",
    photoURL: "",
    username: "",
    lastname: "",
    pass: "",
    rpass: ""
  });
  //hook para guardar el usuario y token al haberse registrado o logeado
  const [{ userState, message }, getMessage] = useState({
    userState: false,
    message: ""
  });
  //hook para cambiar efecto entre login o registro
  const [tipoAcceso, setTipoAcceso] = useState(false);
  //hook para efecto si se ha verificado o no la cuenta por correo
  const [cuentaVerificada, setCuentaVerificada] = useState(false);
  //hook para mostrar loading mientras se hace una petición
  const [{ loading }, setLoading] = useState({ loading: false });

  //funcion para ver la contraseña haber si funciona :v
  const toggleShow = () => {
    setType(!type);
    setHidden(!hidden);
  };
  //funcion que cambia el efecto entre login y registro
  const cambiarTipoAcceso = () => {
    getMessage({ message: "" });
    setTipoAcceso(!tipoAcceso);
  };

  //Funcion que se llama cada vez que cambian los value de los inputs del login
  const handleChangeInputsLogin = event => {
    getMessage({ message: "" });
    setInputsLogin({ ...inputsLogin, [event.target.name]: event.target.value });
  };

  //Funcion que se llama cada vez que cambian los value de los inputs del registro
  const handleChangeInputsRegister = event => {
    getMessage({ message: "" });
    setInputsRegister({
      ...inputsRegister,
      [event.target.name]: event.target.value
    });
  };

  //Funcion para validar y conectar a la API cuando se logea
  const handleToLogin = event => {
    event.preventDefault();
    const { email, pass } = inputsLogin;
    console.log(email)
    getMessage({ message: "" });
    setLoading({ loading: true });
    //llamamos a la función de firebase que crea al usuario por correo y contraseña
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async result => {
        if (result.user.emailVerified) {
          try {
            const { data } = await axios.post(`${props.apiUrl}/signin`, {
              fuente: "manual",
              email,
              pass
            });
            const { user, token } = data;
            // let tokenEncrypt = encriptarToken(token)
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            getMessage({
              userState: user,
              message: `Logeado como ${user.email}`
            });
            setLoading({ loading: false });
          } catch (err) {
            console.log(err);
            getMessage({
              userState: null,
              message:
                "Error de red, vuelva a intentarlo nuevamente o más tarde."
            });
            setLoading({ loading: false });
          }
        } else {
          firebase.auth().signOut();
          setLoading({ loading: false });
          return getMessage({
            message: "Debe verificar su cuenta en su correo para poder acceder"
          });
        }
      })
      .catch(e => {
        console.log(e);
        setLoading({ loading: false });
        if (e.code === "auth/wrong-password")
          getMessage({
            message:
              "La contraseña es invalida o el usuario aún no ha creado una contraseña"
          });
        if (e.code === "auth/user-not-found")
          getMessage({
            message:
              "No se ha podido identificar al usuario, verifique las credenciales e intentelo de nuevo."
          });
      });
  };

  //Funcion para registrar y conectar a la API
  const handleToRegister = async event => {
    event.preventDefault();
    const { email, photoURL, username, lastname, pass, rpass } = inputsRegister;
    if (pass !== rpass) {
      setInputsRegister({ pass: "", rpass: "" });
      return alert("las contraseñas no coinciden. Ingreselas nuevamente");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(result => {
        result.user.updateProfile({
          displayName: `${username} ${lastname}`
        });
        const configuracion = {
          url: "http://www.app.playtecedu.com"
        };
        result.user.sendEmailVerification(configuracion).catch(error => {
          console.log(error);
        });
        firebase.auth().signOut();
        console.log(email,pass, username, lastname)
        axios
          .post(`${props.apiUrl}/signup`, {
            email,
            pass,
            photoURL,
            user_name: username,
            user_lastName: lastname
          })
          .then(result => {
            getMessage({ message: "Cuenta creada correctamente." });
          })
          .catch(e => console.log(e));
        // setInputsRegister({ email: email})
        setTipoAcceso(false);
        setCuentaVerificada(true);
      })
      .catch(error => {
        console.log(error);
        getMessage({
          message: "El correo ya existe. Intente crear uno diferente."
        });
      });
    console.log(inputsRegister);
  };

  const signInWithGoogle = () => {
    getMessage({ message: "" });
    setLoading({ loading: true });
    //Aqui se establecen los proveedores para los servicios que se utilicen
    let provider = new firebase.auth.GoogleAuthProvider();
    //Inicializamos la autenticación de firebase pasandole un proveedor
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async result => {
        setLoading({ loading: false });
        let emailGoogle = result.user.email;
        let photoURL = result.user.photoURL;
        let displayName = result.user.displayName;
        let username = `${displayName.split(" ")[0]} ${
          displayName.split(" ")[1]
        }`;
        let lastname = `${displayName.split(" ")[2]} ${
          displayName.split(" ")[3]
        }`;
        //enviamos los datos a la API
        const { data } = await axios.post(`${props.apiUrl}/signin`, {
          fuente: "google",
          username,
          lastname,
          email: emailGoogle
        });
        if (data.message === "usuario no existe") {
          firebase
            .auth()
            .currentUser.delete()
            .then(function() {
              console.log(
                "como es la primera vez que se logea y  con Google, se borra por conflictos."
              );
            })
            .catch(function(error) {
              console.log("si algo pasa, el error es: " + error);
            });
          setTipoAcceso(true);
          //guardamos la photoURL, email y nombres para enviarla al registro
          setInputsRegister({
            email: emailGoogle,
            username,
            lastname,
            photoURL
          });
          return getMessage({
            message: "Por favor, registrese primero para acceder con Google."
          });
        }
        const { user, token } = data;
        // let tokenEncrypt = encriptarToken(token)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getMessage({
          userState: user,
          message: `Logeado como ${user.email}`
        });
        setLoading({ loading: false });
        console.log(result);
      })
      .catch(e => {
        setLoading({ loading: false });
        getMessage({
          message:
            "Error al acceder con Google, intentelo de nuevo o más tarde."
        });
        console.log(e);
      });
  };

  // const encriptarToken = (token) => {
  //   //128-bit key (16 bytes * 8 bits/byte = 128 bits)
  //   var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
  //   //convierte texto a bytes
  //   var textBytes = aesjs.utils.utf8.toBytes(token);
  //   //Inicia el modo de operación de encriptado. El contador es opcional, si lo omites empezará en 1
  //   var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  //   //encripta la cadena de bytes a bytes encriptados.
  //   var encryptedBytes = aesCtr.encrypt(textBytes);
  //   //para imprimir o almacenar los datos binarios, puedes convertirlos a un string hexadecimal
  //   return aesjs.utils.hex.fromBytes(encryptedBytes);
  // }

  return (
    <div className="loginTeacher">
      {userState ? <Redirect to={"/CoursesTeacher/" + userState._id} /> : null}
      <div className="loginTeacherHeader">
        <Link to="/">
          <div className="logoAcademy"></div>
        </Link>
      </div>
      <div
        className={
          tipoAcceso
            ? "loginTeacher-container log-in"
            : "loginTeacher-container"
        }
      >
        <div className="loginTeacher-box"></div>
        <div className="loginTeacher-container-forms">
          <div className="loginTeacher-container-info">
            <div className="loginTeacher-info-item">
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <p>¿Ya tienes una cuenta?</p>
                  <div className="loginTeacher-btn" onClick={cambiarTipoAcceso}>
                    Inicia Sesión
                  </div>
                </div>
              </div>
            </div>
            <div className="loginTeacher-info-item">
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <p>
                    {cuentaVerificada
                      ? "Verifique su cuenta a través del enlace enviado a su correo"
                      : "¿Aún no tienes una cuenta?"}
                  </p>
                  {cuentaVerificada ? null : (
                    <div
                      className="loginTeacher-btn"
                      onClick={cambiarTipoAcceso}
                    >
                      Regístrate
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="loginTeacher-container-form">
            <form
              className="loginTeacher-form-item log-in"
              onSubmit={handleToLogin}
            >
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <h2 className="loginTeacher-subtitle">Iniciar Sesión</h2>
                  <input
                    name="email"
                    placeholder="Correo"
                    type="text"
                    onChange={handleChangeInputsLogin}
                    required
                    autoComplete="true"
                  />
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="pass"
                      placeholder="Contraseña"
                      type={hidden ? "password" : "text"}
                      onChange={handleChangeInputsLogin}
                      required
                      autoComplete="true"
                    />
                    <div onClick={toggleShow} className="input-group-addon">
                      {type ? (
                        <img src={openEye} alt="imgen"></img>
                      ) : (
                        <img src={closeEye} alt="imgen"></img>
                      )}
                    </div>
                  </div>
                  <input
                    className="loginTeacher-btn"
                    type="submit"
                    value="Inicia Sesión"
                  />
                  <div style={{ width: "210px", margin: "10px auto" }}>
                    <div className="linea">&nbsp;</div>
                    <div className="leyenda">
                      &nbsp;&nbsp;o accede con Google&nbsp;&nbsp;
                    </div>
                    <div className="linea">&nbsp;</div>
                  </div>
                  <a
                    className="loginTeacher-button-google"
                    onClick={signInWithGoogle}
                    href="#!"
                  >
                    <img
                      className="loginTeacher-google-icon"
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      alt=""
                    />
                    Iniciar Sesión con Google
                  </a>
                  <br />
                  <div
                    style={{
                      width: "210px",
                      margin: "10px auto",
                      padding: "8px 0"
                    }}
                  >
                    <Link to="/" className="resetPassword">
                      ¿Has olvidado la contraseña?
                    </Link>
                  </div>
                  <a
                    className="loginTeacher-login-register"
                    onClick={cambiarTipoAcceso}
                    href="#!"
                  >
                    registrese ahora
                  </a>
                </div>
              </div>
            </form>
            <form
              className="loginTeacher-form-item sign-up"
              onSubmit={handleToRegister}
            >
              <div className="loginTeacher-table">
                <div className="loginTeacher-table-cell">
                  <h2 className="loginTeacher-subtitle">Registrarse</h2>
                  <input
                    name="email"
                    placeholder="Correo"
                    type="email"
                    onChange={handleChangeInputsRegister}
                    value={inputsRegister.email}
                    required
                  />
                  <input
                    name="username"
                    placeholder="Nombres"
                    type="text"
                    onChange={handleChangeInputsRegister}
                    value={inputsRegister.username}
                    required
                  />
                  <input
                    name="lastname"
                    placeholder="Apellidos"
                    type="text"
                    onChange={handleChangeInputsRegister}
                    value={inputsRegister.lastname}
                    required
                  />
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="pass"
                      placeholder="Contraseña"
                      type={hidden ? "password" : "text"}
                      value={inputsRegister.pass}
                      onChange={handleChangeInputsRegister}
                      minLength="6"
                      required
                      autoComplete="false"
                    />
                    <div onClick={toggleShow} className="input-group-addon">
                      {type ? (
                        <img src={openEye} alt="imgen"></img>
                      ) : (
                        <img src={closeEye} alt="imgen"></img>
                      )}
                    </div>
                  </div>

                  <input
                    name="rpass"
                    placeholder="Repita su contraseña"
                    type={hidden ? "password" : "text"}
                    value={inputsRegister.rpass}
                    onChange={handleChangeInputsRegister}
                    minLength="6"
                    required
                    autoComplete="false"
                  />
                  <input
                    className="loginTeacher-btn"
                    type="submit"
                    value="Regístrate"
                  />
                  <a
                    className="loginTeacher-login-register"
                    onClick={cambiarTipoAcceso}
                    href="#!"
                  >
                    Iniciar sesión
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="login-loading">
          <Loading status={loading} />
        </div>
        {message === "" ? null : (
          <h5
            className={
              message === "Cuenta creada correctamente."
                ? "loginTeacher-message-succefull"
                : "loginTeacher-message"
            }
          >
            {message}
          </h5>
        )}
      </div>
    </div>
  );
}
