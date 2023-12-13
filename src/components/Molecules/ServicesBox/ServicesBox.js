import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ServicesBoxStyle } from "./ServicesBoxCss";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
                color="black"
              />
            ) : props.iconLibrary === "Entypo" ? (
              <Entypo name={props.Services_Icon} size={24} color="black" />
            ) : (
              <MaterialCommunityIcons
                name={props.Services_Icon}
                size={24}
                color="black"
              />
            )
          ) : (
            <AntDesign name={props.Services_Icon} size={24} color="black" />
          )}

          <Text style={[ServicesBoxStyle.text, props.textColor]}>
            {props.Services_Name}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ServicesBox;
