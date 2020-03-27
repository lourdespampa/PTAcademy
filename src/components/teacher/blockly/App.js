
import "./Styles/App.css";
import React from "react";

//Code//
import Generar from "./Code/generar";
import Blockly from "./blockly copy/blockly";
import BlocklyJSA from "./Code/Arduino";
import BlocklyComponent from "./Blockly";
import AlertDialog from "./modals/config/Modal.jsx";
import {saveAs} from 'file-saver'
//Categorias//
import CategoryBucles from "./blocks/Category_Bucles/categ_bucle.jsx";
import CategoryLogica from "./blocks/Category_Logic/cate_logic.jsx";
import CategoryMath from "./blocks/Category_Math/cate_math.jsx";
import CategoryInicial from "./blocks/Category_Inicializar/cate_inicializar"
import CategoryText from "./blocks/Category_Text/cate_text.jsx";
import CategoryVariable from "./blocks/Category_Variables/categ_variable";
import CategoryDigital from "./blocks/Category_Digital/categ_digital";
import CategoryFuncion from "./blocks/Category_Function/categ_funcion";
import CategoryAnalog from "./blocks/Category_Analog/categ_analog.jsx";
import CategorySerial from "./blocks/Category_Serial/cate_serial";
import CategoryTone from "./blocks/Category_Tone/categ_tone"
import CategoryTime from "./blocks/Category_Timer/categ_timer";
import CategoryServo from "./blocks/Category_Servo/categ_Servo";
//otras Categorias
import CategoryRobot from "./blocks/Category_Robot/Category_Engines/categ_engines";
import CategoryLcd from "./blocks/Category_Lcd/categ_lcd";
import CategoryBluetooth from "./blocks/Category_Bluetooth/categ_bluetooth";

import io from 'socket.io-client';

// function blockORnone(nombre, stado) {
//   console.log(nombre, stado);
//   if (stado) {
//     document.getElementById(nombre).style.display = "block"
//   } else {
//     document.getElementById(nombre).style.display = "none"
//   }
// }
// function swicthVisible(nombreDeLaClase, state) {


//   switch (nombreDeLaClase) {
//     case 'PlayBot':
//       let idBloque1 = 'blockly:e'
//       blockORnone(idBloque1, state)
//       break;


//     case 'lcd':

//       let idBloque2 = 'blockly:h'

//       blockORnone(idBloque2, state)
//       break;
//     case 'ultrasonic':

//       let idBloque3 = 'blockly:i'

//       blockORnone(idBloque3, state)
//       break;
//     case 'Bluetooth':
//       let idBloque4 = 'blockly:j'

//       blockORnone(idBloque4, state)
//       break;
//     case 'RFID':
//       let idBloque5 = 'blockly:k'

//       blockORnone(idBloque5, state)
//       break;
//     case 'Sensores':
//       let idBloque6 = 'blockly:l'

//       blockORnone(idBloque6, state)
//       break;

//     default:
//       console.log('esto no tendria que ocurrir')
//       break;
//   }

// }
// function load(event) {
//   var files =event.target.files;
//   // Only allow uploading one file.
//   if (files.length !== 1) {
//     return;
//   }

//   // FileReader
//   var reader = new FileReader();
//   reader.onloadend = function (event) {
//     var target = event.target;
//     // 2 == FileReader.DONE
//     if (target.readyState === 2) {
//       try {
//         var xml = Blockly.Xml.textToDom(target.result);
//       } catch (e) {
//         alert('Error parsing XML:\n' + e);
//         return;
//       }
//       var count = Blockly.mainWorkspace.getAllBlocks().length;
//       if (count) {
//         Blockly.mainWorkspace.clear();
//       }
//       Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
//     }
//     // Reset value of input after loading because Chrome will not fire
//     // a 'change' event if the same file is loaded again.
//     document.getElementById('load').value = '';
//   };
//   reader.readAsText(files[0]);
// }


export default class App extends React.Component {
  socket =io(this.props.socketUrl, {query:{ pin: this.props.id_access}})

  
  // constructor() {
  //   super();
  //   this.state = {
  //     PlayBot: false,
  //     lcd: false,
  //     ultrasonic: false,
  //     Bluetooth: false,
  //     RFID: false,
  //     Sensores: false

  //   }
  //   this.handleChangeOtrosComponent = this.handleChangeOtrosComponent.bind(this)

  //   //  let interval = null // importante es para el socket


  // }
  // componentDidMount = () => {
  //   //categorias
  //   for (const key in this.state) {
  //     swicthVisible(String(key), this.state[key])
  //   }
  //   //localstore
  //   let local = localStorage.getItem('datos')
  //   let xmlDoc = Blockly.Xml.textToDom(local);
  //   Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDoc);
  //   // cuardar local store
  //   window.addEventListener('unload',()=>{
  //     const newXml = Blockly.Xml.domToText(
  //       Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace)
  //     );
  //     localStorage.setItem('datos', String(newXml));
  //   })
  // }
  generateXml = () => {

    const newXml = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace)
    );
    this.socket.emit('blockly-xml',newXml)
    console.log(newXml)
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


    handleChangeOtrosComponent = async (obj) => {
      await this.setState(
        {
          PlayBot: obj[0].PlayBot,
          lcd: obj[1].lcd,
          ultrasonic: obj[2].ultrasonic,
          Bluetooth: obj[3].Bluetooth,
          RFID: obj[4].RFID,
          Sensores: obj[5].Sensores
        }
      )

      // for (const key in this.state) {

      //   swicthVisible(String(key), this.state[key])
      // }

    }
  
  // ExportarXML = ()=>{
  //   const newXml = Blockly.Xml.domToText(
  //     Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace)
  //   );
  //   let blob = new Blob([newXml], {type: "text/xml;charset=utf-8"});
  //   saveAs(blob, "generar.xml");
  // }
  // ImportarXML= ()=>{
  //   let file = document.querySelector('#load')
  //   file.addEventListener('change', load, false);
  //   file.click()
  // }

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
      
        <AlertDialog cambioCategorias={this.handleChangeOtrosComponent} />
        <Generar />

        <div id="bloques" className="blockly">
          <header className="App-header">
            <BlocklyComponent
              ref={e => (this.simpleWorkspace = e)}
              readOnly={false}
              id="BlComponent"
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
              <CategoryLcd/>
              <CategoryBluetooth/>
              {/* <CategoryBluetooth />
              <CategoryBluetooth />
              <CategoryBluetooth />
              <CategoryBluetooth /> */}


            </BlocklyComponent>
          </header>
        </div>
      </div>

    );
  }
}

