import React, { Component } from "react";
import axios from 'axios';
export default class FormPostSiagie extends Component {
  state = {
    file : null
  }
  componentDidMount(){
    
    console.log(this.props.students)
  }
  handleFileChange(e) {
    let file = e.target.files[0];
    this.setState ({
      file: file
    })
  }
  handleUpload(e){
    var varToken = localStorage.getItem("token");
    let file = this.state.file;
    let formData = new FormData();
    formData.append('excel',file)
    formData.append('name','arjun yohan')
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/upload_excel/${this.props.idcourse}`,
      data: formData,
      method: "post",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
    .then((data) =>{
      console.log(data)
    }).catch ((err) =>{
      console.log(err)
    })
  }
  render() {
    return (
      <>
      <form>
        <label className="modal-title__controlname">Subir Excel aqui</label>
        <input
          type="file"
          required
          name="file"
          id="excel"
          onChange={this.handleFileChange}
          placeholder="Archivo de excel"
        />
        <button type="button" onClick={this.handleUpload}>ENVIAR</button>
      </form>
        
        <br />
        <br />
      </>
    );
  }
}
