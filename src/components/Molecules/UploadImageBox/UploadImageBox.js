import React from "react";
import { View, Text,} from "react-native";
import { uploadImageBoxStyle } from "./UploadImagesBoxStyle";
const UploadImagebox = (props) => {
  return (
    <View style={uploadImageBoxStyle.container}>
      <View style={uploadImageBoxStyle.dashedBorder}>
        <Text style={uploadImageBoxStyle.centeredText}>{props._BoxText}</Text>
      </View>
    </View>
  );
};

export default UploadImagebox;
