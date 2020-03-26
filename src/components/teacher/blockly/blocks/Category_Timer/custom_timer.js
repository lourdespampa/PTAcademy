
import * as Blockly from '../../blockly copy/blockly';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

/* 1er Bloque*/
var reactMillis = {
  type: "react_millis",
  message0: "%{BKY_TIMES_MILLIS_APPENDTEXT}",
  colour: Blockly.Arduino.colores.cate_bucles,
  output: null,
  tooltip: "%{BKY_TIMES_MILLIS_TOOLTIP}",
  helpUrl: "%{BKY_TIMES_MILLIS_HELPURL}",
}

Blockly.Blocks['react_millis'] = {
  init: function () {
    this.jsonInit(reactMillis);
  }
};
/* 2er Bloque*/
var reactMicros = {
  type: "react_micros",
  message0: "%{BKY_TIMES_MICROS_APPENDTEXT}",
  colour: Blockly.Arduino.colores.cate_bucles,
  output: null,
  tooltip: "%{BKY_TIMES_MICROS_TOOLTIP}",
  helpUrl: "%{BKY_TIMES_MICROS_HELPURL}",
}

Blockly.Blocks['react_micros'] = {
  init: function () {
    this.jsonInit(reactMicros);
  }
};
// 3er bloque
var reactDelayCustom = {
  previousStatement: null,
  nextStatement: null,
  type: "react_delay_custom",
  message0: "%{BKY_TIMES_DELAY_APPENDTEXT} %1",
  args0: [{
      type: "input_value",
      name: "DELAY_TIME",
      check: "Number"
  }],
  colour: Blockly.Arduino.colores.cate_bucles,
  tooltip: "%{BKY_TIMES_DELAY_TOOLTIP}",
  helpUrl: "%{BKY_TIMES_DELAY_HELPURL}",
}
Blockly.Blocks['react_delay_custom'] = {
  init: function () {
      this.jsonInit(reactDelayCustom);
  }
};
