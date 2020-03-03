import React from "react";
import {
    Block,
    Category
} from "../../Blockly";
import "./custom_inicializar";
class Cate_math extends React.Component {

    render() {
        return (
            <Category name="Initializes">
                <Block type="react_setup"></Block>
            </Category>
        );
    }
}
export default Cate_math;
