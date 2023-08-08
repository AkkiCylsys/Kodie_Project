import React from "react";
import { Text, View, Image } from "react-native";
import { ServicesBoxStyle } from "./ServicesBoxCss";
const ServicesBox = (props) => {
  return (
    <View style={ServicesBoxStyle.mainConatiner}>
      <View style={[ServicesBoxStyle.boxcontainer, props.BoxStyling]}>
        <Image source={props.Services_Icon} style={ServicesBoxStyle.image} />
        <Text style={[ServicesBoxStyle.text, props.textColor]}>
          {props.Services_Name}
        </Text>
      </View>
    </View>
  );
};

export default ServicesBox;
