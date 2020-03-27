
import * as Blockly from '../../../blockly copy/core';

import '../../../fields/BlocklyReactField';
import '../../../fields/DateField';
import {ReactPlayBotImg} from './Modulo_ImgEngines.js';
import {ReactMotoresImg} from './Modulo_ImgEngines.js';

// import '../../blockly copy/media/robot.png'
/* 1er Bloque*/

var ReactMotores = {
  type: "react_playbot",
  message0: "%{BKY_MOTORES_ROBOT}",
  
  args0: [
    {
    type: "field_image",
      src: ReactPlayBotImg(),
      width: 120,
      height: 70,
      alt :"*"
    },
    {
      type: "input_value",
      name: "Derecho",
      check: "Number",
    
  },
  {
      type: "input_value",
      name: "Izquierdo",
      check: "Number"
  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  nextStatement: null,
}
Blockly.Blocks['react_playbot'] = {
  init: function () {
    this.jsonInit(ReactMotores);
  }
};
/* 2 bloque*/
var ReactRobotAvanzar = {
  type: "react_robot_avanzar",
  message0: "%1 %{BKY_ROBOT_AVANZAR}",
  args0: [
    {
    type: "field_image",
      src: ReactMotoresImg(),
      width: 80,
      height: 40,
      alt :"*"
    }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_robot_avanzar'] = {
  init: function () {
    this.jsonInit(ReactRobotAvanzar);
  }
};

/* 3 bloque*/
var ReactRobotAtras = {
  type: "react_robot_atras",
  message0: "%1 %{BKY_ROBOT_ATRAS}",
  args0: [
    {
    type: "field_image",
      src: ReactMotoresImg(),
      width: 80,
      height: 40,
      alt :"*"
    }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_robot_atras'] = {
  init: function () {
    this.jsonInit(ReactRobotAtras);
  }
};

/* 4 bloque*/
var ReactRobotIzquierda = {
  type: "react_robot_izquierda",
  message0: "%1 %{BKY_ROBOT_IZQUIERDA}",
  args0: [
    {
    type: "field_image",
      src: ReactMotoresImg(),
      width: 80,
      height: 40,
      alt :"*"
    }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_robot_izquierda'] = {
  init: function () {
    this.jsonInit(ReactRobotIzquierda);
  }
};
/* 5 bloque*/
var ReactRobotDerecha = {
  type: "react_robot_derecha",
  message0: "%1 %{BKY_ROBOT_DERECHA}",
  args0: [
    {
    type: "field_image",
      src: ReactMotoresImg(),
      width: 80,
      height: 40,
      alt :"*"
    }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_robot_derecha'] = {
  init: function () {
    this.jsonInit(ReactRobotDerecha);
  }
};
/* 6 bloque*/
var ReactRobotDetener = {
  type: "react_robot_detener",
  message0: "%1 %{BKY_ROBOT_DETENER}",
  args0: [
    {
    type: "field_image",
      src: ReactMotoresImg(),
      width: 80,
      height: 40,
      alt :"*"
    }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_robot_detener'] = {
  init: function () {
    this.jsonInit(ReactRobotDetener);
  }
};