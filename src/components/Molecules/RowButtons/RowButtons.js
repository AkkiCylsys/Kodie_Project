import React, { useState } from "react";
import { View } from "react-native";
import { RowButtonsStyle } from "./RowButtonsStyle";
import { _COLORS } from "./../../../Themes/index";
import CustomSingleButton from "./../../Atoms/CustomButton/CustomSingleButton";
const RowButtons = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={RowButtonsStyle.mainView}>
      <View style={RowButtonsStyle.leftButtonView}>
        <CustomSingleButton
          // disabled={isLoading ? true : false}
          disabled={isLoading || props.disabled}
          height={props.leftButtonHeight}
          onPress={props.onPressLeftButton}
          backgroundColor={props.leftButtonbackgroundColor}
          _ButtonText={props.LeftButtonText}
          borderColor={props.LeftButtonborderColor}
          Text_Color={props.LeftButtonTextColor}
          text_Size={props.LeftButtonfontSize}
        />
      </View>
      {props.isShowRightButton?
      <View style={RowButtonsStyle.leftButtonView}>
        <CustomSingleButton
          // disabled={isLoading ? true : false}
          disabled={isLoading || props.disabled}
          height={props.RightButtonHeight}
          onPress={props.onPressRightButton}
          backgroundColor={props.RightButtonbackgroundColor}
          _ButtonText={props.RightButtonText}
          borderColor={props.RightButtonborderColor}
          Text_Color={props.RightButtonTextColor}
          text_Size={props.RightButtonfontSize}
        />
      </View>
      :null
}
    </View>
  );
};
RowButtons.defaultProps = {
  leftButtonbackgroundColor: _COLORS.Kodie_lightGreenColor,
  RightButtonbackgroundColor: _COLORS.Kodie_WhiteColor,
  LeftButtonTextColor: _COLORS.Kodie_BlackColor,
  RightButtonTextColor: _COLORS.Kodie_MediumGrayColor,
  LeftButtonborderColor: _COLORS.Kodie_GreenColor,
  RightButtonborderColor: _COLORS.Kodie_LightWhiteColor,
  LeftButtonText: "Yes",
  RightButtonText: "No",
  leftButtonHeight: 45,
  RightButtonHeight: 45,
  isShowRightButton:true,
  disabled: false,
};

export default RowButtons;
