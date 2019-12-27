import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import './ingresarCodigo.css'

export default class LoginStu extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.id_access =  '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        
        this.setState({value: event.target.value});

      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    async ValidateCode(){
        const InputCode = document.getElementById('inputCode')
        const data ={
            id_access : InputCode.value
        }
        const VerifyCode = await axios.post("http://3.16.110.136:4200/v1/api/access/verify_access", data)
        console.log(VerifyCode.data.message)

        if(VerifyCode.data.message == 'Code doesn´t exist'){
            alert("codigo incorrecto")
        }else{
            this.setState({id_access: InputCode.value});
            console.log(this.id_access)
            document.getElementById('link_form').click()
        }
      
    }
    render(){
        return(            
        <div className="ingresarCodigo-contenedor">
        <Link id="link_form" to={`/loginStudent/${this.state.id_access}`}/>
              <ul className="ingresarCodigo-ul">
                <li style={{float: "left"}}><a className="ingresarCodigo-a ocultar" href="">PlayTec Academy</a></li>
                <li style={{float:'right'}}><Link style={{fontSize: '16px'}} className="ingresarCodigo-a" to={'/loginTeacher'}>CAMBIAR A PROFESOR</Link></li>
              </ul>
              <div className="ingresarCodigo-cuerpo">
                    <div className="ingresarCodigo-formulario">
                        <h1 className="ingresarCodigo-titulo-cuerpo">Ingresa el PIN para unirte a una clase como ALUMNO</h1>
                        <div className="col-md-6 ml-auto mr-auto text-center ingresarCodigo-cuerpo-cuerpo">
                            <span className="ingresarCodigo-input input--kozakura">
                                <input className="input__field input__field--kozakura" value={this.state.value} onChange={this.handleChange} id="inputCode" type="text" style={{textAlign:'center'}} maxLength="5" minLength="5" autoComplete="off" data-inputmask="'mask':'AAAAAA'" im-insert="true" required/>
                                <label className="input__label input__label--kozakura" htmlFor="inputCode">
                                    <span className="input__label-content input__label-content--kozakura" data-content="Código">CÓDIGO...</span>
                                </label>
                                <svg className="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/>
                                </svg>
                            </span>
                            <button style={{marginTop: '20px'}} onClick={()=>this.ValidateCode()} className="btn btn-block btn-lg btn-info ingresarCodigo-boton">INGRESAR</button>
                        </div>
                    </div>
              </div>
            </div>

        
        )
    }

}




