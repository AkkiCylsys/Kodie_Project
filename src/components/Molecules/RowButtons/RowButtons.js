import React from "react";
import { View } from "react-native";
import { RowButtonsStyle } from "./RowButtonsStyle";
import { _COLORS } from "./../../../Themes/index";
import CustomSingleButton from "./../../Atoms/CustomButton/CustomSingleButton";
const RowButtons = (props) => {
  return (
    <View style={RowButtonsStyle.mainView}>
      <View style={RowButtonsStyle.leftButtonView}>
        <CustomSingleButton
          height={45}
          onPress={props.onPressLeftButton}
          backgroundColor={props.leftButtonbackgroundColor}
          _ButtonText={props.LeftButtonText}
          borderColor={props.LeftButtonborderColor}
          Text_Color={props.LeftButtonTextColor}
        />
      </View>
      <View style={RowButtonsStyle.leftButtonView}>
        <CustomSingleButton
          height={45}
          onPress={props.onPressRightButton}
          backgroundColor={props.RightButtonbackgroundColor}
          _ButtonText={props.RightButtonText}
          borderColor={props.RightButtonborderColor}
          Text_Color={props.RightButtonTextColor}
        />
      </View>
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
};

export default RowButtons;
