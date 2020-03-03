import React, { Component } from "react";
import axios from "axios";
export default class FormPostSiagie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      estudiantes: [],
      nomArch: ''
    };
  }
  componentDidMount() {}
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      nomArch: event.target.files[0].name,
      loaded: 0
    });

    console.log(event.target.files[0].name);
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
    return (
      <>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button
          type="button"
          className="modal-body__button yes"
          onClick={this.onClickHandler}
        >
          Descargar
        </button>
      </>
    );
  }
}
