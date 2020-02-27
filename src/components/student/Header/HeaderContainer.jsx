import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./HeaderContainer.css";
import SocketStream from "../socket/socketStream";
import axios from "axios";
import io from "socket.io-client";

const WindowFocusHandler = props => {
  // User has switched back to the tab
  const onFocus = () => {
    // console.log("Tab is in focus");
  };
  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    let pin = props.id_access;
    const socket = io(props.socketUrl, {
      query: {
        pin: pin
      }
    });
    socket.emit("tabBlurred", { fullname: props.fullname });

    // console.log(props.fullname);
    // console.log("Tab is blurred");
  };
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });
  return <></>;
};
export default function HeaderContainer(props) {
  const [showResponsive, setShowResponsive] = useState(false);
  // const [redirect,setredirect]=useState(false); //no se esta usando
  const [trivia, settrivia] = useState(false);
  const [temporizador, settemporizador] = useState(false);
  const [Exit, setExit] = useState(false);
  // const reinicio = () => settrivia(false) + settemporizador(false);

  const deleteStudent = async () => {
    // console.log(props.apiUrl, props.id_access, props.id_student);
    const data3 = {
      state: "inactive",
      id_stud: props.id_student
    };
    await axios({
      url: `${props.apiUrl}/v1/api/student/change_state`,
      data: data3,
      method: "post"
    })
      .then(async res2 => {
        await localStorage.clear();
        console.log(res2);
        const socket = io(props.socketUrl, {
          query: { pin: props.id_access }
        });
        await socket.emit("newAlum");
        await setExit(true);
      })
      .catch(err2 => console.log(err2));
  };
  useEffect(() => {
    const socket = io(props.socketUrl, {
      query: { pin: props.id_access }
    });

    if (localStorage.getItem("token")) {
      // console.log("si tiene");
    } else {
      // console.log("no tiene");
      setExit(true);
    }
    socket.on("redirectAlum", data => {
      // console.log("llega redirectAlum");
      if (data.pin === props.id_access.toUpperCase()) {
        if (data.page === "trivia") {
          settrivia(true);
          settemporizador(false);
        } else if (data.page === "temporizador") {
          settemporizador(true);
          settrivia(false);
        }
      }
    });
    socket.on("ExitSocket", data => {
      if (data.pin === props.id_access.toUpperCase()) {
        localStorage.clear();
        setExit(true);
      }
    });
    //liSTA
    socket.on("RemoveStudS", data => {
      // console.log(data);
      if (data.pin === props.id_access.toUpperCase()) {
        // console.log("REcibe salida");
        if (data.id === props.id_student) {
          // console.log("REcibe  salida fase 2");
          localStorage.clear();
          setExit(true);
        }
      }
    });
    //END LISTA
  });
  const handleNavbarResponsive = () => {
    setShowResponsive(!showResponsive);
  };
  return (
    <div>
      <WindowFocusHandler
        id_access={props.id_access}
        fullname={props.name + " " + props.lastName}
        id_student={props.id_student}
        socketUrl={props.socketUrl}
      ></WindowFocusHandler>
      {trivia ? (
        <Redirect
          to={`/student/${props.id_student}/${props.id_access}/trivia`}
        />
      ) : null}
      {temporizador ? (
        <Redirect
          to={`/student/${props.id_student}/${props.id_access}/temporizador`}
        />
      ) : null}
      {Exit ? <Redirect to={`/`} /> : null}
      <header className="alumnoH-header ">
        <div className="alumnoHeader-logo">
          <Link
            onClick={handleNavbarResponsive}
            to={`/student/${props.id_student}/${props.id_access}`}
            style={{ textDecoration: "none" }}
          >
            <h1 className="alumnoHeader-image">PlayTec Academy</h1>
          </Link>
        </div>
        <i
          className="fas fa-bars alumnoHeader-menu-toggle"
          onClick={handleNavbarResponsive}
        ></i>
        <ul
          className={
            showResponsive
              ? "alumnoHeader-nav showResponsive"
              : "alumnoHeader-nav"
          }
        >
          <li className="alumnoHeader-li">
            <Link
              onClick={handleNavbarResponsive}
              className="alumnoHeader-a"
              to={`/student/${props.id_student}/${props.id_access}/trivia`}
            >
              <i className="fa fa-list-ol"></i>
              Trivia
            </Link>
          </li>
          <li className="alumnoHeader-li">
            <Link
              onClick={handleNavbarResponsive}
              className="alumnoHeader-a"
              to={`/student/${props.id_student}/${props.id_access}/temporizador`}
            >
              <i
                className="fas fa-hourglass"
                style={{ fontSize: "22px", padding: "0 10px" }}
              ></i>
              Temporizador
            </Link>
          </li>
          {/* <li className="alumnoHeader-"><a className="alumnoHeader-"></a></li> */}
          <li className="alumnoHeader-li">
            <a href className="alumnoHeader-a">
              <i className="fa fa-user"></i>
              {props.name} {props.lastName}
              <i className="fa fa-chevron-down"></i>
            </a>
            <ul
              className={
                showResponsive
                  ? "alumnoHeader-nav showResponsive"
                  : "alumnoHeader-nav"
              }
              style={{ zIndex: "5000" }}
            >
              <li className="alumnoHeader-li" onClick={() => deleteStudent()}>
                <a href className="alumnoHeader-a alumnoHeader-salir">
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ fontSize: "22px", padding: "0 10px" }}
                  ></i>
                  Salir
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <div className="alumnoH-header-base"></div>
      <SocketStream
        apiUrl={props.apiUrl}
        id_access={props.id_access}
        id_student={props.id_student}
        socketUrl={props.socketUrl}
      />
    </div>
  );
}
