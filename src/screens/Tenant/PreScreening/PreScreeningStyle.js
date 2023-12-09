import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../Themes";

export const PreScreeningStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  headingView: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  userDetailView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  slider_view: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 25,
  },
  userImagebindView: {
    flexDirection: "row",
  },
  userName: {
    marginTop: "10%",
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginLeft: "3%",
  },

  ratingmainview: {
    // alignSelf: "center",
  },
  ratingview1: {
    flexDirection: "row",
    alignItems: "center",
  },
  VerifiedView: {
    flexDirection: "row",
    paddingTop: 1,
    alignItems: "center",
  },
  ratingtext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  ratingtextnumber: {
    color: _COLORS.Kodie_ExtraLiteGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  verifystl: {
    fontSize: 12,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_ExtraBold,
    marginLeft: 5,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  Container: {
    marginHorizontal: 16,
  },
  subContainer: {
    marginHorizontal: 32,
  },
  apartment_View: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dividerstyle: {},
  share_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  propety_details_view_Heading: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginBottom: 10,
  },
  share_sty: { marginRight: 10 },
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
    alignSelf: "center",
    textAlign: "center",
  },
  rentalleaseview: {
    marginTop: 15,
  },
  propery_det: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  uplodbtn: {
    marginVertical: 10,
  },
  propety_details_view: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignSelf: "center",
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
  datePickerView: { flexDirection: "row" },
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
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  jobD_: { height: 50 },
  locationView: { flexDirection: "row" },
  LocationText: {
    fontSize: 12,
    alignSelf: "center",
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  longemployed: {
    marginBottom: 10,
  },
  DetailsView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 15,
  },
  inputContainer: {
    marginTop: 15,
  },
  rentalagrementview: {
    marginTop: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: _COLORS.Kodie_BlackColor,
    shadowColor: "#000",
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
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
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
  DetailsIcon: { height: 30, width: 30 },
  details_text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    marginLeft: 5,
  },
  Details_Tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  inspections: {
    fontFamily: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
});
