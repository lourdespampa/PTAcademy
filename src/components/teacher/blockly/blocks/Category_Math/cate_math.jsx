import React from "react";
import {
    Block,
    Category
} from "../../Blockly";
import "./custom_math";
class Cate_math extends React.Component {

    render() {
        return (
            <Category name="Math">
                <Block type="react_math_number"></Block>
                <Block type="react_cast_number"></Block>
                <Block type="react_math_arithmetic"></Block>
                <Block type="react_math_single"></Block>
                <Block type="react_math_constrain"></Block>
                <Block type="react_math_pow"></Block>
                <Block type="react_math_random_max_min"></Block>
            </Category>
        );
    }
}
export default Cate_math;
