import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import cursoImg from '../../img/courses/cursos.jpg'
import axios from "axios";
export default class AllClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_access: "",
      redirect: false
    };
  }
  obtenerCodigo = () => {
    let id_access = "";
    let possible = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
      id_access += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({
      id_access : id_access
    })
    const data = {
      id_access: id_access,
      id_class: this.props.id
    };

    console.log(this.props.id)
    console.log(data.id_access)
    console.log(this.state.id_access)

    axios
      .post("http://3.16.110.136:4200/v1/api/access/", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.setState({
        redirect: true
      })
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      console.log(this.state.id_access)
      return <Redirect  to={`/teacher/${this.props.id}/${this.state.id_access}`}/>
    }
  }
  render() {
    return (
      <>
        <div className="card_playtec">
          <div className="card_image">
            <img src={cursoImg} alt="some value" />
          </div>
          <div className="card_content">
            <h2 className="card_title">{this.props.name_class}</h2>
            <p className="card_text">{this.props.desc}</p>
            {/* <Link to="/ClassTeacher" className="btn card_btn">
              Entrar a detalle de la clase
            </Link> */}
            <div >
            </div>
            {this.renderRedirect()}
            <button className="btn card_btn" onClick={this.obtenerCodigo}>
              ACTIVAR CLASE
            </button>
          </div>
        </div>
      </>
    );
  }
}
