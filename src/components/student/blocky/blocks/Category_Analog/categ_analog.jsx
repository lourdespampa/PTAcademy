import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_analog";

class Cate_analog extends React.Component {

    render() {
        return (
            <Category id="category_analog" Name="Analog I/O">
                <Block type="react_Analog_Read"></Block>
                <Block type="react_Analog_write">
                    <Value name="RANGE">
                        <Block type="react_math_number">
                            <Field name="NUM">0</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_custom_analog_read">
                    <Value name="PIN_ANALOGREAD">
                        <Block type="react_math_number">
                            <Field name="NUM">14</Field>
                        </Block>
                    </Value>
                </Block> 
            </Category>
            
        )
    }
}
export default Cate_analog