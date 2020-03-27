
import * as Blockly from '../../../blockly copy/core';

import '../../../fields/BlocklyReactField';
import '../../../fields/DateField';
import {ReactLineFollowerImg} from './Modulo_ImgFollower';


// import '../../blockly copy/media/robot.png'
/* 1er Bloque*/

var ReactControlsSwitch = { 
  type: "react_controls_switch",
  message0: "%{BKY_CONTROLS_SWITCH}%1",
  args0: [
    {
      type: "input_value",
      name: "IF0",
      check: "Boolean"
  }],
  message1: "%{BKY_CONTROLS_VACIO} %1",
  args1: [{
      type: "input_statement",
      name: "DO0"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: Blockly.Arduino.colores.cate_bucles,
}
Blockly.Blocks['react_controls_switch'] = {
  init: function () {
    this.jsonInit(ReactControlsSwitch);
  }
};
/* 2 bloque*/
var ReactControlsCase = {
    type: "react_controls_case",
  message0: "%{BKY_CONTROLS_CASE}%1",
  args0: [{
      type: "input_value",
      name: "establecer",
      check: "Number"
     
  }],
  message1: "%{BKY_CONTROLS_VACIO} %1",
  args1: [{
      type: "input_statement",
      name: "DO0"
  }],
  previousStatement: null,
  nextStatement: null,
  colour: Blockly.Arduino.colores.cate_bucles,
}
Blockly.Blocks['react_controls_case'] = {
  init: function () {
    this.jsonInit(ReactControlsCase);
  }
};

/* 3*/
var ReactSensorDerecha = {
  type: "react_SensorDerecha",
  message0: "%1  %{BKY_SENSOR_DERECHA}%2",
  args0: [{
      type: "field_image",
        src: ReactLineFollowerImg(),
        width: 86,
        height: 60,
        alt :"*"
  },{
    type: "field_input",
    name: "NUM",
    text: "0"

  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  output: "Boolean",
}
Blockly.Blocks['react_SensorDerecha'] = {
init: function () {
  this.jsonInit(ReactSensorDerecha);
}
};

/*4TO BLOQUE */


var ReactSensorIzquierda = {
  type: "react_SensorIzquierda",
  message0: "%1  %{BKY_SENSOR_IZQUIERDA}%2",
  args0: [{
      type: "field_image",
        src: ReactLineFollowerImg(),
        width: 86,
        height: 60,
        alt :"*"
  },{
    type: "field_input",
    name: "NUM",
    text: "0"

  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  output: "Boolean",
}
Blockly.Blocks['react_SensorIzquierda'] = {
init: function () {
  this.jsonInit(ReactSensorIzquierda);
}
};

/*5to bloque */

var ReactAnalogicoVelocidad = {

  type: "react_Analogico_Velocidad",
  message0: "%{BKY_ANALOG_VELOCIDAD3}",
  args0: [{
  type: "field_input",
  name: "NUM3",
  text: "0"

}],
message1: "%{BKY_ANALOG_VELOCIDAD6}",
  args1: [{
  type: "field_input",
  name: "NUM6",
  text: "0"

}],
  previousStatement: null,
};

Blockly.Blocks['react_Analogico_Velocidad'] = {
  init: function () {
    this.jsonInit(ReactAnalogicoVelocidad);
    this.setStyle('loop_blocks');
  }
};