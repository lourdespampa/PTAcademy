
import * as Blockly from '../../blockly copy/blockly';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';


// 1er bloque
var reactServoWrite = {
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  type: "react_servo_write",
  message0: "%{BKY_SERVO_WRITE_TEXT1} %1 %{BKY_SERVO_ANGLE_TEXT1} %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    },
    {
      type: "input_value",
      name: "ANGLE",
      check: "Number"
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  tooltip: "%{BKY_SERVO_WRITE_TOOLTIP}",
  helpUrl: "%{BKY_SERVO_WRITE_HELPURL}",
}
Blockly.Blocks['react_servo_write'] = {
  init: function () {
    this.jsonInit(reactServoWrite);
  }
};
// 2er bloque
var reactServoRead = {
  output: null,
  inputsInline: true,
  type: "react_servo_read",
  message0: "%{BKY_SERVO_READ_TEXT1} %1 %{BKY_SERVO_READ_TEXT2}",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  tooltip: "%{BKY_SERVO_READ_TOOLTIP}",
  helpUrl: "%{BKY_SERVO_READ_HELPURL}",
}
Blockly.Blocks['react_servo_read'] = {
  init: function () {
    this.jsonInit(reactServoRead);
  }
};
// 3er bloque
var reactServoCustomAttach = {
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  type: "react_servo_custom_attach",
  message0:
    "%{BKY_SERVO_ATTACH_TEXT1} %1 %{BKY_SERVO_ATTACH_MIN_TEXT1} %2 %{BKY_SERVO_ATTACH_MAX_TEXT1} %3",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    },
    {
      type: "field_input",
      name: "MIN",
      text: "544"
    }, 
    {
      type: "field_input",
      name: "MAX",
      text: "2400"
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  tooltip: "%{BKY_SERVO_READ_TOOLTIP}",
  helpUrl: "%{BKY_SERVO_READ_HELPURL}",
}
Blockly.Blocks['react_servo_custom_attach'] = {
  init: function () {
    this.jsonInit(reactServoCustomAttach);
  }
};
// 4er bloque
var reactServoWriteus = {
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  type: "react_servo_writeus",
  message0: "%{BKY_SERVO_WRITE_TEXT1} %1 %{BKY_SERVO_ANGLE_US_TEXT1} %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    },
    {
      type: "input_value",
      name: "ANGLE_US",
      check: "Number"
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  tooltip: "%{BKY_SERVO_WRITE_US_TOOLTIP}",
  helpUrl: "%{BKY_SERVO_WRITE_US_HELPURL}",
}
Blockly.Blocks['react_servo_writeus'] = {
  init: function () {
    this.jsonInit(reactServoWriteus);
  }
};



