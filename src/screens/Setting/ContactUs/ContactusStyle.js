import { StyleSheet } from "react-native";
import { IMAGES, _COLORS,FONTFAMILY } from "./../../../Themes/index";

export const ContactusStyle = StyleSheet.create({
  inputview: {
    top: 20,
  },
  inputboxview: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 330,
    height: 120,
    borderColor: "#CED5D7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight:'500',
    // backgroundColor: "#FFFFFF",
    color:'#CED5D7',
    paddingBottom:80,
    paddingLeft:20,
    fontFamily:FONTFAMILY. K_Light,
  },
  textmessage: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
    left:20,
    lineHeight:30,
    fontFamily:FONTFAMILY. K_SemiBold,
  },
  checkboxview:{
  flexDirection:'row',
  top:20
  },
  imgcheckbox:{
    width:25,
    height:24,
    left:20,
  },
  checkboxtextview:{
    marginLeft:30,
    width:300
  },
  optionaltext:{
    fontWeight:'500',
    color:'#212121',
    fontSize:12,
    fontFamily:FONTFAMILY. K_SemiBold,
  },
  answertext:{
  color:'#A1A1A1',
  fontSize:11,
  fontWeight:'400',
  top:4,
  lineHeight:15,
  fontFamily:FONTFAMILY.  K_Light,
  },
  viaemailview:{
    alignItems:'center',
    top:80,
  },
  viaemailtext:{
    fontWeight:'500',
    fontSize:15,
    fontFamily:FONTFAMILY. K_SemiBold,
    color:'#212121',
  },
  buttonview:{
    top:90,
    marginLeft:20,
    marginRight:20,
  },
  buttontext:{
    fontFamily:FONTFAMILY. K_SemiBold,
  }
});
