import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const LandlordProfileDataStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 4,
    marginVertical: 5,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  },
  ArrowIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 25,
    right: 1,
    zIndex: 1,
  },
  ArrowIconStyle: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    alignSelf: "center",
  },
});
