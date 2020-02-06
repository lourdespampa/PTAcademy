import React from "react";
import "./Styles/App.css";
import Generar from "./Code/generar";
import Blockly from "./blockly copy/blockly";
import BlocklyJS from "./blockly copy/Arduino";
import Menu from "./Code/Modal";
import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category
} from "./Blockly";
import "./blocks/customblocks";
import "./Code/Arduino";
//import Idioma from "./Code/idioma";
//import '../src/blockly copy/setCategoryCharacter'

class App extends React.Component {
  generateXml = () => {
    const newXml = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace)
    );
    console.log(newXml);
  };
  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
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
      <div>
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
              <Category name="variables" id="variables">
                <Block type="test_react_field" />
                <Block type="Juan" />
                <Block type="test_react_date_field" />
                <Block type="controls_ifelse" />
                <Block type="logic_compare" />
                <Block type="logic_operation" />
                <Block type="controls_repeat_ext">
                  <Value name="TIMES">
                    <Shadow type="math_number">
                      <Field name="NUM">10</Field>
                    </Shadow>
                  </Value>
                </Block>
                <Block type="logic_operation" />
                <Block type="logic_negate" />
                <Block type="logic_boolean" />
                <Block type="logic_null" disabled="true" />
                <Block type="logic_ternary" />
                <Block type="text_charAt">
                  <Value name="VALUE">
                    <Block type="variables_get">
                      <Field name="VAR">text</Field>
                    </Block>
                  </Value>
                </Block>
              </Category>
            </BlocklyComponent>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
