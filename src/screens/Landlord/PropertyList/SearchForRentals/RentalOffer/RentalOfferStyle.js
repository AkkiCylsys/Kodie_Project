import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../../Themes';
export const RentalOfferStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  userImg: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    marginHorizontal: 16,
  },
  userNameView: {
    // alignSelf: 'center',
    marginLeft: 10,
  },
  username: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 15,
  },
  starIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  propertyHeading: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginRight: 16,
  },
  apartmentView: {
    marginTop: 10,
    marginHorizontal: 34,
  },
  PreRentaltext: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginBottom:9
  },
  // ....
  subContainer: {
    marginHorizontal: 32,
  },
  apartment_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerstyle: {},
  share_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  propety_details_view_Heading: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginBottom: 10,
  },
  share_sty: {marginRight: 10},
  apartment_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  melbourne_Text: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  welcome_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    textAlign: 'center',
  },
  rentalleaseview: {
    marginTop: 15,
  },
  propery_det: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  uplodbtn: {
    marginVertical: 10,
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
  goBack_View: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  btnView: {
    marginTop: 24,
    marginHorizontal: 16,
  },

  availableButtonview: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_mostLightGreenColor,
    backgroundColor: _COLORS.Kodie_mostLightGreenColor,
    marginHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  commontext: {
    // flex: 1,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  datePickerView: {flexDirection: 'row'},
  availableButtonText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_GreenColor,
  },
  formContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 80,
  },
  commontext: {
    // flex: 1,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    marginRight: 16,
  },
  jobDetailsView: {
    marginTop: 20,
  },
  weeklyincomeview: {
    marginVertical: 10,
  },
  tenentpeople: {
    marginTop: 15,
  },
  paymentbtnselectview: {
    marginVertical: 10,
  },
  inputView: {
    marginTop: 10,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 12,
  },
  jobD_: {height: 50},
  locationView: {flexDirection: 'row'},
  LocationText: {
    fontSize: 12,
    alignSelf: 'center',
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  longemployed: {
    marginBottom: 10,
  },
  DetailsView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 15,
  },
  inputContainer: {
    marginTop: 15,
  },
  rentalagrementview: {
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: _COLORS.Kodie_BlackColor,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 1.41,

    elevation: 2,
  },

  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
  },
  dividericonpreferance: {
    marginVertical: 10,
  },
  DetailsIcon: {height: 30, width: 30},
  details_text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginLeft: 5,
  },
  Details_Tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  inspections: {
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    fontSize:18
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  tenantScreenText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  submitApplicationbtn: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    marginBottom: 20,
  },
  Doc_container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical: 5,
    marginTop: 10,
  },

  textContainer: {
    // flex:1,
    flexDirection: 'column',
    marginLeft: 10,
    // borderWidth:1
  },

  pdfInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 250,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  crossIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 5,
    zIndex: 1,
  },
  mainfeaturesview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  key_feature_Text_view: {
    // flex: 1,
    alignSelf:"center"
  },
  key_feature_Text: {
    flex:1,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: 'center',
    alignItems:"center"
  },
  plus_minusview: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.7,
  },
  menusIconView: {
    borderWidth: 0.5,
    width: 32,
    height: 32,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdata: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
  },
  AddOccupantMainView: {
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  AddOccupantView: {
    flex: 1,
    flexDirection: 'row',
  },
  AddOccupantText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  AddLeasesubText: {
    color: _COLORS.Kodie_GrayColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
  },
  locationContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: '#000',
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginLeft: 5,
    width: '15%',
    justifyContent: 'center',
    height: 50,
  },
  locationIcon: {
    alignSelf: 'center',
  },
  locationConView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    borderRadius: 10,
    width: '30%',
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 30,
    position: 'absolute',
  },
  occupants_item_View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    padding: 10,
    marginTop: 10,
  },
  occupants_name: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 160,
  },
  occupants_email: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    width: 160,
  },
  error_text: {color: 'red', marginLeft: 10,marginTop:5},
  Doc_container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical:10,
  },
  textContainer: {
    // flex:1,
    flexDirection: "column",
    marginLeft: 10,
    // borderWidth:1
  },
  pdfInfo: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    padding:10,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 250,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  crossIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 5,
    zIndex: 1,
  },
  errorText: {
    color: _COLORS.Kodie_redColor,
    fontFamily: FONTFAMILY?.K_Medium,
    fontSize: 14,
    marginBottom:12,
    marginTop:5
  },
  
});
