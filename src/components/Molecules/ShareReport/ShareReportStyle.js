import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";

export const ShareReportStyle = StyleSheet.create({
    headerview:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:15,
        marginVertical:10,
        alignItems:'center'
    },
    headingtext:{
        fontSize:20,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
    },
    input: {
        height: 48,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        color: "#333",
        paddingLeft: 10,
        fontFamily: FONTFAMILY.K_Medium,
      },
      emailview:{
        marginHorizontal:15,
        marginVertical:2
      },
      titletext:{
        fontSize:14,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold,
        marginVertical:5

      },
      btnmainview:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginHorizontal:15,
      },
      binbtnview:{
        width:100,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
        marginTop:10
      },
      sharebtn:{
        backgroundColor:_COLORS.Kodie_BlackColor,
      },
      canclebtn:{
        marginHorizontal:20
      },
      Cancletext:{
        color:_COLORS.Kodie_BlackColor,
        fontSize:14,
        fontFamily:FONTFAMILY.K_SemiBold
      },
      Sharetext:{
        color:_COLORS.Kodie_WhiteColor,
        fontSize:14,
        fontFamily:FONTFAMILY.K_SemiBold
      },

});
