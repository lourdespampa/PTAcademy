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
      level: "primaria",
      grade: "primero",
      section: "A",
      course_name: "Arte y cultura",
      description: "???",
      profesorParticular: false,
      nivelPrimaria: true,
      grados: [{name:"1er grado", value: "primero"},
               {name:"2do grado", value: "segundo"},
               {name:"3er grado", value: "tercero"},
               {name:"4to grado", value: "cuarto"},
               {name:"5to grado", value: "quinto"},
               {name:"6to grado", value: "sexto"}],
      secciones: ["A","B","C","D","E","F","G","H","I","J","única"],
      nombresCursosPrimaria: ["Arte y cultura",
                              "Castellano como segunda lengua", 
                              "Ciencia y tecnología", 
                              "Comunicación",
                              "Educación física",
                              "Educación religiosa",
                              "Inglés", 
                              "Matemática",
                              "Personal social"
                              ],
      nombresCursosSecundaria: ["Arte y cultura",
                                "Castellano como segunda lengua",
                                "Ciencia y tecnología",
                                "Ciencias Sociales",
                                "Comunicación",
                                "Desarrollo personal, ciudadana y cívica",
                                "Educación física",
                                "Educación para el trabajo",
                                "Inglés",
                                "Matemática"
                              ]
    };
  }
  //Métodos del componente clase, esta es la lógica
  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(event.target.name, event.target.value)

    if(event.target.value === "primaria") this.setState({nivelPrimaria: true, profesorParticular: false})
    if( event.target.value === "secundaria") this.setState({nivelPrimaria: false, profesorParticular: false})
    if(event.target.value === "") this.setState({profesorParticular: true})

    await this.setState({
      [name]: value
    });

    console.log(this.state)

  };

  handleSubmit = event => {
    //obtengo el token del localStorage
    var varToken = localStorage.getItem('token');
    //evita recargas innecesarias
    event.preventDefault();
    //obtengo los datos necesarios de los cursos sacados del estado
    const {level, grade, section, course_name, description} = this.state
    //genero un objeto llamado data con el estado
    const data = { level, grade, section, course_name, description}
    //esta es la peticion al servidor, un post
    axios({
      // url: `${this.props.apiUrl}/v1/api/siagie/${this.props.idteacher}/new-course`,
      url: `http://192.168.1.29:4200/v1/api/siagie/${this.props.idteacher}/new-course`,
      data,
      method: 'post',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then((res) => {
      // return console.log(res.data)
      this.props.handleClose()
    })
      .catch(err => console.log(err));
      
  };

  //Esta es la vista, interfaz
  render() {
    const { course_name } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="modal-title__controlname">Detalles del curso</Form.Label>
            <div>
              <input type="radio" name="level" value="primaria" onChange={this.handleChange} required/> Primaria
              <input type="radio" name="level" value="secundaria" onChange={this.handleChange} /> Secundaria
              <input type="radio" name="level" value="" onChange={this.handleChange} /> Ninguno
            </div>
            {
              this.state.profesorParticular
              ?
              null
              :
              <div>
                <select name="grade" onChange={this.handleChange}>
                  {
                  this.state.nivelPrimaria
                  ?
                  this.state.grados.map( (grado, id) => (
                    <option key={id} value={grado.value}>{grado.name}</option>
                  ))
                  :
                  this.state.grados.slice(0,5).map( (grado, id) => (
                    <option key={id} value={grado.value}>{grado.name}</option>
                  ))
                  }
                </select>
                <select name="section" onChange={this.handleChange}>
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
                <select name="course_name" onChange={this.handleChange}>
                {
                this.state.nivelPrimaria
                ?
                this.state.nombresCursosPrimaria.map( (curso, id) => (
                  <option key={id} value={curso}>{curso}</option>
                ))
                :
                this.state.nombresCursosSecundaria.map( (curso, id) => (
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
              as="textarea"
              rows="2"
              required
            />
          </Form.Group>
          <Button id="modal-body__button-cursos" type="submit" >CREAR CURSO</Button>
        </Form>
      </>
    );
  }
}
