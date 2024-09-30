import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";

export const ChangeNotifyStyle = StyleSheet.create({
  maincontainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: "100%",
  },
  headingview: {
    // width: 306,
    // height: 40,
    marginTop: 15,
    alignItems: "center",
    marginHorizontal: 30,
  },
  alltext: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: FONTFAMILY.K_SemiBold,
    textAlign:'center',
    color: _COLORS.Kodie_ExtraLightGrayColor,
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
    color: _COLORS.Kodie_LightGrayColor,
  },
  secondnumbertext: {
    color: _COLORS.Kodie_ExtraDarkGreen,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Dividerline: {
    color: _COLORS.Kodie_LightGrayLineColor,
    height: 1.3,
    marginTop: 30,
  },

  notifyview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    // marginVertical:30
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
  },
  buttonview: {
    marginHorizontal: 20,
    // marginTop: 30,
  },
  toggle_con: {
    width: 45,
    height: 25,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    borderWidth:1,
    borderColor:_COLORS?.Kodie_GrayColor
  },
  toggle_circle: {
    width: 15,
    height: 15,
    borderRadius: 7,
  },
});
