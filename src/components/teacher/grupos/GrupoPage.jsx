import React, { Component } from "react";
import "./Grupos.sass";
import axios from "axios";
import Loanding from '../loanding/spinner'
import io from 'socket.io-client';

export default class GrupoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      nro_per_grupo: 1,
      grupos: [],
      id_access : '',
      Refrescar:false,
      loanding:false
    };
  }
  handleNumPerGrou = e => {
    this.setState({ nro_per_grupo: e.target.value });
  };

  componentDidMount() {
    this.getAlumnos();
    const data = this.props
    this.setState({id_access: data})
    console.log(this.props)
  }
  getAlumnos = async() => {
    var varToken = await localStorage.getItem('token');
    console.log('llego a getAlum')
    var id_teacher = localStorage.getItem("id_teacher");
    var id_course = localStorage.getItem("id_course");
    if(this.props.school){
      axios({
        url: `${this.props.apiUrl}/v1/api/student/${id_teacher}/${id_course}/students`,
        method: 'GET',
        headers: {
          'x-access-token': `${varToken}`
        }
      }).then(data => {
        console.log("data",data)
        data.data.map(alumno => {
          console.log('hola perro')
          this.state.alumnos.push("▷"+alumno.name_stu + " " + alumno.lastName_stu);
          return null
        }); 
        const temp = this.state.alumnos;
        this.setState({
          alumnos: temp
        });
      })
      .catch((err)=>{
        console.log("error",err)
      })
    }else{
      axios({
        url:`${this.props.apiUrl + "/v1/api/lesson"}/${
          this.props.id_access
        }/students`,
        method: 'GET',
        headers: {
          'x-access-token': `${varToken}`
        }
      }).then(data => {
        console.log("data",data)
        data.data.map(alumno => {
          console.log('hola perro')
          this.state.alumnos.push("▷"+alumno.name_stu + " " + alumno.lastName_stu);
          return null
        }); 
        const temp = this.state.alumnos;
        this.setState({
          alumnos: temp
        });
      })
      .catch((err)=>{
        console.log("error",err)
      })
    }
    
    
  };
  groupGenerator = () => {
    this.setState({
      Refrescar:true,
      loanding:true
    })
    const socket = io(this.props.socketUrl, {
      query:
          { pin: this.props.id_access }
    })
    let cadena = ``;
    this.getAlumnos();
    console.log("numero de personas en total:" + this.state.alumnos.length);
    let npg = this.state.nro_per_grupo;
    let n_grupos = Math.ceil(this.state.alumnos.length / npg);
    let grupo2 = this.state.alumnos;
    for (let i = 0; i < n_grupos; i++) {
      console.log("grupo n" + (i + 1));
      cadena += `<li class="grupos-cards__item">
      <div class="grupos-card">
        <div class="grupos-card__content">
          <div class="grupos-card__title"><u>Grupo ${i + 1}</u></div><br/>
       `;

      for (let index = 0; index < this.state.nro_per_grupo; index++) {
        let randname = Math.floor(Math.random() * grupo2.length);
        if (grupo2[randname]) {
          let f = grupo2[randname];
          console.log(f);
          cadena += `<div class="grupos-card__text"> ${grupo2[randname]}</div>
           `;
        }

        grupo2.splice(randname, 1);
      }
      cadena += `</div>
          </div>
      </li>
      `;
    }
    setTimeout(() => {
      document.getElementById("imprimir").innerHTML = cadena;
      socket.emit('enviando grupos',{
        data : cadena
      })
      this.setState({
        loanding:false
      })
      console.log(cadena)
    }, 500);
    
  };
  limpiar=()=>{
    this.setState({
      loanding:true
    })
    setTimeout(() => {
     this.setState({
      Refrescar:false,
      loanding:false
    })
    document.getElementById("imprimir").innerHTML = '' 
    }, 500);
    
  }

  render() {
    const { nro_per_grupo } = this.state.nro_per_grupo;
    return (
      <>
      {this.state.loanding?
      <Loanding/>:null
  
      }
        {/* Cuerpos de Grupo */}
          <div className="cuerpo-grupos">
            {
            this.state.Refrescar?
            
            
            
            
            /* Boton de Formar Grupos */
            <>
            <span>Grupos formados por {this.state.nro_per_grupo} Alumnos </span>
            <button className="button" onClick={this.limpiar}>
              <label className="tex">
                LIMPIAR
              </label>
            </button>
            </>
            :
            <>
            {nro_per_grupo}
            <span>Número de personas por grupo </span>
            <input
              min="1"
              className="input-text"
              type="number"
              name="numGrup"
              placeholder="Nùmero de personas por grupos"
              value={this.state.nro_per_grupo}
              onChange={this.handleNumPerGrou}
            />
            <button className="button" onClick={this.groupGenerator}>
              <label className="tex">
                FORMAR GRUPOS
              </label>
            </button>
            </>
            }
          </div>
          {/* Contenedor De  Grupos */}
          <div className="contenedor-grupos">
            <ul className="grupos-cards" id="imprimir"></ul>
          </div>
      </>
    );
  }
}
