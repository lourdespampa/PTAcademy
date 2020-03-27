
import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

/* 1er Bloque*/
var reactVariableGet = {
  type: "variables_get",
  message0: "%1",
  args0: [{
    type: "field_variable",
    name: "VAR",
    variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
  }],
  output: null, 
  tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
  extensions: ["contextMenu_variableSetterGetter"]
}

Blockly.Blocks['variables_get'] = {
  init: function () {
    this.jsonInit(reactVariableGet);
    this.setStyle('variable_blocks');
  }
};
//------------------------------------//

var reactVariableSet=
  {
		type: "variables_set",
		message0: "%{BKY_VARIABLES_SET}",
		args0: [{
			type: "field_variable",
			name: "VAR",
			variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
		},
		{
			type: "input_value",
			name: "VALUE"
		}],
		previousStatement: null,
		nextStatement: null,
		tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
		extensions: ["contextMenu_variableSetterGetter"]
	}
  Blockly.Blocks['variables_set'] = {
    init: function () {
      this.jsonInit(reactVariableSet);
      this.setStyle('variable_blocks');
    }
  };