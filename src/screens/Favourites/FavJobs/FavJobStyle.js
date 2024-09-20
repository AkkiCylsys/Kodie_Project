import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const FavJobStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS?.Kodie_WhiteColor,
  },
  share_View: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  share_sty: {marginHorizontal: 15},
  statusView: {
    flexDirection: 'row',
    backgroundColor: _COLORS?.Kodie_lightseskyBule,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    // width:150,
  },
  StatusText: {
    fontSize: 10,
    color: _COLORS?.Kodie_skyBlue,
    fontFamily: FONTFAMILY?.K_SemiBold,
    alignSelf: 'center',
    marginRight:5
  },
  subContainer: {marginHorizontal: 16, marginVertical: 15},

  jobDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobTittle: {
    fontSize: 16,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Bold,
  },
  refNo: {
    fontSize: 12,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Regular,
  },
  budgetRange: {
    fontSize: 14,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Bold,
  },
  budgetCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  locationTextView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  locationText: {
    fontSize: 12,
    color: _COLORS?.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY?.K_Regular,
    alignSelf: 'center',
  },
});
