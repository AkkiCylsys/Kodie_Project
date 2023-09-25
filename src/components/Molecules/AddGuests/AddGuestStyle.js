import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const AddGuestStyle = StyleSheet.create({
  maincontainer: {
    marginTop:5
  },
  addgusttext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  mainviewinput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:5
  },
    bindview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    width:'80%',
    borderWidth:0.6,
    borderRadius:5,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal:10
  },

  adduserimg: {
    marginHorizontal: 8,
  },
  vecentview: {
    width: '18%',
    borderRadius: 8,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    alignItems:'center',
    paddingTop:3
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
