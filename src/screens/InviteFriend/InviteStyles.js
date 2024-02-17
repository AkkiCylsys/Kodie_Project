import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes/index";
export const InviteStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
  },
  shareMainView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  searchandShareMainView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    paddingVertical: 5,
  },
  shareTextView: {
    alignSelf: "center",
  },
  AllcontactsText: {
    fontSize: 16,
    paddingHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  shareText: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 12,
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
    height: 45,
    width: 45,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: _COLORS.Kodie_GreenColor,
    marginHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
  },

  contactIconView: {
    alignSelf: "center",
    marginHorizontal: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    marginTop: 10,
    flexDirection: "row",
  },
  contactIcon: { height: 16, width: 16 },

  FlatlistContainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginTop: 8,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 8,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  profileIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  profile_Heading: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  profile_SubHeading: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  ArrowIcon: {
    width: "18%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightGrayColor,
  },
  ArrowIconStyle: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    alignSelf: "center",
  },
});
