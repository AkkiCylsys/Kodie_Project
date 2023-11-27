import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ServicesBoxStyle } from "./ServicesBoxCss";
const ServicesBox = (props) => {
  return (
    <>
      <TouchableOpacity
        style={ServicesBoxStyle.mainConatiner}
        onPress={props.onPress}
      >
        <View style={[ServicesBoxStyle.boxcontainer, props.BoxStyling]}>
          {props.images ? (
            <Image
              source={props.Services_Icon}
              style={ServicesBoxStyle.image}
            />
          ) : null}

          <Text style={[ServicesBoxStyle.text, props.textColor]}>
            {props.Services_Name}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ServicesBox;
