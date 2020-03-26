
import * as Blockly from '../../blockly copy/blockly';
import '../../fields/BlocklyReactField';
import '../../fields/DateField';


/* 1er Bloque */
var reactAnalRead = {
  type: "react_Analog_Read",
  message0: "%{BKY_INOUT_ANALOG_READ_APPENDTEXT} %1",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.analog
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  output: null,
  tooltip: "%{BKY_INOUT_ANALOG_READ_TOOLTIP}",
  helpUrl: "%{BKY_INOUT_ANALOG_READ_HELPURL}"
};
Blockly.Blocks['react_Analog_Read'] = {
  init: function () {
    this.jsonInit(reactAnalRead);
  }
};
/* 2er Bloque */
var reactAnalogwrite = {

  previousStatement: null,
  nextStatement: null,
  type: "react_Analog_write",
  message0: "%{BKY_INOUT_ANALOG_WRITE_APPENDTEXT_PIN} %1 %{BKY_INOUT_ANALOG_WRITE_APPENDTEXT_VALUE} %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PIN",
      options: Blockly.Arduino.pinesNormal.digital
    },
    {
      type: "input_value",
      name: "RANGE",
      check: "Number",
      align: "RIGHT"
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  inputsInline: !0,
  tooltip: "%{BKY_INOUT_ANALOG_READ_TOOLTIP}",
  helpUrl: "%{BKY_INOUT_ANALOG_READ_HELPURL}"
}
Blockly.Blocks['react_Analog_write'] = {
  init: function () {
    this.jsonInit(reactAnalogwrite);
  }
};
/* 3er bloque */
var reactCustomAnalogRead1 = {
  type: "react_custom_analog_read",
  message0: "%{BKY_INOUT_ANALOG_READ_APPENDTEXT} %1",
  args0: [
    {
      type: "input_value",
      name: "PIN_ANALOGREAD",
      check: "Number"
    }
  ],
  colour: Blockly.Arduino.colores.cate_bucles,
  inputsInline: !0,
  output: null,
  tooltip: "%{BKY_INOUT_ANALOG_READ_TOOLTIP}",
  helpUrl: "%{BKY_INOUT_ANALOG_READ_HELPURL}"
}
Blockly.Blocks['react_custom_analog_read'] = {
  init: function () {
    this.jsonInit(reactCustomAnalogRead1);
  }
};
