import React from "react";
import {
    Block,
    Value,
    Field,
    Shadow,
    Category
} from "../../Blockly";
import "./custom_Bucle";
class Cate_bucle extends React.Component {

    render() {
        return (
            <Category name="Loops">
                <Block type="react_controls_repeat">
                    <Value name="TIMES">
                        <Shadow type="react_math_number">
                            <Field name="NUM">10</Field>
                        </Shadow>
                    </Value>
                </Block>
                <Block type="react_controls_for">
                    <Value name="FROM">
                        <Block type="react_math_number">
                            <Field name="NUM">0</Field>
                        </Block>
                    </Value>
                    <Value name="TO">
                        <Block type="react_math_number">
                            <Field name="NUM">10</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_controls_while">
                    <Value name="BOOL">
                        <Block type="react_logic_boolean">
                            <Field name="BOOL">TRUE</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_controls_flow_statements">
                </Block>
            </Category>
        );
    }
}
export default Cate_bucle;
