import * as Blockly from "../blockly copy/core";
import "../blockly copy/Arduino";

Blockly.Arduino["test_react_field"] = function (block) {
  return "console.log('custom block');\n";
};

Blockly.Arduino["test_react_date_field"] = function (block) {
  return "setup()\n console.log(" + block.getField("DATE").getText() + ");\n";
};
