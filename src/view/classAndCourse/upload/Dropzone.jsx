import React, { Component } from "react";
import imgDiapo from "./baseline-cloud_upload-24px.svg";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false, inputValue: "" };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if(this.props.limpiarInputFile ){
      return this.setState({inputValue: ""})
    }
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(event) {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}
        onDrop={this.onDrop} onClick={this.openFileDialog} style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
        <input ref={this.fileInputRef} className="FileInput" type="file" accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.template, application/vnd.openxmlformats-officedocument.presentationml.presentation"
          onChange={this.onFilesAdded} value={this.state.inputValue}/>
        <img alt="diapositiva" className="Icon" src={imgDiapo}/>
        {
        this.props.slideOn ? null : <span className="sube">Sube aquí tu diapositiva</span>
        }
      </div>
    );
  }
}

export default Dropzone;
