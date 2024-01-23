import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const ContactusStyle = StyleSheet.create({
  textmessage: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
    marginHorizontal: 20,
    lineHeight: 30,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 20,
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
  checkboxview: {
    flexDirection: "row",
    marginTop: 40,
  },
  checkboxTouch: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    marginLeft: 20,
  },
  imgcheckbox: {
    marginLeft: 30,
    // color:_COLORS.Kodie_WhiteColor
  },
  checkboxtextview: {
    marginLeft: 20,
    width: 300,
  },
  optionaltext: {
    fontWeight: "500",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  answertext: {
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 11,
    fontWeight: "400",
    marginTop: 4,
    lineHeight: 15,
    fontFamily: FONTFAMILY.K_Light,
  },
  viaemailview: {
    alignItems: "center",
    marginTop: 50,
  },
  viaemailtext: {
    fontWeight: "500",
    fontSize: 15,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  buttonview: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttontext: {
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  error_text: { color: "red", marginLeft: 20,marginTop:5 },
});
