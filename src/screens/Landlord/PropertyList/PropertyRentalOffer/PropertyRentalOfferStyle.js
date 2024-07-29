import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const PropertyRentalOfferStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  rowButtonView: {
    marginHorizontal: 16,
  },
  subContainer: {
    flex: 1,
    // marginHorizontal: 16,
  },
  flat_MainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    alignSelf: 'center',
  },
  bidsButton: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GreenColor,
    backgroundColor: _COLORS.Kodie_GreenColor,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  bidsButtonText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_WhiteColor,
  },
  biddingText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    marginLeft: 3,
  },
  daysViewStl: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    marginLeft: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  flatListContainer: {marginHorizontal: 30},
  flat_MainView: {flex: 1, flexDirection: 'row', marginTop: 5},
  flexContainer: {flex: 1},
  apartmentText: {fontSize: 12, color: _COLORS.Kodie_BlackColor},
  locationText: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    marginHorizontal: 5,
    fontFamily: FONTFAMILY.K_Bold,
  },
  imageStyle: {
    flex: 0.5,
    height: 65,
    width: 65,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    backgroundColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    marginLeft: '10%',
    paddingBottom: 3,
  },
  buttonText: {
    fontSize: 12,
    color: _COLORS.Kodie_DarkOrange,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
  bedCountView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  bedIconView: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft:10
  },
  bedcont: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginLeft: 5,
  },
  listpriceText: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
  },
  listprice: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
});
