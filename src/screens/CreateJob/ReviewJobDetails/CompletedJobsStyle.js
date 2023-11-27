import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS, } from "../../../Themes/index";
export const CompletedJobsStyle = StyleSheet.create({

  Mainview: {
flex:1,
backgroundColor:_COLORS.Kodie_WhiteColor,
},
Container:{
  // marginHorizontal:20
},
ref:{
  marginHorizontal:20
},
Lineview:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:15,
  alignItems:"center",
  marginHorizontal:20
},
Linetext:{
  color:_COLORS.Kodie_BlackColor,
  fontFamily:FONTFAMILY.K_Bold,
  fontSize:16,
},
item_style: {
  fontSize: 12,
  fontFamily: FONTFAMILY.K_Bold,
  color: _COLORS.Kodie_GreenColor,
},
AllView: {
  flexDirection: "row",
  borderRadius: 15,
  paddingHorizontal: 6,
  backgroundColor: "#E9F2E9",
  marginLeft:50
},
lineView1:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginHorizontal:20
},
lineView2:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginHorizontal:20
},
linetext1:{
  fontSize:12,
  marginTop:10
},
text:{
  fontSize:12,
  color:_COLORS.Kodie_BlackColor,
  justifyContent:"space-between",
  flex:1
},
text100:{
  color:_COLORS.Kodie_BlackColor,
  fontFamily:FONTFAMILY.K_Bold,
  fontSize:12 
},
});
