import React, { Component } from "react";
import axios from "axios";
export default class FormPostSiagie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      estudiantes: [],
      estudiante: [{}]
    };
  }
  componentDidMount(){
    console.log(this.props.students)
    setTimeout(() => {
      this.setState({
        estudiantes: this.props.students
      })
    }, 2000);
    console.log(this.state.estudiantes)
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0])

  };
  onClickHandler = () => {
    const data = new FormData();
    var details = {

    };
    const ahora = {estudiante: this.state.estudiantes}
    console.log(JSON.stringify(this.state.estudiantes));
    console.log(this.state.estudiantes);
    data.append("file", this.state.selectedFile);
    data.append('asdasd', (Object.values(ahora)));
    data.append('name_course', this.props.name_course);
    axios
      .post(
      `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/upload_excel/${this.props.idcourse}`,
      data, {
        // receive two parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
        console.log(res);
        

      })
      .catch(err => {
        console.log(err)
      })
  };
  onclickStudents = () => {
    console.log(this.props.students)
    console.log(JSON.stringify(this.state.estudiantes))
    console.log(this.state.estudiantes.length)
    for(var i=0; i < this.state.estudiantes.length; i++){
      this.state.estudiante.push(this.state.estudiantes[i]);
      
    }
    console.log(this.state.estudiante)
    const map = { a: 1, b: 2, c: 3 };
    const ahora = {estudiante: this.state.estudiantes}

const result = Object.values(ahora);

console.log(result);

  }
  render() {
    return (
      <>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button
          type="button"
          className="modal-body__button yes"
          onClick={this.onClickHandler}
        >
          Upload
        </button>
        <button onClick={this.onclickStudents}>
          dd
        </button>
      </>
    );
  }
}
