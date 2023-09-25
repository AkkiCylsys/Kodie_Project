import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const AppInfoStyle = StyleSheet.create({
  maincontainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height:'100%'
  },
  headingview: {
    alignItems: "center",
    marginVertical:50
  },

  propertytext: {
    fontSize: 15,
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },

  versiontext: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },

  mainlogo: {
    marginVertical:40,
    width: 220,
    height: 43,
  },

  timedurationview: {
    alignItems: "center",
    marginVertical:50
  },

  timedurationtext: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    marginVertical:40
  },
  buttonview: {
    marginVertical:5,
    marginHorizontal:20,
  },
});
