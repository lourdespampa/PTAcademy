import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

//*1er Bloque//
var ReactInitSetup = {
    nextStatement: null,
    type: "react_setup",
    message0: "%{BKY_INITIALIZES_SETUP_APPENDTEXT}",
    message1: "%1",
    args1: [{
        type: "input_statement",
        name: "CONTENT"
    }],
    colour: 0,
    tooltip: "%{BKY_INITIALIZES_SETUP_TOOLTIP}",
    helpUrl: "%{BKY_INITIALIZES_SETUP_HELPURL}",
}
Blockly.Blocks['react_setup'] = {
    init: function () {
        this.jsonInit(ReactInitSetup);
    }
};

/* 2er Bloque  */
var ReactInitLoop = {
    previousStatement: null,
    type: "react_initializes_loop",
    message0: "%{BKY_INITIALIZES_LOOP_APPENDTEXT}",
    message1: "%1",
    args1: [{
        type: "input_statement",
        name: "CONTENT"
    }],
    colour: 0,
    tooltip: "%{BKY_INITIALIZES_LOOP_TOOLTIP}",
    helpUrl: "%{BKY_INITIALIZES_LOOP_HELPURL}",
}
Blockly.Blocks['react_initializes_loop'] = {
    init: function () {
        this.jsonInit(ReactInitLoop);
    }
};
/* 3er bloque  */
var ReactInitTemp = {
    type: "react_initializes_temp",
    message0: "%{BKY_INITIALIZES_TEMP_APPENDTEXT}",
    message1: "%1",
    args1: [{
        type: "input_statement",
        name: "CONTENT"
    }],
    colour: 0,
    tooltip: "%{BKY_INITIALIZES_TEMP_TOOLTIP}",
    helpUrl: "%{BKY_INITIALIZES_TEMP_HELPURL}",
}
Blockly.Blocks['react_initializes_temp'] = {
    init: function () {
        this.jsonInit(ReactInitTemp);
    }
};