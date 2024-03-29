import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import "./FormPostCourse.sass";
import "./dropzonet.css";

export default class FormPostSiagie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      estudiantes: [],
      nomArch: '',
      files: []
    };
  }
  componentDidMount() {}


  onDrop = (event) => {
    this.setState({
      selectedFile: event[0],
      nomArch: event[0].name
    });
    console.log(event[0]);
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/upload_excel/${this.props.idcourse}`,
      method: "POST",
      responseType: "blob",
      Accept: 'application/vnd.ms-excel',
      data: data
    })
      .then(res => {
        console.log(res)

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${this.state.nomArch}`);
        document.body.appendChild(link);
        link.click();
      }).catch(err => {
        console.log(err)
      })
  };
  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <>
        <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container-dropzone">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps() } accept="application/vnd.ms-Microsoft Excel, .xlsx"/>
              <div className="text">
                <img alt="imagen de subir"  className="imagenes" width="50px" height="50px" src={require("../../img/subir.png")} />
                <p className="letras">Sube Tu Archivo</p>
              </div>
            </div>
            <aside className="centrado">
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
        <button
          type="button"
          className="modal-body__button yes"
          onClick={this.onClickHandler}
        >
          DESCARGAR
        </button> 
      </>
    );
  }
}
