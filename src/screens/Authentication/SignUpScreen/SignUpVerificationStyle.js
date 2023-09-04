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
  accept_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop:24
  },
  termView: {
    flexDirection: "row",
    marginTop: 5,
  },
  CheckBox_View: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    marginTop: 4,
  },
  checkbox_BG: {
    margin: 1.5
  },
  termsConView: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 16,
    justifyContent: "center",
  },
  termsText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
  },
  terms_Condition: { color: _COLORS.Kodie_GreenColor },
  customBtn: {
    justifyContent: "flex-end",
    flex: 1,
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
    alignSelf: 'center',
    marginTop: 10,
  },
  cell: {
    width:50 ,
    height:50,
    borderRadius: 11,
    lineHeight: 45,
    fontSize: 25,
    color:_COLORS.Kodie_GrayColor,
    borderWidth: 1,
    borderColor:_COLORS.Kodie_GrayColor,
    textAlign: 'center',
  },
  focusCell: {
    borderWidth: 2,
    borderColor:_COLORS.Kodie_GrayColor,  
    color:_COLORS.Kodie_GrayColor,  
    alignSelf: 'center',
  },
  otp_view: { marginTop: 24 }
});
