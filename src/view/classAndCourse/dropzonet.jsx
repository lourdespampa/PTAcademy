import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import "./index.css";
import iconExit from "./img/subir.png";

export default class App extends Component{
    constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <div className="text">
                <img  className="imagenes"width="50px" height="50px" src={require("./img/subir.png")} />
                <p className="letra">Seleciona Tu Archivo</p>
               
              </div>
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}
