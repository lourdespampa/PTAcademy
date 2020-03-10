import * as Blockly from '../../blockly copy/core';

import '../../fields/BlocklyReactField';
import '../../fields/DateField';

//*1er Bloque//
var reactMathNumber = {

    type: "react_math_number",
    message0: "%1",
    args0: [{
        type: "field_number",
        name: "NUM",
        value: 0
    }],
    output: "Number",
    style: "math_blocks",
    extensions: ["parent_tooltip_when_inline"]
}
Blockly.Blocks['react_math_number'] = {
    init: function () {
        this.jsonInit(reactMathNumber);
        this.setStyle('math_blocks');
    }
};

//2do Bloque

var ReactCastNumber = {
    type: "react_cast_number",
    message0: "%{BKY_CAST_NUMBER} %1 %2",
    args0: [
        {
            type: "field_dropdown",
            name: "TYPE",
            options: [
                ["%{BKY_MATH_CAST_NUMBER_INT}", "(int)"],
                ["%{BKY_MATH_CAST_NUMBER_UNSIGNED_INT}", "(unsigned int)"],
                ["%{BKY_MATH_CAST_NUMBER_BYTE}", "(byte)"],
                ["%{BKY_MATH_CAST_NUMBER_WORD}", "(word)"],
                ["%{BKY_MATH_CAST_NUMBER_LONG}", "(long)"],
                ["%{BKY_MATH_CAST_NUMBER_UNSIDNED_LONG}", "(unsigned long)"],
                ["%{BKY_MATH_CAST_NUMBER_FLOAT}", "(float)"],
                ["%{BKY_MATH_CAST_NUMBER_DOUBLE}", "(double)"],
                ["%{BKY_MATH_CAST_NUMBER_CHAR}", "(char)"]
            ]

        }, {
            type: "input_value",
            name: "NUM",
            check: "Number"
        }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks"
}
Blockly.Blocks['react_cast_number'] = {
    init: function () {
        this.jsonInit(ReactCastNumber);
        this.setStyle('math_blocks');
    }
};

///


///3er Bloque


var ReactMathAritmetic =
{
    type: "react_math_arithmetic",
    message0: "%1 %2 %3",
    args0: [{
        type: "input_value",
        name: "A",
        check: "Number"
    },
    {
        type: "field_dropdown",
        name: "OP",
        options: [
            ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
            ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
            ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
            ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
            ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
    },
    {
        type: "input_value",
        name: "B",
        check: "Number"
    }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
    extensions: ["math_op_tooltip"]
}
Blockly.Blocks['react_math_arithmetic'] = {
    init: function () {
        this.jsonInit(ReactMathAritmetic);
        this.setStyle('math_blocks');
    }
};

/// 4to bloque

var ReactMathSingle =
{
    type: "react_math_single",
    message0: "%1 %2",
    args0: [{
        type: "field_dropdown",
        name: "OP",
        options: [
            ["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"],
            ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"],
            ["-", "NEG"],
            ["ln", "LN"],
            ["log10", "LOG10"],
            ["e^", "EXP"],
            ["10^", "POW10"]
        ]
    },
    {
        type: "input_value",
        name: "NUM",
        check: "Number"
    }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks"
}
Blockly.Blocks['react_math_single'] = {
    init: function () {
        this.jsonInit(ReactMathSingle);
        this.setStyle('math_blocks');
    }
};

///5to Bloque

var ReactMathConstrain =
{
    type: "react_math_constrain",
    message0: "%{BKY_MATH_CONSTRAIN_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: "Number"
    },
    {
        type: "input_value",
        name: "LOW",
        check: "Number"
    },
    {
        type: "input_value",
        name: "HIGH",
        check: "Number"
    }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
    helpUrl: "%{BKY_MATH_CONSTRAIN_HELPURL}"
}
Blockly.Blocks['react_math_constrain'] = {
    init: function () {
        this.jsonInit(ReactMathConstrain);
        this.setStyle('math_blocks');
    }
};

//6to Bloque

var ReactMathPow =
{
    type: "react_math_pow",
    message0: "%{BKY_MATH_POW}",
    args0: [{
        type: "input_value",
        name: "pow",
        check: "Number"
    },
    {
        type: "input_value",
        name: "exp",
        check: "Number"
    }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
    helpUrl: "%{BKY_MATH_CONSTRAIN_HELPURL}"
}
Blockly.Blocks['react_math_pow'] = {
    init: function () {
        this.jsonInit(ReactMathPow);
        this.setStyle('math_blocks');
    }
};

//7to Bloque

var ReactMathRandomMAXMIN =
{
    type: "react_math_random_max_min",
    message0: "%{BKY_MATH_RANDOM_MAX}",
    args0: [{
        type: "input_value",
        name: "MAX",
        check: "Number"
    },
    {
        type: "input_value",
        name: "MIN",
        check: "Number"
    }],
    inputsInline: !0,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}"
}
Blockly.Blocks['react_math_random_max_min'] = {
    init: function () {
        this.jsonInit(ReactMathRandomMAXMIN);
        this.setStyle('math_blocks');
    }
};