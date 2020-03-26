import React from "react";
import {
    Block,
    Category
} from "../../Blockly";
import "./custom_variable";
class Cate_variable extends React.Component {

    render() {
        return (

            <Category name="Variables" custom="VARIABLE">
                <Block ></Block>
                <Block type="variables_get"></Block>
                <Block type="variables_set"></Block>
            </Category>
        );
    }
}
export default Cate_variable;
