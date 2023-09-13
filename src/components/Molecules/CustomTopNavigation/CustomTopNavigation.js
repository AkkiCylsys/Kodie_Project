import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
import { TopNavigationstyles } from "./CustomTopNavigationCss";

const CustomTabNavigator = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1"); // Track the active tab

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={TopNavigationstyles.container}>
      <TouchableOpacity
        style={[
          TopNavigationstyles.tabButton,
          activeTab === "Tab1" && TopNavigationstyles.activeTab,
        ]}
        onPress={props.onPressTab1}
      >
        <Text
          style={[
            TopNavigationstyles.tabText,
            {
              color:
                activeTab === "Tab1"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
        >
          {props.Tab1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          TopNavigationstyles.tabButton,
          activeTab === "Tab2" && TopNavigationstyles.activeTab,
        ]}
        onPress={props.onPressTab2}
      >
        <Text
          style={[
            TopNavigationstyles.tabText,
            {
              color:
                activeTab === "Tab2"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
        >
          {props.Tab2}
        </Text>
      </TouchableOpacity>
      {props.TAB3 ? (
        <TouchableOpacity
          style={[
            TopNavigationstyles.tabButton,
            activeTab === "Tab3" && TopNavigationstyles.activeTab,
          ]}
          onPress={props.onPressTab3}
        >
          <Text
            style={[
              TopNavigationstyles.tabText,
              {
                color:
                  activeTab === "Tab3"
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
          >
            {props.Tab3}
          </Text>
        </TouchableOpacity>
      ) : null}
      {props.TAB4 ? (
        <TouchableOpacity
          style={[
            TopNavigationstyles.tabButton,
            activeTab === "Tab4" && TopNavigationstyles.activeTab,
          ]}
          onPress={props.onPressTab4}
        >
          <Text
            style={[
              TopNavigationstyles.tabText,
              {
                color:
                  activeTab === "Tab4"
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
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
