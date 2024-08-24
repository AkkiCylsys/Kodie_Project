import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const ContractorsComponentStyle = StyleSheet.create({
  startRating: {
    paddingHorizontal: 1,
  },
  starView: {
    color: _COLORS.Kodie_BlackColor,
  },
  userName: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Jasontext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Nottext: {
    fontSize: 10,
    marginLeft: 8,
  },
  text1234: {
    flex: 1,
    fontSize: 12,
  },

  text231: {
    color: _COLORS.Kodie_GrayColor,
  },

  verifirdview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  verifiedtext: {
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
    flexDirection: "row",
    marginBottom: 3,
  },

  //   --------------------
  mainview: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  mainbindview: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginHorizontal: 5,
  },
  databindview: {
    // flexDirection: "row",
  },
  menuiconview: {
    // flexDirection: "row",
    // alignSelf: "center",
  },
  heartimg: {
    marginRight: 10,
  },
  namebindview: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  ratingbindview: {
    flexDirection: "row",
  },
  iconbindview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageview: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
  },

  Container: { flex: 1, flexDirection: "row", justifyContent: "space-evenly" },
  textStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_GrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  CoverText: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  readMore: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
  },
});
