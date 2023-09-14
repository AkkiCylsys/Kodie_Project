import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";

export const ChangeNotifyStyle = StyleSheet.create({
  headingview: {
    width: 306,
    height: 40,
    top: 28,
    alignItems: "center",
    marginLeft: 40,
  },
  alltext: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: FONTFAMILY.K_SemiBold,
    color: "#A1A1A1",
  },
  numberview: {
    flexDirection: "row",
    alignItems: "center",
  },
  firstnumbertext: {
    color: "#212121",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  totext: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: FONTFAMILY.K_SemiBold,
    color: "#A1A1A1",
  },
  secondnumbertext: {
    color: _COLORS.Kodie_ExtraDarkGreen,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Dividerline: {
    color: "#DBDBDB",
    height: 1.3,
    marginTop: 60,
  },
  notifyview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    top: 35,
  },
  notifytext: {
    fontSize: 14,
    fontWeight: "600",
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    lineHeight: 20,
  },
  Dividerlinesecond: {
    color: "#DBDBDB",
    height: 1.5,
    marginTop: 75,
  },
  buttonview:{
    marginLeft:20,
    marginRight:20,
    top:30
  }
});
