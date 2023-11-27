import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS, } from "../../../Themes/index";
export const RatingandfeedbackStyle = StyleSheet.create({

  Mainview: {
flex:1,
backgroundColor:_COLORS.Kodie_WhiteColor,
},
Container:{
  marginHorizontal:20
},
Containertext:{
    marginTop:10,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:24
},
startext:{
    marginTop:10,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:14
},
star2text:{
    marginTop:20,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:14
},
starStyle: {
    marginTop: 20,
    marginHorizontal:5
  },
  input: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop:20
  },
  btnview:{
    marginTop:10
  },
  SkipText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginVertical: 15,
    textAlign: "center",
  },
});
