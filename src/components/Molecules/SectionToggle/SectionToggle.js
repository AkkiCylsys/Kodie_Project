import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SectionToggleStyle } from './SectionToggleStyle';
import { FONTFAMILY, LABEL_STYLES, _COLORS } from '../../../Themes';
import DividerIcon from '../../Atoms/Devider/DividerIcon';

const SectionToggle = ({ title, isVisible, onPress, children,titleStyle }) => {
  return (
    <View style={SectionToggleStyle.subContainer}>
      <TouchableOpacity style={SectionToggleStyle.propety_details_view} onPress={onPress}>
        <Text style={[LABEL_STYLES._texinputLabel, { fontFamily: FONTFAMILY.K_Bold },titleStyle]}>
          {title}
        </Text>
        <Fontisto
          name={isVisible ? "angle-up" : "angle-down"}
          size={15}
          color={_COLORS.Kodie_DarkGrayColor}
          style={SectionToggleStyle.down_Arrow_icon}
        />
      </TouchableOpacity>

      <DividerIcon marginTop={8} />
      {isVisible && (
        <ScrollView style={SectionToggleStyle.propertyDetailsContent}>
          {children}
        </ScrollView>
      )}
    </View>
  );
};

export default SectionToggle;
