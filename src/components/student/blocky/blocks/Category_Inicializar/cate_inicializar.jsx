import React from "react";
import {
    Block,
    Category
} from "../../Blockly";
import "./custom_inicializar";
class Cate_math extends React.Component {

    render() {
        return (
            <Category id="category_initializes" name="initializes">
                <Block type="react_setup"></Block>
                <Block type="react_initializes_loop"></Block>
                <Block type="react_initializes_temp"></Block>
            </Category>
        );
    }
}
export default Cate_math;
