import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const SignUpVerificationStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  checkEmail_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 10,
  },
  verify_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 24,
  },
  textcode: {
    marginTop: 24,
  },
  customBtn: {
    marginTop: 25,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  codeFieldRoot: {
    alignSelf: "center",
    marginTop: 10,
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 11,
    lineHeight: 45,
    fontSize: 25,
    color: _COLORS.Kodie_GrayColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    textAlign: "center",
  },
  focusCell: {
    borderWidth: 2,
    borderColor: _COLORS.Kodie_GrayColor,
    color: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
  },
  otp_view: { marginTop: 24 },
});
