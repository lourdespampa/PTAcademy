import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavClass from "./NavClass";
import Upload from "../../classAndCourse/upload/Upload"
import './ClassDetail.sass'
export default class ClassDetailTeacher extends Component {
  state={
    id_class:''
  }
  componentDidMount(){
    const {
      match: { params }
    } = this.props;
    this.setState({ id_class: params.id});
    console.log(params.id)
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
                        <Upload EditDiapo={true} id_class={this.state.id_class} fileActual={[{name: "ux.pptx",
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
