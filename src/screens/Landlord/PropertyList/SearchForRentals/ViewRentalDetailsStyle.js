import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const ViewRentalDetailsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    // marginHorizontal: 1,
    padding: 0,
    margin: 0,
  },
  apartmentmainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28,
    marginTop: 19,
  },
  propertyHeading: {
    flex:1,
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  shareIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  location: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginRight: 16,
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 23,
  },
  welcome_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    // marginVertical: 10,
    alignSelf: 'center',
    marginHorizontal: 16,
  },
  DetailsView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 15,
  },
  details_text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginLeft: 5,
  },
  propery_det: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  subContainer: {
    // marginHorizontal: 16,
  },
  propety_details_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  p_rowTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    // marginTop: 10,
  },
  availableBtn: {
    marginHorizontal: 25,
    // marginRight: 250,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    // flex: 1,
    backgroundColor: _COLORS.Kodie_minDarkGreenColor,
    padding: 8,
  },
  availabletext: {
    fontSize: 10,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: 'center',
  },
  submitApplicationbtn:{
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 10,
    padding: 20,
    shadowColor: _COLORS.Kodie_GrayColor,
    shadowOffset: {width: 1, height: 5}, // iOS shadow
    shadowOpacity: 2, // iOS shadow
    shadowRadius: 3,
    elevation: 1,
    marginBottom:20,
    backgroundColor:_COLORS.Kodie_WhiteColor
  },
  readMore: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
  },
  textStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
});
