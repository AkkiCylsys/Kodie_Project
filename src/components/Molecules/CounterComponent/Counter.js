import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PropertyFeatureStyle } from '../../../screens/Landlord/AddNewProperty/PropertyFeature/PropertyFeatureStyle';
import { _COLORS } from '../../../Themes';
const Counter = ({ label, count, onIncrease, onDecrease }) => {
  return (
    <View style={PropertyFeatureStyle.mainfeaturesview}>
      <View style={PropertyFeatureStyle.key_feature_Text_view}>
        <Text style={PropertyFeatureStyle.key_feature_Text}>{label}</Text>
      </View>
      <View style={PropertyFeatureStyle.plus_minusview}>
        <TouchableOpacity style={PropertyFeatureStyle.menusIconView} onPress={onDecrease}>
          <AntDesign name="minus" size={20} color={_COLORS.Kodie_GrayColor} />
        </TouchableOpacity>
        <Text style={PropertyFeatureStyle.countdata}>{count}</Text>
        <TouchableOpacity style={PropertyFeatureStyle.menusIconView} onPress={onIncrease}>
          <AntDesign name="plus" size={20} color={_COLORS.Kodie_GrayColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
