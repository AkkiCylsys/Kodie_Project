import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const DeleteAccountStyle = StyleSheet.create({
  container: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: "100%",
  },
  headingview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop:20
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
  firstview: {
    marginTop: 30,
  },
  oldnumbertext: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
   marginHorizontal:20
  },
  inputview: {
    height: 50,
    borderWidth: 0.3,
    width: '90%',
    borderRadius: 6,
    color: _COLORS.Kodie_MediumGrayColor,
    marginTop: 4,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:15,
    paddingHorizontal:10
  },
  numbercode: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  downarrowimg: {
    width: 12,
    height: 6,
  },
  lineimg: {
    height: 21,
    width: 43,
  },
  firstemailview: {
    marginTop: 30,
  },
  buttonblackview: {
marginHorizontal:10,
    marginTop: 50,
  },
  inputemail: {
    height: 50,
    marginTop: 12,
    borderWidth: 0.3,
    width: '90%',
    borderRadius: 6,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 18,
    marginTop: 4,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginHorizontal:15,
    paddingHorizontal:10
  },
});
