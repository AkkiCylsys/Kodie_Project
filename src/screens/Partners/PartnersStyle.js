import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const PartnersStyle = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    flex: 0.4,
    width: 295,
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    lineHeight: 25,
  },
  img: {
    width: 70,
    height: 70,
  },
  imgttitlebindview: {
    flex: 0.4,
    alignItems: "center",
  },
  hrline: {
    width: 400,
    marginTop: 10,
    height: 0.5,
    backgroundColor: _COLORS.Kodie_LightGrayColor,
  },
  activeDotStyle: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
  },
  dotStyle: {
    backgroundColor: _COLORS.Kodie_MostLiteGreyColor,
  },
});
