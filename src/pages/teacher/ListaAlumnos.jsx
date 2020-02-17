import React from "react";

import ListaAlum from "../../components/teacher/lista/ListaAlum";
class ListaAlumnos extends React.Component {
  render() {
    return (
      <ListaAlum
        school={this.props.school}
        socketUrl={this.props.socketUrl}
        id_access={this.props.id_access}
        apiUrl={this.props.apiUrl}
      />
    );
  }
}

export default ListaAlumnos;
