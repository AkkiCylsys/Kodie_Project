import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const ContactusStyle = StyleSheet.create({
  inputview: {
    top: 20,
  },
  inputboxview: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 330,
    height: 120,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "500",
    color: _COLORS.Kodie_LightGrayColor,
    paddingBottom: 80,
    paddingLeft: 20,
    fontFamily: FONTFAMILY.K_Light,
  },
  textmessage: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
    marginHorizontal: 20,
    lineHeight: 30,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  checkboxview: {
    flexDirection: "row",
    marginTop: 10,
  },
  imgcheckbox: {
    width: 25,
    height: 24,
    left: 20,
  },
  checkboxtextview: {
    marginHorizontal: 30,
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
});
