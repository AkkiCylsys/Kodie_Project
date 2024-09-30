import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputFieldStyle } from './InputFieldStyle';
import { LABEL_STYLES, _COLORS } from '../../../Themes';

const InputField = ({ label, placeholder, value, onChangeText,onBlur,keyboardType,inputStyle,Starpoint }) => {
  return (
    <View style={InputFieldStyle.section}>
      <Text style={[LABEL_STYLES.commontext,{marginBottom:12}]}>{label}
      <Text style={{color: _COLORS?.Kodie_redColor}}>{Starpoint}</Text>
      </Text>
      <TextInput
        style={[InputFieldStyle.input,inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;
