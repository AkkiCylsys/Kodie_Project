import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const Help_FeedBackCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    width: 35,
    height: 35,
    resizeMode: "cover",
  },

  profile_Heading: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
    alignSelf: "center",
  },

  ArrowIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 10,
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
  flatlistContainer: { marginTop: 20 },
});
