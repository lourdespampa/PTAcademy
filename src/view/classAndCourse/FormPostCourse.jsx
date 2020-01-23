import React, { Component } from "react";
//librerias externas
import axios from "axios";
//estilos
import { Form, Button } from "react-bootstrap";

//componente clase
export default class FormPostCourse extends Component {
  //1. inializa las propiedades recibidas del componente padre
  constructor(props) {
    super(props);
    //2. el estado con sus variables iniciales
    this.state = {
      course_name: "",
      desc: "",
      profesorParticular: false,
      nivelPrimaria: true,
      niveles: "",
      grado: ["1er grado","2do grado","3er grado","4to grado","5to grado","6to grado"],
      seccion: ["A","B","C","D","única"],
      nombresCursos: ["Matemáticas","Comunicación","Inglés", "Arte"]
    };
  }
  //Métodos del componente clase, esta es la lógica
  handleSelectedTeacher = (event) => {
    if(event.target.value === "primaria") this.setState({nivelPrimaria: true, profesorParticular: false})
    if( event.target.value === "secundaria") this.setState({nivelPrimaria: false, profesorParticular: false})
    if(event.target.value === "ninguno") this.setState({profesorParticular: true})
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
    //obtengo el token del localStorage
    var varToken = localStorage.getItem('token');
    //evita recargas innecesarias
    event.preventDefault();
    
    //genero un objeto llamado data con el estado
    const data = this.state
    //esta es la peticion al servidor, un post
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course`,
      data,
      method: 'post',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then((res) => this.props.handleClose())
      .catch(err => console.log(err));
      
  };

  //Esta es la vista, interfaz
  render() {
    const { course_name, desc } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="modal-title__controlname">Detalles del curso</Form.Label>
            <div>
              <input type="radio" name="nivel" value="primaria" onChange={this.handleSelectedTeacher} /> Primaria
              <input type="radio" name="nivel" value="secundaria" onChange={this.handleSelectedTeacher} /> Secundaria
              <input type="radio" name="nivel" value="ninguno" onChange={this.handleSelectedTeacher} /> Ninguno
            </div>
            {
              this.state.profesorParticular
              ?
              null
              :
              <div>
                <select name="grado">
                  {
                  this.state.nivelPrimaria
                  ?
                  this.state.grado.map( (grado, id) => (
                    <option key={id} value={grado}>{grado}</option>
                  ))
                  :
                  this.state.grado.slice(0,5).map( (grado, id) => (
                    <option key={id} value={grado}>{grado}</option>
                  ))
                  }
                </select>
                <select name="seccion">
                  {
                  this.state.seccion.map( (seccion, id) => (
                    <option key={id} value={seccion}>{seccion}</option>
                  ))
                  }
                </select>
              </div>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label className="modal-title__controlname">Nombre del curso</Form.Label>
            {
              this.state.profesorParticular 
              ?
              <Form.Control className="modal-teacher__general-controlname"
                type="text"
                name="course_name"
                onChange={this.handleChange}
                value={course_name}
                placeholder="Ingresar nombre del curso"
                required
              />
              : 
              <div>
                <select name="cursos">
                {
                this.state.nombresCursos.map( (curso, id) => (
                  <option key={id} value={curso}>{curso}</option>
                ))
                }
                </select>
              </div>
            }
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="modal-title__controldescription">Descripcion del curso</Form.Label>
            <Form.Control className="modal-teacher__general-controldescription"
              name="desc"
              onChange={this.handleChange}
              value={desc}
              as="textarea"
              rows="2"
              required
            />
          </Form.Group>
          <Button id="modal-body__button-cursos" type="submit"  >CREAR CURSO</Button>
        </Form>
      </>
    );
  }
}
