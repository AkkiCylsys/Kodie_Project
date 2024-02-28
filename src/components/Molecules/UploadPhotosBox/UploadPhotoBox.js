import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UploadPhotoBoxStyle } from "./UploadPhotoBoxStyle";
import { FONTFAMILY, _COLORS } from "../../../Themes";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
const UploadPhotoBox = (props) => {
  return (
    <View style={UploadPhotoBoxStyle.mainContainer}>
      <View style={UploadPhotoBoxStyle.subCon}>
        <View style={UploadPhotoBoxStyle.iconView}>
          {props.videoIcon ? (
            <Octicons
              name="video"
              color={_COLORS.Kodie_GrayColor}
              size={25}
            />
          ) : (
            <SimpleLineIcons
              name="camera"
              color={_COLORS.Kodie_GrayColor}
              size={25}
            />
          )}
        </View>
        <View style={UploadPhotoBoxStyle.textView}>
          <Text style={UploadPhotoBoxStyle.textstyle}>
            {props.headingPhoto}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UploadPhotoBox;
