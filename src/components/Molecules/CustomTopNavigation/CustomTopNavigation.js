import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
import { TopNavigationstyles } from "./CustomTopNavigationCss";

const CustomTabNavigator = (props) => {
  const [activeTab, setActiveTab] = useState(""); // Track the active tab

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={TopNavigationstyles.container}>
      <TouchableOpacity
        style={[TopNavigationstyles.tabButton, props.styleTab1]}
        onPress={props.onPressTab1}
      >
        <Text
          style={[
            TopNavigationstyles.tabText,props.TabTextStyle,
            {
              color: props.colorTab1,
              fontFamily:props.FONTFAMILY1
              // activeTab === "Tab1"
              //   ? _COLORS.Kodie_BlackColor
              //   : _COLORS.Kodie_MediumGrayColor,
            },

          ]}
          numberOfLines={1}
                ellipsizeMode="tail"
        >
          {props.Tab1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[TopNavigationstyles.tabButton, props.styleTab2]}
        onPress={props.onPressTab2}
      >
        <Text
        numberOfLines={1}
        ellipsizeMode="tail"
          style={[
            TopNavigationstyles.tabText,props.TabTextStyle,
            {
              color: props.colorTab2,
            },
            {
              fontFamily:props.FONTFAMILY2
            }
          ]}
        >
          {props.Tab2}
        </Text>
      </TouchableOpacity>
      {props.TAB3 ? (
        <TouchableOpacity
          style={[TopNavigationstyles.tabButton, props.styleTab3]}
          onPress={props.onPressTab3}
        >
          <Text
          numberOfLines={1}
          ellipsizeMode="tail"
            style={[
              TopNavigationstyles.tabText,props.TabTextStyle,
              {
                color: props.colorTab3,
              },
              {
                fontFamily:props.FONTFAMILY3
              }
            ]}
          >
            {props.Tab3}
          </Text>
        </TouchableOpacity>
      ) : null}
      {props.TAB4 ? (
        <TouchableOpacity
          style={[TopNavigationstyles.tabButton, props.styleTab4]}
          onPress={props.onPressTab4}
        >
          <Text
          numberOfLines={1}
          ellipsizeMode="tail"
            style={[
              TopNavigationstyles.tabText,props.TabTextStyle,
              {
                color: props.colorTab4,
              },
              {
                fontFamily:props.FONTFAMILY4
              }
            ]}
          >
            {props.Tab4}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomTabNavigator;
