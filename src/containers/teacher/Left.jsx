import React from "react";
import MenuLeft from "../../components/teacher/left/MenuLeft";

class Left extends React.Component {
  async aparecer() {
    var soc = document.getElementById("social");
    soc.style.display = "block";
  }
  async desaparecer() {
    var soc = document.getElementById("social");
    soc.style.display = "none";
  }
  render() {
    return (
      <MenuLeft
        view={this.props.view}
        viewBlockly={this.props.viewBlockly}
        socketUrl={this.props.socketUrl}
        id_access={this.props.id_access}
        id_class={this.props.id_class}
        aparecer={this.aparecer}
        desaparecer={this.desaparecer}
      />
    );
  }
}

export default Left; 
