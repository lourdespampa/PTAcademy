import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_Servo";
class Cate_Servo extends React.Component {

    render() {
        return (
            <Category id="Category_servo" NAME="Servo">
                <Block type="react_servo_write">
                    <Value name="ANGLE">
                        <Block type="react_math_number">
                            <Field name="NUM">0</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_servo_read"></Block>
                <Block type="react_servo_custom_attach"></Block>
                <Block type="react_servo_writeus">
                    <Value name="ANGLE_US">
                        <Block type="react_math_number">
                            <Field name="NUM">1500</Field>
                        </Block>
                    </Value>
                </Block>
            </Category>
        );
    }
}
export default Cate_Servo;
