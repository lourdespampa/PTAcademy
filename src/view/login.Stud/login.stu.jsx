import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import './ingresarCodigo.sass'

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

    ValidateCode(){
        const codigo = this.state.value.toUpperCase()
        const data ={
            id_access : codigo
        }
        console.log(this.state.value)
        axios.post("http://3.16.110.136:4200/v1/api/access/verify_access", data).then(result => {
            console.log(result)
            if(result.message == 'Code doesn´t exist'){
                    alert("codigo incorrecto")
                }else{
                    this.setState({id_access: codigo});
                    console.log(this.id_access)
                    document.getElementById('link_form').click()
                }
        })
        .catch( (e) => {
            console.log.log(e)
        })
    
    }
    render(){
        return(            
        <div className="enter-code__contenedor">
        <Link id="link_form" to={`/loginStudent/${this.state.id_access}`}/>
              <ul className="enter-code__header">
                <li className="enter-code__academy">
                    <a className="enter-code__academy-a" href="">PlayTec Academy</a>
                </li>
                <li className="enter-code__changeStudent">
                    <Link style={{fontSize: '16px'}} className="enter-code__academy-a" to={'/loginTeacher'}>CAMBIAR A PROFESOR</Link>
                </li>
              </ul>
              <div className="enter-code__body">
                    <div className="enter-code__formulario">
                        <h1 className="enter-code__tittle-body">Ingresa el PIN para unirte a una clase como ALUMNO</h1>
                        <div className="col-md-6 ml-auto mr-auto text-center enter-code__body-body">
                            <span className="enter-code__input input--kozakura">
                                <input className="input__field input__field--kozakura" value={this.state.value} onChange={this.handleChange} id="inputCode" type="text" style={{textAlign:'center'}} maxLength="5" minLength="5" autoComplete="off" data-inputmask="'mask':'AAAAAA'" im-insert="true" required/>
                                <label className="input__label input__label--kozakura" htmlFor="inputCode">
                                    <span className="input__label-content input__label-content--kozakura" data-content="Código">CÓDIGO...</span>
                                </label>
                                <svg className="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/>
                                </svg>
                            </span>
                            <button style={{marginTop: '20px'}} onClick={()=>this.ValidateCode()} className="btn btn-block btn-lg btn-info enter-code__button">INGRESAR</button>
                        </div>
                    </div>
              </div>
            </div>

        
        )
    }

}




