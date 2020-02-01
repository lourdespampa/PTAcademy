import React, { Component } from "react";
import "./Grupos.sass";
import axios from "axios";
import io from 'socket.io-client';

export default class GrupoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      nro_per_grupo: 1,
      grupos: [],
      id_access : ''
    };
  }
  handleNumPerGrou = e => {
    this.setState({ nro_per_grupo: e.target.value });
  };

  componentWillMount() {
    this.getAlumnos();
    const data = this.props
    this.setState({id_access: data})
    console.log(this.props)
  }
  getAlumnos = () => {
    var varToken = localStorage.getItem('token');
     axios({
      url: `${this.props.apiUrl}/v1/api/lesson/${this.props.id_access}/students/roulette`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    }).then(res => {
      res.data.map(alumno => {
        this.state.alumnos.push("▷"+alumno.name_stu + " " + alumno.lastName_stu);
        return null
      });
      const temp = this.state.alumnos;
      this.setState({
        alumnos: temp
      });
    });
  };
  groupGenerator = () => {
    let cadena = ``;
    this.getAlumnos();
    console.log("numero de personas en total:" + this.state.alumnos.length);
    let npg = this.state.nro_per_grupo;
    let n_grupos = Math.ceil(this.state.alumnos.length / npg);
    let grupo2 = this.state.alumnos;
    for (let i = 0; i < n_grupos; i++) {
      console.log("grupo n" + (i + 1));
      cadena += `<li className="grupos-cards__item">
      <div className="grupos-card">
        <div className="grupos-card__content">
          <div className="grupos-card__title"><u>Grupo ${i + 1}</u></div><br/>
       `;

      for (let index = 0; index < this.state.nro_per_grupo; index++) {
        let randname = Math.floor(Math.random() * grupo2.length);
        if (grupo2[randname]) {
          let f = grupo2[randname];
          console.log(f);
          cadena += `<div className="grupos-card__text"> ${grupo2[randname]}</div>
           `;
        }

        grupo2.splice(randname, 1);
      }
      cadena += `</div>
          </div>
      </li>
      `;
    }
    document.getElementById("imprimir").innerHTML = cadena;
    const socket = io(this.props.socketUrl, {
      query:
          { pin: this.props.id_access }
    })
    socket.emit('enviando grupos',{
        data : cadena
    })
    console.log(cadena)
  };

  render() {
    const { nro_per_grupo } = this.state.nro_per_grupo;
    return (
      <>
          
          <div className="cuerpo-grupos">
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
          </div>
          <div className="contenedor-grupos">
            <ul className="grupos-cards" id="imprimir"></ul>
          </div>
      </>
    );
  }
}
