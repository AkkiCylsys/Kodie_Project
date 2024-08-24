import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UploadImageBoxesStyle } from "./UploadimageBoxesStyle";
import { _COLORS } from "./../../../Themes/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const UploadImageBoxes = (props) => {
  return (
    <View style={UploadImageBoxesStyle.mainContainer}>
      <TouchableOpacity
        style={UploadImageBoxesStyle.container}
        onPress={props.onPress}
      >
        <View>
          <View style={[UploadImageBoxesStyle.circle, props.circlestyle]}>
            <Text style={UploadImageBoxesStyle.circleText}>
              {props.Box_Text}
            </Text>
          </View>
          <View
            style={[UploadImageBoxesStyle.plusIcon, props.pluacircle]}
          >
            <AntDesign
              name="pluscircle"
              size={props.size ? props.size : 25}
              color={_COLORS.Kodie_LightWhiteColor}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImageBoxes;
