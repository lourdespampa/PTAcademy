import * as Blockly from '../../blockly copy/blockly';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

//*1er Bloque//
var reactSerialInit = {
    previousStatement: null,
    nextStatement: null,
    type: "react_serial_init",
    message0: "%{BKY_SERIAL_INIT} %1",
    args0: [{
        type: "input_value",
        name: "SPEED",
        check: "Number"
    }],
    colour: Blockly.Arduino.colores.cate_bucles,
    tooltip: "%{BKY_SERIAL_INIT_TOOLTIP}",
    helpUrl: "%{BKY_SERIAL_INIT_HELPURL}",
}
Blockly.Blocks['react_serial_init'] = {
    init: function () {
        this.jsonInit(reactSerialInit);
    }
};
/* 2er bloque  */
var reactSerialAvailable = {
    type: "react_serial_available",
    message0: "%{BKY_SERIAL_AVAILABLE_APPENDTEXT}",
    colour: Blockly.Arduino.colores.cate_bucles,
    output: null,
    tooltip: "%{BKY_SERIAL_AVAILABLE_TOOLTIP}",
    helpUrl: "%{BKY_SERIAL_AVAILABLE_HELPURL}",
}
Blockly.Blocks['react_serial_available'] = {
    init: function () {
        this.jsonInit(reactSerialAvailable);
    }
};
/* 3er bloque  */
var reactSerialPrint = {
    previousStatement: null,
    nextStatement: null,
    type: "react_serial_print",
    message0: "%{BKY_SERIAL_PRINT_APPENDTEXT} %1",
    args0: [{
        type: "input_value",
        name: "CONTENT",
        check: ["Number", "String", "Boolean"]
    }],
    colour: Blockly.Arduino.colores.cate_bucles,
    tooltip: "%{BKY_SERIAL_PRINT_TOOLTIP}",
    helpUrl: "%{BKY_SERIAL_PRINT_HELPURL}",
}
Blockly.Blocks['react_serial_print'] = {
    init: function () {
        this.jsonInit(reactSerialPrint);
    }
};
/* 4er bloque  */
var reactSerialPrintln = {
    previousStatement: null,
    nextStatement: null,
    type: "react_serial_println",
    message0: "%{BKY_SERIAL_PRINTLN_APPENDTEXT} %1",
    args0: [{
        type: "input_value",
        name: "CONTENT",
        check: ["Number", "String", "Boolean"]
    }],
    colour: Blockly.Arduino.colores.cate_bucles,
    tooltip: "%{BKY_SERIAL_PRINTLN_TOOLTIP}",
    helpUrl: "%{BKY_SERIAL_PRINTLN_HELPURL}",
}
Blockly.Blocks['react_serial_println'] = {
    init: function () {
        this.jsonInit(reactSerialPrintln);
    }
};
/* 4er bloque  */
var reactSerialRead = {
    type: "react_serial_read",
    message0: "%{BKY_SERIAL_READ_APPENDTEXT}",
    colour: Blockly.Arduino.colores.cate_bucles,
    output: null,
    tooltip: "%{BKY_SERIAL_READ_TOOLTIP}",
    helpUrl: "%{BKY_SERIAL_READ_HELPURL}",
}
Blockly.Blocks['react_serial_read'] = {
    init: function () {
        this.jsonInit(reactSerialRead);
    }
};