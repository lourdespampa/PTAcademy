import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_serial"
class Cate_serial extends React.Component {

    render() {
        return (
            <Category id="category_serial" name="Serial I/O">
                <Block type="react_serial_init">
                    <Value name="SPEED">
                        <Block type="react_math_number">
                            <Field name="NUM">9600</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_serial_available"></Block>
                <Block type="react_serial_print">
                    <Value name="CONTENT">
                        <Block type="react_text">
                            <Field name="TEXT"></Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_serial_println">
                    <Value name="CONTENT">
                        <Block type="react_text">
                            <Field name="TEXT"></Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_serial_read"></Block>
            </Category>
        );
    }
}
export default Cate_serial;
