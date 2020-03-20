import React from "react"
import {
    Block,
    Value,
    Field,
    Category
} from "../../../Blockly";
import "./custom_follower";
class Cate_variable extends React.Component {
    
    render() {
        return (
            <Category id="category_seguidor" name="Line Follower">
            <Block type="react_controls_switch"></Block>
            <Block type="react_controls_case">
                <Value name="establecer">
                    <Block type="react_math_number">
                        <Field name="NUM">0</Field>
                    </Block>
                </Value>
            </Block>
            <Block type="react_SensorDerecha"></Block>
            <Block type="react_SensorIzquierda"></Block>
             <Block type="react_Analogico_Velocidad"></Block>  

        </Category>
        );
    }
}
export default Cate_variable;
