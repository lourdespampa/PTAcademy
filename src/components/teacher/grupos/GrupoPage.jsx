import React, { Component } from "react";
import "./grupos.css";
import axios from "axios";

const url = "http://3.16.110.136:4200";
export default class GrupoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      nro_grupos: "",
      nro_per_grupo: "",
      ini_group: "",
      grupos: [],
      text: ""
    };
  }

  handleNumPerGrou = e => {
    this.setState({ nro_per_grupo: e.target.value });
  };

  componentWillMount() {
    this.getAlumnos();
  }
  getAlumnos = () => {
    axios.get(`${url}/v1/api/lesson/PRJHS/students/roulette`).then(res => {
      res.data.map(alumno => {
        this.state.alumnos.push(alumno.name_stu + " " + alumno.lastName_stu);
      });
      const temp = this.state.alumnos;
      this.setState({
        alumnos: temp
      });
    });
  };
  groupGenerator = () => {
    let cadena = this.state.texto;
    this.getAlumnos();
    console.log("Numero de personas en total:" + this.state.alumnos.length);
    let npg = this.state.nro_per_grupo;
    let n_grupos = Math.ceil(this.state.alumnos.length / npg);
    let grupo2 = this.state.alumnos;
    for (let i = 0; i < n_grupos; i++) {
      console.log("grupo n" + (i + 1));
      for (let index = 0; index < this.state.nro_per_grupo; index++) {
        cadena += `<table id="" class="table">
        <thead class="thead-dark"">
            <tr>
                <th scope="col">Grupo ${(i + 1)}</th>
            </tr>
        </thead>
        <tbody>`;
        let randname = Math.floor(Math.random() * grupo2.length);
        if (grupo2[randname]) {
        //   let f = grupo2[randname];
          cadena += `<tr>
          <td scope="col"> -${grupo2[randname]}
          </td>
                </tr>
          `;
        //   console.log(f);
        }
        grupo2.splice(randname, 1);
      }
    }
    this.setState({
      text: cadena
    });
    console.log(cadena);
    document.body.innerHTML = cadena;
  };

  render() {
    const { nro_per_grupo } = this.state.nro_per_grupo;
    return (
      <>
        <div className="cuerpo-grupos">
          {nro_per_grupo}
          <input
            className="input-text"
            type="number"
            name="numGrup"
            placeholder="numero de personas por grupos"
            value={this.state.nro_per_grupo}
            onChange={this.handleNumPerGrou}
          />
          <button onClick={this.groupGenerator}>FORMAR GRUPOS</button>
          <div className="wrapper2">
            <div id="salida_grupos"></div>
            <table>
                
            </table>
            {this.state.text}
          </div>
        </div>
      </>
    );
  }
}
