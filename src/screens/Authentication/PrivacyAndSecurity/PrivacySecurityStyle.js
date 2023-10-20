import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const PrivacySecurityStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container:{
    marginHorizontal:25,
    marginTop:20 
  },
  img:{
   alignItems:"center"
},
  divider:{
    marginTop:20,
    borderColor:'#CED5D7',
  },
  text:{
    marginTop:15,
    alignItems:'center',
  },
  text1:{
    fontSize:21
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },

  imgicon:{
    width:40,
    height:40
  },
  bindview:{
    flexDirection:'row',
    alignItems:'center',
  },
  innertextview:{
    marginLeft:15
  },
  textitem:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
  },
  checkimgview:{
    width:32,
    height:32,
    borderWidth:1,
    borderColor:_COLORS.Kodie_GrayColor,
    borderRadius:8,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  RowView: {
    flexDirection: "row",
  },
  texticon:{
    flexDirection:'row',
  },
  icon:{
    marginHorizontal:15
  },
  text3:{
    marginHorizontal:160
  },
  text0:{
    marginHorizontal:130
  }
});
