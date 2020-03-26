import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_bluetooth";

class cate_bluetooth extends React.Component {

    render() {
        return (
            <Category id="category_bluetooth" name="Bluetooth">

                <Block type="react_bluetooth_comando">
                    <Field name="TX">11</Field>
                    <Field name="RX">10</Field>
                    <Field name="COMANDO">38400</Field>
                    <Field name="VCC">8</Field>
                    <Field name="EN">9</Field>
                    <Field name="BAUD">9600</Field>
                </Block>

                <Block type="react_bluetooth_read_available"></Block>

                <Block type="react_serial_print_bluetooth">
                    <Value name="CONTENT"></Value>
                </Block>

                <Block type="react_serial_read_bluetooth"></Block>

                <Block type="react_bluetooth_read"></Block>

                <Block type="react_serial_write">
                    <Value name="CONTENT"></Value>
                </Block>

                <Block type="react_serial_bt_read"></Block>
            </Category>

        )
    }
}
export default cate_bluetooth