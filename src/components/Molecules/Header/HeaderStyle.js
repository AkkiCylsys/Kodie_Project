import { Platform, StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const HeaderStyle = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 55, // Adjust height for iOS
    marginTop: Platform.OS === "ios" ? 38 : 40,
    width: "100%",
  },
  leftButtonView: { width: "25%", alignSelf: "center" },
  middleTextView: {
    alignSelf: "center",
    width: "50%",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: _COLORS.Kodie_BlackColor,
  },
  LabelText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  MenuIcon: { resizeMode: "contain", alignSelf: "center" },
  leftIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    alignSelf: "center",
  },
  MiddleIcon: {
    width: 180,
    height: 15,
    resizeMode: "contain",
    alignSelf: "center",
  },
  usericon: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginLeft: 10,
    justifyContent: "center",
    alignSelf: "center",
    // borderColor: "red",
    borderWidth: 0.2,
  },
  nullView: { width: "25%", flexDirection: "row", justifyContent: "center" },
  notificationButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
