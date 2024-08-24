import {StyleSheet} from 'react-native';
import {_COLORS, IMAGES, FONTFAMILY} from '../../../Themes';
export const SelectPropertiesStyle = StyleSheet.create({
  headingview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headingtext: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  optionsmainview: {
    marginLeft: 20,
    marginTop: 8,
  },
  optionsview: {
    flexDirection: 'row',
    textAlign: 'justify',
    alignItems: 'center',
    // padding: 3,
    marginVertical: 2,
  },
  optionsiconview: {
    alignItems: 'center',
    padding: 6,
    borderColor: _COLORS.Kodie_MediumGrayColor,
  },
  checkbox: {
    borderRadius: 10,
  },
  textoption: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 8,
  },
  Divider: {
    marginRight: 20,
    marginVertical: 5,
    opacity: 0.3,
  },
});
