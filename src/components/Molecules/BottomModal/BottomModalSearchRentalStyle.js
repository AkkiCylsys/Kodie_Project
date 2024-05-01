import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';
export const BottomModalSearchRentalStyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginBottom: Platform.OS == 'ios' ? 12 : 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 14,
    marginTop: 6,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    marginTop: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
