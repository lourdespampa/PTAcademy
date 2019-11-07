import React, { Component } from "react";
import gruposAlumno from "../components/grupos/grupos";
class Grupos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }
  componentDidMount() {
    fetch("http://api-playtec.herokuapp.com/v1/api/student/5dc33c64461b7087bd52b506", { method: "GET" })
      .then(response => response.json())
      .then(response2 => console.log(response2));
  }
  render() {
    const { students } = this.state;
    return (
      <div>
        <h1>usuarios</h1>
        <div className="container">
          {students.map(u => (
            <gruposAlumno
              key={u._id}
              name={u.first_name}
              username={u.last_name}
              email={u.username}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Grupos;
