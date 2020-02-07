import React, { Component } from "react";
import robot from "./images/playtecrobot.gif";

export default class loginSchool extends Component {
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <form>
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
                />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Ingresar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
