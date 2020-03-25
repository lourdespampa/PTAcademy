import React from "react";
import {
    Block,
    Category
} from "../../Blockly";
import "./custom_Logic";
class Cate_logic extends React.Component {

    render() {
        return (
            <Category name="Logic">
                <Block type="react_controls_if"></Block>
                <Block type="react_logic_compare"></Block>
                <Block type="react_logic_operation"></Block>
                <Block type="react_logic_negate"></Block>
                <Block type="react_logic_boolean"></Block>
            </Category>
        );
    }
}
export default Cate_logic;
