import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const DeleteAccountStyle = StyleSheet.create({
  headingview: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    top: 20,
  },
  helpimg: {
    width: 18,
    height: 18,
    borderRadius:8
  },
  accounttext:{
    fontSize:16,
    lineHeight:20,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    marginLeft:10
  },
  Pointsview:{
    top:30,
    // alignItems:'center',
  
  },
  textpoint:{
    fontSize:10,
    textAlign:'justify',
    marginLeft:40,
    lineHeight:18,
    fontFamily:FONTFAMILY.K_SemiBold,
    color:'#A1A1A1',
    opacity: 0.7,
  },
  logoutview:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:45,
    marginLeft:10
  },
  Logoutimg:{
    width:32,
    height:32,
    borderRadius:8
  },
  insteadtext:{
    fontSize:16,
    lineHeight:20,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    marginLeft:3
  },
  buttonview:{
    marginLeft:10,
    marginRight:10,
    top:10
  },
  toconfirmview:{
  top:30,
  marginLeft:5,
  marginRight:5,
  },
  toconfirmtext:{
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:15,
    textAlign:'center'
  },
  firstview: {
    top:55,
  },
  oldnumbertext: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginRight:15,
    marginLeft:20
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    // borderColor:_COLORS.Kodie_GrayColor,
    borderRadius: 6,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 68,
    top:4,
    fontFamily:FONTFAMILY.K_SemiBold,
    opacity:0.5,
  },
  numbercode: {
    position: "absolute",
    top: 28,
    marginLeft: 23,
    color:_COLORS.Kodie_BlackColor,
    fontSize:13,
    fontWeight:'400',
    fontFamily:FONTFAMILY.K_SemiBold
  },
  downarrowimg: {
    width: 12,
    height: 6,
    position: "absolute",
    left: 0,
    marginLeft: 50,
    marginTop: 37,
  },
  lineimg: {
    height: 21,
    width: 43,
    position: "absolute",
    left: 0,
    marginLeft: 48,
    marginTop: 30,
    padding:10
  },
  firstemailview:{
    top:65
  },
  buttonblackview:{
    marginLeft:10,
    marginRight:10,
    top:180
  },
  inputemail:{
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    borderRadius: 6,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 18,
    top:4,
    fontFamily:FONTFAMILY.K_SemiBold,
    opacity:0.5,
  }
});
