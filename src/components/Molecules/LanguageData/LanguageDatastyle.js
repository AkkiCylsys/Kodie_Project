import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const LanguageDataStyle = StyleSheet.create({
  mainConatiner: { marginHorizontal: 16, marginTop: 10 },
  container:{ flexDirection: "row" },
  radio_View: {
    height: 18,
    width: 18,
    borderRadius: 18 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    // borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    alignSelf: "center",
    marginTop: 4,
  },
  radioBg: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    margin: 2,
    backgroundColor: _COLORS.Kodie_GreenColor,
    borderColor: _COLORS.Kodie_GreenColor,
  },
  languageText: {
    alignSelf: "center",
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  language_SubtextView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
  },
  language_subtext:{
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
  },
  hor_Line: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderBottomColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
});
