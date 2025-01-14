import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
import { floor } from 'react-native-reanimated';
export const PropertyRentalOfferStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  rowButtonView: {
    // marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
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
    alignSelf: 'center',
    marginHorizontal: 7,
  },
  daysViewStl: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    marginLeft: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  flatListContainer: {marginHorizontal: 16},
  flat_MainView: {flex: 1, flexDirection: 'row', marginTop: 5},
  flexContainer: {flex: 1},
  apartmentText: {fontSize: 13.48, color: _COLORS.Kodie_BlackColor},
  locationText: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    marginHorizontal: 5,
    fontFamily: FONTFAMILY.K_Bold,
    // alignSelf: 'center',
  },
  imageStyle: {
    flex: 0.5,
    height: 80,
    width: 85,
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
    // width:130,
    paddingHorizontal: 6,
    alignItems: 'flex-end',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 9,
    color: _COLORS.Kodie_DarkOrange,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
    marginRight: 5,
  },
  // bedCountView: {
  //   flexDirection: 'row',
  //   marginTop: 5,
  //   marginBottom: 5,
  // },
  bedIconView: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
  },
  // locationView: {
  //   flexDirection: 'row',
  //   marginTop: 5,
  //   // marginLeft: 10,
  //   marginRight:15
  // },
  locationView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 5, // Adjust for spacing as needed
  },
  circleIconView: {
    width: 30, // Set the width of the circle
    height: 30, // Set the height of the circle
    borderRadius: 15, // Half of the width/height to make it a perfect circle
    alignItems: 'center', // Center icon horizontally
    justifyContent: 'center', // Center icon vertically
    borderWidth: 0.2,
    borderColor: _COLORS?.Kodie_ExtraminLiteGrayColor,
  },
  bedCountView: {
    flex:1,
    flexDirection: 'row',
    marginTop: 5,
    // marginLeft: 23,
    alignItems: 'center', // Center items vertically
  },
  bedcont: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight:20
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
    alignSelf: 'flex-end',
  },
  expandedView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noResultSubtext: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    textAlign: 'center',
  },
});
