import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { _COLORS } from "../../Themes";
import { PayButtonStyle } from "./PayButtonStyle";

const PayButton = (props) => {
  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <View style={PayButtonStyle.container}>
      <View style={[PayButtonStyle.buttonBox,
    //   {
    //     backgroundColor:
    //       activeButton === "button2"
    //         ? _COLORS.Kodie_GreenColor
    //         : _COLORS.Kodie_MediumGrayColor,
    //   },
    ]}>
        <TouchableOpacity
          style={[
            PayButtonStyle.button,
            activeButton === "button1" ? PayButtonStyle.activeButton : {},
          ]}
          onPress={() => handleButtonPress("button1")}
        >
          <Text
            style={[
                PayButtonStyle.buttonText,
              {
                color:
                  activeButton === "button1"
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
          >
            {props.leftBtnText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            PayButtonStyle.button,
            activeButton === "button2" ? PayButtonStyle.activeButton : {},
          ]}
          onPress={() => handleButtonPress("button2")}
        >
          <Text
            style={[
                PayButtonStyle.buttonText,
              {
                color:
                  activeButton === "button2"
                    ? _COLORS.Kodie_BlackColor
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

export default PayButton;
