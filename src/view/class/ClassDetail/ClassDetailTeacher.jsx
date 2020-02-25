import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavClass from "./NavClass";
import Upload from "../../classAndCourse/upload/Upload"
import './ClassDetail.sass'
export default class ClassDetailTeacher extends Component {
  state={
    id_class:'',
    fileActual:''
  }
  componentDidMount(){
    var varToken = localStorage.getItem("token");
    const {
      match: { params }
    } = this.props;
    this.setState({ id_class: params.id});
    console.log(params.id)
    axios({
      url: `http://192.168.1.66:4200/v1/api/teacher/presentation_detail/${params.id}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    }).then(({ data }) => {
      console.log(data.name)
      this.setState({
        fileActual: data.name
      });
    });
  }
  render() {
    return (
      <>
        <NavClass apiUrl={this.props.apiUrl}></NavClass>
        <div className="contenedor-Items">
          <ul className="Item-cards">
            <li className="Item-cards__item">
                <div className="Item-card">
                    <div className="Item-card__content">
                      <div className="Item-card__title">
                          Diapositivas
                      </div><br/>
                      <div className="Item-card__text">
                        <Upload EditDiapo={true} id_class={this.state.id_class} fileActual={[{name: this.state.fileActual,
      lastModified: 1568327872965,
      webkitRelativePath: "",
      size: 3195833,
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"}]}/>
                      </div>
                    </div>
                </div>
            </li>
            <li className="Item-cards__item">
                <div className="Item-card">
                    <div className="Item-card__content">
                      <div className="Item-card__title">
                          Formularios
                      </div><br/>
                      <div className="Item-card__text">

                      </div>
                    </div>
                </div>
            </li>
            <li className="Item-cards__item">
                <div className="Item-card">
                    <div className="Item-card__content">
                      <div className="Item-card__title">
                          Trivia
                      </div><br/>
                      <div className="Item-card__text"></div>
                    </div>
                </div>
            </li>
        </ul>
        </div>
      </>
    );
  }
}
