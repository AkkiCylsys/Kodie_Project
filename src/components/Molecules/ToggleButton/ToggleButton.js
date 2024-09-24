import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ToggleButtonStyle } from './ToggleButtonStyle';

const ToggleButton = ({
  tabValue,
  setTabValue,
  firstTabValue = 1,   // Change 'Yes' to 1
  secondTabValue = 0,  // Change 'No' to 0
  firstTabLabel = 'Yes',
  secondTabLabel = 'No',
  activeColor,
  inactiveColor,
  activeTextColor,
  inactiveTextColor,
  textStyle,
  width,
  containerstyle
}) => {
  return (
    <View style={ToggleButtonStyle.boxContainer}>
      <View style={[ToggleButtonStyle.boxView, { width,containerstyle}]}>
        <TouchableOpacity
          style={[
            ToggleButtonStyle.buttonStyle,
            {
              backgroundColor: tabValue === firstTabValue ? activeColor : inactiveColor,
            },
          ]}
          onPress={() => setTabValue(firstTabValue)}>
          <Text
            style={[
              textStyle,
              {
                color: tabValue === firstTabValue ? activeTextColor : inactiveTextColor,
              },
            ]}>
            {firstTabLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            ToggleButtonStyle.buttonStyle,
            {
              backgroundColor: tabValue === secondTabValue ? activeColor : inactiveColor,
            },
          ]}
          onPress={() => setTabValue(secondTabValue)}>
          <Text
            style={[
              textStyle,
              {
                color: tabValue === secondTabValue ? activeTextColor : inactiveTextColor,
              },
            ]}>
            {secondTabLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;