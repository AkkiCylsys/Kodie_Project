import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const ContractorlistStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  hor_Line: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderBottomColor: _COLORS.Kodie_GrayColor,
  },
  usericon: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderColor: _COLORS.Kodie_GrayColor,
    marginHorizontal: 16,
    marginTop: 20,
  },
  usermainView: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  nameView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  ProposeText: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 8,
  },
  prize: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 8,
  },
  autoView: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 7,
  },
  buttonText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
  },
  Propose_Con: {
    flex: 1,
    flexDirection: "row",
  },
  ratingView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  root: {
    flex: 1,
    padding: 16,
  },
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
  verticalLine: {
    height: "50%",
    width: 1,
    backgroundColor: _COLORS.Kodie_LightGrayColor,
    marginLeft: 5,
    alignSelf: "center",
    marginTop: 10,
  },
});
