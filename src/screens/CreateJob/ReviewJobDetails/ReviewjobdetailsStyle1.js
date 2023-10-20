import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY} from "../../../Themes/index";
export const ReviewjobdetailsStyle1 = StyleSheet.create({

  Mainview: {
flex:1,
backgroundColor:_COLORS.Kodie_WhiteColor,
},
img:{
    width: '100%', height: 200,resizeMode:"cover"
},
Container:{
    marginHorizontal:25,
    marginTop:20 
  },
  divider:{
    marginTop:25,
    borderColor:'#CED5D7',
    marginTop:-5
  },
  TextFixing:{
    fontSize:18,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
    marginBottom:8
  },
  ElectricalsText:{
marginBottom:20
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  textview:{
    color:_COLORS.Kodie_BlackColor,
    fontSize:14
  },
  textview1:{
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:16,
    marginTop:20
  },
  Tableview:{
    flexDirection:"row",
    textAlign:'justify',
  },
  Tabletext:{
    marginTop:25,
    fontSize:14
  },
  Tabletext1:{
    marginTop:22,
    fontSize:16,
    color:_COLORS.Kodie_BlackColor,
    marginLeft:50
  },
  
});
