import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_digital";
class Cate_digital extends React.Component {

    render() {
        return (
            <Category id="category_digital" name="Digital I/O">
                <Block type="react_inout_digital"></Block>
                <Block type="react_inout_highlow"></Block>
                <Block type="react_digital_read_pullup">
                    <Value name="PIN_READ">
                        <Block type="react_math_number">
                            <Field name="NUM">0</Field>
                        </Block>
                    </Value>
                </Block>

            </Category>
            
        );
    }
}
export default Cate_digital;
