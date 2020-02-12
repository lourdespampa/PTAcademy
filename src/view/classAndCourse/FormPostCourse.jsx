import React, { Component } from "react";
//librerias externas
import axios from "axios";
//estilos
import { Form, Button } from "react-bootstrap";
import './FormPostCourse.sass';


//componente clase
export default class FormPostCourse extends Component {
  //1. inializa las propiedades recibidas del componente padre
  constructor(props) {
    super(props);
    //2. el estado con sus variables iniciales
    this.state = {
      bloquearBoton: false,
      message: "Elija una opción",
      level: " Primaria",
      grade: "1ro",
      section: "A",
      course_name: "Arte y cultura",
      description: "",
      escogerNivelAcademico: 0,
      nivelPrimaria: true,
      grados: [{name:"1er grado", value: "1ro"},
               {name:"2do grado", value: "2do"},
               {name:"3er grado", value: "3ro"},
               {name:"4to grado", value: "4to"},
               {name:"5to grado", value: "5to"},
               {name:"6to grado", value: "6to"}],
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
    this.setState({message: ""})
    if(event.target.value === "primaria") this.setState({nivelPrimaria: true, escogerNivelAcademico: 1, level: "primaria"})
    if( event.target.value === "secundaria") this.setState({nivelPrimaria: false, escogerNivelAcademico: 1, level: "secundaria"})
    if(event.target.value === "") this.setState({escogerNivelAcademico: 2, level: "", grade: "", section: ""})

    await this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  handleChangeInputsText = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    //bloqueamos el boton para que no se hagan multiples peticiones
    this.setState({bloquearBoton: true})
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
      url: `${this.props.apiUrl}/v1/api/siagie/${this.props.idteacher}/new-course`,
      // url: `http://192.168.1.29:4200/v1/api/siagie/${this.props.idteacher}/new-course`,
      data,
      method: 'post',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then((res) => {
      // return console.log(res.data)
      this.setState({
        bloquearBoton: false,
        message: "Elija una opción",
        level: "primaria",
        grade: "primero",
        section: "A",
        course_name: "Arte y cultura",
        description: "",
        escogerNivelAcademico: 0,
        nivelPrimaria: true
      })
      this.props.menuToggleNavbar()
      this.props.handleClose()
    })
      .catch(err => {
        if(err.message === "Request failed with status code 530"){ 
          this.setState({message: "Has excedido el limite de cursos para tu cuenta"})
        }
        if(err.message === "Request failed with status code 500"){ 
          this.setState({message: "Ha ocurrido un error, vuelva a intentarlo de nuevo o más tarde."})
        }
        console.log(err.message)
        this.setState({bloquearBoton: false})
      });
      
  };

  //Esta es la vista, interfaz
  render() {
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
              this.state.escogerNivelAcademico === 0
              ?
              null
              :
                this.state.escogerNivelAcademico === 1
                ?
                <div className="CT-detallesCurso">
                  <div className='select002'>
                    <label >Grado: </label>
                    <select name="grade" className="list-grade" onChange={this.handleChange}>
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
                  </div>
                  <div className='select002'>
                    <label>Sección: </label>
                    <select name="section" className="list-seccion" onChange={this.handleChange}>
                      {
                      this.state.secciones.map( (seccion, id) => (
                        <option key={id} value={seccion}>{seccion}</option>
                      ))
                      }
                    </select>
                  </div>
                  
                  
                </div>
                :
                null
            }
          </Form.Group>
          {
            this.state.escogerNivelAcademico === 0
            ?
            null
            :
            <>
            <Form.Group>
              <Form.Label className="modal-title__controlname">Nombre del curso</Form.Label>
              {                
                this.state.escogerNivelAcademico === 1
                ?
                <div>
                  <select name="course_name" className="list-course" onChange={this.handleChange}>
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
                :
                  this.state.escogerNivelAcademico === 2
                  ?
                  <Form.Control className="modal-teacher__general-controlname"
                    type="text"
                    name="course_name"
                    onChange={this.handleChangeInputsText}
                    placeholder="Ingrese el nombre del curso"
                    required
                  />
                  :
                  null
              }
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="modal-title__controlname">Descripción del curso</Form.Label>
              <Form.Control className="modal-teacher__general-controldescription"
                name="description"
                onChange={this.handleChangeInputsText}
                placeholder="Ingrese la descripción del curso"
                as="textarea"
                rows="2"
                required
                value={this.state.description}
              />
            </Form.Group>
            {
              this.state.bloquearBoton
              ? 
              <Button className="modal-body__button cursos" style={{background: "#515A5A"}} type="submit" disabled>
                <div className="button-zoom">Cargando...</div>
              </Button>
              :
              <Button className="modal-body__button cursos" type="submit">
              <div className="button-zoom">Crear Curso</div>
              </Button>
            }
            </>
          }
          {this.state.message ? <h4 className="CT-message-error">{this.state.message}</h4> : null}
        </Form>
      </>
    );
  }
}
