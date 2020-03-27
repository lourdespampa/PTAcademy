import * as Blockly from '../../blockly copy/blockly.js';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';
import '../../Code/Arduino';
 


/* 1er Bloque
*/
var ReactTone = {
  type: "react_tone",
  message0: "%{BKY_INOUT_TONE_PIN}%1",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    }
  ],
  message1: "%{BKY_INOUT_TONE_FREQ}%1",
  args1: [{
    type: "field_dropdown",
    name: "FREQ",
   options: Blockly.Arduino.pinesNormal.tone

  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_tone'] = {
  init: function () {
    this.jsonInit(ReactTone);
  }
};
/* 2do Bloque
*/  
var ReactCustomTone = {
  type: "react_custom_tone",
  message0: "%{BKY_INOUT_TONE_PIN}%1",
  args0: [{
    type: "input_value",
    name: "PIN",
    check: "Number"
  }],
  message1: "%{BKY_INOUT_TONE_FREQ}%1",
  args1: [{
    type: "input_value",
    name: "FREQ",
    check: "Number"
  }],
  message2: "%{BKY_INOUT_TONE_DURATION}%1",
  args2: [{
    type: "input_value",
    name: "DURATION",
    check: "Number"
  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_custom_tone'] = {
  init: function () {
    this.jsonInit(ReactCustomTone);
  }
};
//------------------------------------//
