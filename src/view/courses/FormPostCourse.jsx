import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
export default class FormPostCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_name: "",
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
    event.preventDefault();
    const data = {
      course_name: this.state.course_name,
      desc: this.state.desc
    };

    axios
      .post(
        "http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course",
        data
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.props.handleClose()
  };
  render() {
    const { course_name, desc } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre del curso</Form.Label>
            <Form.Control
              type="text"
              name="course_name"
              onChange={this.handleChange}
              value={course_name}
              placeholder="Ingresar nombre del curso"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descipcion del curso</Form.Label>
            <Form.Control
              name="desc"
              onChange={this.handleChange}
              value={desc}
              as="textarea"
              rows="2"
            />
          </Form.Group>
          <Button type="submit"  >Crear curso</Button>
        </Form>
      </>
    );
  }
}
