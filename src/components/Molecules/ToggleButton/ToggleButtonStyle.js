import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const ToggleButtonStyle = StyleSheet.create({
  boxContainer: {
    flex: 1,
  
  },
  boxView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    width: '100%',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 10,
    padding: 5,
    marginVertical: 8,
    // paddingVertical:10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  buttonStyle: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 5,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
  },
});
