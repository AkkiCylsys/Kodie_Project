import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ServicesBoxStyle } from "./ServicesBoxCss";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { _COLORS } from "../../../Themes";
const ServicesBox = (props) => {
  return (
    <>
      <TouchableOpacity
        style={ServicesBoxStyle.mainConatiner}
        onPress={props.onPress}
      >
        <View style={[ServicesBoxStyle.boxcontainer, props.BoxStyling]}>
          {/* {props.images ? (
            <Image
              source={props.Services_Icon}
              style={ServicesBoxStyle.image}
            />
          ) : null} */}
          {props.images ? (
            props.iconLibrary === "MaterialIcons" ? (
              <MaterialIcons
                name={props.Services_Icon}
                size={24}
                // color="black"
                color={props.iconColor}
              />
            ) : props.iconLibrary === "Entypo" ? (
              <Entypo
                name={props.Services_Icon}
                size={24}
                // color="black"
                color={props.iconColor}
              />
            ) : (
              <MaterialCommunityIcons
                name={props.Services_Icon}
                size={24}
                // color="black"
                color={props.iconColor}
              />
            )
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
