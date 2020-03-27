import React from "react"
import {
    Block,
    Value,
    Field,
    Category
} from "../../../Blockly";
import "./custom_engines";
import CategoryFollower from "../Category_LineFollower/categ_linefollower"
class Cate_variable extends React.Component {

    render() {
        return (

            <Category id="category_playbot"name="PlayBot">
            <Category id="category_robot " name="Motores">
                <Block type="react_playbot">
                    <Value name="Derecho">
                        <Block type="react_math_number">
                            <Field name="NUM">255</Field>
                        </Block>
                    </Value>
                    <Value name="Izquierdo">
                        <Block type="react_math_number">
                            <Field name="NUM">255</Field>
                        </Block>
                    </Value>
                </Block>
                <Block type="react_robot_avanzar"></Block>
                <Block type="react_robot_atras"></Block>
                <Block type="react_robot_izquierda"></Block>
                <Block type="react_robot_derecha"></Block>
                <Block type="react_robot_detener"></Block>

                </Category>
                <CategoryFollower/>

            </Category>
        );
    }
}
export default Cate_variable;
