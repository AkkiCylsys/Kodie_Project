import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';
export const InspectionsChecklistStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
  },
  Verifiedtext: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 12,
  },
  username: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 16,
  },
  Rating: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 14,
  },
  buttonText: {
    fontSize: 10,
    textAlign:"center",
    color: _COLORS.Kodie_GrayColor,
    fontFamily:FONTFAMILY.K_SemiBold
  },
  buttonView: {
    // marginTop: 10,
    borderWidth: 1,
    // width: 48,
    // height: 19,
    borderRadius:21,
    borderColor: _COLORS.Kodie_LightGrayColor,
    // padding:15
    paddingHorizontal:30,
    paddingVertical:10
  },
  starIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  Apartmenttext: {
    fontSize: 13.48,
    color: _COLORS.Kodie_BlackColor,
  },
  Citytext: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  Movettext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  moveTextHeading: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  dataTextHeading: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop: 5,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  inspections: {
    fontFamily: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 10,
  },
  PdfContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  Pdfview: {flex: 1, flexDirection: 'row'},
  pdfTextView: {marginLeft: 10},
  PDF_Text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
  MBText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: 'left',
  },
  closeIconView: {justifyContent: 'center', alignItems: 'flex-end'},
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 8,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  userStyle: {height: 20, width: 20, marginHorizontal: 10},
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },
});
