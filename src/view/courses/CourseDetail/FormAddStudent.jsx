import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
export default class FormAddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name_stu: "",
      lastName_stu: "",
      id_course: "",
      id_teacher: ""
    };
  }


  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    console.log(value)

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    console.log(this.props.apiUrl);
    var varToken = localStorage.getItem("token");
    event.preventDefault();
    const data = {
      name_stu: this.state.name_stu,
      lastName_stu: this.state.lastName_stu,
      id_teach: this.props.idteacher,
      id_course: this.props.idcourse
    };

    axios({
      url: `${this.props.apiUrl}/v1/api/student`,
      data,
      method: "post",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => console.log(res) + this.props.handleClose() + this.props.getdata())
      .catch(err => console.log(err));
  };
  render() {
    const { name_stu, lastName_stu } = this.state;
    return (
      <>
        {/* <Form onSubmit={this.handleSubmit}>
          <Form.Label className="modal-title__controlname">
            Nombres del alumno
          </Form.Label>
          <Form.Control
            className="modal-teacher__general-controlname"
            type="text"
            name="name_stu"
            onChange={this.handleChange}
            value={name_stu}
            placeholder="Ingresar nombres completos de los estudiantes"
            required
          />
          <Form.Label className="modal-title__controlname">
            Apellidos del alumno
          </Form.Label>
          <Form.Control
            className="modal-teacher__general-controlname"
            type="text"
            name="lastName_stu"
            onChange={this.handleChange}
            value={lastName_stu}
            placeholder="Ingresar apellidos completos de los estudiantes"
            required
          />
          <Button className="modal-body__button cursos" type="submit">
            <div className="button-zoom">Agregar Alumno</div>
          </Button> 
          </Form> */}
          <form action="#">

            <table class="u-fixTable">
              <thead>
                <tr class="EstructuraLink-inputs">
                <td>Nombres: <br/>
                  <input name="nombrelinkEspaniol[]" type="text" class="required-name" autofocus />
                </td>
                <td>Apellidos: <br/>
                  <input name="nombrelinkEspaniol[]" type="text" class="required-lastname" autofocus />
                </td>
                </tr>
              </thead>
              <tbody id="linksEspa">

              </tbody>
            </table>
            <div>
              <button class="AgregarLinks" rel="linksEspa">
                <span class="glyphicon glyphicon-plus"></span>Agregar Alumnos
					    </button>
              <input type="submit" value="Guardar" />
            </div>
          </form>

      </>
    );
  }
}
