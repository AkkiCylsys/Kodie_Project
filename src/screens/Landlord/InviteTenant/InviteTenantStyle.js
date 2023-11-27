import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const InviteTenantStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
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
  ratingText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  subrating: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  starStyle: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  staricon: { flexDirection: "row", marginTop: 8 },
  startRating: { paddingHorizontal: 1 },
  star: { alignSelf: "center" },
  desc_View: { flexDirection: "row", marginTop: 2 },
  desc_heading: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  desc_value: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  description: {
    marginTop: 18,
    marginHorizontal: 16,
  },
  RowBtnView: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  readtext: {
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 12,
    textDecorationLine: "underline",
    textDecorationColor: _COLORS.Kodie_GreenColor,
  },
});
