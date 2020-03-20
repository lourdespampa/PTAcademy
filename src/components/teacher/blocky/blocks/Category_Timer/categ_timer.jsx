import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_timer";
class Cate_time extends React.Component {

    render() {
        return (
            <Category id="category_time" NAME="Time">
                <Block type="react_millis"></Block>
                <Block type="react_micros"></Block>
                <Block type="react_delay_custom">
                    <Value name="DELAY_TIME">
                        <Block type="react_math_number">
                            <Field name="NUM">1000</Field>
                        </Block>
                    </Value>
                </Block> 
            </Category>
            
        );
    }
}
export default Cate_time;
