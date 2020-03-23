import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idteacher: "",
      valueType: "1"
    };
  }
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      valueType: e.target.value
    });
  };
  setGender(event) {
    console.log(event.target.value);
  }
  componentDidMount() {}
  render() {
    return (
      <>
        <NavCourse
          idteacher={localStorage.getItem("id_teacher")}
          agregarX={"formulario"}
        ></NavCourse>
        parte de los formularios
        <div className="ClassTeacher-main">
          <h1 className="courseTeacher-title--class">SECCION DE FORMULARIOS</h1>
          <br></br>
          <button>AGREGAR FORMULARIOS</button>
          <form >
            <select value={this.state.valueType} onChange={this.handleChange}>
              <option value="1">Para marcar</option>
              <option value="2">True and false</option>
              <option value="3">responder preguntar</option>
              <option value="4">Rellenar</option>
            </select>
            {this.state.valueType === "1" ? (
              <div>
                <label>pregunta</label>
                <input type="text"></input>
              </div>
            ) : this.state.valueType === "2" ? (
              <div>
                <div onChange={this.setGender.bind(this)}>
                  <input type="radio" value="true" name="gender" id="true" /> 
                  <label htmlFor="true">verdadero</label>
                  <input type="radio" id="false" value="false" name="gender" /> 
                  <label htmlFor="false">falso</label>
                </div>
              </div>
            ) : this.state.valueType === "3" ? (
              <div>pregunta para responder</div>
            ) : (
              <div>pregunta para rellenar</div>
            )}
          </form>

          <div>
            <div>{/* opcion numero 1  */}</div>
          </div>
        </div>
      </>
    );
  }
}
