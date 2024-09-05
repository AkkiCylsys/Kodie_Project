import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputFieldStyle } from './InputFieldStyle';
import { LABEL_STYLES } from '../../../Themes';

const InputField = ({ label, placeholder, value, onChangeText,onBlur,keyboardType }) => {
  return (
    <View style={InputFieldStyle.section}>
      <Text style={[LABEL_STYLES.commontext,{marginBottom:12}]}>{label}</Text>
      <TextInput
        style={InputFieldStyle.input}
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
