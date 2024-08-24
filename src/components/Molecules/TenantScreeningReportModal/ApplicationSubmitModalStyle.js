import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const ApplicationSubmitModalStyle = StyleSheet.create({
  mainConatainer: {
    flex: 1,
  },
  ApplicationText: {
    fontSize: 21,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    alignSelf:'center'
  },
});
