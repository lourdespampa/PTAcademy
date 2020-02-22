import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavClass from "./NavClass";
import './ClassDetail.sass'
export default class ClassDetailTeacher extends Component {
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
                      <div className="Item-card__text"></div>
                    </div>
                </div>
            </li>
            <li className="Item-cards__item">
                <div className="Item-card">
                    <div className="Item-card__content">
                      <div className="Item-card__title">
                          Formularios
                      </div><br/>
                      <div className="Item-card__text"></div>
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
