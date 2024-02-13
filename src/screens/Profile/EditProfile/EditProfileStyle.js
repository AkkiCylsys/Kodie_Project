import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const EditProfileStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  ProfileView: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: "center",
  },
  usericon: {
    height: 76,
    width: 76,
    borderRadius: 76 / 2,
  },
  editlogoview: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 5,
    width: 35,
    height: 35,
    // borderWidth:1,
    borderRadius: 35 / 2,
    alignSelf: "center",
  },
  profilviewmain: {
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  profilelogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLiteGrayColor,
  },
  edittext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  firstdivider: {
    marginTop: 20,
  },

  // input filed style here
  inputmainview: {
    marginTop: 20,
  },
  firstview: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  oldnumbertext: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  simpleinputview: {
    // height: 50,
    borderWidth: 1,
    // borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    // width: "90%",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  phoneinputbindview: {
    // width: "100%",
  },
  bindnumberview: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneinput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    marginTop: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  // simpleinputphysical: {
  //   height: 50,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  //   marginTop: 1,
  //   fontFamily: FONTFAMILY.K_SemiBold,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "90%",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 10,
  //   marginHorizontal: 15,
  // },
  physicalsecondview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  // numbercode: {
  //   color: _COLORS.Kodie_BlackColor,
  //   fontSize: 13,
  //   fontWeight: "400",
  //   fontFamily: FONTFAMILY.K_SemiBold,
  // },
  downarrowimg: {
    width: 12,
    height: 6,
    marginLeft: 5,
  },
  lineimg: {
    height: 21,
    width: 45,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    tintColor: "#CED5D7",
  },
  dropdownview: {
    marginHorizontal: 15,
  },
  drop: {
    color: _COLORS.Kodie_ExtralightGreenColor,
  },
  uploadview: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  uploadtext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  optionaltext: {
    fontSize: 12,
    color: "#21212180",
  },
  leasttext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: "#ABACAD",
    marginTop: 5,
  },
  buttonview: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  secondbuttonview: {
    marginTop: 10,
  },
  bottomModal_container: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  saveBackButton: {
    elevation: 2,
    marginTop: 40,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  secondview: {
    marginHorizontal: 10,
    marginBottom: 30,
  },

  textContainer: {
    flexDirection: "column",
    borderWidth: 0.5,
    marginHorizontal: 5,
    flex: 1,
    paddingHorizontal: 10,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bindfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  doticon: {
    color: _COLORS.Kodie_GrayColor,
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 5,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderBottomWidth: 1,
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 3,
    borderRadius: 10,
    width: "30%",
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 20,
    position: "absolute",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    marginLeft: 10,
    width: "15%",
    height: 48,
    justifyContent: "center",
  },
  locationIcon: {
    alignSelf: "center",
  },
  logo: {
    width: 110,
    height: 110,
    // resizeMode: "cover",
  },
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
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 16,
  },
  input: {
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  inputStyle:{
    flex:1,
    color:_COLORS.Kodie_BlackColor
  }
});
