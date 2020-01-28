import React from 'react';
import './Styles/App.css';
import Arduino from './Arduino/arduino.js'
import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';
import BlocklyJS from 'blockly/javascript';
import './blocks/customblocks';
import './generator/generator';


class App extends React.Component {


  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    document.getElementById("content_arduino").value=code;
    var arduino = document.getElementById('content_arduino');
    var bloques = document.getElementById('bloques');
    if (arduino.style.visibility === 'hidden') {
      arduino.style.visibility = 'visible';
      bloques.style.visibility = 'hidden';
    } 
    }
    Bloques = () => {
     var bloques=  document.getElementById('bloques');
     var arduino = document.getElementById('content_arduino');

      if (bloques.style.visibility === 'hidden') {
        bloques.style.visibility = 'visible';
        arduino.style.visibility = 'hidden';

      } else {
        arduino.style.visibility = 'hidden';
      }
      }
  render() {
    return (
      <div>
      <button type="button" onClick={this.Bloques}>Bloques</button>
      <button type="button" onClick={this.generateCode}>Arduino</button>
      <div  id="bloques" className="App">
        <header className="App-header">
          <Arduino/>
          <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }} >
            <Block type="test_react_field" />
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
          </BlocklyComponent>
        </header>
      
      </div>
      </div>
    );
  }
}

export default App;
