
import "./Styles/App.css";

import React from "react";

//Code// 
import Generar from "./Code/generar";
import Blockly from "./blockly copy/blockly";
import BlocklyJSA from "./Code/Arduino";
import BlocklyComponent from "./Blockly";
import AlertDialog from "./modals/config/Modal.jsx";
// //Categorias//
import CategoryBucles from "./blocks/Category_Bucles/categ_bucle.jsx";
import CategoryLogica from "./blocks/Category_Logic/cate_logic.jsx";
import CategoryMath from "./blocks/Category_Math/cate_math";
import CategoryInicial from "./blocks/Category_Inicializar/cate_inicializar"
import CategoryText from "./blocks/Category_Text/cate_text.jsx";
import CategoryVariable from "./blocks/Category_Variables/categ_variable";
import CategoryDigital from "./blocks/Category_Digital/categ_digital";
import CategoryFuncion from "./blocks/Category_Function/categ_funcion.jsx";

import CategoryAnalog from "./blocks/Category_Analog/categ_analog.jsx";
import CategorySerial from "./blocks/Category_Serial/cate_serial.jsx";
import CategoryTone from "./blocks/Category_Tone/categ_tone"
import CategoryTime from "./blocks/Category_Timer/categ_timer";
import CategoryServo from "./blocks/Category_Servo/categ_Servo"
import CategoryRobot from "./blocks/Category_Robot/Category_Engines/categ_engines";

import io from 'socket.io-client';

export default class App extends React.Component {


  socket = io(this.props.socketUrl, { query: { pin: this.props.id_access } })
  componentDidMount() {
    this.socket.on("blockly-student",async (data) => {
        
        var xmlDoc = Blockly.Xml.textToDom(data.xml);
        await Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDoc); 
        console.log(Blockly.mainWorkspace)  
    }
    )

  }

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
  ConfLang = () => {
    // let modal = document.querySelector("#ModalLang") 

  }
  render() {
    return (
      <div name="app">
        <button type="button" onClick={this.Bloques}>
          Bloques
        </button>
        <button type="button" onClick={this.generateCode}>
          Arduino
        </button>

        <AlertDialog
        // cambioCategorias={this.handleChangeOtrosComponent.bind(this)}
        />
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
              <div className="categorias">
                <CategoryLogica />
                <CategoryBucles />
                <CategoryMath />
                <CategoryText />
                <CategoryVariable />
                <CategoryFuncion />
                <CategoryInicial />
                <CategoryDigital />
                <CategoryAnalog />
                <CategorySerial />
                <CategoryTone />
                <CategoryTime />
                <CategoryServo />
                <CategoryRobot />
              </div>
            </BlocklyComponent>
          </header>
        </div>
      </div>
    );
  }
}
