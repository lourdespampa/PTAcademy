import React from "react";
import GruposPage from "../../components/teacher/grupos/GrupoPage";

class Grupos extends React.Component {
  render() {
    return (
      <div>
        <GruposPage
          all={this.props.todo}
          id_access={this.props.id_access}
          socketUrl={this.props.socketUrl}
          apiUrl={this.props.apiUrl}
        />
      </div>
    );
  }
}
export default Grupos;
