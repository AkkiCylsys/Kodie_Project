import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const TwoStepVerificationStyle6 = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container:{
    marginHorizontal:25,
    marginTop:20 
  },
  img:{
   alignItems:"center",
   marginTop:40
},
divider:{
    borderColor:"#8AFBA5",
    borderWidth:5,
  },
  text:{
    marginTop:60,
    alignItems:'center',
    fontSize:14,
    lineHeight:20,
    padding:15,
    textAlign:"center"
  },
  text1:{
    fontSize:21
  },
  Button:{
    marginTop: 45
  },
  imgicon:{
    width:30,
    height:30,
    marginLeft:20
  },
  bindview:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20
  },
  innertextview:{
    marginLeft:20
  },
  textitem:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
  },

});
