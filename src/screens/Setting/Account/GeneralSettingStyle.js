import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY} from "../../../Themes/index";
export const GeneralSettingStyle = StyleSheet.create({

  Mainview: {
flex:1,
backgroundColor:_COLORS.Kodie_WhiteColor,
},
Container:{
    marginHorizontal:35,
    marginTop:20 
  },
  TextCalendar:{
    fontSize:16,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  },
  text:{
    textAlign:"justify",
    marginTop:10,
    lineHeight:20,
    color:_COLORS.Kodie_BlackColor,
    fontSize:12,
    fontFamily: FONTFAMILY.K_Bold,
  },
  Time:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
    marginTop:10
  },
  row:{
     flexDirection:"row",
     alignItems:'center',
     justifyContent:'space-between'
  },
  GMT:{
    color:_COLORS.Kodie_BlackColor,
    fontSize:10,
    fontFamily:FONTFAMILY.K_Bold,
    borderWidth:1,
    borderRadius:8,
    height:30,
    textAlign:'center',
    borderColor:'#CED5D7',
    alignItems:'center',
    paddingTop:5,
    width: 135,
  },
  divider:{
    marginTop:25,
    borderColor:'#CED5D7'
  },
  item1:{
     flexDirection: "row",
     justifyContent:'space-between',
     alignItems:'center' ,
     paddingTop:10
    },
    binditem1view:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:"100%"
    },
  component:{
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'center'
  },
  To:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
  },
  sundaytext:{
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:14
  },
  Unvl:{
    color:'#D9D9D9',
    fontSize:12,
  },
  Mondaytime:{
    color:_COLORS.Kodie_BlackColor,
    fontSize:10,
    fontFamily:FONTFAMILY.K_Bold,
    fontFamily: FONTFAMILY.K_Bold,
    borderWidth:1,
    borderRadius:8,
    height:30,
    textAlign:'center',
    borderColor:'#CED5D7',
    alignItems:'center',
    paddingTop:5,
    width: 70,
    // marginTop:10,
  },
  toggle_con: {
    width: 48,
    height: 25,
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  toggle_circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  Crossicon:{
    marginLeft:8
  }
});
