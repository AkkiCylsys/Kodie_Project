import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const AboutYouStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
  },
  heading_Text: {
    // marginTop: 20,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  profile_Text: {
    marginTop: 24,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    // resizeMode: "cover",
  },
  personal_Text: {
    marginTop: 24,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Bio_View: {
    marginTop: 24,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 12,
  },
  BioD_: { height: 100 },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
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
    borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  HomeText: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
  },
  locationIcon: {
    marginLeft: 15,
  },
  want_List_View: {
    flexDirection: "row",
    marginVertical: 6,
  },
  want_Heading: {
    marginTop: 24,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  want_List_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: "center",
    marginLeft: 16,
  },
  checkbox_View: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    marginTop: 4,
  },
  // radioBg: {
  //   height: 12,
  //   width: 12,
  //   borderRadius: 12 / 2,
  //   borderColor: _COLORS.Kodie_BlackColor,
  //   borderWidth: 1,
  //   margin: 2,
  //   backgroundColor: _COLORS.Kodie_BlackColor,
  //   borderColor: _COLORS.Kodie_BlackColor,
  // },
  Check_Icon: {
    marginTop: 2,
    alignSelf: "center",
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
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  servicesBoxView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  spaceView: { margin: 3 },
  box_style: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderColor: _COLORS.Kodie_GrayColor,
    height:44,
  },
  box_Text_Style: { color: _COLORS.Kodie_BlackColor },
  upload_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  uploadImgText: {
    marginHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  crossIconStyle: { alignSelf: "center", marginRight: 10 },
  stepIndicator: {
    marginTop: 15,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 12,
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
  error_text: {
    color: "red",
    marginLeft: 10,
    marginTop: 10,
    alignSelf: "center",
  },
});
