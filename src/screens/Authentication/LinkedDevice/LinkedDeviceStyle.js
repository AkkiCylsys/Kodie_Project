import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const LinkedDeviceStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  img: {
    alignItems: "center",
  },
  Devicetext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 24,
  },
  divider: {
    marginTop: 20,
    borderColor: "#CED5D7",
  },
  text: {
    marginTop: 15,
    alignItems: "center",
  },
  text1: {
    fontSize: 21,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },
  Button: {
    marginTop: 24,
  },

  imgicon: {
    width: 40,
    height: 40,
  },
  bindview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innertextview: {
    marginLeft: 15,
  },
  textitem: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  imgicon: {
    width: 35,
    height: 35,
    marginLeft: 20,
  },
  Logouttext: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginHorizontal: 25,
    marginTop: 20,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
  },
  Cancelbtn: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    // marginLeft: 190,
  },
  Logoutbtnview: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Logoutbtn: {
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },

  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
