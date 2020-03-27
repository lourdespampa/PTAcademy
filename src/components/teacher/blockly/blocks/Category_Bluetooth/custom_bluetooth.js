
import * as Blockly from '../../blockly copy/blockly';
import '../../fields/BlocklyReactField';
import '../../fields/DateField';
import {ReactBluetoothImg} from '../Category_Bluetooth/Modulo_ImgBluetooth';


/* 1er Bloque */
var colorBluetooth = Blockly.Arduino.colores.cate_bucles
var reactBluetoothComando = {
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    type: "react_bluetooth_comando",
    message0: "%1 %{BKY_BLUETOOTH_LECTURA} Rx %2 Tx %3 %4 Vcc %5 En %6 %7",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,
        },
        {
            type: "field_dropdown",
            name: "RX",
            options: Blockly.Arduino.pinesNormal.rxtx
        },
        {
            type: "field_dropdown",
            name: "TX",
            options: Blockly.Arduino.pinesNormal.rxtx
        },
        {
            type: "field_dropdown",
            name: "COMANDO",
            options: [
                ["2400", "2400"],
                ["4800", "4800"],
                ["9600", "9600"],
                ["19200", "19200"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]
        },
        {
            type: "field_dropdown",
            name: "VCC",
            options: Blockly.Arduino.pinesNormal.rxtx
        },
        {
            type: "field_dropdown",
            name: "VCC",
            options: Blockly.Arduino.pinesNormal.rxtx
        },
        {
            type: "field_dropdown",
            name: "COMANDO",
            options: [
                ["2400", "2400"],
                ["4800", "4800"],
                ["9600", "9600"],
                ["19200", "19200"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]
        }
    ],
    colour: colorBluetooth
};
Blockly.Blocks['react_bluetooth_comando'] = {
    init: function () {
        this.jsonInit(reactBluetoothComando);
    }
};

//

var reactBluetoothReadAvailable = {

    output: null,
    type: "react_bluetooth_read_available",
    message0: "%1 %{BKY_BLUETOOTH_AVAILABLE} ",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,
        }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_bluetooth_read_available'] = {
    init: function () {
        this.jsonInit(reactBluetoothReadAvailable);
    }
};

//

var reactSerialPrintBluetooth = {

    previousStatement: null,
    nextStatement: null,
    type: "react_serial_print_bluetooth",
    message0: "%1 %{BKY_BLUETOOTH_AVAILABLE} %2",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,

        },
        {
            type: "input_value",
            name: "CONTENT",
            check: ["Number", "String", "Boolean"],
          }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_serial_print_bluetooth'] = {
    init: function () {
        this.jsonInit(reactSerialPrintBluetooth);
    }
};

//

var reactSerialReadBluetooth = {

    output: null,
    type: "react_serial_read_bluetooth",
    message0: "%1 %{BKY_SERIAL_READ} ",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,

        }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_serial_read_bluetooth'] = {
    init: function () {
        this.jsonInit(reactSerialReadBluetooth);
    }
};

//

var reactBluetoothRead = {

    output: null,
    type: "react_bluetooth_read",
    message0: "%1 %{BKY_BLUETOOTH_AVAILABLE_BT} ",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,

        }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_bluetooth_read'] = {
    init: function () {
        this.jsonInit(reactBluetoothRead);
    }
};

//


var reactSerialWrite = {

    previousStatement: null,
    nextStatement: null,
    type: "react_serial_write",
    message0: "%1 %{BKY_SERIAL_WRITE} %2",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,

        },
        {
            type: "input_value",
            name: "CONTENT",
            check: ["Number", "String", "Boolean"],
          }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_serial_write'] = {
    init: function () {
        this.jsonInit(reactSerialWrite);
    }
};

//


var reactSerialBtRead = {

    output: null,
    type: "react_serial_bt_read",
    message0: "%1 %{BKY_BLUETOOTH_AVAILABLE_BT} ",
    args0: [
        {
            type: "field_image",
            src: ReactBluetoothImg(),
            width: 30,
            height: 30,
        }
    ],
    colour: colorBluetooth,
}
Blockly.Blocks['react_serial_bt_read'] = {
    init: function () {
        this.jsonInit(reactSerialBtRead);
    }
};
