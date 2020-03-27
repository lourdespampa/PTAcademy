import React from "react";
import Blockly from "../blockly copy/core";
import en from "../blockly copy/blockly/msg/en";
import es from "../blockly copy/blockly/msg/es";
import fr from "../blockly copy/blockly/msg/fr";

class Idioma extends React.Component {
  changeEs = () => {
    Blockly.setLocale(es);
  };
  changeEn = () => { 
    Blockly.setLocale(en);
  };
  changeFr = () => {
    Blockly.setLocale(fr);
  };

  render() {
    return (
      <div>
        <form action="#">
          <button type="button" onClick={this.changeEs}>
            Es
          </button>
          <button type="button" onClick={this.changeFr}>
            fr
          </button>
          <button type="button" onClick={this.changeEn}>
            En
          </button>
        </form>
      </div>
    );
  }
}

export default Idioma;
