import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const TwoStepVerificationStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  img: {
    alignItems: "center",
  },
  Imagestyle: {
    height: 128,
    width: 128,
    alignSelf: "center",
  },
  text: {
    alignItems: "center",
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
    textAlign: "center",
  },
  text1: {
    fontSize: 21,
  },
  Button: {
    marginTop: 45,
  },
  otp_view: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    borderRadius: 10,
    fontSize: 20,
    color: _COLORS.Kodie_GrayColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    textAlign: "center",
    alignSelf: "center",
  },
  focusCell: {
    borderWidth: 2,
    borderColor: _COLORS.Kodie_BlackColor,
    color: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
  },
  input: {
    height: 47,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    marginTop: 21,
    fontFamily: FONTFAMILY.K_Medium,
  },
  Button2: {
    marginTop: 24,
  },
  bindview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  innertextview: {
    marginLeft: 20,
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
