import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const LandlordProfileStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  ProfileView: {
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
    backgroundColor: _COLORS.Kodie_MostLiteGreyColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  usericon: {
    height: 76,
    width: 76,
    marginHorizontal: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
  profilemainView: {
    flexDirection: "row",
  },
  nameView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  emailText: {
    marginTop: 5,
    fontSize: 10,
    color: _COLORS?.Kodie_ExtraLiteGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  staricon: { flexDirection: "row", marginTop: 8 },
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
  star: { alignSelf: "center" },
  contactIconView: {
    alignSelf: "center",
    marginHorizontal: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    marginTop: 10,
  },
  contactIcon: { height: 16, width: 16 },
  AllcontactsText: {
    fontSize: 16,
    paddingHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
});
