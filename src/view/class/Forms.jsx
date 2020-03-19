import React, { Component } from "react";
import NavCourse from "../classAndCourse/NavCourse";
export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idteacher: ""
    };
  }
  componentDidMount() {
      
  }
  render() {
    return (
      <>
        <NavCourse
          idteacher={localStorage.getItem("id_teacher")}
          agregarX={"formulario"}
        ></NavCourse>
      </>
    );
  }
}
