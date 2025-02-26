import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {CustomButtonstyles} from './CustomButtonCss';
import {FONTFAMILY, IMAGES, _COLORS} from './../../../Themes/index';

const CustomSingleButton = props => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={[
        CustomButtonstyles.button,
        {
          backgroundColor: props?.backgroundColor,
          borderColor: props.borderColor,
          marginTop: props.marginTop,
          height: props.height,
          marginBottom: props.marginBottom,
          marginHorizontal: props.marginHorizontal,
          width: props.width ? props.width : '100%',
         
        },
      ]}
      disabled={props?.disabled}
      testID={props?.testID} // Add testID here
      >
      {props.isLeftImage ? (
        <Image source={props.leftImage} style={CustomButtonstyles.leftIcon} />
      ) : null}
      <Text
        style={[
          CustomButtonstyles.buttonText,
          {color: props.Text_Color, fontSize: props.text_Size},
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {props._ButtonText}
      </Text>
    </TouchableOpacity>
  );
};
CustomSingleButton.defaultProps = {
  isLeftImage: false,
  backgroundColor: _COLORS.Kodie_BlackColor,
  Text_Color: _COLORS.Kodie_BlackColor,
  borderColor: _COLORS.Kodie_LightWhiteColor,
  marginTop: 10,
  height: 58,
};
export default CustomSingleButton;
