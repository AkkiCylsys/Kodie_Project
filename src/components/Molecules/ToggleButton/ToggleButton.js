import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ToggleButtonStyle} from './ToggleButtonStyle';
const ToggleButton = ({
  tabValue,
  setTabValue,
  firstTabValue = 'Yes',
  secondTabValue = 'No',
  firstTabLabel = 'Individual',
  secondTabLabel = 'Company',
  activeColor,
  inactiveColor,
  activeTextColor,
  inactiveTextColor,
  textStyle,
  width,
}) => {
  return (
    <View style={ToggleButtonStyle.boxContainer}>
      <View style={[ToggleButtonStyle.boxView, {width: width}]}>
        <TouchableOpacity
          style={[
            ToggleButtonStyle.buttonStyle,
            {
              backgroundColor:
                tabValue === firstTabValue ? activeColor : inactiveColor,
            },
          ]}
          onPress={() => setTabValue(firstTabValue)}>
          <Text
            style={[
              textStyle,
              {
                color:
                  tabValue === firstTabValue
                    ? activeTextColor
                    : inactiveTextColor,
              },
            ]}>
            {firstTabLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            ToggleButtonStyle.buttonStyle,
            {
              backgroundColor:
                tabValue === secondTabValue ? activeColor : inactiveColor,
            },
          ]}
          onPress={() => setTabValue(secondTabValue)}>
          <Text
            style={[
              ToggleButtonStyle.textStyle,
              {
                color:
                  tabValue === secondTabValue
                    ? activeTextColor
                    : inactiveTextColor,
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
