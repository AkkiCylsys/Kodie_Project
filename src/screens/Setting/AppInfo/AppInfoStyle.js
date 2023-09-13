import { StyleSheet } from "react-native";
import { IMAGES, _COLORS,FONTFAMILY } from "./../../../Themes/index";

export const AppInfoStyle = StyleSheet.create({

  headingview: {
    alignItems: "center",
    top: 100,
  },

  propertytext: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },

  versiontext: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    top:5,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },

  mainlogo: {
    top:30,
    width: 220,
    height: 43,
  },

  timedurationview: {
    alignItems: "center",
    top: 240,
  },

  timedurationtext: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 15,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
  buttonview:{
    top:240,
    marginLeft:20,
    marginRight:20
  }
});
