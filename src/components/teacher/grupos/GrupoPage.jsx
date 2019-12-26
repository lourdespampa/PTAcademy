import React, { Component } from "react";
import "./grupos.css";
import axios from "axios";

const url = "http://3.16.110.136:4200";
export default class GrupoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      nro_per_grupo: 1,
      grupos: [],
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
    let cadena = ``
    this.getAlumnos();
    console.log("Numero de personas en total:" + this.state.alumnos.length);
    let npg = this.state.nro_per_grupo;
    let n_grupos = Math.ceil(this.state.alumnos.length / npg);
    let grupo2 = this.state.alumnos;
    for (let i = 0; i < n_grupos; i++) {
      console.log("grupo n" + (i + 1));
      cadena += `<li class="grupos-cards__item">
      <div class="grupos-card">
        <div class="grupos-card__content">
          <div class="grupos-card__title">Grupo ${(i + 1)}</div><br/>
       `

      for (let index = 0; index < this.state.nro_per_grupo; index++) {
        let randname = Math.floor(Math.random() * grupo2.length);
        if (grupo2[randname]) {
          let f = grupo2[randname];
          // cadena += `<tr>
          // <td scope="col"> -${grupo2[randname]}
          // </td>
          //       </tr>
          // `;
          console.log(f);
          cadena += `<div class="grupos-card__text"> ${grupo2[randname]}</div>
           `
        }

        grupo2.splice(randname, 1);
      }
      cadena += `</div>
          </div>
      </li>
      `

    }
    // this.setState({
    //   text: cadena
    // });
    console.log(cadena)
    document.getElementById('imprimir').innerHTML = cadena
    // document.write(cadena)

  };

  render() {
    const { nro_per_grupo } = this.state.nro_per_grupo;
    return (
      <>
        <div className="cuerpo-grupos">
          {nro_per_grupo}
          <input
            min="1"
            className="input-text"
            type="number"
            name="numGrup"
            placeholder="numero de personas por grupos"
            value={this.state.nro_per_grupo}
            onChange={this.handleNumPerGrou}
          />
          <button onClick={this.groupGenerator}>FORMAR GRUPOS</button>
        </div>
        <div className="contenedor-grupos">
           <ul className="grupos-cards" id="imprimir">
            </ul>
        </div>
      </>
    );
  }
}
