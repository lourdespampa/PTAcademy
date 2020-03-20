import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_tone";
import "../../blockly copy/media/robot.png"
class Cate_Tone extends React.Component {

    render() {
        return (
            <Category id="category_tone" name="Tone">
                <Block type="react_tone"></Block>
                <Block type="react_custom_tone">
                <Value name="PIN">
                    <Block type="react_math_number">
                        <Field name="NUM">0</Field>
                    </Block>
                </Value>
                <Value name="FREQ">
                    <Block type="react_math_number">
                      <Field name="NUM">255</Field>
                    </Block>
                </Value>
                <Value name="DURATION">
                    <Block type="react_math_number">
                        <Field name="NUM">300</Field>
                    </Block>
                </Value>
            </Block>

            </Category>
        );
    }
}
export default Cate_Tone;
