import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Empatia from "../../components/teacher/header/Empatia";
import HeaderCode from "../../components/teacher/header/HeaderCode";
import axios from "axios";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class Header extends React.Component {
  /**
   * Fix notificatión
   *  :: valor inicial de PIN al cargar component
   * */

  pin = "";
  /******************* */
  constructor(props) {
    super(props);

    this.state = {
      nombre_clase: "",
      token: false
    };
  }
  componentDidMount() {
    // Destructurando
    const { id_access, socketUrl } = this.props;

    /** Fix notificatión */
    this.pin = id_access;
    console.log("valor de pin cuando inicia componente: " + this.pin);
    /** **************** */

    setTimeout(() => {
      this.getName();
    }, 1000);

    const message = (status, pinTeacher, pinStudent) => {
      return {
        status: status,
        "pin (teacher): ": pinTeacher,
        "data.pin (Student): ": pinStudent
      };
    };

    const socket = io(socketUrl, {
      query: { pin: this.pin }
    });

    socket.on("tabBlurred", data => {
      const pinStudent = data.pin;
      const pinTeacher = this.pin.toUpperCase();

      if (pinStudent === pinTeacher) {
        return (
          this.notify(data.fullname),
          console.table(message("Códigos validados", pinTeacher, pinStudent))
        );
      }

      console.table(message("Códigos Incorrectos", pinTeacher, pinStudent));
    });
  }
  /** Fix notificatión */
  componentWillUnmount() {
    // valor despues de salir del component
    this.pin = "";

    console.log("componente desmontado");
  }
  /****************** */

  notify = nom => {
    toast.warn(
      <>
        <p role="img" aria-label="warning">
          ⚠ Alumno desatento!
        </p>
        <p>{nom}</p>
      </>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  getName = async () => {
    var varToken = localStorage.getItem("token");
    const res = await axios({
      url: `${this.props.apiUrl}/v1/api/teacher/detail_class/${this.props.id_class}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    console.log(res.data);
    this.setState({
      nombre_clase: await res.data.class_name
    });
  };
  redirect = e => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    socket.emit("redirectAlum", { page: e });
    console.log("se manda al alumnos redirigir a", e);
  };
  ExitSocket = () => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    var varToken = localStorage.getItem("token");
    const res = axios({
      url: `${this.props.apiUrl}/v1/api/teacher/change_state_all_students/${this.props.id_class}`,
      method: "get",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    console.log(res.data);
    socket.emit("ExitSocket");
  };
  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token");
    await this.setState({ token: tokenStorage });
  };

  cerrarSesion = () => {
    localStorage.clear();
    this.setState({ token: false });
    this.ExitSocket();
    
  };
  render() {
    return (
      <>
        {this.state.token ? null : <Redirect to="/"></Redirect>}
        <HeaderCode
          cerrarSesion={this.cerrarSesion}
          socketUrl={this.props.socketUrl}
          ExitSocket={this.ExitSocket}
          redirect={this.redirect}
          id_access={this.props.id_access}
          id_class={this.props.id_class}
          nombre_clase={this.state.nombre_clase}
        />
        <Empatia
          socketUrl={this.props.socketUrl}
          redirect={this.redirect}
          id_access={this.props.id_access}
          id_class={this.props.id_class}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default Header;
