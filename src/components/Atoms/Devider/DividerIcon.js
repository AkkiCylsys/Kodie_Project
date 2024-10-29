import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {_COLORS} from '../../../Themes/CommonColors/CommonColor';
import {Dividerstyles} from './DividerCss';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DividerIcon = props => {
  return (
    <>
      <View style={Dividerstyles.mainView} testID={props?.testID}>
        <View
          style={{
            borderBottomWidth: props.borderBottomWidth
              ? props.borderBottomWidth
              : 0.8,
            borderColor: props.color ? props.color : _COLORS.Kodie_GrayColor,
            borderStyle: props.dashed ? 'dashed' : 'solid',
            marginTop: props.marginTop ? props.marginTop : 15,
            marginBottom: props.marginBottom ? props.marginBottom : 15,
            flex: 1,
            ...props.style,
          }}
        />
        {props.DeviderText && (
          <View style={[Dividerstyles.textView, {marginTop: props.marginTop}]}>
            <Text style={Dividerstyles.Divider_Text}>{props.DeviderText}</Text>
          </View>
        )}
        {props.IsShowIcon && (
          <TouchableOpacity
            onPress={props.onPress}
            style={[Dividerstyles.iconView]}>
            <MaterialCommunityIcons
              name={props.iconName}
              size={20}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            borderBottomWidth: props.borderBottomWidth
              ? props.borderBottomWidth
              : 0.8,
            borderColor: props.color ? props.color : _COLORS.Kodie_GrayColor,
            borderStyle: props.dashed ? 'dashed' : 'solid',
            marginTop: props.marginTop ? props.marginTop : 15,
            marginBottom: props.marginBottom ? props.marginBottom : 15,

            flex: 1,
            ...props.style,
          }}
        />
      </View>
    </>
  );
};

export default DividerIcon;
