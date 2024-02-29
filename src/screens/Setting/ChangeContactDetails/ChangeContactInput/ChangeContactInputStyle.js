import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";
export const ChangeContactInputStyle = StyleSheet.create({
  maincontainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: "100%",
  },
  firstview: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  secondview: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  numbercodefirstview: {
    height: 50,
    borderWidth: 0.3,
    width: "100%",
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // marginTop: 15,
  },

  bindview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  oldnumbertext: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 8,
    marginVertical:11,
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
    marginHorizontal: 5,
  },
  lineimg: {
    height: 21,
    width: 45,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    tintColor: "#CED5D7",
  },
  secondview: {
    marginTop: 12,
    marginHorizontal: 15,
  },
  simpleinputNewPhoneview: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
  },
  simpleinputview: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  error_text: { color: "red", marginLeft: 10,marginTop:5 },

});
