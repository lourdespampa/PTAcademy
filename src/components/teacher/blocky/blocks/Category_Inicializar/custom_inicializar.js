import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

//*1er Bloque//
var reactSetup = {

    type: "react_setup",
    message0: "%{BKY_CONTROLS_IF_MSG_IF} %1",
    args0: [{
        type: "input_value",
        name: "IF0",
        check: "Boolean"
    }],
    message1: "%{BKY_CONTROLS_IF_MSG_THEN} %1",
    args1: [{
        type: "input_statement",
        name: "DO0"
    }],
    previousStatement: null,
    nextStatement: null,
    style: "logic_blocks",
    helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
}
Blockly.Blocks['react_setup'] = {
    init: function () {
        this.jsonInit(reactSetup);
        this.setStyle('logic_blocks');
    }
};