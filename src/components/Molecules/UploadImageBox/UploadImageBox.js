import React, { useState } from "react";
import { View, Text } from "react-native";
import { uploadImageBoxStyle } from "./UploadImagesBoxStyle";
import { _COLORS } from "./../../../Themes/index";
import Feather from "react-native-vector-icons/Feather";
const UploadImagebox = (props) => {
  return (
    <View style={uploadImageBoxStyle.container}>
      <View style={uploadImageBoxStyle.dashedBorder}>
        <Feather
          name={props.icon}
          size={30}
          color={_COLORS.Kodie_LightGrayColor}
        />
        <Text style={uploadImageBoxStyle.centeredText}>{props._BoxText}</Text>
      </View>
    </View>
  );
};

export default UploadImagebox;
