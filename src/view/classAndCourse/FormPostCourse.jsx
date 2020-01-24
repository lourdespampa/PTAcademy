import React, { Component } from "react";
//librerias externas
import axios from "axios";
//estilos
import { Form, Button } from "react-bootstrap";
import './FormPostCourse.sass'
//componente clase
export default class FormPostCourse extends Component {
  //1. inializa las propiedades recibidas del componente padre
  constructor(props) {
    super(props);
    //2. el estado con sus variables iniciales
    this.state = {
      level: "",
      grade: "",
      section: "",
      course_name: "",
      description: "",
      profesorParticular: false,
      nivelPrimaria: true,
      grados: ["1er grado","2do grado","3er grado","4to grado","5to grado","6to grado"],
      secciones: ["A","B","C","D","única"],
      nombresCursos: ["Matemática","Comunicación","Inglés", "Arte"]
    };
  }
  //Métodos del componente clase, esta es la lógica
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(event.target.value === "primaria") this.setState({nivelPrimaria: true, profesorParticular: false, level: "primaria"})
    if( event.target.value === "secundaria") this.setState({nivelPrimaria: false, profesorParticular: false, level: "secundaria"})
    if(event.target.value === "") this.setState({profesorParticular: true, level: ""})

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
    const { course_name, description } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="modal-title__controlname">Detalles del curso</Form.Label>
            <div className="CT-contenedorNivel">
              <input className="CT-opcionNivel" type="radio" name="level" value="primaria" id="option-one" onChange={this.handleChange} required/> 
                <label className="CT-labelNivel" htmlFor="option-one">Primaria</label>
              <input className="CT-opcionNivel" type="radio" name="level" value="secundaria" id="option-two" onChange={this.handleChange} /> 
                <label className="CT-labelNivel" htmlFor="option-two">Secundaria</label>
              <input className="CT-opcionNivel" type="radio" name="level" value="" id="option-three" onChange={this.handleChange} />
                <label className="CT-labelNivel" htmlFor="option-three">Ninguno</label>
            </div>
            {
              this.state.profesorParticular
              ?
              null
              :
              <div className="CT-detallesCurso">
                <label className="listDetalleTitle">Grado: </label>
                <select name="grade" className="list-grade">
                  {
                  this.state.nivelPrimaria
                  ?
                  this.state.grados.map( (grado, id) => (
                    <option key={id} value={grado}>{grado}</option>
                  ))
                  :
                  this.state.grados.slice(0,5).map( (grado, id) => (
                    <option key={id} value={grado}>{grado}</option>
                  ))
                  }
                </select>
                <label className="listDetalleTitle">Sección: </label>
                <select name="seccion" className="list-seccion">
                  {
                  this.state.secciones.map( (seccion, id) => (
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
                <select name="course_name" className="list-course">
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
              name="description"
              onChange={this.handleChange}
              value={description}
              as="textarea"
              rows="2"
              required
            />
          </Form.Group>
          <Button className="modal-body__button-cursos" type="submit"  >
            <div className="button-cursos__text">CREAR CURSO</div>
          </Button>
        </Form>
      </>
    );
  }
}
