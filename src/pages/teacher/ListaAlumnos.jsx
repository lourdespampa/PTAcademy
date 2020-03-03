import React from "react";

import ListaAlum from "../../components/teacher/lista/ListaAlum";
class ListaAlumnos extends React.Component {
  componentDidMount() {
    console.log(this.props.id_class);
  }
  render() {
    return (
      <ListaAlum
        id_class={this.props.id_class}
        school={this.props.school}
        socketUrl={this.props.socketUrl}
        id_access={this.props.id_access}
        apiUrl={this.props.apiUrl}
      />
    );
  }
}

export default ListaAlumnos;
