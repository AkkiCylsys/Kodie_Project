import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const DeleteAccountStyle = StyleSheet.create({
  container: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    // height: "100%",
  },
  headingview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  helpimg: {
    width: 18,
    height: 18,
    borderRadius: 8,
  },
  accounttext: {
    fontSize: 16,
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 10,
  },
  Pointsview: {
    marginTop: 15,
  },
  textpoint: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 22,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_ExtraLightGrayColor,
    opacity: 0.7,
    marginHorizontal: 30,
  },
  logoutview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 10,
  },
  Logoutimg: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  insteadtext: {
    fontSize: 16,
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 3,
  },
  buttonview: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  toconfirmview: {
    marginTop: 25,
    marginHorizontal: 5,
  },
  toconfirmtext: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 15,
    textAlign: "center",
  },
  downarrowimg: {
    width: 12,
    height: 6,
  },
  lineimg: {
    height: 21,
    width: 43,
  },
  buttonblackview: {
    marginHorizontal: 10,
    marginTop: 50,
    // marginBottom:30
  },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    // marginBottom: 50,
    // marginBottom: 250,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  phoneinputbindview: {
    width: "98%",
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
    paddingHorizontal: 10,
    marginTop: 10,
  },
  numbercode: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  lineimg: {
    height: 21,
    width: 45,
  },
  simpleinputview: {
    flex:1,
    height: 50,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    borderRadius: 8,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  error_text: { color: "red", marginLeft: 10,marginTop:5 },
});
