import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";

export const GeneralSettingStyle = StyleSheet.create({
   main:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
    alignItems:'center'
   },
   bindview:{
    flexDirection:'row',
    alignItems:'center'
   },
   headingtext:{
    fontSize:14,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    marginHorizontal:15
   },
   desctext:{
    fontSize:12,
    color:_COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily:FONTFAMILY.K_SemiBold,
    marginHorizontal:15
   },
   image:{
    width:20,
    height:20
   },
   imageview:{
      width:38,
      height:38,
      borderWidth:0.4,
      borderRadius:8,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderColor:_COLORS.Kodie_LightGrayColor
   }
});
