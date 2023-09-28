import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const TwoStepVerificationStyle2 = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  divider:{
    borderColor:"#8AFBA5",
    borderWidth:5
  },
  container:{
    marginHorizontal:25,
    marginTop:20 
  },
  text:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  },
  text1:{
    fontSize:21
  },
  Button:{
    marginTop: 45
  },
  otp_view: { marginTop: 24 },
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
 
});
