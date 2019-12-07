<<<<<<< HEAD
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
=======
import React from 'react';
import GruposPage from '../components/grupos/GrupoPage'

class Grupos extends React.Component {
    render(){
        return(
            <div>
                <GruposPage />
            </div>
        )
    }
>>>>>>> 9fc83b6c8164d8900210a0b1083c237f469ac69e
}
export default Grupos;
