
import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

/* 1er Bloque*/
var reactControlsRepeat = {

  type: "react_controls_repeat",
  message0: "%{BKY_CONTROLS_REPEAT_TITLE}",
  args0: [{
    type: "input_value",
    name: "TIMES",
    check: "Number"
  }],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{
    type: "input_statement",
    name: "DO"
  }],
  previousStatement: null,
  nextStatement: null,
  tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
  helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}"
};

Blockly.Blocks['react_controls_repeat'] = {
  init: function () {
    this.jsonInit(reactControlsRepeat);
    this.setStyle('loop_blocks');
  }
};
//------------------------------------//

/*2do bloque*/
var reactControlsFor =
{
  type: "react_controls_for",
  message0: "%{BKY_CONTROLS_FOR_TITLE}",
  args0: [{
    type: "field_variable",
    name: "VAR",
    variable: null
  },
  {
    type: "input_value",
    name: "FROM",
    check: "Number",
    align: "RIGHT"
  },
  {
    type: "input_value",
    name: "TO",
    check: "Number",
    align: "RIGHT"
  }],
  message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  args1: [{
    type: "input_statement",
    name: "DO"
  }],
  inputsInline: !0,
  previousStatement: null,
  nextStatement: null,
  style: "loop_blocks",
  helpUrl: "%{BKY_CONTROLS_FOR_HELPURL}",
  extensions: ["contextMenu_newGetVariableBlock", "controls_for_tooltip"]
};
Blockly.Blocks['react_controls_for'] = {
  init: function () {
    this.jsonInit(reactControlsFor);
    this.setStyle('loop_blocks');
  }
};

//---------------------------------------------//
/*3er bloque*/

var reactControlsWhile = {

  type: "react_controls_while",
  message0: "%{BKY_CONTROLS_WHILE}",
  args0: [
    {
      type: "input_value",
      name: "BOOL",
      check: "Boolean"
    }],
  message1: "%{BKY_CONTROLS_WHILE_DO} %1",
  args1: [{
    type: "input_statement",
    name: "DO"
  }],
  previousStatement: null,
  nextStatement: null,

};

Blockly.Blocks['react_controls_while'] = {
  init: function () {
    this.jsonInit(reactControlsWhile);
    this.setStyle('loop_blocks');
  }
};

//------------------///

/* 4to bloque */
var reactControlsFlowStatements = {
  type: "react_controls_flow_statements",
  message0: "%1",
  args0: [{
    type: "field_dropdown",
    name: "FLOW",
    options: [
      ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}", "BREAK"],
      ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}", "CONTINUE"]
    ]
  }],
  previousStatement: null,
  style: "loop_blocks",
  helpUrl: "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}",
  extensions: ["controls_flow_tooltip", "controls_flow_in_loop_check"]
}


Blockly.Blocks['react_controls_flow_statements'] = {
  init: function () {
    this.jsonInit(reactControlsFlowStatements);
    this.setStyle('loop_blocks');
  }
};
//-----------------//
