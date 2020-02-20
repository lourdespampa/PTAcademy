import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap"; no se esta usando
import { Form } from "react-bootstrap";
import * as XLSX from 'xlsx'
import axios from "axios";
export default class FormAddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bloquearBoton: false,
      name_stu: "",
      lastName_stu: "",
      id_course: "",
      id_teacher: "",
      signup: false,
      login: true,
      message: "Elija una opción",
      escogerOption: 0
    };
  }
  handleChange = async event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ message: "" });
    if (event.target.value === "manual") this.setState({ escogerOption: 1 });
    if (event.target.value === "excel") this.setState({ escogerOption: 2 });

    await this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    console.log(this.props.idteacher);
    console.log(this.props.idcourse);
  }
  handleChangeInputsText = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleFileChange=(ev)=>{
    const target=ev.target
    const value=target.type==='checkbox' ? target.checked : target.value
    const name=target.name
    const this2=this
    this.setState({
      [name]:value
    })
    let hojas=[]
    if(name==='file'){
      let reader=new FileReader()
      reader.readAsArrayBuffer(target.files[0])
      reader.onloadend=(e)=>{
        var data=new Uint8Array(e.target.result);
        var workbook=XLSX.read(data,{type:'array'});
        workbook.SheetNames.forEach(function(sheetName){
          var XL_row_object=XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data:XL_row_object,
            sheetName
          })
        })
        console.log(hojas)
        this2.setState({
          selectedFileDocument:target.files[0],
          hojas
        })
      }
    }
  }
  handleSubmit = event => {
    
    if( this.state.escogerOption===1){
      this.setState({
      bloquearBoton: true
    });
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
      .then(res => {
        console.log(res);
        this.setState({
          bloquearBoton: false,
          name_stu: "",
          lastName_stu: ""
        });
        this.props.handleClose();
        this.props.getdata();
      })

      .catch(err => {
        console.log(err);
        this.setState({
          bloquearBoton: false
        });
      });
    }else{
    event.preventDefault();
      
    }
  };
  render() {
    const { name_stu, lastName_stu } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="modal-title__controlname">
              Metodo al Agregar
            </Form.Label>
            <div className="CT-contenedorNivel">
              <input
                className="CT-opcionNivel"
                type="radio"
                name="option"
                value="manual"
                id="option-one"
                onChange={this.handleChange}
                required
              />
              <label className="CT-labelNivel" htmlFor="option-one" style={{width:'50%'}}>
                Manual
              </label>
              <input
                className="CT-opcionNivel"
                type="radio"
                name="option"
                value="excel"
                id="option-two"
                onChange={this.handleChange}
              />
              <label className="CT-labelNivel" htmlFor="option-two"style={{width:'50%'}}>
                Cargar Excel
              </label>
            </div>
            {this.state.escogerOption === 0 ? null : this.state
                .escogerOption === 1 ? (
              <>
                <label className="modal-title__controlname">
                  Nombres del alumno
                </label>
                <input
                  className="modal-teacher__general-controlname"
                  type="text"
                  name="name_stu"
                  onChange={this.handleChangeInputsText}
                  value={name_stu}
                  placeholder="Ingresar nombres completos de los estudiantes"
                  required
                />
                <label className="modal-title__controlname">
                  Apellidos del alumno
                </label>
                <input
                  className="modal-teacher__general-controlname"
                  type="text"
                  name="lastName_stu"
                  onChange={this.handleChangeInputsText}
                  value={lastName_stu}
                  placeholder="Ingresar apellidos completos de los estudiantes"
                  required
                />
                <input type="file" />
                <br/><br/>
                {this.state.bloquearBoton ? (
                  <button className="modal-body__button cursos" type="button">
                    <div className="button-zoom">Cargando ...</div>
                  </button>
                ) : (
                  <button className="modal-body__button cursos" type="submit">
                    <div className="button-zoom">Agregar Alumno</div>
                  </button>
                )}
              </>
            ) : (
              <>
              <label className="modal-title__controlname">
                  Subir Excel aqui
                </label>
            <input type="file" required name="file" id="excel" onChange={this.handleFileChange} placeholder="Archivo de excel" />
            <br/>
            <br/>
            {this.state.bloquearBoton ? (
                  <button className="modal-body__button cursos" type="button">
                    <div className="button-zoom">Cargando ...</div>
                  </button>
                ) : (
                  <button className="modal-body__button cursos" type="submit">
                    <div className="button-zoom">Agregar Alumno</div>
                  </button>
                )}
            </>
            )
            }

            {this.state.message ? (
              <h4 className="CT-message-error">{this.state.message}</h4>
            ) : null}
          </Form.Group>
        </Form>
      </>
    );
  }
}
