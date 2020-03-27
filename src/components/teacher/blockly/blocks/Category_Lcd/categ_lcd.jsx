import React from "react";
import {
    Block,
    Value,
    Field,
    Category
} from "../../Blockly";
import "./custom_lcd";

class cate_bluetooth extends React.Component {

    render() {
        return (
            <Category id="category_lcd" name="LCD">
                <Block type="react_lcd_init">
                    <Field name="RS">0</Field>
                    <Field name="Enable">0</Field>
                    <Field name="RW">0</Field>
                    <Field name="D4">0</Field>
                    <Field name="D5">0</Field>
                    <Field name="D6">0</Field>
                    <Field name="D7">0</Field>
                </Block>

                <Block type="react_lcd_begin"> </Block>
                                            








                <Block type="react_lcd_print">
                    <Value name="PRINT">
                        <Block type="react_text">
                            <Field name="TEXT"></Field>
                        </Block>
                    </Value>
                </Block>


                <Block type="react_lcd_setcursor">
                <Value name="COLS">
                    <Block type="react_math_number">
                        <Field name="NUM">0</Field>
                    </Block>
                </Value>
                <Value name="ROWS">
                    <Block type="react_math_number">
                        <Field name="NUM">0</Field>
                    </Block>
                </Value>
            </Block>
         
            <Block type="react_lcd_clear"></Block>
               <Block type="react_lcd_scroll"></Block> 
            </Category>


        )
    }
}
export default cate_bluetooth