import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Upload from "./upload/Upload";
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

  handleSubmit = event => {
    console.log(this.props)
    var varToken = localStorage.getItem('token');
    event.preventDefault();
    const data = {
      class_name: this.state.class_name,
      desc: this.state.desc
    };

    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/class`,
      data,
      method: 'post',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then(res => console.log(res)+this.props.handleClose())
      .catch(err => console.log(err));
  };
  render() {
    const { class_name, desc } = this.state;
    return (
      <>
        {/* <Form onSubmit={this.handleSubmit}> */}
        < >
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
            <Form.Label className="modal-title__controldescription">Descipcion de la Clase</Form.Label>
            <Form.Control className="modal-teacher__general-controldescription"
              name="desc"
              onChange={this.handleChange}
              value={desc}
              as="textarea"
              rows="2"
              required
            />
            <Upload handleClose={this.props.handleClose} idteacher={this.props.idteacher}  idcourse={this.props.idcourse} class_name={this.state.class_name} desc={this.state.desc}    ></Upload>
          </Form.Group>
          {/* <Button id="modal-body__button-cursos" className="btn" type="submit"  >CREAR CLASE</Button> */}
        </>
      </>
    );
  }
}
