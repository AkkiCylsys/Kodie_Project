import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const SubmitApplicationCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  headingView: {
    marginHorizontal: 16,
    marginTop: 10,
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
  share_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  propery_det: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
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
  availableButtonText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_GreenColor,
  },
  locationView: { flexDirection: "row" },
  LocationText: {
    fontSize: 12,
    alignSelf: "center",
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  DetailsView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 15,
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
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  bottomButtonView: {
    borderTopWidth: 1,
    borderTopColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  userDetailView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 16,
  },
  userImageView: {
    flex: 0.5,
    flexDirection: "row",
  },
  UserImages: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  userName: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginLeft: 5,
  },
  StarView: { flexDirection: "row" },
  iconStl: { alignSelf: "center" },
  verifystl: {
    fontSize: 12,
    color: _COLORS.Kodie_lightGreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
    marginHorizontal: 5,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  ModalMainView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ModalView: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 10,
  },
  modalContainer: { flex: 1, marginHorizontal: 16 },
  modalCloseIcon: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  modalMainText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalSubText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: "center",
    alignSelf: "center",
    marginTop:10
  },
  checkStl: { height: 120, width: 120, alignSelf: "center" },
});
