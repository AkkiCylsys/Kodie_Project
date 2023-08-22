import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UploadImageBoxesStyle } from "./UploadimageBoxesStyle";
import { _COLORS } from "./../../../Themes/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const UploadImageBoxes = (props) => {
  return (
    <View style={UploadImageBoxesStyle.mainContainer}>
      <View style={UploadImageBoxesStyle.heading_View}>
        <Text style={UploadImageBoxesStyle.heading_Text}>
          {props.heading_Text}
        </Text>
        <MaterialCommunityIcons
          name="information"
          size={25}
          color={_COLORS.Kodie_GrayColor}
        />
      </View>
      <View style={UploadImageBoxesStyle.container}>
        <View>
          <View style={UploadImageBoxesStyle.circle}>
            <Text style={UploadImageBoxesStyle.circleText}>{props.Box_Text}</Text>
          </View>
          <TouchableOpacity style={UploadImageBoxesStyle.plusIcon}>
            <AntDesign
              name="pluscircle"
              size={25}
              color={_COLORS.Kodie_LightWhiteColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadImageBoxes;
