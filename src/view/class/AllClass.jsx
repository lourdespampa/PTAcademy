import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import axios from "axios";
// import iconEdit from "../courses/assets/edit.svg";
import "../courses/cardCourses.sass";
export default class AllClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_access: "",
      redirect: false
    };
  }
  //funcion GenerarCodigo
  obtenerCodigo = () => {
    var varToken = localStorage.getItem("token");
    let id_access = "";
    let possible = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
      id_access += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({
      id_access: id_access
    });
    const data = {
      id_access: id_access,
      id_class: this.props.id
    };

    axios({
      url: this.props.apiUrl + "/v1/api/access/",
      data,
      method: "post",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({
      redirect: true
    });
  };
  //end
  //Redirigir a clase Activa
  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect to={`/teacher/${this.props.id}/${this.state.id_access}` } />
      );
    }
  };
  //end
  render() {
    return (
      <div className="classTeacher-container">
        <div className="classTeacher-card">
          <div className="classTeacher-card__image-container">
            <button
              onClick={() =>
                this.props.onClick(this.props.id) +
                this.props.setShow("show", 1)
              }
              className="courseTeacher__button-delette"
            >
              <i className="courseTeacher__img fas fa-trash"></i>
            </button>
            <div className={"courseTeacher__containerButton-Edit"}>
                <Link to={`/ClassDetailTeacher/${this.props.id}`} className="courseTeacher__button-Edit">
                    <i className="algodemargin courseTeacher__img fas fa-edit"></i>
                </Link>
            </div>
            <img
              className="classTeacher-card__image"
              src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80"
              alt=""
            />
          </div>
          <svg className="classTeacher-card__svg" viewBox="0 0 800 500">
            <path
              d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
              stroke="transparent"
              fill="#333"
            />
            <path
              className="classTeacher-card__line"
              d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
              stroke="pink"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>
          <div className="classTeacher-card__content">
            <h1 className="classTeacher-card__title">
              {this.props.name_class}
            </h1>
            <p className="courseTeacher-card-intro">{this.props.desc}</p>
          </div>
          {this.renderRedirect()}
          <div
            className="courseTeacher__buttonEntry"
            onClick={this.obtenerCodigo}
          >
            <label className="courseTeacher__buttonEntry-label">
              ACTIVAR CLASE
            </label>
          </div>
        </div>
      </div>
    );
  }
}
