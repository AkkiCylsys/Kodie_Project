import { StyleSheet} from 'react-native';
import {FONTFAMILY, IMAGES, _COLORS} from "./../../../Themes/index"
export const CustomButtonstyles = StyleSheet.create({
    button: {
      flexDirection:'row',
      width: '100%',
      height: 58,
      backgroundColor: _COLORS.Kodie_BlackColor,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      borderWidth:1
    },
    buttonText: {
      color: _COLORS.Kodie_WhiteColor,
      fontSize: 16,
      fontFamily:FONTFAMILY.K_SemiBold
    },
    leftIcon:{
      width: 20,
      height: 20,
      marginRight:4,
      alignSelf:'center'
    }
  });