import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";

export const GeneralSettingStyle = StyleSheet.create({
   main:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
   },
   bindview:{
    flexDirection:'row',
   },
   headingtext:{
    fontSize:14,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_SemiBold,
    marginHorizontal:10
   },
   desctext:{
    fontSize:12,
    color:_COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily:FONTFAMILY.K_SemiBold,
    marginHorizontal:10
   },
   image:{
    width:18,
    height:18
   },
   imageview:{
      width:32,
      height:32,
      borderWidth:0.4,
      borderRadius:8,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderColor:_COLORS.Kodie_LightGrayColor
   }
});
