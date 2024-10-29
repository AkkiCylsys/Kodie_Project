import React from "react";
import { Text,View } from "react-native";
import { BottomTextsStyles } from "./ButtomTextButtonCss"
import { _COLORS } from "./../../../Themes/index"

const BottomTextsButton = (props) => {
    return (
        <View style={BottomTextsStyles.mainView}>
            <Text style={[BottomTextsStyles.leftButtonText, { color: props.LeftText_Color }]}>{props._LeftButtonText}</Text>
            <Text onPress={props.onPress} testID={props.testID} style={[BottomTextsStyles.rightButtonText, { color: props.RightText_Color }]}>{props._RightButtonText}</Text>
        </View>
    );
};
BottomTextsButton.defaultProps = {
   
    LeftText_Color: _COLORS.Kodie_MediumGrayColor,
    RightText_Color: _COLORS.Kodie_BlackColor,
    marginTop: 10
};
export default BottomTextsButton;
