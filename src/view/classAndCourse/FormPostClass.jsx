import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
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
    var varToken = localStorage.getItem('token');
    event.preventDefault();
    const data = {
      class_name: this.state.class_name,
      desc: this.state.desc
    };

    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/class`,data,
      method: 'post',
      headers: {
        'x-access-token': `${varToken}`
      }
    })
      .post(
        `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/class`,
        data
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.props.handleClose()
  };
  render() {
    const { class_name, desc } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre de la Clase</Form.Label>
            <Form.Control
              type="text"
              name="class_name"
              onChange={this.handleChange}
              value={class_name}
              placeholder="Ingresar nombre de la clase"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descipcion de la Clase</Form.Label>
            <Form.Control
              name="desc"
              onChange={this.handleChange}
              value={desc}
              as="textarea"
              rows="2"
            />
          </Form.Group>
          <Button type="submit"  >Crear Clase</Button>
        </Form>
      </>
    );
  }
}
