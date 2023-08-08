import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { HeaderStyle } from "./HeaderStyle";
import {
  FONTFAMILY,
  SMALLICON,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";

const TopHeader = (props) => {
  return (
    <View
      style={[
        HeaderStyle.mainView,
        { backgroundColor: props?.backgroundColor },
      ]}
    >
      <View style={HeaderStyle.leftButtonView}>
        <TouchableOpacity
          onPress={props?.onPressLeftButton}
          style={[HeaderStyle.button]}
        >
          <Image source={props.leftImage} style={HeaderStyle.leftIcon} />
        </TouchableOpacity>
      </View>
      <View style={HeaderStyle.middleTextView}>
        <Text style={[HeaderStyle.LabelText, { color: props.Text_Color }]}>
          {props.MiddleText}
        </Text>
      </View>
      {props.isrightImage ? (
        <TouchableOpacity
          onPress={props?.onPressRightButton}
          style={[HeaderStyle.button]}
        >
          <Image source={props.RightImage} style={HeaderStyle.leftIcon} />
        </TouchableOpacity>
      ) : (
        <View style={HeaderStyle.nullView}></View>
      )}
    </View>
  );
};
TopHeader.defaultProps = {
  isrightImage: false,
  leftImage: SMALLICON.BackArrow,
  MiddleText: "Set up your profile",
  backgroundColor: _COLORS.Kodie_BlackColor,
  Text_Color: _COLORS.Kodie_WhiteColor,
};
export default TopHeader;
