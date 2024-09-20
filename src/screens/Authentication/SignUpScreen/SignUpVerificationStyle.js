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
    marginBottom:10
  },
  checkEmail_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 29,
  },
  verify_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 24,
  },
  textcode: {
    marginTop: 24,
    color:_COLORS?.Kodie_VeryLightGrayColor
  },
  customBtn: {
    marginTop: 30,
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
    alignSelf:'center'
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
    alignSelf:"center",
    marginTop:2
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
  otp_view: { marginTop:12 },
  error_text: { color: "red", marginLeft: 10,marginTop:5 },
  getBindButtonView:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  getButtonView: {
    borderRadius: 6,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    alignItems:'center',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    width:80,
    height:45,
  },
  getButton: {
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    textAlign: "center",
  },
});
