import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Empatia from "../../components/teacher/header/Empatia";
import HeaderCode from "../../components/teacher/header/HeaderCode";
import axios from "axios";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre_clase: ""
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.getName();
    }, 1000);
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    socket.on("tabBlurred", (data) => {
      console.log(data.pin,this.props.id_access)
      if (data.pin === this.props.id_access.toUpperCase()) {
        this.notify(data.fullname);
      }else{
        console.log('error codigo pin')
      }
    });
  }
  notify = (nom) => {
    toast.warn(<><p role = "img" aria-label = "warning">⚠ Alumno desatento!</p><p>{nom}</p></>,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  getName = async () => {
    console.log("hola que hace" + this.props.id_class);
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
    console.log("redirect " + e);
  };
  ExitSocket = () => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });
    socket.emit("ExitSocket");
    console.log("ExitSocket");
  };

  render() {
    return (
      <>
      
        <HeaderCode
          cerrarSesion={this.props.cerrarSesion}
          socketUrl={this.props.socketUrl}
          ExitSocket={this.ExitSocket}
          redirect={this.redirect}
          id_access={this.props.id_access}
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
