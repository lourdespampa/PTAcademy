import React from "react"
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_robot";
class Cate_variable extends React.Component {

    render() {
        return (

            <Category id="category_robot"name="PlayBot">
            <Category id="category_playbot " name="Robot">
                <Block type="robot_playbot">
                    <Value name="Derecho">
                        <Block type="math_number">
                            <Field name="NUM">255</Field>
                        </Block>
                    </Value>
                    <Value name="Izquierdo">
                        <Block type="math_number">
                            <Field name="NUM">255</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="robot_avanzar"></Block>
                <Block type="robot_atras"></Block>
                <Block type="robot_izquierda"></Block>
                <Block type="robot_derecha"></Block>
                <Block type="robot_detener"></Block>
                </Category>
            </Category>
        );
    }
}
export default Cate_variable;
