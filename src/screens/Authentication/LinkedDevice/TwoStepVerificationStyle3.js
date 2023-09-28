import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const TwoStepVerificationStyle3= StyleSheet.create({
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
    marginTop:30
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
    marginTop: "50%"
  },
  Button2:{
   marginTop:24
  },
  
  input: {
    height: 47,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    marginTop:21,
    fontFamily: FONTFAMILY.K_Medium,
  },
});
