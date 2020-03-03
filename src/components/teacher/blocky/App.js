
import "./Styles/App.css";

import React from "react";

//Code// 
import Generar from "./Code/generar";
import Blockly from "./blockly copy/blockly";
import BlocklyJSA from "./Code/Arduino";
import BlocklyComponent from "./Blockly";
import Menu from "./Code/Modal";

//Categorias//
import CategoryBucles from "./blocks/Category_Bucles/categ_bucle.jsx";
import CategoryLogica from "./blocks/Category_Logic/cate_logic.jsx";
import CategoryMath from "./blocks/Category_Math/cate_math.jsx";
import CategoryInicial from "./blocks/Category_Inicializar/cate_inicializar"
import CategoryText from "./blocks/Category_Text/cate_text.jsx";


class App extends React.Component {
  generateXml = () => {
    const newXml = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace)
    );
    console.log(newXml);
  };
  generateCode = () => {
    var code = BlocklyJSA.workspaceToCode(this.simpleWorkspace.workspace);


    document.getElementById("content_arduino").value = code;

    var arduino = document.getElementById("content_arduino");
    var bloques = document.getElementById("bloques");
    arduino.style.visibility = "visible"
    bloques.style.visibility = "hidden"
  };

  Bloques = () => {
    var bloques = document.getElementById("bloques");
    var arduino = document.getElementById("content_arduino");

    if (bloques.style.visibility === "hidden") {
      bloques.style.visibility = "visible";
      arduino.style.visibility = "hidden";
    } else {
      arduino.style.visibility = "hidden";
    }
  };

  render() {
    return (
      <div name="app">
        <button type="button" onClick={this.Bloques}>
          Bloques
        </button>
        <button type="button" onClick={this.generateCode}>
          Arduino
        </button>
        <button type="button" onClick={this.generateXml}>
          Xml
        </button>
        <Menu />
        <Generar />
        <div id="bloques" className="blockly">
          <header className="App-header">
            <BlocklyComponent
              ref={e => (this.simpleWorkspace = e)}
              readOnly={false}
              move={{
                scrollbars: true,
                drag: true,
                wheel: true
              }}
            >
              <CategoryLogica />
              <CategoryBucles />
              <CategoryMath />
              <CategoryText />
              <CategoryInicial />
            </BlocklyComponent>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
