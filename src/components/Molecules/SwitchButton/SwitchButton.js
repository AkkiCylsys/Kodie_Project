import React, { useState } from "react";
import {
  View,
  TouchableOpacity, 
  Text,
} from "react-native";
import { SwitchButtonStyle } from "./SwitchButtonStyle";
import { _COLORS } from "../../../Themes";
const SwitchButton = (props) => {
  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <View style={SwitchButtonStyle.container}>
      <View style={SwitchButtonStyle.buttonBox}>
        <TouchableOpacity
          style={[
            SwitchButtonStyle.button,
            activeButton === "button1" ? SwitchButtonStyle.activeButton : {},
          ]}
          onPress={() => handleButtonPress("button1")}
        >
          <Text
            style={[
              SwitchButtonStyle.buttonText,
              {
                color:
                  activeButton === "button1"
                    ? _COLORS.Kodie_WhiteColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
          >
            {props.leftBtnText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            SwitchButtonStyle.button,
            activeButton === "button2" ? SwitchButtonStyle.activeButton : {},
          ]}
          onPress={() => handleButtonPress("button2")}
        >
          <Text
            style={[
              SwitchButtonStyle.buttonText,
              {
                color:
                  activeButton === "button2"
                    ? _COLORS.Kodie_WhiteColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
          >
            {props.rightBtnText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwitchButton;
