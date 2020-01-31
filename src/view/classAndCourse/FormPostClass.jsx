import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Upload from "./upload/Upload";
//import spinner from "../../components/teacher/footer/spinner";
export default class FormPostCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class_name: "",
      desc: ""
    };
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };
  render() {
    const { class_name, desc } = this.state;
    return (
      <>
          <Form.Group>
            <Form.Label className="modal-title__controlname">Nombre de la Clase</Form.Label>
            <Form.Control className="modal-teacher__general-controlname"
              type="text"
              name="class_name"
              onChange={this.handleChange}
              value={class_name}
              placeholder="Ingresar nombre de la clase"
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="modal-title__controlname">Descripcion de la Clase</Form.Label>
            <Form.Control className="modal-teacher__general-controldescription"
              name="desc"
              onChange={this.handleChange}
              value={desc}
              as="textarea"
              rows="2"
              required
            />
            <Upload handleClose={this.props.handleClose} handleEnableX={this.props.handleEnableX} handleDisableX={this.props.handleDisableX} idteacher={this.props.idteacher}  idcourse={this.props.idcourse} class_name={this.state.class_name} desc={this.state.desc} apiUrl={this.props.apiUrl}   ></Upload>
          </Form.Group>
      </>
    );
  }
}
