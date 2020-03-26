
import * as Blockly from '../../blockly copy/blockly.js';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';
import '../../Code/Arduino';

/* 1er Bloque
*/
var ReactInoutDigital = {
  type: "react_inout_digital",
  message0: "%{BKY_INOUT_DIGITAL_PIN} %1",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital 
    }
  ],
  message1: "%{BKY_INOUT_DIGITAL_STAT} %1",
  args1: [{
    type: "field_dropdown",
    name: "STAT",
    options: [
      ["%{BKY_INOUT_DIGITAL_HIGH}", "HIGH"],
      ["%{BKY_INOUT_DIGITAL_LOW}", "LOW"]
    ]
  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
}
Blockly.Blocks['react_inout_digital'] = {
  init: function () {
    this.jsonInit(ReactInoutDigital);
  }
};
//------------------------------------//
//bloque 2 
var ReactInoutHighLow =
{
  type: "react_inout_highlow",
  message0: "%1",
  args0: [{
    type: "field_dropdown",
    name: "BOOL",
    options: [
      ["%{BKY_INOUT_DIGITAL_HIGH}", "HIGH"],
      ["%{BKY_INOUT_DIGITAL_LOW}", "LOW"]
    ]
  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  output: "Boolean",

} 
Blockly.Blocks['react_inout_highlow'] = {
  init: function () {
    this.jsonInit(ReactInoutHighLow);
  }
};
//Bloque 3

var ReactDigitalReadPullup =
{
  type: "react_digital_read_pullup",
  message0: "%{BKY_INOUT_DIGITAL_READ}%1",
  args0: [{

    type: "input_value",
    name: "PIN_READ",
    check: "Number",
    align: "RIGHT"

  }],
  colour: Blockly.Arduino.colores.cate_digital,
  inputsInline: !0,
  output: "Boolean",

}
Blockly.Blocks['react_digital_read_pullup'] = {
  init: function () {
    this.jsonInit(ReactDigitalReadPullup);
  }
};
