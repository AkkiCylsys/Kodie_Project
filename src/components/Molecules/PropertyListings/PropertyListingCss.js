import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../Themes';
export const PropertyListingCss = StyleSheet.create({
  flatListContainer: {marginHorizontal: 30},
  flat_MainView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  flexContainer: {flex: 1},
  apartmentText: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  commontext: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  commonDay: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  commonRentview: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commonRent: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  locationText: {
    flex: 1,
    fontSize: 10,
    color: _COLORS.Kodie_GrayColor,
    marginTop: 8,
    fontFamily: FONTFAMILY.K_Regular,
  },
  imageStyle: {
    // flex: 0.5,
    // height: 65,
    // width: 65,
    // borderRadius: 10,
    // alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: _COLORS?.Kodie_GrayColor,
    height: 90,
    width: 90,
    borderRadius: 10,
    alignSelf: 'center',
    // borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
    marginHorizontal:10
  },
  Img_found: {
    fontSize: 12,
    color: _COLORS?.Kodie_BlackColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  noteStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  noteIcon: {height: 25, width: 25, marginRight: 8},
  buttonView: {
    // flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    backgroundColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 10,
  },
  roundButton: {
    height: 6,
    width: 6,
    borderRadius: 6 / 2,
    alignSelf: 'center',
    marginRight: 5,
  },
  buttonText: {
    fontSize: 12,
    color: _COLORS.Kodie_DarkOrange,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
  expandedContent: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  commonMidtext: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  bottomModal_container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal:10,paddingVertical:15
  },
  
});
