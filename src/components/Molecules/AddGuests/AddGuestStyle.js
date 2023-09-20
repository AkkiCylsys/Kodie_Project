import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const AddGuestStyle = StyleSheet.create({
  addgusttext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  Noticetextview: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  bindview: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  locationInput: {
    height: 48,
    paddingHorizontal: 10,
    borderWidth: 0.6,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 5,
    width: 250,
  },

  adduserimg: {
    position: "absolute",
    right: 0,
    marginTop: 15,
    marginHorizontal: 10,
  },
  vecentview: {
    width: 56,
    height: 48,
    borderRadius: 8,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    marginLeft:15
  },
  chatview: {
    position: "absolute",
    paddingHorizontal:30,
    paddingTop: 3,
  },
  chatimage: {
    tintColor: _COLORS.Kodie_WhiteColor,
  },
  chattext: {
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
    fontStyle: FONTFAMILY.K_SemiBold,
  },
});
