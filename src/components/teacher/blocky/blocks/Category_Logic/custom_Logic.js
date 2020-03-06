import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

//*1er Bloque//
var reactControls_If = {

    type: "react_controls_if",
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
    mutator: "controls_if_mutator",
    extensions: ["controls_if_tooltip"]
}
Blockly.Blocks['react_controls_if'] = {
    init: function () {
        this.jsonInit(reactControls_If);
        this.setStyle('logic_blocks');
    }
};

//2do Bloque
var ReactLogicCompare =
{
    type: "react_logic_compare",
    message0: "%1 %2 %3",
    args0: [{
        type: "input_value",
        name: "A"
    },
    {
        type: "field_dropdown",
        name: "OP",
        options: [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["\u200f<", "LT"],
            ["\u200f\u2264", "LTE"],
            ["\u200f>", "GT"],
            ["\u200f\u2265", "GTE"]
        ]
    },
    {
        type: "input_value",
        name: "B"
    }],
    inputsInline: !0,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
    extensions: ["logic_compare", "logic_op_tooltip"]
}
Blockly.Blocks['react_logic_compare'] = {
    init: function () {
        this.jsonInit(ReactLogicCompare);
        this.setStyle('logic_blocks');
    }
};
///

//3er Bloque
var ReactLogicOperation =
{
    type: "react_logic_operation",
    message0: "%1 %2 %3",
    args0: [{
        type: "input_value",
        name: "A",
        check: "Boolean"
    },
    {
        type: "field_dropdown",
        name: "OP",
        options: [
            ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
            ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
        ]
    },
    {
        type: "input_value",
        name: "B",
        check: "Boolean"
    }],
    inputsInline: !0,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
    extensions: ["logic_op_tooltip"]
}
Blockly.Blocks['react_logic_operation'] = {
    init: function () {
        this.jsonInit(ReactLogicOperation);
        this.setStyle('logic_blocks');
    }
};
////

//4to Bloque
var ReactLogicNegate =
{
    type: "react_logic_negate",
    message0: "%{BKY_LOGIC_NEGATE_TITLE}",
    args0: [{
        type: "input_value",
        name: "BOOL",
        check: "Boolean"
    }],
    output: "Boolean",
    style: "logic_blocks",
    tooltip: "%{BKY_LOGIC_NEGATE_TOOLTIP}",
    helpUrl: "%{BKY_LOGIC_NEGATE_HELPURL}"
}
Blockly.Blocks['react_logic_negate'] = {
    init: function () {
        this.jsonInit(ReactLogicNegate);
        this.setStyle('logic_blocks');
    }
};

///

//5to Bloque
var ReactLogicBoolean =
{
    type: "react_logic_boolean",
    message0: "%1",
    args0: [{
        type: "field_dropdown",
        name: "BOOL",
        options: [
            ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
            ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
        ]
    }],
    output: "Boolean",
    style: "logic_blocks",
    tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}"
}
Blockly.Blocks['react_logic_boolean'] = {
    init: function () {
        this.jsonInit(ReactLogicBoolean);
        this.setStyle('logic_blocks');
    }
};
////
