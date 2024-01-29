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
    justifyContent:'space-between'
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
    borderRadius:8,
    flexDirection:'row',
    alignItems:'center'
  },
  RowView: {
    flexDirection: "row",
  },
  icon:{
    marginLeft:2,
  },
  text3:{
    color:_COLORS.Kodie_ExtraminLiteGrayColor,
    fontSize:14
  },
  text0:{
    marginHorizontal:130
  },
  subtext:{
    fontSize:12,
    color:_COLORS.Kodie_MediumGrayColor,
    marginTop:3
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
  },
});
