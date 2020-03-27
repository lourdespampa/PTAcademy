
import * as Blockly from '../../blockly copy/blockly';
import '../../fields/BlocklyReactField';
import '../../fields/DateField';
import { ReactLCDImg } from '../Category_Lcd/Modulo_ImgLcd';


/* 1er Bloque */
var colorBluetooth = Blockly.Arduino.colores.cate_bucles
var ReactLcdInit = {
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_init",
    message0: "%1 %{BKY_LCD_PIN} rs %2 rw %3 enable%4 D4 %5 D5 %6 D6 %7 D7 %8",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64,
            height: 64,
        },
        {
            type: "field_dropdown",
            name: "RS",
            options: Blockly.Arduino.pinesNormal.digital
        },
        {
            type: "field_dropdown",
            name: "Enable",
            options: Blockly.Arduino.pinesNormal.lcd
        },
        {
            type: "field_dropdown",
            name: "RW",
            options: Blockly.Arduino.pinesNormal.digital

        },
        {
            type: "field_dropdown",
            name: "D4",
            options: Blockly.Arduino.pinesNormal.digital
        },
        {
            type: "field_dropdown",
            name: "D5",
            options: Blockly.Arduino.pinesNormal.digital
        },
        {
            type: "field_dropdown",
            name: "D6",
            options: Blockly.Arduino.pinesNormal.digital

        },
        {
            type: "field_dropdown",
            name: "D7",
            options: Blockly.Arduino.pinesNormal.digital
        }
    ],
    colour: colorBluetooth
};
Blockly.Blocks['react_lcd_init'] = {
    init: function () {
        this.jsonInit(ReactLcdInit);
    }
};

/*2do bloque*/
var ReactLcdBegin = {
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_begin",
    message0: "%1 Begin Col %2 Row %3",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64, 
            height: 64,
        },
        {
            type: "field_input",
            name: "COL",
            text: "16"
        },
        {
            type: "field_input",
            name: "ROW",
            text: "2"
        }
    ],
    colour: colorBluetooth
};
Blockly.Blocks['react_lcd_begin'] = {
    init: function () {
        this.jsonInit(ReactLcdBegin);
    }
};


/** */

/*3do bloque */

var ReactLcdPrint = {

    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_print",
    message0: "%1 Print %2 ",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64,
            height: 64,
        },
        {
            type: "input_value",
            name: "PRINT",
            text: ""
        }
    ],
    colour: Blockly.Arduino.colores.cate_digital,
};
Blockly.Blocks['react_lcd_print'] = {
    init: function () {
        this.jsonInit(ReactLcdPrint);
    }
};

/*4to bloque*/

var ReactLcdSetcursor = {

    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_setcursor",
    message0: "%1 setCursor Col %2 Row %3",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64,
            height: 64,
        },
        {
            type: "input_value",
            name: "COLS",
            check: "Number",
            align: "RIGHT"
        },
        {
            type: "input_value",
            name: "ROWS",
            check: "Number",
            align: "RIGHT"
        }
    ],
    colour: Blockly.Arduino.colores.cate_digital,
};
Blockly.Blocks['react_lcd_setcursor'] = {
    init: function () {
        this.jsonInit(ReactLcdSetcursor);
    }
};
/*5to bloque*/


var ReactLcdClear = {

    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_clear",
    message0: "%1 Clear",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64,
            height: 64,
        }

    ],
    colour: Blockly.Arduino.colores.cate_digital,
};
Blockly.Blocks['react_lcd_clear'] = {
    init: function () {
        this.jsonInit(ReactLcdClear);
    }
};

/*6to bloque*/


var ReactLcdScroll = {

    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_lcd_scroll",
    message0: "%1 AutoScroll%2",
    args0: [
        {
            type: "field_image",
            src: ReactLCDImg(),
            width: 64,
            height: 64,
        },
        {
            type: "field_dropdown",
            name: "SW",
            options:
                [["On", "1"],
                ["Off", "0"],
                ]
        },
    ],
    colour: Blockly.Arduino.colores.cate_digital,
};
Blockly.Blocks['react_lcd_scroll'] = {
    init: function () {
        this.jsonInit(ReactLcdScroll);
    }
};