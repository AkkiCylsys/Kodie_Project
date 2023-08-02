import { StyleSheet} from 'react-native';
import {FONTFAMILY, IMAGES, _COLORS} from "./../../../Themes/index"
export const Dividerstyles = StyleSheet.create({
    mainView: {
        flexDirection:'row',alignItems:'center'
    },
    textView: {
        paddingHorizontal: 10 
    },
    Divider_Text: {
      fontSize:14,
      fontFamily:FONTFAMILY.K_Regular
    },
  });